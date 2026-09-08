/**
 * HomeEase Smart Provider Matching Algorithm
 * 
 * Formula:
 * Match Score = (Service Expertise × 30%) + (Availability × 25%) + (Rating × 20%) + (Distance × 15%) + (Price × 10%)
 */

// Dhaka neighborhood approximate distances matrix (in km)
const DHAKA_DISTANCES = {
  'Dhanmondi': { 'Dhanmondi': 1.8, 'Mohammadpur': 2.5, 'Mirpur': 6.2, 'Gulshan': 7.5, 'Banani': 7.8, 'Uttara': 15.2 },
  'Mohammadpur': { 'Mohammadpur': 1.9, 'Dhanmondi': 2.5, 'Mirpur': 5.1, 'Gulshan': 8.9, 'Banani': 8.5, 'Uttara': 14.8 },
  'Mirpur': { 'Mirpur': 2.2, 'Mohammadpur': 5.1, 'Dhanmondi': 6.2, 'Banani': 6.8, 'Gulshan': 8.2, 'Uttara': 9.5 },
  'Gulshan': { 'Gulshan': 2.0, 'Banani': 1.8, 'Dhanmondi': 7.5, 'Mohammadpur': 8.9, 'Mirpur': 8.2, 'Uttara': 8.8 },
  'Banani': { 'Banani': 1.7, 'Gulshan': 1.8, 'Uttara': 7.9, 'Mirpur': 6.8, 'Dhanmondi': 7.8, 'Mohammadpur': 8.5 },
  'Uttara': { 'Uttara': 2.4, 'Banani': 7.9, 'Gulshan': 8.8, 'Mirpur': 9.5, 'Mohammadpur': 14.8, 'Dhanmondi': 15.2 },
};

function calculateDistance(loc1, loc2) {
  if (!loc1 || !loc2) return 4.5;
  const l1 = loc1.trim();
  const l2 = loc2.trim();
  if (DHAKA_DISTANCES[l1] && DHAKA_DISTANCES[l1][l2]) {
    return DHAKA_DISTANCES[l1][l2];
  }
  return 5.0; // default average distance in Dhaka
}

/**
 * Match and rank providers
 * @param {Array} providers - List of provider documents with populated user
 * @param {Object} requestDetails - { serviceType, location, preferredDate, preferredTime, urgencyLevel, rejectedProviders }
 */
function rankProviders(providers, requestDetails) {
  const {
    serviceType,
    location,
    preferredTime,
    urgencyLevel,
    rejectedProviders = [],
    minRating = 0,
    maxPrice,
    availableOnly = false,
    sortBy = 'match',
  } = requestDetails;
  const isEmergency = urgencyLevel === 'emergency';

  const rejectedSet = new Set(rejectedProviders.map(id => id.toString()));

  const evaluated = providers
    .filter(p => !rejectedSet.has(p._id.toString()))
    .filter(p => {
      if (availableOnly && !p.availability) return false;
      if (minRating && (p.rating || 0) < Number(minRating)) return false;
      if (maxPrice && (p.estimatedPrice || 0) > Number(maxPrice)) return false;
      return true;
    })
    .map(provider => {
      // 1. Service Expertise Score (0 - 100)
      let expertiseScore = 40;
      const expertiseList = provider.serviceExpertise || [];
      const normalizedService = (serviceType || '').toLowerCase();
      
      const exactMatch = expertiseList.some(e => 
        e.toLowerCase().includes(normalizedService) || normalizedService.includes(e.toLowerCase())
      );
      if (exactMatch) {
        expertiseScore = 98;
      } else if (expertiseList.length > 0) {
        // Partial category match
        expertiseScore = 70;
      }

      // 2. Availability Score (0 - 100)
      let availabilityScore = 50;
      if (provider.availability) {
        availabilityScore = 88;
        // Check if preferred time slot is in provider's available slots
        if (preferredTime && provider.availableTimeSlots && provider.availableTimeSlots.includes(preferredTime)) {
          availabilityScore = 100;
        }
      } else {
        availabilityScore = 25;
      }

      // Workload penalty based on active jobs
      const activeJobs = provider.activeJobs || 0;
      availabilityScore = Math.max(10, availabilityScore - (activeJobs * 15));

      // 3. Rating Score (0 - 100)
      const rating = provider.rating || 4.5;
      const ratingScore = Math.min(100, Math.max(0, (rating / 5.0) * 100));

      // 4. Distance / Location Proximity Score (0 - 100)
      const distanceKm = calculateDistance(location, provider.location);
      let distanceScore = Math.max(20, Math.min(100, 105 - (distanceKm * 5)));

      // 5. Price Competitiveness Score (0 - 100)
      const price = provider.estimatedPrice || 1000;
      let priceScore = 85;
      if (price <= 800) priceScore = 100;
      else if (price <= 1000) priceScore = 92;
      else if (price <= 1200) priceScore = 80;
      else priceScore = 65;

      // Adjust weights for Emergency requests
      let wExpertise = 0.30;
      let wAvailability = 0.25;
      let wRating = 0.20;
      let wDistance = 0.15;
      let wPrice = 0.10;

      if (isEmergency) {
        // Boost distance & availability during emergency
        wDistance = 0.30;
        wAvailability = 0.30;
        wExpertise = 0.25;
        wRating = 0.10;
        wPrice = 0.05;
      }

      // Calculate total match score
      const rawScore = 
        (expertiseScore * wExpertise) +
        (availabilityScore * wAvailability) +
        (ratingScore * wRating) +
        (distanceScore * wDistance) +
        (priceScore * wPrice);

      const matchPercentage = Math.min(99.4, Math.max(60.0, Math.round(rawScore * 10) / 10));

      // Build personalized recommendation reason
      const reasons = [];
      if (exactMatch) reasons.push(`specializes in ${serviceType}`);
      if (distanceKm <= 3.5) reasons.push(`located only ${distanceKm} km away in ${provider.location}`);
      if (rating >= 4.8) reasons.push(`holds an exceptional ${rating}★ customer rating`);
      if (provider.availability) reasons.push(`ready for immediate dispatch`);
      
      const recommendationReason = reasons.length > 0
        ? `This provider ${reasons.join(', ')}.`
        : `Verified Dhaka specialist suited for your scheduled time and location.`;

      // Estimated ETA calculation
      const etaMinutes = isEmergency
        ? Math.max(10, Math.round(distanceKm * 3.5 + 4))
        : Math.max(12, Math.round(distanceKm * 4.5 + 5));

      return {
        providerId: provider._id,
        provider,
        matchPercentage,
        distanceKm,
        etaMinutes,
        recommendationReason,
        breakdown: {
          expertise: Math.round(expertiseScore),
          availability: Math.round(availabilityScore),
          rating: Math.round(ratingScore),
          distance: Math.round(distanceScore),
          price: Math.round(priceScore)
        }
      };
    });

  // Sort according to user preference
  if (sortBy === 'price_asc') {
    evaluated.sort((a, b) => (a.provider?.estimatedPrice || 0) - (b.provider?.estimatedPrice || 0));
  } else if (sortBy === 'rating_desc') {
    evaluated.sort((a, b) => (b.provider?.rating || 0) - (a.provider?.rating || 0));
  } else if (sortBy === 'eta_asc') {
    evaluated.sort((a, b) => a.etaMinutes - b.etaMinutes);
  } else {
    // Default: Best match percentage descending
    evaluated.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  // Return up to 6 top matching providers
  return evaluated.slice(0, 6);
}

module.exports = { rankProviders, calculateDistance };
