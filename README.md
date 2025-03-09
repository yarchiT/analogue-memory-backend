# Analogue Memory Backend

Backend API for Analogue Memory - a platform for cataloging childhood memories.

## Project Overview

Analogue Memory is a social platform that allows users to catalog, explore, and connect through cultural items from their childhood (1990s-2000s). The platform enables users to build personal "memory libraries" of games, toys, music, movies, and other cherished childhood items, then discover connections with others based on shared experiences across different regions and time periods.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Run the development server:
   ```bash
   npm run dev
   ```

### Scripts

- `npm run dev` - Start the development server with hot-reloading
- `npm run build` - Build the project for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and fix issues
- `npm run format` - Format code with Prettier

## API Endpoints

### Health Check

- `GET /health` - Check if the API is running

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Express middleware
├── models/         # Data models
├── routes/         # API routes
├── utils/          # Utility functions
├── app.ts          # Express app setup
└── index.ts        # Entry point
```

## Technologies

- Node.js
- TypeScript
- Express
- Winston (logging)
- ESLint & Prettier (code quality)
- MongoDB (coming soon)
- JWT Authentication (coming soon) 