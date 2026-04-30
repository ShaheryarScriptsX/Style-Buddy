# Backend Modules

The backend should be built as independent modules with clear responsibilities.

## Auth

- Register customer accounts.
- Login users.
- Refresh access tokens.
- Handle password reset.
- Protect routes with JWT guards.

## Users

- Store base account data.
- Support customer, vendor owner, and admin roles.
- Track account status.

## Vendors

- Store salon and professional profiles.
- Manage business name, logo, contact, address, city, area, social links, and approval status.
- Support featured vendors by city.

## Services

- Store service names, prices, duration, descriptions, and categories.
- Scope services to a vendor.

## Bookings

- Create customer booking requests.
- Track booking status.
- Show customer booking history.
- Show vendor booking queue.

## Reviews

- Store rating and comment data.
- Restrict reviews to customers.
- Support moderation by admin.

## Offers

- Store seasonal promotions, bridal packages, Ramadan deals, and discounts.
- Scope offers to vendors and cities.

## Media

- Handle logo uploads.
- Handle vendor gallery uploads.
- Validate file type and file size.

## Locations

- Store supported cities and areas.
- Store optional coordinates for map search.

## Admin

- Approve vendors.
- Moderate reviews and media.
- Manage featured vendors.
- Manage platform reference data.
