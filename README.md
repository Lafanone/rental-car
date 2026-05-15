# RentalCar

A web application for browsing and renting cars. Users can explore a catalog of available vehicles, filter by brand, price, and mileage, view detailed information about each car, and submit a booking request — all in a clean, user-friendly interface.

## Features

- **Home page** with a hero banner and a call-to-action leading to the catalog
- **Catalog page** with server-side filtering (brand, price, mileage range) and "Load More" pagination
- **Car detail page** with full specifications, rental conditions, accessories, and a booking form
- **Booking form** that submits data to the backend API with success/error notifications
- **Favorites** — mark cars you like with a heart icon

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Data fetching:** TanStack Query (`useInfiniteQuery` for pagination)
- **HTTP client:** Axios
- **Styling:** CSS Modules
- **Icons:** React Icons
- **Notifications:** React Hot Toast
- **Fonts:** Manrope (via `next/font/google`)

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

```bash
git clone https://github.com/Lafanone/rental-car.git
cd rental-car
npm install
```

### Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── api/          # Axios instance & API functions
├── app/          # Next.js App Router pages & layouts
│   ├── catalog/  # Catalog list & car detail pages
│   └── ...
├── components/   # Reusable UI components (Header, CarCard, Filters, RentalForm)
├── providers/    # React Query & Toaster providers
└── types/        # TypeScript interfaces
```

## Author

Developed as a practical project for the GoIT Full-Stack Developer course.
