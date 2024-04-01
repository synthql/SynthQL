# Getting started

First, make sure you have node, yarn and docker installed.

```bash
# Install dependencies
yarn install

# Run this once to setup, and run the local PG database.
# This is a precondition for running tests
./setup-db.bash

# Run tests, typecheck, format, etc.
# Make sure you setup tests correctly. See the "how to run tests" section below.
yarn ci
```

## Notes for contributors

### Priorities
- Prioritize Luminovo features over everything else until we get to v1.0.0. This means we don't really care about 
other databases (e.g. MySQL), or extensibility/configuration scenarios outside of what Luminovo needs.
- Loss of focus is the enemy. Laser-sharp focus is your friend.

### On security
- Security is a critically important job. A serious security bug can kill this project.

### On query builder
- Query builder should map very closely to SQL. If you know SQL you should know `synthql`.
- Query builder should allow for arbitrarily complex SQL expressions.
- Sane defaults everywhere. Convention over configuration.

### On custom executors
- Custom executors should feel like native citicens, not weird foreign entities.

### On documentation
- Documentation is just as important as code. Users won't use what they can't understand.
- Provide lot's of examples. Developers are used to copying code. Good examples enable them to quickly get going.