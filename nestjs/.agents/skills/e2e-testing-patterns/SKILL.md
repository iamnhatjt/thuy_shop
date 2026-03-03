---
name: nestjs-e2e-test
version: 1.0.0
type: skill
description: >
  Defines best practices and execution rules for writing production-grade
  end-to-end (E2E) tests for NestJS + MySQL backend systems. This skill ensures
  deterministic, maintainable, and business-focused E2E test coverage.
---

# NestJS E2E Test Skill

## Purpose

This skill standardizes how E2E tests are written for backend systems to ensure
they validate **real business workflows**, not internal implementation details.

E2E tests written with this skill must behave as real users interacting with the
system through public APIs and real infrastructure.

---

## Scope

This skill applies to:

- NestJS backend services
- MySQL-backed persistence layers
- JWT-based authentication systems
- Workflow-heavy business domains (approval, order, payment, etc.)

---

## Core Principles

- Treat the system as a **black box**
- Test **business reality**, not code structure
- Prefer stability and clarity over speed
- Fail only when business behavior is broken

---

## Mandatory Rules

### What E2E Tests MUST Do

- Use real HTTP requests
- Use real authentication flows
- Use a real MySQL database
- Execute full end-to-end business workflows
- Validate externally observable outcomes

### What E2E Tests MUST NOT Do

- Mock repositories or services
- Call private or internal methods
- Depend on execution order
- Share database state between tests
- Assert UI groupings (boxes, tabs, screens)

---

## Database Rules

### Environment

- Use a dedicated E2E database
- Never reuse dev or production databases
- Reset database state between tests

### DB Access Policy

| Action                        | Allowed |
| ----------------------------- | ------- |
| DB write for test setup       | Yes     |
| DB read for test setup        | Yes     |
| DB read for assertions        | Avoid   |
| DB write to simulate behavior | No      |

Database access is allowed **only** to establish preconditions.

---

## Test Structure Standard

- One business workflow per `describe`
- One responsibility per `it`
- Tests must be readable as business documentation

### Recommended Structure

describe('Business Workflow', () => {
it('allows valid action');
it('blocks invalid action');
it('requires follow-up confirmation');
});

Avoid large, monolithic test cases.

---

## Workflow Testing Pattern

All E2E tests must follow this sequence:

1. **Arrange**
   - Create users
   - Establish roles, permissions, delegations
2. **Act**
   - Call public HTTP endpoints
3. **Assert**
   - Verify observable system behavior
4. **Stabilize**
   - Ensure system reaches a final, consistent state

---

## Authentication Handling

Authentication is infrastructure, not business logic.

- Use shared auth helpers
- Always obtain tokens through real login endpoints
- Never manually construct or fake tokens

---

## Assertion Guidelines

### Preferred Assertions

- Status codes
- Response payloads
- Available actions
- Resource state via public APIs

### Avoid

- Box-based assertions
- UI-driven assumptions
- Internal flags not exposed via API

Assert **capabilities**, not **presentation**.

---

## Execution Strategy

### Default

- E2E tests run **sequentially**
- Jest must use `--runInBand`

### Parallel Execution

Parallel execution is allowed only if:

- Database-per-worker isolation exists
- Migrations are isolated per worker
- Tests are proven stateless

Stability always takes precedence over speed.

---

## Size and Complexity Limits

| Constraint           | Limit |
| -------------------- | ----- |
| Lines per `it` block | ≤ 50  |
| HTTP calls per `it`  | ≤ 5   |
| Critical workflows   | Few   |

If a test becomes slow, reduce scope instead of parallelizing.

---

## Anti-Patterns (Disallowed)

- Mocking services in E2E tests
- Writing business logic inside test helpers
- Hard-coded identifiers
- Shared state between test files
- Single mega-test covering multiple workflows

Violations result in test rejection.

---

## Test Classification

E2E tests should be categorized as:

- `critical` – core business workflows, deployment blocking
- `standard` – normal module coverage
- `regression` – bug reproduction

Critical tests must never be skipped.

---

## Definition of Done

A backend feature is considered complete only when:

- A primary business flow is covered by E2E
- Authorization is validated
- Failure cases are tested
- Tests are deterministic and repeatable
- Test names describe business behavior clearly

---

## Mental Model

> Unit tests protect code  
> E2E tests protect the business

If an E2E test fails, a real user would be affected.

---

## End of Skill
