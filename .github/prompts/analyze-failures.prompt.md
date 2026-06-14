---
description: "Trigger a full Playwright test failure analysis workflow — diagnose, fix, and verify broken tests iteratively."
agent: "failure-analysis"
argument-hint: "Optional: Set MAX_ITERATIONS (default: 3)"
---

Analyze all test failures in `test-results/`, diagnose root causes, propose and apply fixes, then re-run tests iteratively until all pass or the iteration limit is reached.

**Workflow**:
1. Use the failure-triage skill to analyze and categorize failures
2. Present findings and await approval
3. Apply fixes to test files
4. Re-run only the previously-failed tests
5. Repeat until all pass or MAX_ITERATIONS reached
6. Use the summary-report skill to generate the final report
