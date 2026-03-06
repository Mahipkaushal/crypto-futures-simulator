# FutureTrade24 - Crypto Futures Simulator

A professional-grade crypto futures trading simulator built with NestJS, Next.js, and TradingView Advanced Charts.

## 🚀 Overview

FutureTrade24 is a high-performance trading dashboard that allows users to simulate futures trading with real-time market data from Binance. It features:
- **Advanced Charting**: Integrated TradingView Real-Time Charts with custom interval controls.
- **Real-time Order Book**: Live bid/ask data synchronized with global markets.
- **Order Management**: Support for Market and Limit orders with leverage (up to 125x).
- **Interactive UI**: Responsive, viewport-locked layout with independent scrolling panels.
- **Performance Tracking**: Real-time PnL and ROE% calculations.

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), Tailwind CSS, Zustand, React Query, Firebase Auth.
- **Backend**: NestJS, Prisma (PostgreSQL), Socket.io, Firebase Admin.
- **Database**: PostgreSQL with Prisma ORM.
- **Real-time Data**: Binance WebSocket API.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)
- [PostgreSQL](https://www.postgresql.org/) (running locally or via Docker)

## ⚙️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mahipkaushal/crypto-futures-simulator.git
   cd crypto-futures-simulator
   ```

2. **Install dependencies**:
   Install all dependencies for the entire monorepo from the root:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create `.env` files in the respective package directories.

   **Backend (`packages/backend/.env`)**:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/futuretrade24"
   FIREBASE_PROJECT_ID="your-project-id"
   FIREBASE_CLIENT_EMAIL="your-client-email"
   FIREBASE_PRIVATE_KEY="your-private-key"
   ```

   **Frontend (`packages/frontend/.env.local`)**:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:3001"
   NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
   ```

4. **Initialize Database**:
   ```bash
   cd packages/backend
   npx prisma db push
   npx prisma generate
   ```

## 🏃‍♂️ Running the Project

You can start the entire project (Frontend + Backend) from the root directory:

### Development Mode
Runs both the NestJS server and Next.js dev server concurrently:
```bash
npm run dev
```

### Individual Packages
- **Start Backend only**: `npm run dev:backend`
- **Start Frontend only**: `npm run dev:frontend`

## 🏗 Build & Production

To build the project for production:
```bash
npm run build
```

To start the production servers:
- **Backend**: `cd packages/backend && npm run start:prod`
- **Frontend**: `cd packages/frontend && npm start`

## 📄 License

UNLICENSED
