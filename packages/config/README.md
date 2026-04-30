# Config Package

This package is reserved for shared development configuration.

## Suggested Contents

```text
packages/config/
  eslint/
  prettier/
```

## Purpose

- Keep linting rules consistent across apps.
- Share formatting configuration.
- Reduce duplicated setup as the monorepo grows.

## Rule

Do not add runtime application logic here. This package is only for tooling and project configuration.
