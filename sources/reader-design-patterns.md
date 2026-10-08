# Course Reader — Design Patterns
Source: CPSC 310 course reader, Software Design › Design Patterns. Pasted 2026-10-08. (Unknown yet whether this is in midterm scope — check schedule.)

Pattern = common usage of language tools to solve structural problems. Purpose is NOT to classify code but to equip you with ways to structure it. Each interacts with coupling, cohesion, testability.

## 4-step Design Pattern Process
1. **Change**: what part of the code is likely to vary over time?
2. **Pain**: what impedes those changes? Usually **scattered change** (unnecessary coupling) or **tangling** of concepts (lack of cohesion).
3. **Mechanism**: what's shared vs different; what interface unifies them (abstraction / polymorphism).
4. **Cost**: is the fix worth it vs. pain now and future frequency?

## Interface patterns
- **Adapter**: wrapper holding a field of the wrapped type, exposing methods that fit our design; translates params and returns. Without it: scattered changes per media type, connascence of type or algorithm, client tangled with business + parsing logic. With it: connascence of type; main gain is **degree** (one interface instead of one per source).
- **Factory**: creation encapsulated; clients depend on abstraction (supports open/closed). Without: `Bank` coupled to every concrete Account, if/else on institutionType; hurts testability (violates dependency inversion; hard to stub). Simple factory drawback: every new Account modifies the shared factory. **Abstract Factory**: client depends on `AccountFactory` interface; only relevant factories change.
- **Strategy**: encapsulate algorithms behind interface. Replaces if/else on `tempScheme` (scattered changes, connascence of **algorithm**) → connascence of **type**; improves cohesion (caller chooses strategy); testability: test each strategy alone + one integration test with a FakeStrategy (controllability/observability).

## Delegation patterns
- **State**: state object reference, state objects decide their own transitions and call `setState`. Without: big if/else in parent → low cohesion, tangling, scattered changes for cross-cutting additions (connascence of algorithm). With: better cohesion, shared behaviour via inheritance; testability: each State class tested starting in that state (controllability).
- **Decorator**: add responsibilities to *objects* at runtime by wrapping (`new Nav(new AutoBrake(new BaseCar()))`). Avoids subclass explosion (7 subclasses for 3 features). Downsides: can't control wrapper order, wrappers can't interact, many small classes, breaks object identity/instanceof. Composition over inheritance.
- **Composite**: treat groups same as individuals (`Manager` is an `Employee` holding a list of `Employee`). `getBudget()` recursion. Without: duplicated traversal logic, scattered changes, connascence of algorithm. With: connascence of type.
