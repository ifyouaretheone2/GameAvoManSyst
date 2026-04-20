## ADDED Requirements

### Requirement: Public user registration

The system SHALL expose an unauthenticated HTTP endpoint that creates a new account with role `user` when valid registration data is submitted.

#### Scenario: Successful registration

- **WHEN** a client sends a valid registration payload (at minimum unique username and password meeting server validation rules)
- **THEN** the system persists a new account with hashed password and role `user`, and responds with success without issuing an administrative session by default

#### Scenario: Duplicate username rejected

- **WHEN** a client submits a username that already exists for a non-deleted account
- **THEN** the system SHALL reject the request with a client error and SHALL NOT create a duplicate account

#### Scenario: Invalid payload rejected

- **WHEN** a client omits required fields or violates validation rules
- **THEN** the system SHALL reject the request with a client error and SHALL NOT create an account
