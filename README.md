Astrograph
==========

Stellar GraphQL interface.

# Installation

`go get https://github.com/mobius-network/astrograph`

# Usage

`astrograph --database-url=postgres://localhost/core?sslmode=disable`

# TODO

2. Data fields in account results + watch
3. Abstraction over dataloader
3. Fast rewind to last ledger
4. Filter updates by request (do not query accounts which are not currently observed and/or not passed to ctx)
5. Monitor account deletion.
6. Proper error handling
7. Remove SQL from ingest
