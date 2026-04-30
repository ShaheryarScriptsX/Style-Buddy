# Shared Package

This package will hold code that can be safely shared between the mobile app, API, and future admin dashboard.

## Suggested Contents

```text
packages/shared/
  src/
    constants/
    enums/
    schemas/
    types/
    utils/
```

## Examples

- User role enums
- Booking status enums
- Vendor status enums
- API request and response types
- Zod validation schemas
- Shared category constants

## Rule

Only place code here when at least two apps need it. App-specific logic should stay inside that app.
