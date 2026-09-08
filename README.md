# HomeEase – Smart Home Service Automation & AI Dispatch Platform

[![GitHub Repo](https://img.shields.io/badge/GitHub-Source_Code-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Raiyan-19/Smart-Home-Service-Automation)
[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-22c55e?style=for-the-badge&logo=vercel&logoColor=white)](https://raiyan-19.github.io/Smart-Home-Service-Automation/)

> **Autonomous Smart Living Telemetry & Micro-Dispatch Architecture**  
> Built for Dhaka Residences (Dhanmondi, Gulshan, Banani, Mirpur, Uttara, Mohammadpur)  
> Full MERN Stack Implementation with WebGL Cybernetic Ambient Shader & Weighted Smart Matching

🌐 **Live Demo:** [https://raiyan-19.github.io/Smart-Home-Service-Automation/](https://raiyan-19.github.io/Smart-Home-Service-Automation/)

---

## 🌟 Project Overview

**HomeEase** is a production-style Smart Home Service Automation platform engineered to connect residential households with verified, certified service engineers in under 15 minutes. 

Based on the custom **Stitch Ambient Cybernetic UI/UX Design**, HomeEase blends high-tech minimalism, glassmorphism, OLED-depth visual stratification, and real-time telemetry diagnostics.

---

## ⚡ Tech Stack

- **Frontend:**
  - React.js 18 & Vite
  - Tailwind CSS (Configured with the exact Stitch Ambient Cybernetic color tokens and typography)
  - React Router DOM v6
  - Framer Motion & Lucide React
  - Interactive WebGL Procedural Shader (`CyberShaderCanvas`)
  - Google Fonts: Space Grotesk, Manrope, JetBrains Mono
- **Backend:**
  - Node.js & Express.js RESTful API
  - MongoDB & Mongoose (with automated in-memory MongoDB fallback for zero-friction local execution)
  - JWT Authentication & bcrypt password hashing
  - Role-Based Access Control (Customer vs Service Provider)

---

## 🧠 Smart Provider Matching Algorithm

HomeEase's signature feature is an automated, multi-factor weighted matching algorithm:

$$\text{Match Score} = (\text{Service Expertise} \times 30\%) + (\text{Availability} \times 25\%) + (\text{Rating} \times 20\%) + (\text{Proximity} \times 15\%) + (\text{Price} \times 10\%)$$

- **Emergency Escalation:** For Tier-1 SOS requests (gas leaks, sparking circuit breakers, burst pipes), distance and real-time availability weights are boosted to 30% each.
- **Top 3 Ranking:** Returns the top 3 best-suited providers with transparent match breakdown scores, estimated ETA, distance in km across Dhaka neighborhoods, and human-readable recommendation reasons.
- **Double Booking Prevention:** Validates technician time slot conflicts to guarantee zero double bookings.
- **Cascade Reassignment:** If a specialist declines a ticket, HomeEase immediately re-ranks and reroutes the ticket to the next optimal provider.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### 1. Backend Setup
```bash
cd backend
npm install
npm run seed     # Pre-populates 10+ Dhaka specialists, categories, and test accounts
npm run dev      # Starts Express API at http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev      # Starts Vite client at http://localhost:5173
```

---

## 🔑 Demo Credentials

| Role | Email | Password | Zone / Notes |
| :--- | :--- | :--- | :--- |
| **Customer** | `customer@homeease.com` | `password123` | Dhanmondi, Dhaka |
| **Service Provider** | `provider@homeease.com` | `password123` | Lead Tech: Mohammad Kabir (Rahim Electronics) |

*(Convenient 1-Click Demo Login buttons are also integrated directly into the login page!)*

---

## 📡 Complete Demo Flow

1. **Customer Login:** Log in with `customer@homeease.com` or click "Demo Customer".
2. **Select Service:** Click "AC & Appliance Repair" or choose from the 9 service catalog domains.
3. **Configure Request:** Select zone (e.g. Dhanmondi), choose date and time slot (e.g. 11:00 - 01:00), select urgency (Standard, High, or SOS Emergency), describe the problem.
4. **SmartMatch Scanning:** Watch the neural telemetry scanner calculate scores across active providers. Top 3 specialists are presented with match percentages and criteria scores.
5. **Selection / Auto-Assign:** Click "Auto Assign Best Provider" or manually choose a specialist.
6. **Booking Confirmation:** Escrow payment is held securely in reserve, generating a tracking ticket ID.
7. **Provider Perspective:** Switch to Provider (`provider@homeease.com`). View incoming request in Provider Dashboard. Click "Accept Ticket".
8. **Live Dispatch Progression:** Progress through:
   `Requested` → `Accepted` → `On The Way` → `In Progress` → `Completed`.
9. **Mission Control Telemetry:** Watch the 5-stage radar tracker, live fluctuating speed (30-42 km/h), encrypted VoIP call/chat triggers, and satellite GPS coordinates.
10. **Review & Escrow Settlement:** Once complete, customer submits a 1-5 star rating and feedback, automatically recalculating the provider's running average.
