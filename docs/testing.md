# Testing Guide

## Current Test Stack

- Jest runs unit and component tests.
- Testing Library provides DOM and React assertions.
- The current suite covers the homepage and navigation components.

## Current Gaps

- No build-time smoke test in CI
- Limited coverage around auth flows and dashboard routes
- No integration coverage for Supabase-backed behavior

## Maintenance Notes

- Prefer serial runs with `pnpm test --runInBand` when diagnosing config changes.
- If Next.js or Jest major versions change, revalidate `jest.config.ts` because `next/jest` integration is version-sensitive.
