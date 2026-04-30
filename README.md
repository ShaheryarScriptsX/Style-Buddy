# Style Buddy

Style Buddy is a smart beauty booking marketplace that connects salons, studios, beauty professionals, and wellness businesses with customers nearby.

The goal is to build a production-ready React Native mobile app with a Node.js backend that can later be published on the Google Play Store and expanded into a full beauty services platform.

## Product Vision

Style Buddy helps beauty vendors grow online by giving them a professional digital profile, online booking system, service catalog, promotional tools, reviews, and direct customer contact options.

The platform should serve:

- Beauty salons
- Hair studios
- Makeup artists
- Bridal studios
- Nail bars
- Skin clinics
- Spa and wellness centers

## Core Value

For customers:

- Discover salons and beauty professionals near them.
- Compare services, prices, photos, reviews, and offers.
- Book appointments quickly.
- Contact vendors through phone or WhatsApp.
- Navigate to the salon using map integration.

For vendors:

- Increase client bookings.
- Build a professional online presence.
- Get featured by city, category, and offers.
- Manage services, prices, photos, appointments, and promotions.
- Receive reviews and ratings.

## Main Features

### Customer App

- Account registration and login.
- Browse salons, studios, and beauty professionals.
- Search by city, area, category, service, price, rating, and availability.
- View vendor profile pages.
- View services with prices and duration.
- View photo galleries.
- Book appointments.
- View upcoming and past bookings.
- Submit reviews and ratings.
- Save favorite vendors.
- Open direct call and WhatsApp actions.
- Open salon location in Google Maps.
- View offers, discounts, bridal packages, Ramadan deals, and seasonal promotions.

### Vendor Features

- Vendor registration request.
- Business profile management.
- Logo and gallery image uploads.
- Address, city, area, contact, and social link management.
- Service and price listing.
- Appointment management.
- Offer and discount management.
- Review visibility.
- Basic business analytics in future versions.

### Admin Features

- Approve or reject vendor registrations.
- Manage cities, areas, categories, vendors, customers, services, offers, and bookings.
- Feature selected vendors in a city.
- Moderate reviews and uploaded content.
- Monitor platform activity.

## Vendor Registration Data

Each vendor profile should collect:

- Salon logo in HD PNG or JPG.
- Complete business name.
- Full address with area and city.
- Contact number, preferably WhatsApp.
- Gmail or official email address.
- Instagram link.
- Facebook page link.
- Website link, if available.
- Services list with prices.
- 5 to 10 salon, interior, service, or work photos.

## Recommended Architecture

Use a monorepo so the mobile app, backend, shared types, and documentation stay together.

```text
style-buddy/
  apps/
    mobile/              React Native app
    api/                 Node.js backend API
    admin/               Web admin dashboard
  packages/
    shared/              Shared constants, validation schemas, and API contracts
    config/              Shared linting and formatting config
  docs/
    product/             Product decisions, feature specs, user flows
    architecture/        Technical architecture and API decisions
  README.md
```

For the current repository, we can start with this README and then create the app folders when implementation begins.

## Technology Plan

### Mobile App

- React Native with JavaScript.
- Expo is recommended for faster development and easier Play Store builds.
- React Navigation for app navigation.
- TanStack Query for API data fetching and caching.
- Zustand or Redux Toolkit for small global state needs.
- React Hook Form with Zod for forms and validation.
- Secure storage for auth tokens.
- Google Maps integration for location and navigation.
- Deep links for phone, WhatsApp, social media, and map actions.

### Backend API

- Node.js with JavaScript.
- NestJS is recommended for a scalable backend structure.
- PostgreSQL for relational business data.
- Prisma ORM for schema management and database access.
- JWT authentication with refresh token support.
- Role-based access control for customer, vendor, and admin users.
- Cloud image storage for logos and gallery photos.
- API validation using DTOs and Zod or class-validator.
- Swagger/OpenAPI documentation for API contracts.

### Future Admin Dashboard

- Next.js with JavaScript.
- Admin authentication.
- Vendor approval workflow.
- City, area, category, offer, and review management.
- Booking and platform monitoring.

## High-Level System Design

```text
React Native App
  |
  | HTTPS / REST API
  v
Node.js API
  |
  | Prisma ORM
  v
PostgreSQL Database
  |
  +-- Image Storage
  +-- Email/SMS/WhatsApp integrations
  +-- Google Maps integration
```

## Main Backend Modules

- Auth module: signup, login, logout, refresh token, forgot password.
- Users module: customer, vendor owner, and admin accounts.
- Vendors module: salon profiles, status, contact details, location, social links.
- Services module: vendor service categories, prices, duration, descriptions.
- Bookings module: appointment creation, status updates, booking history.
- Reviews module: ratings, comments, moderation.
- Offers module: promotions, discounts, seasonal packages.
- Media module: logo and gallery uploads.
- Locations module: cities, areas, coordinates, map data.
- Admin module: approvals, moderation, featured vendors, platform management.

## Suggested Database Models

- User
- Role
- CustomerProfile
- VendorProfile
- VendorPhoto
- VendorService
- ServiceCategory
- Booking
- Review
- Offer
- City
- Area
- FavoriteVendor
- Notification

## API Style

Use REST endpoints first because they are simple, stable, and easy to integrate with a mobile app.

Example endpoint groups:

```text
POST   /auth/register
POST   /auth/login
POST   /auth/refresh

GET    /vendors
GET    /vendors/:id
POST   /vendors
PATCH  /vendors/:id

GET    /vendors/:id/services
POST   /vendors/:id/services
PATCH  /services/:id
DELETE /services/:id

POST   /bookings
GET    /bookings/me
PATCH  /bookings/:id/status

POST   /reviews
GET    /vendors/:id/reviews

GET    /offers
POST   /offers
PATCH  /offers/:id
```

## Mobile App Screen Plan

### Public Screens

- Splash screen
- Onboarding screens
- Login
- Signup
- Forgot password

### Customer Screens

- Home
- Search
- Category listing
- Vendor listing
- Vendor detail profile
- Service selection
- Booking date and time
- Booking confirmation
- My bookings
- Favorites
- Offers
- Profile settings

### Vendor Screens

- Vendor dashboard
- Edit business profile
- Manage services
- Manage gallery
- Manage bookings
- Manage offers
- Reviews

### Admin Screens

Admin screens can be built later in a web dashboard instead of the mobile app.

## Coding Standards

- Use JavaScript everywhere unless the project decision changes later.
- Prefer clear folder boundaries by feature/module.
- Keep business logic out of UI components.
- Use shared validation schemas where possible.
- Use typed API responses and request payloads.
- Use environment variables for secrets and environment-specific configuration.
- Never commit `.env` files or private credentials.
- Keep components small and reusable.
- Use consistent naming:
  - Components: `PascalCase`
  - Hooks: `useSomething`
  - Files: `kebab-case.js` or `PascalCase.js` depending on local convention
  - Database models: `PascalCase`
- Add tests for critical backend logic and booking workflows.
- Run linting, formatting, and tests before release builds.

## Security Requirements

- Passwords must be hashed with bcrypt or Argon2.
- Use JWT access tokens with refresh tokens.
- Validate all API inputs.
- Add role-based authorization.
- Restrict vendor profile updates to the vendor owner or admin.
- Restrict admin actions to admin users only.
- Validate uploaded image type and size.
- Rate limit sensitive endpoints like login and password reset.
- Keep API keys and database credentials in environment variables.

## Release Roadmap

### Phase 1: Foundation

- Finalize app name, branding, colors, and logo.
- Create monorepo structure.
- Set up React Native app.
- Set up Node.js API.
- Set up PostgreSQL and Prisma.
- Add linting and formatting configuration.

### Phase 2: MVP Backend

- Auth system.
- User roles.
- Vendor profile CRUD.
- Services and prices.
- Gallery uploads.
- City and area data.
- Basic vendor search.

### Phase 3: MVP Mobile App

- Customer authentication.
- Home and search.
- Vendor listing.
- Vendor profile page.
- Service display.
- Call, WhatsApp, social links, and map actions.

### Phase 4: Booking System

- Appointment booking.
- Booking status management.
- Customer booking history.
- Vendor booking dashboard.
- Booking notifications.

### Phase 5: Trust and Promotion

- Reviews and ratings.
- Offers and discounts.
- Featured vendors by city.
- Admin moderation.

### Phase 6: Admin Dashboard

- Vendor approval panel.
- Vendor and customer management.
- Review moderation.
- Offer management.
- Booking visibility.

### Phase 7: Play Store Release

- App icon and splash screen.
- Privacy policy.
- Terms and conditions.
- Production API deployment.
- Production database.
- Crash reporting and analytics.
- Android release build.
- Play Store listing assets.

## Initial MVP Scope

The first working version should focus on:

- Customer signup and login.
- Vendor listing by city and category.
- Vendor profile page.
- Services and prices.
- Gallery photos.
- Direct call and WhatsApp.
- Google Maps location open.
- Basic booking request.
- Admin ability to approve vendors.

Avoid adding payments in the first MVP unless required. Payments can be introduced after the booking flow is stable.

## Important Product Decisions To Confirm

- Will customers pay inside the app, or only book and pay at the salon?
- Will vendors manage their own profiles from the mobile app, web dashboard, or both?
- Will appointment slots be real-time availability or simple booking requests at first?
- Which launch city should be supported first?
- Should Style Buddy support only women-focused beauty businesses or all beauty and wellness businesses?
- Should vendor onboarding be manual by admin first, or fully self-service?

## Current Status

Project idea, architecture, monorepo boundaries, and supporting docs have been structured.

Local JavaScript authentication has been started:

- `apps/api` contains an Express auth API with register, login, forgot password, and profile endpoints.
- `apps/mobile` contains Expo React Native auth screens for login, signup, forgot password, and a local home screen.

Next recommended step: add vendor profile APIs and mobile vendor discovery screens.
