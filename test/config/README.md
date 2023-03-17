# Testing Readme

All E2E tests are repeated across five modes (configured as Jest 'environments'):

- **API**: run the test against the JS API
- **CLI**: run the test against the CLI
- **Web**: run the test against the browser UI
- **Consistency check**: ensure tidy results are the same for JS, CLI, and Browser
- **Idempotence check**: repeats the tidy operation on its result to ensure bibtex-tidy output is stable

We assume that each E2E test runs tidy exactly once. This is not always the case, but it's good enough.

Consistency and idempotence modes require the results of running tidy in the JS, CLI, and browser modes. However, because Jest runs tests in multiple workers (each a separate process), we cannot simply store the tidy results in some common variable. We also have no guarantee that one mode will run before the other.

Instead, we start a server to store the cache, accessed via sockets. The diagram below shows how the consistency check works (the idempotence check works the same way). The web, CLI, and API environments are configured to send tidy results to the cache server via ZeroMQ sockets. The consistency and idempotency checks request the result of each test (listening for the result if the test hasn't happened yet).

```
                          ┌──────────────────┐       ─┐
                          │   CACHE SERVER   │        │ Jest main
                          └────────────┬─────┘       ─┘ process.
                              ▲      ▲ │
                        Cache │      │ │             ─┐
                        tidy  │      │ │              │ ZeroMQ
                        input/│      │ │Request       │ sockets.
                        output│      │ │tidy input/  ─┘
                              │      │ │output for
 ┌────────┐        ┌───────┐  │      │ │test.        ─┐
 │E2E TEST├─┐  ┌──►│WEB ENV├──┤      │ │              │
 └────────┘ │  │   └───────┘  │      │ │Waits for     │
            │  │              │      │ │test to       │
 ┌────────┐ │  │   ┌───────┐  │      │ │run in        │ Jest workers.
 │E2E TEST├─┼──┼──►│CLI ENV├──┤      │ │envs.         │ Tests executed
 └────────┘ │  │   └───────┘  │      │ │              │ in multiple
            │  │              │      │ │              │ processes.
 ┌────────┐ │  │   ┌───────┐  │      │ │              │
 │E2E TEST├─┘  ├──►│API ENV├──┘      │ ▼              │
 └────────┘    │   └───────┘      ┌──┴──────────┐     │
               │                  │ CONSISTENCY │     │
               └─────────────────►│    CHECK    │     │
                                  └─────────────┘    ─┘
```
