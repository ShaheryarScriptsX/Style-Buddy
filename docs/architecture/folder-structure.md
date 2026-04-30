# Folder Structure

Style Buddy uses a monorepo architecture so the mobile app, backend API, admin dashboard, shared types, and documentation live together.

```text
style-buddy/
  apps/
    mobile/              React Native app for customers and vendors
    api/                 Node.js backend API
    admin/               Web admin dashboard
  packages/
    shared/              Shared constants, schemas, enums, and API contracts
    config/              Shared linting and formatting config
  docs/
    architecture/        Technical decisions and system design
    product/             Product plans, MVP scope, user flows
```

## Responsibility Boundaries

`apps/mobile` owns all mobile UI, navigation, device integrations, and mobile-specific state.

`apps/api` owns business rules, persistence, authentication, authorization, and integrations with storage or third-party services.

`apps/admin` will own internal operations screens for approving vendors, moderating reviews, and managing platform data.

`packages/shared` owns constants, API contracts, and validation rules that must remain consistent between apps.

`packages/config` owns tooling configuration only.

`docs` owns planning and technical decisions that should survive across IDE sessions.
