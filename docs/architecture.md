# Architecture Notes

## App Shape

- `app/` contains the Next.js App Router entrypoints for marketing, auth, dashboard, and error flows.
- `components/native/` holds feature-level UI such as navigation, cards, and book-focused widgets.
- `components/ui/` contains lower-level reusable UI primitives.
- `lib/content/` stores content and copy used by the marketing surface.
- `utils/supabase/` contains browser, server, and request-session helpers for Supabase integration.
- `supabase/` contains local Supabase project configuration and seed data.

## Near-Term Areas To Document

- Authentication flow and route protection
- Book domain model and persistence design
- Dashboard data-fetching strategy
- Deployment and environment model
