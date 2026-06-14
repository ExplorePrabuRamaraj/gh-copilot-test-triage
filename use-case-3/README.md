# Use Case 3: Test Case Gap Analysis & Enhancement

**GitHub Copilot Kata — AI-Assisted Test Coverage Improvement**

> You are given 5 test cases that were written over a year ago and never reviewed.
> They are incomplete, vague, and missing critical details.
> Your job is to use **GitHub Copilot** to identify the gaps and produce complete, executable test cases.

---

## What's in This Folder

```
use-case-3/
├── README.md               ← this file
└── thin-test-cases.md      ← 5 deliberately incomplete test cases to analyse
```

---

## The Application Under Test

- **Live App:** https://gh-copilot-usecase1.vercel.app
- **Credentials:** `admin` / `password123` or `user1` / `test1234`
- **API Base URL:** https://gh-copilot-usecase1.vercel.app

Explore the live application before starting. Understanding the actual behavior will help you judge whether Copilot's output is accurate.

---

## What Makes a Test Case "Thin"?

A thin (poor quality) test case typically has one or more of these problems:

| Problem | Example |
|---|---|
| No precondition | Test starts from an undefined state |
| Vague steps | "Fill in the form" with no field names or values |
| Missing test data | No specific usernames, values, or IDs |
| Weak expected result | "It should work" or "page loads" |
| No negative scenarios | Only happy path covered |
| No boundary conditions | Edge cases not considered |
| No post-condition / teardown | Leaves system in a dirty state |
| Missing field-level assertions | Only checks if something appeared, not what it says |

---

## The Kata Challenge

### Step 1 — Read the thin test cases

Open `thin-test-cases.md` and read all 5 test cases. For each one, note what information is missing before using Copilot.

---

### Step 2 — Use Copilot to identify gaps

Open **Copilot Chat** (click the chat icon in the VS Code sidebar, or press `Ctrl+Alt+I` on Windows) and feed each thin test case to Copilot. Try prompts like:

> *"Here is a test case for a web application. Identify all gaps — missing preconditions, vague steps, missing expected results, and missing negative scenarios:"*
> *(paste the test case)*

> *"What information is this test case missing to make it executable by a tester who has never seen the application?"*

**Compare** what Copilot identifies against your own manual review. Did Copilot catch everything you found? Did it find anything you missed?

---

### Step 3 — Rewrite with Copilot

Ask Copilot to produce a complete, improved version of each test case. Try:

> *"Rewrite this test case with: clear preconditions, specific step-by-step instructions with exact field values, specific expected results with field-level assertions, and at least 2 negative test scenarios."*

> *"The application uses these credentials: admin/password123. The login page URL is https://gh-copilot-usecase1.vercel.app. Rewrite TC-THIN-001 as a complete, executable test case."*

---

### Step 4 — Generate negative and boundary scenarios

For each thin test case, ask Copilot to add negative and boundary coverage:

> *"Generate 3 negative test scenarios for this login test case — covering invalid credentials, empty fields, and account lockout."*

> *"What boundary conditions should be tested when creating a task? Consider field length limits, special characters, and required vs optional fields."*

---

### Step 5 — Iterate and refine

Review Copilot's output critically:

- Are the steps specific enough for any tester to follow?
- Are the expected results verifiable (not just "it works")?
- Do the negative scenarios test realistic failure paths?
- Does the test clean up after itself (delete created data)?

Refine your prompts and iterate until you are satisfied with the quality.

---

### Step 6 — Compare original vs enhanced

Write a brief comparison for each test case:

| Aspect | Original (Thin) | Copilot-Enhanced |
|---|---|---|
| Preconditions | None | Specific login state |
| Steps | 3 vague steps | 7 specific steps with values |
| Expected result | "Works" | 4 field-level assertions |
| Negative scenarios | 0 | 3 scenarios |
| Test data | None | Specific usernames, values |

---

## Stretch Goal

Pick 2–3 test cases from **your own project** and apply the same technique:

1. Feed the thin test case to Copilot
2. Ask it to identify gaps
3. Ask it to rewrite with full detail and negative scenarios
4. Compare the AI output against your own manual review

This is where the real productivity gain becomes visible.

---

## Tips for Better Copilot Prompts

- **Provide context** — tell Copilot what the application does before pasting a test case
- **Be specific about the format** — ask for a table, numbered steps, or a structured template
- **Iterate** — if the first response is too generic, add more constraints: *"Make the steps more specific. Include the exact URL, field names, and button labels."*
- **Validate against the live app** — always cross-check Copilot's output against the actual application behaviour

---

## Example Prompt Template

```
I am testing a web application called Task Manager.
URL: https://gh-copilot-usecase1.vercel.app
Credentials: admin / password123

Here is a test case that needs to be improved:
---
[paste thin test case here]
---

Please:
1. List all gaps in this test case (missing preconditions, vague steps, missing expected results)
2. Rewrite it as a complete, executable test case with specific steps and expected results
3. Add 3 negative test scenarios covering error and edge cases
4. Suggest any test data that should be prepared before running this test
```
