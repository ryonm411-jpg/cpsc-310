# Notes

- Today when workspace started: 2026-10-08. Midterm 2026-10-29. Week 6 ends 2026-10-15.
- User pasted D1 spec + reader chapters (Intro, Change Difficulty, Refactoring, Design Patterns) without yet answering the mission questions (current confidence, time/week, goal, practice style). Ask again.
- Use the course's terminology exactly (reader's connascence list: Name, Type, Value, Position, Algorithm; bindings: Data, Logic, Order).
- Exam style is "read unfamiliar code → say what's wrong → justify the change + cost". Every lesson should end with a free-response item the user sends back for TA-style marking.
- Integrity: D1/D2 are solo; labs are graded. Use project as context only; write my own fresh examples.
- Planned sequence (pending schedule): 1 connascence ✔ built → 2 cohesion bindings → 3 cost of change (need chapter) → 4 refactoring → 5 design principles (need chapter) → 6 testability & test doubles (need) → 7 blackbox testing (need) → 8 design patterns via the 4-step process (if in scope) → interleaved mock-midterm.

## 2026-10-13: Labs 01–03 reviewed (digest: sources/labs-digest.md)
- Confirmed: the exam includes hand-written code (labs required refactors and mocha/chai tests).
- Weak spots: Value vs Type/Algorithm tie-breaks; Logic binding broken by conditions; Data = same source; CheckoutB controllability; fallback `?? 0` and `Record<string,…>` defeat exhaustiveness; hand-written syntax errors (commas, `this`, redeclared const); **skipped every "Justify" box** (biggest risk).
- Built lesson 0002-where-marks-leak.html targeting these. Next: lesson 3 = test doubles (04a), motivated by LAB03.9/10.
- CPSC 313 PDFs (Y86 pipelining) also sit in this folder; the user hasn't said whether to cover them.
