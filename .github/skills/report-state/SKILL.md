---
name: report-state
description: "Guard check to confirm the summary report file exists on disk before ending a failure-analysis session. Use as the final check in step 7 of the orchestration workflow."
---

# Report State Guard

Verify that the summary report has been written to disk before closing the session.

## Procedure

1. Check if `SummaryReports/summary-report.md` exists
2. If it exists, check its last-modified timestamp — confirm it was written during this session
3. **If the file does not exist or is stale** — immediately invoke the `summary-report` skill and write the file before proceeding
4. Confirm to the user: `"Summary report written to SummaryReports/summary-report.md"` — include the file path

## Versioning Check

If `SummaryReports/summary-report.md` already existed from a previous session:
- Confirm a versioned copy was created (e.g. `summary-report-2.md`)
- If not, write the versioned copy now

## Session-End Gate

**This skill is a hard gate.** The session must not end until one of these is true:
- `SummaryReports/summary-report.md` was created this session, OR
- A versioned file (`summary-report-N.md`) was created this session

A chat message summarising the session does NOT satisfy this gate.
