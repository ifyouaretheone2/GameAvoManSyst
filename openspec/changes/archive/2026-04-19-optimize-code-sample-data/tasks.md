## 1. Schema alignment and safety

- [x] 1.1 Locate or infer authoritative table/column definitions for `character`, `news`, `gameplay`, `product` (existing SQL, migrations, or live dev DB) and record any constraints needed for seed keys (primary keys, uniques).
- [x] 1.2 Implement production guard in the new seed script (`NODE_ENV === 'production'` exit unless explicit override env var documented in `QUICKSTART.md`).

## 2. Sample data seeding

- [x] 2.1 Add `scripts/seedSampleData.js` (or equivalent) using `mysql2` pool from `config/database.js`, inserting a small fixed set of rows per table aligned with existing controller INSERT column lists.
- [x] 2.2 Make the seed idempotent per `sample-data-seeding` spec (upsert, fixed ID band, or delete-by-marker scoped to sample rows only).
- [x] 2.3 Add `npm run seed` in root `package.json` pointing at the script; document order: env → schema → `initAdmin` → `seed` in `QUICKSTART.md`.

## 3. Backend code quality (scoped)

- [x] 3.1 Audit list handlers in `controllers/characterController.js`, `controllers/newsController.js`, `controllers/gameplayController.js`, `controllers/productController.js` for pagination/query params; route invalid input through `middleware/validation.js` or shared helpers with consistent `utils/response.js` error shapes.
- [x] 3.2 For the same read paths, ensure errors are logged (e.g. `utils/logger.js` if present) and client responses omit raw DB stack text while preserving successful JSON shapes for the Vue frontend.
- [x] 3.3 Smoke-test: `npm run dev`, run seed on dev DB, hit public list endpoints and one detail route per entity; confirm non-empty data and no 500s on invalid page params alone.

## 4. Wrap-up

- [x] 4.1 Re-run `openspec status --change "optimize-code-sample-data"` and confirm all artifacts complete before archive/apply workflow.
