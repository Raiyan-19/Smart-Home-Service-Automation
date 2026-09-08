const mongoose = require('mongoose');
const User = require('../models/User');
const Provider = require('../models/Provider');
const Service = require('../models/Service');
const ServiceRequest = require('../models/ServiceRequest');
const Booking = require('../models/Booking');
const Notification = require('../models/Notification');
const Review = require('../models/Review');

const servicesData = [
  {
    name: 'AC & Appliance Repair',
    slug: 'ac-appliance-repair',
    icon: 'mode_fan',
    description: 'Compressor checks, leak sealing, inverter PCB diagnostics, and deep chemical wash.',
    basePrice: 800,
    category: 'APPLIANCES',
    activeTechCount: 14,
    popular: true,
    warrantyInfo: '30 Days Comprehensive',
  },
  {
    name: 'Plumbing & Water Lines',
    slug: 'plumbing-water-lines',
    icon: 'water_damage',
    description: 'Motor pumps, geyser piping, sanitary drainage blockage & pressure valves.',
    basePrice: 500,
    category: 'PLUMBING',
    activeTechCount: 9,
    popular: true,
    warrantyInfo: '15 Days Guarantee',
  },
  {
    name: 'Electrical & Wiring',
    slug: 'electrical-wiring',
    icon: 'bolt',
    description: 'Short circuit isolation, breaker board tuning, IPS inverter setup & smart switches.',
    basePrice: 600,
    category: 'APPLIANCES',
    activeTechCount: 21,
    popular: true,
    warrantyInfo: '30 Days Guarantee',
  },
  {
    name: 'Deep Cleaning',
    slug: 'deep-cleaning',
    icon: 'sanitizer',
    description: 'UV disinfection, kitchen degreasing, bathroom descaling & floor crystallization.',
    basePrice: 1200,
    category: 'MAINTENANCE',
    activeTechCount: 8,
    popular: false,
    warrantyInfo: '100% Satisfaction Check',
  },
  {
    name: 'Pest Control Protocol',
    slug: 'pest-control-protocol',
    icon: 'pest_control',
    description: 'Termite bait systems, odorless cockroach gel eradication & bedbug fogging.',
    basePrice: 1500,
    category: 'MAINTENANCE',
    activeTechCount: 5,
    popular: false,
    warrantyInfo: '90 Days Guarantee',
  },
  {
    name: 'Home Carpentry',
    slug: 'home-carpentry',
    icon: 'carpenter',
    description: 'Precision furniture assembly, door lock alignment, and modular cabinetry tuning.',
    basePrice: 900,
    category: 'MAINTENANCE',
    activeTechCount: 11,
    popular: false,
    warrantyInfo: '30 Days Guarantee',
  },
  {
    name: 'Moving & Shifting',
    slug: 'moving-shifting',
    icon: 'local_shipping',
    description: 'Insured relocation, shockproof packing materials, and tracked heavy lifting.',
    basePrice: 3500,
    category: 'LOGISTICS',
    activeTechCount: 6,
    popular: false,
    warrantyInfo: 'Full Transit Escrow Insurance',
  },
  {
    name: 'Car Care & Detailing',
    slug: 'car-care-detailing',
    icon: 'directions_car',
    description: 'At-doorstep steam wash, ceramic gloss polishing & 24-point battery telemetry test.',
    basePrice: 750,
    category: 'AUTOMOTIVE',
    activeTechCount: 10,
    popular: false,
    warrantyInfo: '7 Days Guarantee',
  },
  {
    name: 'Personal Care & Salon',
    slug: 'personal-care-salon',
    icon: 'face',
    description: 'Certified salon & grooming experts providing premium at-home spa treatments.',
    basePrice: 600,
    category: 'PERSONAL',
    activeTechCount: 7,
    popular: false,
    warrantyInfo: 'Hygienic Kit Sealed',
  }
];

const providersData = [
  {
    name: 'Rahim Electronics & HVAC',
    email: 'provider@homeease.com',
    phone: '+880 1711-234567',
    profileImage: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    serviceExpertise: ['AC & Appliance Repair', 'Electrical & Wiring'],
    location: 'Dhanmondi',
    rating: 4.9,
    totalReviews: 420,
    estimatedPrice: 1000,
    availability: true,
    availableTimeSlots: ['09:00 - 11:00', '11:00 - 01:00', '02:00 - 04:00', '04:00 - 06:00'],
    activeJobs: 1,
    experienceYears: 12,
    warrantyDays: 30,
    vehicle: 'TVS Raider (Dhaka Metro HA-48)',
    bio: 'Lead Master Engineer Mohammad Kabir with 12+ years of field expertise in Inverter AC systems and industrial HVAC circuits.',
  },
  {
    name: 'Apex Home Coolers Hub',
    email: 'apex.coolers@homeease.com',
    phone: '+880 1812-987654',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    serviceExpertise: ['AC & Appliance Repair'],
    location: 'Dhanmondi',
    rating: 4.8,
    totalReviews: 185,
    estimatedPrice: 1150,
    availability: true,
    availableTimeSlots: ['11:00 - 01:00', '02:00 - 04:00', '04:00 - 06:00'],
    activeJobs: 0,
    experienceYears: 8,
    warrantyDays: 15,
    vehicle: 'Honda XBlade (Dhaka Metro LA-22)',
    bio: 'Authorized multi-brand partner equipped with computerized gas leak sniffing equipment and digital manifold meters.',
  },
  {
    name: 'Dhaka Precision Mechanics',
    email: 'dhaka.precision@homeease.com',
    phone: '+880 1913-456789',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    serviceExpertise: ['AC & Appliance Repair', 'Home Carpentry'],
    location: 'Mohammadpur',
    rating: 4.7,
    totalReviews: 310,
    estimatedPrice: 950,
    availability: true,
    availableTimeSlots: ['09:00 - 11:00', '02:00 - 04:00'],
    activeJobs: 2,
    experienceYears: 7,
    warrantyDays: 7,
    vehicle: 'Suzuki Gixxer (Dhaka Metro GA-19)',
    bio: 'Rapid local responder known for punctual doorstep arrivals across Mohammadpur and Dhanmondi.',
  },
  {
    name: 'Farid Plumbing & Sanitary Works',
    email: 'farid.plumbing@homeease.com',
    phone: '+880 1614-789012',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    serviceExpertise: ['Plumbing & Water Lines'],
    location: 'Dhanmondi',
    rating: 4.9,
    totalReviews: 290,
    estimatedPrice: 500,
    availability: true,
    availableTimeSlots: ['09:00 - 11:00', '11:00 - 01:00', '02:00 - 04:00'],
    activeJobs: 0,
    experienceYears: 14,
    warrantyDays: 30,
    vehicle: 'Hero Hunk (Dhaka Metro KA-91)',
    bio: 'Certified hydraulic technician specializing in geyser plumbing, water pumps, sensor taps, and concealed pipeline leaks.',
  },
  {
    name: 'Suman Electrical Solutions',
    email: 'suman.electric@homeease.com',
    phone: '+880 1715-321654',
    profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    serviceExpertise: ['Electrical & Wiring'],
    location: 'Mirpur',
    rating: 4.85,
    totalReviews: 440,
    estimatedPrice: 600,
    availability: true,
    availableTimeSlots: ['09:00 - 11:00', '11:00 - 01:00', '02:00 - 04:00', '04:00 - 06:00'],
    activeJobs: 1,
    experienceYears: 10,
    warrantyDays: 30,
    vehicle: 'Yamaha FZ (Dhaka Metro BA-33)',
    bio: 'Licensed class-A wireman experienced in DB board short-circuit fixes, IPS installations, and smart home automation switches.',
  },
  {
    name: 'CleanZone Bio-Hygiene Tech',
    email: 'cleanzone@homeease.com',
    phone: '+880 1816-654987',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    serviceExpertise: ['Deep Cleaning', 'Pest Control Protocol'],
    location: 'Gulshan',
    rating: 4.92,
    totalReviews: 195,
    estimatedPrice: 1200,
    availability: true,
    availableTimeSlots: ['09:00 - 11:00', '02:00 - 04:00'],
    activeJobs: 0,
    experienceYears: 6,
    warrantyDays: 15,
    vehicle: 'Toyota HiAce Service Van (Metro CHA-11)',
    bio: 'Hospital-grade sanitization crew armed with German Kärcher steamers and certified eco-safe solutions.',
  },
  {
    name: 'Bengal Termite & Pest Shield',
    email: 'bengal.pest@homeease.com',
    phone: '+880 1917-852963',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    serviceExpertise: ['Pest Control Protocol'],
    location: 'Banani',
    rating: 4.8,
    totalReviews: 160,
    estimatedPrice: 1500,
    availability: true,
    availableTimeSlots: ['11:00 - 01:00', '04:00 - 06:00'],
    activeJobs: 0,
    experienceYears: 9,
    warrantyDays: 90,
    vehicle: 'Mahindra Service Pick-up (Metro THA-45)',
    bio: 'Odorless pest eradication specialists offering 90-day anti-cockroach and termite subterranean barriers.',
  },
  {
    name: 'Mirpur Craft Woodworks',
    email: 'mirpur.wood@homeease.com',
    phone: '+880 1618-963741',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    serviceExpertise: ['Home Carpentry'],
    location: 'Mirpur',
    rating: 4.75,
    totalReviews: 215,
    estimatedPrice: 900,
    availability: true,
    availableTimeSlots: ['09:00 - 11:00', '11:00 - 01:00', '02:00 - 04:00'],
    activeJobs: 1,
    experienceYears: 15,
    warrantyDays: 30,
    vehicle: 'Bajaj Pulsar (Dhaka Metro TA-09)',
    bio: 'Master wood artisan handling modular kitchen fittings, door hinges, lock replacements, and custom furniture repairs.',
  },
  {
    name: 'Capital Shift Logistics Fleets',
    email: 'capital.shift@homeease.com',
    phone: '+880 1719-741852',
    profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    serviceExpertise: ['Moving & Shifting'],
    location: 'Uttara',
    rating: 4.88,
    totalReviews: 350,
    estimatedPrice: 3500,
    availability: true,
    availableTimeSlots: ['09:00 - 11:00', '02:00 - 04:00'],
    activeJobs: 1,
    experienceYears: 11,
    warrantyDays: 60,
    vehicle: 'Tata Covered Van Fleet (Metro U-102)',
    bio: 'Full-service insured household & corporate relocation with shock-proof bubble wraps, hydraulic tailgates, and GPS cargo tracking.',
  },
  {
    name: 'AutoGlow Mobile Detailers',
    email: 'autoglow@homeease.com',
    phone: '+880 1820-159357',
    profileImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
    serviceExpertise: ['Car Care & Detailing'],
    location: 'Gulshan',
    rating: 4.82,
    totalReviews: 180,
    estimatedPrice: 750,
    availability: true,
    availableTimeSlots: ['09:00 - 11:00', '11:00 - 01:00', '04:00 - 06:00'],
    activeJobs: 0,
    experienceYears: 5,
    warrantyDays: 7,
    vehicle: 'Suzuki Carry Equipped Mobile Van (Metro MA-77)',
    bio: 'Self-contained doorstep car wash with pressurized water tanks, 3M compound polishing, and 24-point battery health diagnostic checks.',
  },
  {
    name: 'Uttara Premier HomeCare',
    email: 'uttara.care@homeease.com',
    phone: '+880 1921-357951',
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    serviceExpertise: ['AC & Appliance Repair', 'Electrical & Wiring', 'Plumbing & Water Lines'],
    location: 'Uttara',
    rating: 4.79,
    totalReviews: 275,
    estimatedPrice: 1000,
    availability: true,
    availableTimeSlots: ['09:00 - 11:00', '11:00 - 01:00', '02:00 - 04:00', '04:00 - 06:00'],
    activeJobs: 0,
    experienceYears: 9,
    warrantyDays: 30,
    vehicle: 'Honda CB Shine (Dhaka Metro HA-12)',
    bio: 'Multi-skilled swift response team covering Sector 1 through Sector 18 in Uttara with guaranteed 15-minute response times.',
  }
];

const seedDatabase = async () => {
  try {
    console.log('[Seed] Starting database seeding process...');

    // Clear existing collections
    await User.deleteMany();
    await Provider.deleteMany();
    await Service.deleteMany();
    await ServiceRequest.deleteMany();
    await Booking.deleteMany();
    await Notification.deleteMany();
    await Review.deleteMany();

    console.log('[Seed] Cleared existing data.');

    // 1. Insert Services
    const createdServices = await Service.insertMany(servicesData);
    console.log(`[Seed] Seeded ${createdServices.length} service categories.`);

    // 2. Create Demo Customer
    const customerUser = await User.create({
      name: 'Tanvir Ahmed',
      email: 'customer@homeease.com',
      password: 'password123',
      role: 'customer',
      phone: '+880 1712-345678',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      address: 'House 42, Road 7A, Dhanmondi, Dhaka',
    });
    console.log('[Seed] Seeded demo customer: customer@homeease.com / password123');

    // 3. Create Providers & their Users
    const createdProviders = [];
    for (const pData of providersData) {
      const pUser = await User.create({
        name: pData.name,
        email: pData.email,
        password: 'password123',
        role: 'provider',
        phone: pData.phone,
        profileImage: pData.profileImage,
        address: `${pData.location}, Dhaka`,
      });

      const providerDoc = await Provider.create({
        user: pUser._id,
        serviceExpertise: pData.serviceExpertise,
        location: pData.location,
        rating: pData.rating,
        totalReviews: pData.totalReviews,
        estimatedPrice: pData.estimatedPrice,
        availability: pData.availability,
        availableTimeSlots: pData.availableTimeSlots,
        activeJobs: pData.activeJobs,
        experienceYears: pData.experienceYears,
        warrantyDays: pData.warrantyDays,
        vehicle: pData.vehicle,
        bio: pData.bio,
      });

      createdProviders.push(providerDoc);
    }
    console.log(`[Seed] Seeded ${createdProviders.length} service providers.`);

    // 4. Create an active demo Service Request for demonstration
    const topProvider = createdProviders[0]; // Rahim Electronics & HVAC
    const demoRequest = await ServiceRequest.create({
      customer: customerUser._id,
      serviceType: 'AC & Appliance Repair',
      location: 'Dhanmondi',
      addressDetails: 'House 42, Road 7A, Dhanmondi, Dhaka',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '11:00 - 01:00',
      urgencyLevel: 'high',
      problemDescription: 'Inverter AC indoor unit showing Error code E6, cooling completely stopped, mild burning scent.',
      contactPhone: '+880 1712-345678',
      assignedProvider: topProvider._id,
      matchScore: 94.8,
      estimatedPrice: 1000,
      status: 'On The Way',
      statusHistory: [
        {
          status: 'Requested',
          timestamp: new Date(Date.now() - 3600000),
          note: 'Service request initiated via AI SmartMatch.',
        },
        {
          status: 'Accepted',
          timestamp: new Date(Date.now() - 2400000),
          note: 'Accepted by Mohammad Kabir (Rahim Electronics).',
        },
        {
          status: 'On The Way',
          timestamp: new Date(Date.now() - 600000),
          note: 'Specialist dispatched on TVS Raider. Current Corridor: Mirpur Road.',
        },
      ],
    });

    // 5. Create Booking for this demo request
    await Booking.create({
      customer: customerUser._id,
      provider: topProvider._id,
      serviceRequest: demoRequest._id,
      date: new Date().toISOString().split('T')[0],
      timeSlot: '11:00 - 01:00',
      status: 'In Progress',
      totalAmount: 1000,
      escrowStatus: 'Held',
      paymentMethod: 'bKash',
    });

    // 6. Seed Sample Review
    await Review.create({
      customer: customerUser._id,
      provider: topProvider._id,
      serviceRequest: demoRequest._id,
      rating: 5,
      feedback: 'Outstanding technician! Diagnosed the PCB surge capacitor within 10 minutes and replaced with genuine parts. Highly recommended!',
    });

    // 7. Seed Initial Notifications
    await Notification.create({
      user: customerUser._id,
      message: 'Technician Mohammad Kabir from Rahim Electronics is on the way (ETA: 12 minutes).',
      type: 'on_the_way',
      link: `/tracking/${demoRequest._id}`,
      isRead: false,
    });

    await Notification.create({
      user: topProvider.user,
      message: 'Active ticket #JOB-8821 in progress for Apartment 4B, Dhanmondi 27.',
      type: 'in_progress',
      link: '/provider-dashboard',
      isRead: false,
    });

    console.log('[Seed] Database seeding completed successfully!');
    return true;
  } catch (err) {
    console.error('[Seed] Database seeding error:', err);
    throw err;
  }
};

module.exports = { seedDatabase };

if (require.main === module) {
  const { connectDB } = require('../config/db');
  require('dotenv').config();
  connectDB().then(async () => {
    await seedDatabase();
    process.exit(0);
  });
}
