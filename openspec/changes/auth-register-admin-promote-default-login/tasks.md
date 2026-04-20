## 1. Database and model

- [x] 1.1 Add `role` column to the account table (`admin`) with allowed values `admin` and `user`, default `user` for new rows
- [x] 1.2 Backfill existing rows to `role = 'admin'` and verify constraints in dev/staging

## 2. Backend authentication and authorization

- [x] 2.1 Extend login query and JWT payload to include `role`; ensure passwords are compared for both roles
- [x] 2.2 Implement `POST` registration handler with validation, bcrypt hashing, default `user` role, duplicate username handling
- [x] 2.3 Add `requireAdmin` middleware and apply it to all administrative mutating routes that must not be callable by `user`
- [x] 2.4 Implement promotion endpoint (admin-only) that upgrades `user` → `admin` with idempotent or clear error responses per spec

## 3. Frontend routing and auth UX

- [x] 3.1 Relocate public `Home` to `/home` (or chosen path) and set `/` to redirect unauthenticated users to `/login`
- [x] 3.2 Update `router.beforeEach` for role-aware redirects (admin vs user) consistent with `auth-default-route-login` spec
- [x] 3.3 Add registration view and link from login; wire to registration API and success feedback
- [x] 3.4 Extend Pinia `user` store and `api` module for `role`, registration, and promotion calls

## 4. Admin UI for promotion

- [x] 4.1 Add minimal admin screen or section listing non-admin accounts with a “Promote to admin” action calling the promotion API
- [x] 4.2 Handle errors (already admin, not found, forbidden) with user-visible messages

## 5. Verification and docs

- [x] 5.1 Manually verify scenarios in `auth-user-registration`, `auth-default-route-login`, and `admin-role-promotion` specs
- [x] 5.2 Document new env flags (if any), route **BREAKING** change for `/` vs `/home`, and default admin seed behavior in project README or QUICKSTART as appropriate
