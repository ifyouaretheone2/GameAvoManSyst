## ADDED Requirements

### Requirement: Admin promotes user to administrator

The system SHALL provide an authenticated API that upgrades an existing account from role `user` to role `admin` when the caller is an administrator.

#### Scenario: Admin promotes eligible user

- **WHEN** an authenticated user with role `admin` requests promotion for an existing account that currently has role `user`
- **THEN** the system updates that account to role `admin` and returns success

#### Scenario: Non-admin cannot promote

- **WHEN** an authenticated user with role `user` calls the promotion endpoint
- **THEN** the system SHALL deny access with a forbidden error and SHALL NOT change any role

#### Scenario: Unauthenticated caller rejected

- **WHEN** a client calls the promotion endpoint without a valid token
- **THEN** the system SHALL respond with unauthorized and SHALL NOT change any role

#### Scenario: Promote non-existent or already admin account

- **WHEN** the target id does not exist, is soft-deleted, or already has role `admin`
- **THEN** the system SHALL return a client error without partial state changes
