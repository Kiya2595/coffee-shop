# Coffee Shop E-Commerce Platform

An online ordering and shopping platform for a coffee shop. Customers can browse the menu, place orders, track status, and leave reviews—all from one beautiful website.

## Project Overview

Complete online presence for a coffee shop:
- ☕ Browse coffee, pastries, and snacks
- 🛒 Add items to cart and checkout
- � Track order status in real-time
- ⭐ Leave product reviews and ratings
- 👤 Create accounts and view order history
- � Admin dashboard for managing menu, inventory, and orders

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Structure:** Monorepo (frontend + backend)

## Project Structure

```
cafe-finder/
├── client/              # React frontend (Vite)
├── server/              # Express backend
├── package.json         # Root package
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository
2. Install root dependencies: `npm install`
3. Install server dependencies: `cd server && npm install`
4. Install client dependencies: `cd client && npm install`
5. Set up database:
   - Create PostgreSQL database named `cafe_finder`
   - Run schema: `psql -U postgres cafe_finder < server/src/db/schema.sql`
   - Seed sample data: `node server/src/db/seed.js`
6. Create `.env` file in server folder (copy from `.env.example`)

### Development

Start both frontend and backend in development mode:
```bash
npm run dev
```

Or run separately:
```bash
npm run dev:server   # Terminal 1
npm run dev:client   # Terminal 2
```

### Building

```bash
npm run build
```

## Development Roadmap

- [x] Step 1: Foundation & Project Setup
- [x] Step 2: Menu & Product Listing
- [x] Step 3: Shopping Cart & Checkout
- [ ] Step 4: User System & Authentication
- [ ] Step 5: Orders & Order Tracking
- [ ] Step 6: Reviews & Ratings
- [ ] Step 7: Admin Dashboard
- [ ] Step 8: Payment Integration & Inventory

## License

MIT
