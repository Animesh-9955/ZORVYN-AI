# ZORVYN AI — Intelligence Reimagined

[![Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20Node.js%20%7C%20Express%20%7C%20TailwindCSS-8B5CF6)](https://github.com/)
[![Security](https://img.shields.io/badge/Security-Helmet%20%7C%20Rate--Limit%20%7C%20CORS-6366F1)](https://github.com/)
[![Status](https://img.shields.io/badge/Status-Active%20Development-10B981)](https://github.com/)

**ZORVYN AI** is an advanced, original AI assistant platform engineered with a futuristic **Neural Console** visual identity. Built from the ground up to depart from cookie-cutter chatbot interfaces, ZORVYN delivers a high-performance, glassmorphic conversational workspace with deep atmospheric aesthetics and an enterprise-grade backend foundation.

---

## 🌌 Brand Identity & Visual Language

- **Brand Name:** ZORVYN
- **Tagline:** *Intelligence Reimagined*
- **Atmospheric Depth:** Deep obsidian void (`#080B16`) and abyssal surface (`#111629`)
- **Luminescent Gradients:** Electric violet (`#8B5CF6`), plasma purple (`#A855F7`), and cyber indigo (`#6366F1`)
- **Interaction Model:** Orbital command console with floating glass composer, cognitive insight cards, and telemetry chips

---

## 🏛️ Project Architecture

```
AI-CHATBOT/ (zorvyn-ai/)
│
├── client/                         # Frontend Application (React + Vite)
│   ├── public/
│   │   └── zorvyn-icon.svg         # Geometric Prismatic Z Brand Emblem
│   ├── src/
│   │   ├── components/
│   │   │   ├── brand/              # ZorvynLogo, ZorvynOrb
│   │   │   ├── layout/             # Sidebar, Header, MobileNav, SettingsModal
│   │   │   ├── home/               # WelcomeHero, SuggestionCards
│   │   │   ├── chat/               # MessageItem, InsightCard, CodeBlock, TypingIndicator
│   │   │   └── composer/           # MessageComposer (Floating Glass Nexus)
│   │   ├── context/
│   │   │   └── ChatContext.jsx     # Conversational state, history, and search
│   │   ├── data/
│   │   │   └── mockData.js         # Curated starter prompts & demo sessions
│   │   ├── styles/
│   │   │   └── index.css           # Glassmorphism, glow tokens, custom scrollbars
│   │   ├── App.jsx                 # Main application view & workspace layout
│   │   └── main.jsx                # Application root mount
│   ├── index.html                  # HTML entry with Plus Jakarta Sans & JetBrains Mono
│   ├── postcss.config.js           # PostCSS configuration
│   ├── tailwind.config.js          # Custom ZORVYN color tokens & glow utilities
│   ├── vite.config.js              # Vite server & bundler configuration
│   └── package.json                # Frontend dependencies & scripts
│
├── server/                         # Backend Application (Node.js + Express)
│   ├── src/
│   │   ├── config/
│   │   │   └── env.js              # Centralized environment validation & configuration
│   │   ├── controllers/
│   │   │   ├── healthController.js # GET /api/health implementation
│   │   │   └── chatController.js   # POST /api/chat & GET /api/chat/history
│   │   ├── middleware/
│   │   │   ├── errorHandler.js     # Centralized error handler + 404 router
│   │   │   ├── rateLimiter.js      # Global (100 req/15m) & Chat (30 req/15m) limiters
│   │   │   └── validateRequest.js  # Strict request payload validator
│   │   ├── routes/
│   │   │   ├── index.js            # Aggregated /api router
│   │   │   ├── healthRoutes.js     # Health check route
│   │   │   └── chatRoutes.js       # Chat & session history routes
│   │   ├── services/
│   │   │   └── chatService.js      # Session repository & AI pipeline engine
│   │   ├── utils/
│   │   │   ├── apiResponse.js      # Standardized JSON response helpers
│   │   │   └── logger.js           # Timestamped structured logger
│   │   └── server.js               # Express server entry point (Helmet, CORS, Routes)
│   ├── .env                        # Local environment variables
│   ├── .env.example                # Safe environment variable template
│   ├── .gitignore                  # Backend ignore rules
│   └── package.json                # Backend dependencies & scripts
│
├── .gitignore                      # Monorepo ignore rules
└── README.md                       # Comprehensive documentation
```

---

## ⚡ Tech Stack

| Layer | Technology | Key Highlights |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite | Fast HMR, lightweight bundle size |
| **Styling** | Tailwind CSS | Custom futuristic tokens, glow filters, glassmorphic panels |
| **Icons & UI** | Lucide React, Framer Motion | Crisp vectors, kinetic spring transitions, micro-interactions |
| **Backend** | Node.js, Express.js (ESM) | Modular REST architecture, zero key exposure |
| **Security** | Helmet, CORS, Rate-Limit | Strict CSP, XSS protection, anti-abuse throttling |
| **AI Engine** | Google Gemini API *(Upcoming)* | Streaming token synthesis via secure backend gateway |
| **Database** | PostgreSQL *(Future Phase)* | Abstracted storage layer ready for seamless database migration |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on `v26.7.0`)
- **npm** v9+ (tested on `11.19.0`)

### 2. Backend Setup (`server/`)
```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Start development server with file watching
npm run dev
```
The backend initializes at **`http://localhost:5001`**.

#### Verify Backend Endpoints
```bash
# Health check
curl http://localhost:5001/api/health

# Test chat endpoint (Development Pipeline Mode)
curl -X POST http://localhost:5001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello ZORVYN, explain neural architecture"}'

# Fetch session history
curl http://localhost:5001/api/chat/history
```

### 3. Frontend Setup (`client/`)
```bash
# Open a new terminal and navigate to the client directory
cd client

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
The frontend starts at **`http://localhost:5173`**.

---

## 🔒 Security & Architecture Principles

- **Zero Client-Side Keys:** Frontend components never interact directly with external AI provider APIs. All requests flow through the backend gateway.
- **Request Sanitization & Validation:** Middleware verifies non-empty payloads, maximum character bounds (4000 chars), and JSON formatting prior to processing.
- **Dual Throttling:** Strict rate limiting protects both general API routes and high-cost AI execution pipelines.
- **Centralized Error Handling:** Standardized error contracts (`VALIDATION_ERROR`, `RESOURCE_NOT_FOUND`, `INVALID_JSON_BODY`) without exposing sensitive server stack traces in production.

---

## 🗺️ Roadmap & Phases

- [x] **Phase 1:** Planning, Visual Identity Specification & Brand Design
- [x] **Phase 2 (Part A):** Secure Express Backend Architecture, Middleware & API Testing
- [x] **Phase 2 (Part B):** Futuristic Frontend UI, Command Nexus, Glassmorphism & State Management
- [x] **Phase 4:** Real Google Gemini API Streaming Integration (`@google/genai`, SSE, `gemini-3.8-flash`)
- [ ] **Phase 5:** Persistent PostgreSQL Session Storage with Drizzle / Prisma ORM
- [ ] **Phase 6:** Multi-Modal File Attachments & Audio Voice Nexus

---

## 📄 License
MIT © ZORVYN AI — Intelligence Reimagined.


Deployed on Render.


<!-- Deployment trigger commit -->
