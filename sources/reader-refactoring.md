# Course Reader — Refactoring
Source: CPSC 310 course reader, Analytical Code Design › Refactoring. Pasted 2026-10-08.

- **Refactoring**: restructuring source to alleviate shortcomings and ease future development **without changing semantics** (no new features, no bug fixes). Consolidates duplication, reduces coupling, improves cohesion/understandability. Mechanism for handling **emergent design**.
- **Technical debt**: quick solutions are sometimes right, but accrue debt in maintainability. Triggers for refactoring:
  1. adding a feature is much harder than expected
  2. a bug fix that should be cohesive requires scattered changes
  3. code review of a simple change shows complex, hard-to-understand changes
- **Rule of three**: 1st time do it simply; 2nd time duplicate (and wince); 3rd time refactor. Avoids preemptive refactoring ("just-in-time abstraction").

## Process
1. Identify the property to improve + transformations needed
2. Run test suite (green before)
3. Perform refactoring
4. Run full suite again; behaviour must be the same

## Downsides
- All risk, no reward from customer's view
- Impairs existing developers' mental models; new abstraction layers can make code harder to understand
- Costs developer time
- Easy to get carried away (refactoring campaign; cf. second-system effect)

## Kinds (Fowler)
Rename; Move; Extract class/interface/method; Push down/pull up field/method; Replace magic number/string with constant; Replace inheritance with delegation.

## Examples
- `Invoice.printOwing()` printed banner + computed owing + logged → **Extract Method** `getOwing()`. Motivation = **cohesion**: computing owing only belongs with printing owing, not the banner.
- `RoomsParser.parseRooms` / `CourseProcessor.processCourses` → **Extract Interface** `IParser { parse(id, zip): boolean }`, add return type, **Rename** CourseProcessor→CourseParser. Motivation = **coupling**: clients now bound by connascence of **Type** to `IParser` instead of each parser's code.
- "Each refactor is motivated by and affects cohesion, coupling, or both."
