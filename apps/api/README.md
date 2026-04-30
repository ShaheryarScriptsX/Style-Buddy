# API App

This folder contains the Style Buddy local Node.js backend API.

## Recommended Stack

- Node.js with JavaScript
- Express for the first local API
- PostgreSQL for relational data
- Prisma for database schema and queries later
- JWT authentication with refresh tokens
- Swagger/OpenAPI for API documentation later

## Current Local Auth API

Run from the repository root:

```bash
npm run dev:api
```

Local URL:

```text
http://localhost:4000
```

Available endpoints:

```text
GET  /health
POST /auth/register
POST /auth/login
POST /auth/forgot-password
GET  /auth/me
```

Create or reset the local admin user:

```bash
npm run seed:admin -w @style-buddy/api
```

Default local admin credentials:

```text
admin@stylebuddy.com
Admin@12345
```

Override them with `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME` when running the seed script.

The first version stores local users in `apps/api/data/users.json`. This file is ignored by git and can be replaced with PostgreSQL and Prisma before deployment.

## Suggested Structure

```text
apps/api/
  src/
    main.js
    app.js
    common/              Guards, decorators, filters, interceptors
    config/              Environment and app configuration
    modules/
      auth/
      users/
      vendors/
      services/
      bookings/
      reviews/
      offers/
      media/
      locations/
      admin/
```

## Main Modules

- Auth: registration, login, token refresh, password reset
- Users: customer, vendor owner, and admin users
- Vendors: salon profiles, status, contact data, location, social links
- Services: service names, prices, duration, and category
- Bookings: appointment requests and status changes
- Reviews: customer ratings and comments
- Offers: promotions and seasonal discounts
- Media: logo and gallery uploads
- Locations: cities, areas, and coordinates
- Admin: approvals, moderation, featured vendors

## Rule

Keep every module responsible for its own controller, service, DTOs, and tests. Shared cross-cutting logic belongs in `common/`.
