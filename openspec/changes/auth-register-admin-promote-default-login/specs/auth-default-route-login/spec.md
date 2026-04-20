## ADDED Requirements

### Requirement: Root path defaults to login experience

The SPA router SHALL configure the application root path so that an unauthenticated visitor lands on the login experience as the initial page.

#### Scenario: Unauthenticated visit to root

- **WHEN** a user opens the site at `/` without a valid session
- **THEN** the application SHALL present the login route (via redirect or equivalent) as the first meaningful screen

#### Scenario: Authenticated admin visits login route

- **WHEN** a user with role `admin` navigates to the login route while already authenticated
- **THEN** the application SHALL redirect the user away from login to the admin dashboard (or equivalent admin home)

#### Scenario: Public marketing home remains reachable

- **WHEN** a user navigates to the relocated public home path defined by this change (e.g. `/home`)
- **THEN** the application SHALL render the public home content without requiring administrator privileges
