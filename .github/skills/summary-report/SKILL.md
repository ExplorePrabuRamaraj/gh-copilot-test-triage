---
name: summary-report
description: "Generate a detailed failure analysis summary report. Use when: creating summary-report.md, documenting test fixes, generating effort savings analysis, producing iteration summaries, writing failure analysis documentation."
---

# Summary Report Generation

Generate a comprehensive summary document at `SummaryReports/summary-report.md` after all failure analysis iterations are complete.

## When to Use

- After all test fix iterations complete (all tests pass or MAX_ITERATIONS reached)
- When the user aborts the session early ("stop" / "abort") — generate a partial report
- When the user requests a summary of the failure analysis work performed
- When documenting fixes applied to test files

## Procedure

1. Collect all iteration data (test results, fixes applied, timestamps)
2. Generate the summary document following the [report template](./references/report-template.md)
3. Write to `SummaryReports/summary-report.md` (if exists, create with versioning)

## Generation Rules

1. **Always generate** the summary document after the final iteration, regardless of pass/fail outcome. Apply the correct outcome label based on how the session ended:

   | Session Outcome | Report Label | Required Content |
   |----------------|-------------|------------------|
   | All tests pass | ✅ Complete | Full triage details + all fixes applied + iteration results |
   | MAX_ITERATIONS reached, failures remain | ⚠️ Partial | All of the above + unresolved failures with root cause + recommended next steps |
   | User aborted early | 🛑 Aborted | Work completed so far + what was not attempted + known unresolved failures |

2. **Use actual data** — never placeholder values. All times, counts, and test IDs must reflect the real execution
3. **Create with versioning** — if the file already exists, create a new version instead of overwriting (`summary-report-2.md`, `summary-report-3.md`, etc.)
4. **Track timestamps** internally during each phase to populate the Timeline section accurately
5. **Calculate effort savings** based on the actual number of tests, failures, and iterations — not fixed estimates
6. **Write the file to disk** — a chat summary message does NOT satisfy this skill. `SummaryReports/summary-report.md` (or versioned equivalent) must exist on disk before the session ends

## Output

The report must include all 8 sections defined in the [report template](./references/report-template.md), plus the document footer:

1. Results by Category
2. Failure Analysis (cross-pattern + individual details)
3. Fix Log
4. Reasoning
5. Iteration Summary
6. Timeline & Time Breakdown
7. Effort Savings Analysis
8. **Context & Token Usage** — files read, digest effectiveness, optimisation notes

After writing the file, invoke the `report-state` skill to confirm the file exists on disk before the session ends.
