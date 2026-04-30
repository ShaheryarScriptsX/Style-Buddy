# Admin Dashboard

This folder contains the Style Buddy admin web dashboard.

## Stack

- Vite with React and JavaScript
- Role-protected admin authentication
- Local JSON-backed API integration for the first admin version

## Run Locally

From the repository root:

```bash
npm run dev:admin
```

The admin app expects the API at `http://localhost:4000` by default. Override it with:

```bash
VITE_API_URL=http://localhost:4000
```

Default local admin credentials:

```text
admin@stylebuddy.com
Admin@12345
```

## Main Admin Areas

- Vendor registration approvals
- Vendor profile management
- Customer management
- City, area, and category management
- Booking visibility
- Offer management
- Review moderation
- Featured vendor controls
