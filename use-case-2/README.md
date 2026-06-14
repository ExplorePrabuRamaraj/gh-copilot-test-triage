# Use Case 2: Test Failure Analysis & Fix Suggestions

**GitHub Copilot Kata — AI-Assisted Test Debugging**

> You are given a set of Playwright tests that were written to cover the Task Manager application.
> **10 out of 11 tests fail when run.** Your job is to use **GitHub Copilot** to understand *why* each test fails and propose a fix.

---

## What's in This Folder

```
use-case-2/
├── tests/
│   ├── auth.broken.spec.ts        ← 3 tests covering login & logout (3 bugs)
│   ├── tasks-ui.broken.spec.ts    ← 4 tests covering task list & CRUD (4 bugs)
│   └── tasks-api.broken.spec.ts   ← 4 tests covering the Tasks REST API (4 bugs)
└── failure-reports/
    └── test-output.txt            ← Pre-generated failure output (read this first)
```

**Total: 11 tests | 10 failing | 11 bugs to find and fix**

> **Note:** One test contains two stacked bugs — fixing the first will reveal the second. You will know you have fixed all bugs only when all 11 tests pass.

---

## The Application Under Test

- **Live App:** https://gh-copilot-usecase1.vercel.app
- **Credentials:** `admin` / `password123` or `user1` / `test1234`
- **API Base URL:** https://gh-copilot-usecase1.vercel.app

---

## Prerequisites

Before you begin, make sure you have the following installed on your machine.

### 1. Node.js (version 18 or higher)

Check if Node.js is already installed:
```bash
node --version
```

If the output shows `v18.x.x` or higher, you are good to go.

If not installed, download it from **https://nodejs.org** and install the **LTS** version.

After installing, close and reopen your terminal, then run `node --version` again to confirm.

### 2. Visual Studio Code

Download from **https://code.visualstudio.com** if not already installed.

### 3. GitHub Copilot Extension

Inside VS Code:
1. Press `Ctrl+Shift+X` (Windows) to open the Extensions panel
2. Search for **GitHub Copilot**
3. Click **Install**
4. Sign in with your GitHub account when prompted

---

## Setup Instructions

### Step 1 — Clone the repository

Open a terminal and run:

```bash
git clone https://github.com/bharath-epam-ui/GHCopilot_usecase2-3.git
cd GHCopilot_usecase2-3
code .
```

The last command opens the folder in VS Code. If `code .` is not recognised, open VS Code manually and use **File → Open Folder** to select the `GHCopilot_usecase2-3` folder.

> If you downloaded the repo as a ZIP, extract it and open the folder in VS Code using **File → Open Folder**.

### Step 2 — Install dependencies

```bash
npm install
```

This installs Playwright and all required packages. You will see a `node_modules` folder created.

### Step 3 — Install Playwright browsers

Playwright needs to download browser binaries the first time. Run:

```bash
npx playwright install chromium
```

This downloads the Chromium browser (~150 MB). It only needs to be done once.

To confirm the install succeeded:
```bash
npx playwright --version
```

---

## Running the Broken Tests

### Run all UC2 tests

```bash
npm run test:uc2
```

You will see output similar to the pre-generated report in `failure-reports/test-output.txt`.

> **Note:** 10 out of 11 tests will fail — this is expected. The failures are intentional.

### Run a single test file

```bash
npx playwright test use-case-2/tests/auth.broken.spec.ts
```

### Run in headed mode (watch the browser)

```bash
npm run test:headed
```

---

## Understanding the Failure Report

Open `use-case-2/failure-reports/test-output.txt` in VS Code.

You do not need to run the tests yourself to start the Kata — you can work directly from the pre-generated report.

Each failure entry shows:
- The **test name** and the **file + line number** where it failed
- The **error type** (e.g., `TimeoutError`, `TypeError`, assertion error)
- The **exact line of code** that caused the failure (marked with `>`)
- The **expected vs received** values (for assertion errors)

**Example failure:**

```
TimeoutError: locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('[data-testid="login-btn"]') to be visible

>  13 |     await page.click('[data-testid="login-btn"]');
```

This tells you Playwright waited 30 seconds for an element with `data-testid="login-btn"` but it was never found on the page.

---

## The Kata Challenge

Work through each failing test using GitHub Copilot. Follow these steps for each failure:

### Step 1 — Open the test file and failure report side by side

In VS Code, open the broken test file and the `test-output.txt` side by side (`Ctrl+\` to split the editor).

### Step 2 — Ask Copilot to explain the failure

Open **Copilot Chat** (click the chat icon in the VS Code sidebar, or press `Ctrl+Alt+I` on Windows) and try prompts like:

> *"This Playwright test is failing with a TimeoutError. The locator `[data-testid="login-btn"]` is not found. Here is the test code: [paste code]. What is the most likely cause of this failure?"*

> *"Explain why `expect(body.data.tasks.length).toBeGreaterThanOrEqual(5)` throws a TypeError in a Playwright API test."*

### Step 3 — Ask Copilot to suggest a fix

Once you understand the failure, ask Copilot:

> *"How do I fix this? What should the correct locator be?"*

> *"What is the correct way to count Playwright locator results? The current code is missing something."*

### Step 4 — Apply the fix and verify

Edit the broken test file with the suggested fix. Then run the individual test to confirm it now passes:

```bash
npx playwright test use-case-2/tests/auth.broken.spec.ts --grep "TC-UI-001"
```

---

## Hints (Only read if stuck)

<details>
<summary>Hint categories — click to expand</summary>

- **TimeoutError on a locator** → The element exists on the page but the selector used in the test does not match it. Compare the `data-testid` value in the test against the README UI Selector table.
- **URL assertion error** → After an action (login, logout), the app redirects to a specific URL. Verify what the actual destination URL is by visiting the live app manually.
- **TypeError: received value must be a number** → An async Playwright method is being used without `await`. Its return value is a Promise, not a number.
- **selectOption error** → HTML select option values are case-sensitive and use hyphens, not camelCase. Check the API field reference for valid values.
- **Assertion error: Expected 4, Received 5** → The task count did not change. Think about what user interaction the test relies on to trigger a deletion — is there a confirmation step that Playwright needs to handle?
- **TypeError: Cannot read properties of undefined** → The response JSON structure does not match what the test assumes. Log `body` to the console and inspect the actual shape.
- **Status 400 with `{"error":"title is required"}`** → The request body field name is wrong. Check the API reference for the correct field name.
- **Status 405 Method Not Allowed** → The HTTP method used does not match the API endpoint. Check the API reference for the correct method.

</details>

---

## Verify All Fixes

Once you have fixed all bugs, run the full suite and confirm all 11 tests pass:

```bash
npm run test:uc2
```

Expected output:
```
11 passed (Xs)
```

---

## API & UI Reference

Full API documentation and `data-testid` selector reference is available in the main repository README:
**https://github.com/bharath-epam-ui/GHCopilot_usecase1**
