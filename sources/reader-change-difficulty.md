# Course Reader — Change Difficulty (coupling, cohesion)
Source: CPSC 310 course reader, Software Construction › Analytical Code Design › Change Difficulty. Pasted by the user 2026-10-08. "Design Symptoms" section was empty in the paste.

## Coupling
Coupling = strength of connections between program elements. Strong coupling hurts evolvability/maintainability because:
- errors propagate to unrelated parts
- a single fix/feature gets scattered across the codebase
- tightly coupled code is hard to reuse independently
- coupled elements can't be understood in isolation

Measured along three attributes:
- **Degree**: how many connections there are between the groups
- **Locality**: how far away the groups are from each other
- **Strength (Connascence)**: how strong the bonds are

| Connascence | Two things must agree on | Example |
|---|---|---|
| Name | What something is called | `findUserById` renamed → all uses change |
| Type | The shape of the data | Add a required field → all callers must supply it |
| Value | A specific literal | `"pending"` hard-coded in validation, reporting, UI; rename to `"in-review"` must change everywhere. Magic numbers are a special case. |
| Position | Argument order | `createInvoice(customerId, startDate, endDate, total, tax)`; a caller swaps total/tax → compiles, tests may pass, wrong values |
| Algorithm | A computation done the same way | One class encrypts with an algorithm → consumers must decode with same algorithm |

(Course order, weakest → strongest, as listed: Name, Type, Value, Position, Algorithm.)

Example:
```ts
function mysteriousOperation(x: number, y: number) { return x - y; }
function inverseOperation(x: number, y: number) { return mysteriousOperation(x, y); }
```
Connascence of **Position**: caller must supply x, y in order. If callee changed to `y - x`, caller must swap args.
- It is **implicit** — compiler won't catch it (both numbers); fails silently at runtime.
- Name connascence also present, but the **strongest** connascence (Position) is the most significant one.

### Risks & difficulties
- Risk: missing a necessary update to coupled code; especially dangerous when coupling is **implicit** (e.g. magic value used across codebase).
- Difficulty grows with **degree** and **locality**: e.g. method called in 20 places → signature change means visit 20 places, read, decide, edit.

### Addressing coupling
Some coupling is always needed; goal is loose, not zero.
- Minimize **degree** (number of interfaces shared)
- Minimize **locality** distance (e.g. extract shared code into a common library)
- Minimize **connascence** (e.g. Algorithm → Type: coupled code only needs to adhere to a type, not reimplement an algorithm)

## Cohesion
How focused program elements are on a single complete task (think classes in OO). Low cohesion → many competing concerns; fixing one defect may break something that was "by design" for another feature. Cohesive classes: small set of private fields used by most public methods. A field used by only a few methods may signal non-cohesive functionality. Cohesion → more, smaller classes (harder to find, easier to understand).

Measured between pairs of groupings (lines, blocks, methods) via **bindings**:

| Binding | Example | Explanation |
|---|---|---|
| Data | `const subtotal = price * quantity; const total = subtotal + tax;` | line 2 uses data from line 1 |
| Logic | `if (user.isAdmin) { grantAccess(); } else { denyAccess(); raiseAlarm() }` | denyAccess and raiseAlarm grouped by the same logic |
| Order | `const total = subtotal + tax; if (total > 100) ...` | total must be computed first |

### Risks & difficulties
- Risk: edits affecting seemingly unrelated code (method does 5 tasks, you edit 1).
- Difficulty: must read lots of code to find where to change.

Example:
```ts
function f(x: number) {
    let y = 0;                 // (1)
    if (x > 100) {             // (2)
        y += 5;                // (3)
        console.log("woohoo"); // (4)
    }
    return y;                  // (5)
}
```
Lines 1 & 2: Data no (1 uses y, 2 uses x). Logic yes (both run whenever f is called). Order no. Lines 1 & 3 DO have an order binding.
Exercise for home: each pair of lines → which bindings.
