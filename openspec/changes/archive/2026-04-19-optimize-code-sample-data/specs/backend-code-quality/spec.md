## ADDED Requirements

### Requirement: Consistent list pagination validation

List endpoints that accept pagination parameters MUST validate and normalize `page` and `pageSize` (or project-equivalent names) so invalid input yields a stable 4xx client error shape consistent with existing `utils/response.js` conventions, without changing successful response field names consumed by the current frontend.

#### Scenario: Invalid page rejected

- **WHEN** a client requests a list endpoint with a non-positive or non-numeric `page` value
- **THEN** the API responds with an appropriate client error code and message and does not return a 500 for that input alone

### Requirement: Stable error handling on read paths

Read-oriented controller paths touched during this change MUST not leak raw database driver stack traces in JSON responses in normal operation; errors MUST be logged server-side and surfaced to clients with a generic message unless the project already defines specific error codes for that case.

#### Scenario: Database failure on list

- **WHEN** a list query fails due to a database error
- **THEN** the HTTP status reflects server error semantics used elsewhere in the app and the response body does not include the raw SQL driver exception text

### Requirement: No breaking public API contracts

For endpoints exercised by the shipped frontend in this repository, successful response shapes (top-level JSON fields and array element shapes) MUST remain backward compatible unless explicitly marked **BREAKING** in the change proposal.

#### Scenario: Frontend list pages still parse responses

- **WHEN** the frontend loads list pages for characters, news, gameplay, and products against the seeded dev API
- **THEN** no change in this work causes client-side parsing errors for previously supported fields
