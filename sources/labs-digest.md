# Labs 01–03 digest (pasted 2026-10-13; all already submitted and graded)
Use for: the course's exact definitions and how answer keys reason. These are the user's own graded work, so it's fine to review them.

## Definitions as the labs phrase them
- **Coupling**: two elements are coupled if changing one requires changing the other for the system to stay correct. Axes: degree, locality, strength (connascence: Name < Type < Value < Position < Algorithm).
- "How you find out" ladder: compiler fails (explicit) / runtime crash / silently wrong (implicit).
- **Cohesion bindings**: Data (same data sources, or one uses another's output), Logic (same reason: same trigger, same condition, same moment), Order (can't reorder without changing the result).
- **Testability**: Controllability (can a test choose inputs and state?), Observability (can a test see the result and the effects?).

## Answer-key rulings worth remembering
- ConfigStore `store.get("timeout") as number`: **Value** (the key literal), not Type. The cast is an assumption, so it crashes at runtime.
- ShoppingCart `any[]`: **Type**, implicit. Degree "2" hides an unbounded set of callers. `===` on objects compares references.
- EmployeeImporter CSV: **Position**, degree 3 (the external payroll system counts). Fix: look columns up by header name.
- Logic binding is broken by different conditions (inside an `if` vs. outside it, or behind a config flag).
- Data binding holds if both blocks read the same source, even different parts of it (C walks `orders`, D reads `orders.length`).
- Order binding needs one block to *change* something the other reads. Reading the same field is not enough.
- Tier if-chains in three functions: **Value** (repeated string literals). Fix: `Record<Tier, TierBenefits>`. Result: **Type**.
- Free-shipping `75` ×3: Value → extract const → Name. Remaining coupling: both classes re-derive the "is free?" rule (Algorithm).
- InvoicePrinter reaching into `order.customer.address.city`: an address-shape change ripples into 2 classes. Fix: Move Method onto Order.
- Shipment if-chain: the best single change is a lookup table keyed by `PackageType`, so exhaustiveness becomes compiler-checked.
- Decomposed CheckoutB: **higher** observability AND **higher** controllability (each rule can be called with exactly the input you want).
- OrderDesk / LoginService: `new Date()`, a real DB, and a real warehouse hurt controllability. Private fields, a real mailer, and audit files hurt observability.
- LAB03.11 teammate's OrderStatus class: the key marked "improves connascence" TRUE, but the user's essay argued it stays Name. Unresolved; ask a TA.

## Evidence that the exam includes coding
Labs 02–03 required hand-written refactors (extract const, Record lookup table, Move Method) and mocha/chai tests. Expect the same on paper.
