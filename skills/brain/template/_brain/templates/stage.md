```md
---
status: pending
fixes: []
---
# Phase NN: Feature Name

> Depends on: Phase X (what it provides), Phase Y (what it provides)
> Unlocks: Phase A (why it needs this), Phase B (why it needs this)

## Scope

### In Scope

- Bullet list of everything this phase delivers
- Be specific: name the files, components, endpoints, and behaviors
- Each bullet should be a discrete, verifiable deliverable

### Out of Scope

- Features that a reader might expect but are intentionally deferred
- Reference which future phase picks them up (e.g., "Phase 12 adds audit logging")
- Decisions that are explicitly left out (e.g., "no bulk operations")

## Files

### New Files

| File                                         | Purpose                                     |
| -------------------------------------------- | ------------------------------------------- |
| `src/lib/server/feature.ts`                  | Core logic: exported functions and types     |
| `src/routes/(admin)/feature/+page.svelte`    | UI for the feature                           |
| `src/routes/(admin)/feature/+page.server.ts` | Server load function and form actions        |

### Modified Files

| File                  | Changes                                  |
| --------------------- | ---------------------------------------- |
| `src/hooks.server.ts` | Import and initialize feature on startup |

## Interfaces & Contracts

### Exports (downstream phases depend on these)

```typescript
// ─── src/lib/server/feature.ts ───────────────────────────

/**
 * Document the function signature, parameters, and return type.
 * Downstream phases import these — changing them is a breaking change.
 */
export function doSomething(input: InputType): ReturnType;

// ─── Component Props ─────────────────────────────────────

// src/lib/components/FeatureWidget.svelte
//
// Props:
//   items: Item[]              — data to display
//   selected: string | null    — bound value (two-way via bind:selected)
//   disabled?: boolean         — disable interaction
//
// Events:
//   onchange?: (id: string) => void  — fires on selection change (Svelte 5 callback prop)
```

### Imports (from upstream phases)

```typescript
// List imports from upstream phases that this phase depends on
```

## Detailed Requirements

### 1. Section Name

Describe the requirement in detail. Include:

- The URL or route path
- Server load function behavior (what it queries, what it returns)
- Form action behavior (validation, mutations, redirects)
- UI layout and components used (reference DaisyUI component names)

Inline code blocks for key logic:

```typescript
function exampleLogic(input: string): boolean {
	// Show the exact algorithm or priority chain
	return input.length > 0;
}
```

### 2. Another Section

Use tables for mappings and rules:

| State      | Action A | Action B | Action C |
| ---------- | -------- | -------- | -------- |
| `draft`    | Yes      | No       | Yes      |
| `active`   | No       | Yes      | Yes      |
| `archived` | No       | No       | No       |

### 3. UI Section (`+page.svelte`)

Describe the page layout:

- Component hierarchy and DaisyUI components used
- Conditional rendering rules (what shows/hides based on state)
- Formatting helpers (currency, dates, relative time)
- Empty states and loading states
- Mobile/responsive behavior

## Acceptance Criteria

- [ ] Criterion written as a verifiable statement
- [ ] Each maps to something testable — a behavior, a query result, a UI state
- [ ] Cover happy path, edge cases, and error states
- [ ] `pnpm check` passes with zero errors
- [ ] Auth/guard requirements (e.g., "requires admin role")

## Tests

| Test File                                 | Type        | Covers                                                                                              |
| ----------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `src/lib/server/feature.test.ts`          | Unit        | Core logic: valid inputs, edge cases, error conditions                                              |
| `src/routes/(admin)/feature/page.test.ts` | Integration | Load function returns expected data shapes; form actions validate and mutate correctly; 404 handling |
```

Status values: `pending` | `done`
