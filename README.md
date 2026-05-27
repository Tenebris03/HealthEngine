# HealthEngine


HealthEngine is a comprehensive health and nutrition tracking platform that helps users set nutrition goals, track progress, and compete with others through a gamified leaderboard system.

## 🚀 Project Overview

HealthEngine is built with a modern full-stack architecture, featuring:
- **Frontend**: React + TypeScript + Vite with a feature-driven architecture
- **Backend**: NestJS for scalable server-side applications
- **Design**: Modern UI with glassmorphism effects, glowing animations, and responsive design

##  Development Roadmap

### ✅ Phase 1: Foundations & UI Skeleton (Completed)
- Base Project Setup (React Vite, Nest.js, Linter, CI)
- Home Page Implemented
- Progress Page (Mocked)

### 🎯 Phase 2: UI Expansion & Architecture (Up Next)
- Build Goals Page (UI)
- Build Leaderboard Page (UI)
- Set up Front-end State (TanStack Query/RTK Query)
- Configure Environment Management (.env setup)

###  Phase 3: Data Layer & Containerization (In Queue)
- Spin up PostgreSQL Docker Container
- Configure ORM Integration (Prisma/TypeORM)
- Create Database Migrations & Schemas

###  Phase 4: Authentication & User Management (In Queue)
- Implement Google & GitHub OAuth Login
- Manage JWT Sessions & Tokens
- Create Front-end Protected Routes

###  Phase 5: Core Health Features & APIs (In Queue)
- Integrate OpenFoodFacts API Service (Barcode/Search)
- Create Meal Logging CRUD (Persist Data to Postgres)
- Implement Leaderboard & Aggregation Logic

**Architecture Tip**: Route OpenFoodFacts API requests through Nest.js for security and data optimization.

## ️ Project Structure

```
HealthEngine/
── frontend/              # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/   # Shared UI components (Header, Footer, Layout)
│   │   ├── features/     # Feature-driven modules
│   │   │   ├── hero/    # Hero section with animations
│   │   │   ├── key-features/  # Key features showcase
│   │   │   └── progress/  # Progress tracking with rings
│   │   ├── pages/        # Page components
│   │   └── assets/       # Static assets
│   └── public/           # Public static files
└── backend/              # NestJS API server
    └── src/             # Backend source code
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules with modern design patterns
- **State Management**: (Planned: TanStack Query / RTK Query)
- **Animations**: GSAP + ScrollTrigger for scroll-based animations
- **UI Features**: Glassmorphism, glowing effects, responsive design

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL (planned)
- **ORM**: Prisma or TypeORM (planned)
- **Authentication**: JWT + OAuth (Google & GitHub) (planned)

### Infrastructure
- **Containerization**: Docker (planned)
- **CI/CD**: Configured linter and CI pipeline

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/HealthEngine.git
cd HealthEngine
```

2. Install root dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Install backend dependencies:
```bash
cd backend
npm install
```

### Development

#### Run Frontend
```bash
cd frontend
npm run dev
```

#### Run Backend
```bash
cd backend
npm run start:dev
```

## 📖 Documentation

- [Frontend README](frontend/README.md) - Frontend-specific setup and configuration
- [Backend README](backend/README.md) - Backend-specific setup and configuration
- [Agent Guidelines](frontend/agent/) - Development conventions and rules

## 🎨 Design Features

- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Glowing Effects**: Animated borders and text with neon glow
- **Responsive**: Mobile-first design with fluid typography
- **Accessibility**: Reduced motion support and high-contrast focus states
- **Animations**: Scroll-triggered animations with GSAP

## 📝 License

This project is licensed under the MIT License.

##  Contributing

Contributions are welcome! Please follow the established coding conventions and feature-driven architecture patterns.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for scalable health applications.
