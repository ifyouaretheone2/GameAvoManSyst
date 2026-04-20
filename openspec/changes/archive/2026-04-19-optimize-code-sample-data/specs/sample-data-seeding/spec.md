## ADDED Requirements

### Requirement: Development seed entrypoint

The system MUST provide a documented, script-based way to populate a development MySQL database with representative rows for core public content tables (at minimum: characters, news, gameplay, products), using the same database configuration mechanism as the existing server (`dotenv` + pool settings).

#### Scenario: Successful seed on empty dev database

- **WHEN** a developer runs the approved seed command against a configured dev database with valid schema
- **THEN** the script completes without error and public list endpoints return non-empty sample payloads for each covered entity type

### Requirement: Idempotent or safely repeatable seed

The seed procedure MUST be repeatable without creating unbounded duplicate rows: either by upsert semantics, fixed primary key ranges reserved for samples, or explicit documented cleanup limited to sample rows.

#### Scenario: Second run does not duplicate sample keys

- **WHEN** the developer runs the seed command twice in succession on the same database
- **THEN** the database does not accumulate duplicate sample rows for the same logical sample entities (same stable identifiers or upsert keys)

### Requirement: Production guard

The seed entrypoint MUST refuse to execute when the runtime indicates production unless an explicit override environment variable documented as dangerous is set.

#### Scenario: Default refusal in production

- **WHEN** `NODE_ENV` is `production` and the dangerous override is not set
- **THEN** the seed script exits non-zero before mutating data and prints a clear message
