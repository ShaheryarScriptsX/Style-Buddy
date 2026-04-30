# System Overview

Style Buddy is a beauty marketplace with three main surfaces:

- Mobile app for customers and vendors.
- Backend API for authentication, data, bookings, reviews, and business rules.
- Admin dashboard for platform operations.

## Runtime Architecture

```text
React Native Mobile App
  |
  | HTTPS REST API
  v
Node.js API
  |
  | Prisma ORM
  v
PostgreSQL Database
  |
  +-- Image Storage
  +-- Notification Provider
  +-- Google Maps
```

## Data Flow

1. Customers browse vendors from the mobile app.
2. The mobile app requests vendor, service, offer, and review data from the API.
3. The API validates the request, applies permissions, and reads from PostgreSQL.
4. Customers submit booking requests through the API.
5. Vendors or admins manage booking status.
6. Reviews, offers, gallery photos, and profile updates are moderated when needed.

## First Production Shape

The first production release should keep the system simple:

- REST API instead of GraphQL.
- PostgreSQL as the main database.
- External image storage for logos and gallery photos.
- Booking requests first, advanced real-time scheduling later.
- No in-app payments until the booking flow is stable.
