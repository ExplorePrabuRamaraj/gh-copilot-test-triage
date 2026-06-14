# GitHub Copilot Kata — Use Cases 2 & 3

**AI-Assisted Test Debugging and Test Coverage Improvement**

---

## Live Application

All exercises in this repo target the same Task Manager application:

**https://gh-copilot-usecase1.vercel.app**

| Username | Password     |
|----------|-------------|
| admin    | password123 |
| user1    | test1234    |

> Each user has their own isolated task data. Changes you make only affect your own session.

---

## What's Inside

### Use Case 2 — Test Failure Analysis & Fix Suggestions

> **Problem:** Testers spend too much time triaging failing tests without knowing where to start.
> **Copilot solves it:** Feed the failing test + error output to Copilot and ask it to explain the failure and suggest a fix.

You are given 11 pre-written Playwright tests — 10 of them contain intentional bugs. Each bug is realistic (the kind you'd find in a real project). Use Copilot to analyse each failure, understand the root cause, and implement the fix.

**[→ Go to Use Case 2](./use-case-2/README.md)**

---

### Use Case 3 — Test Case Gap Analysis & Enhancement

> **Problem:** Old test cases are vague, incomplete, and missing negative scenarios — making them ineffective and hard to execute.
> **Copilot solves it:** Feed the thin test case to Copilot and ask it to identify gaps and rewrite with full detail.

You are given 5 deliberately incomplete test cases for the same Task Manager application. Use Copilot to identify what's missing, rewrite them into complete, executable test cases, and generate negative scenarios you may have missed.

**[→ Go to Use Case 3](./use-case-3/README.md)**

---

## Repository Structure

```
GHCopilot_usecase2-3/
├── README.md                              ← you are here
├── package.json                           ← Playwright dependencies
├── playwright.config.ts                   ← Playwright configuration
├── tsconfig.json                          ← TypeScript configuration
├── use-case-2/
│   ├── README.md                          ← UC2 setup & challenge instructions
│   ├── tests/
│   │   ├── auth.broken.spec.ts            ← broken auth tests (3 bugs)
│   │   ├── tasks-ui.broken.spec.ts        ← broken UI tests (4 bugs)
│   │   └── tasks-api.broken.spec.ts       ← broken API tests (4 bugs)
│   └── failure-reports/
│       └── test-output.txt                ← pre-generated failure output
└── use-case-3/
    ├── README.md                          ← UC3 challenge instructions
    └── thin-test-cases.md                 ← 5 incomplete test cases to enhance
```

---

## Quick Start — Use Case 2

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browser
npx playwright install chromium

# 3. Run the broken tests (expect 10 failures)
npm run test:uc2
```

Full setup instructions with beginner-friendly explanations:
**[Use Case 2 README](./use-case-2/README.md)**

---

## Quick Start — Use Case 3

No installation needed. Open VS Code, read `use-case-3/thin-test-cases.md`, and start prompting Copilot.

Full instructions and prompt templates:
**[Use Case 3 README](./use-case-3/README.md)**

---

## API Reference

For Use Case 2 test verification and Use Case 3 test case writing, the full API and UI selector reference is in the main application repository:
**https://github.com/bharath-epam-ui/GHCopilot_usecase1**
