# Project D1 — Drop in a feature (summary)
Source: CPSC 310 project page, pasted 2026-10-08. Due Fri 25 Sep 2026 (already passed). Individual deliverable — do NOT write or review the student's D1 work; use only as background for examples.

- Goal: experience first-hand what it costs to change an existing system.
- Request 1: add optional `campus` field to Buildings across (a) dataset parsing on `POST /api/v2/datasets` (from .htm header), (b) `PUT /api/v2/buildings/:buildingId`, (c) search on `POST /api/v2/search`; tests for each; update `openapi.yml`.
- Request 2: implement aggregation in `POST /api/v2/search` (validation already existed; "one specific method" to implement).
- Design analysis questions: representing "no campus" (omit / null) & PUT-omits-campus behaviour; trace of PUT request route → disk; how each touched class/function was found; reflection on what made the PUT change harder ("what had to agree with what") vs request 2.

Teaching use: "what had to agree with what" = connascence. Request 1 is a scattered change; Request 2 is a localized one. Good anchor for coupling/cohesion lessons.
