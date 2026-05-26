# Dependency Upgrades

## 2026-05-26 Upgrade Baseline

This repository was refreshed to current package releases, with two deliberate compatibility exceptions:

- `eslint` and `@eslint/js` were pinned to the latest `9.x` line because several plugins in this stack do not yet declare support for `eslint@10`.
- `tailwindcss` was pinned to the latest `3.x` line because a full `Tailwind 4` migration would require a broader CSS and config rewrite than this maintenance pass.

## Upgraded Areas

- Next.js moved to `16.x`.
- React and React DOM moved to `19.x`.
- Supabase client packages moved to their latest `2.x` and `0.x` releases.
- Radix UI, Jest, Testing Library, Prettier, and supporting developer tooling were refreshed.

## Upgrade Adjustments Applied

- The old `middleware.ts` entrypoint was replaced with `proxy.ts` to match the newer Next.js convention.
- The production build now uses `next build --webpack` because the default Turbopack build path was unstable in this environment during the upgrade.
- The app no longer depends on a runtime Google Fonts fetch for its primary sans-serif font, which keeps builds deterministic in restricted environments.
- Server-side Supabase helpers now await `cookies()` and client creation to match the newer Next.js request API shape.

## Follow-Up Checks After Future Upgrades

- Build the app with `pnpm build`.
- Run linting with `pnpm lint`.
- Run tests with `pnpm test --runInBand`.
- Update this page with compatibility pins, migrations, or known caveats introduced by the upgrade.
