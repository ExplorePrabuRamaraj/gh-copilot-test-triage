# Thin Test Cases — Task Manager

> These test cases were written 18 months ago and have not been reviewed since.
> They are provided as-is for the UC3 Gap Analysis Kata.

**How to use the hints:** Try identifying the gaps yourself first, then use Copilot to analyse each test case. Only expand the hint after you have formed your own view — use it to check whether you and Copilot caught everything.

---

## TC-THIN-001: Login

**Test Name:** Login Test

**Objective:** Verify that the user can log in to the application.

**Pre-requisite:** None

**Steps:**
1. Open the application
2. Enter username and password
3. Click login

**Expected Result:** User should be logged in successfully.

<details>
<summary>Hint — categories of gaps in this test case</summary>

- **Pre-requisite:** No URL specified — where does the tester navigate to?
- **Test data:** No specific credentials provided — which username and password?
- **Steps:** "Enter username and password" is vague — which fields, and with what values?
- **Expected result:** "Logged in successfully" is unverifiable — what exactly should the tester check? (URL change? Header text? Token stored?)
- **Missing coverage:** No negative scenario for invalid credentials, no scenario for empty fields, no scenario for what happens if already logged in

</details>

---

## TC-THIN-002: Create a Task

**Test Name:** Create Task

**Objective:** Test that a new task can be created.

**Pre-requisite:** User is logged in

**Steps:**
1. Click the Add Task button
2. Fill in the task details
3. Click Submit

**Expected Result:** New task should appear in the task list.

<details>
<summary>Hint — categories of gaps in this test case</summary>

- **Pre-requisite:** "User is logged in" — but with which account, and from which URL?
- **Steps:** "Fill in the task details" — which fields must be filled? What are the valid values for status and priority?
- **Test data:** No specific title, description, status, priority, or assignee values provided
- **Expected result:** "Appears in the task list" — should the tester verify the title? The status badge? The priority badge? The task count?
- **Missing coverage:** No test for submitting with the title left empty, no test for the Cancel button, no teardown to remove the created task after the test

</details>

---

## TC-THIN-003: Filter Tasks by Status

**Test Name:** Filter Tasks

**Objective:** Verify that the task filter works.

**Pre-requisite:** Tasks exist in the system

**Steps:**
1. Click on a filter option
2. Observe the task list

**Expected Result:** Tasks are filtered correctly.

<details>
<summary>Hint — categories of gaps in this test case</summary>

- **Pre-requisite:** "Tasks exist" — but the tester also needs to be logged in; which status filters should have at least one matching task?
- **Steps:** "Click on a filter option" — which filter? To Do? In Progress? Done? All four should be tested separately
- **Steps:** "Observe the task list" is not an actionable step — what exactly should the tester verify?
- **Expected result:** "Filtered correctly" is undefined — the tester should verify that every visible task has the correct status value, and that tasks with other statuses are not shown
- **Missing coverage:** No test for clicking the All filter to reset, no test for a filter that returns zero results (empty state message)

</details>

---

## TC-THIN-004: Create Task via API

**Test Name:** API — Create Task

**Objective:** Test the task creation API endpoint.

**Pre-requisite:** API is running

**Steps:**
1. Call the create task endpoint
2. Pass the required data in the request body

**Expected Result:** Task is created successfully.

<details>
<summary>Hint — categories of gaps in this test case</summary>

- **Pre-requisite:** No authentication step — the API requires a Bearer token; how does the tester obtain it?
- **Steps:** "Call the create task endpoint" — no HTTP method, no URL, no headers specified
- **Steps:** "Pass the required data" — which fields are required? What are valid values for status and priority?
- **Expected result:** No HTTP status code specified (should be 201, not 200), no response body assertions (id, title, message field)
- **Missing coverage:** No test for missing required field (title), no test for calling the endpoint without an auth token, no test to verify the created task can be retrieved afterwards

</details>

---

## TC-THIN-005: Delete a Task

**Test Name:** Delete Task

**Objective:** Verify that a task can be deleted.

**Pre-requisite:** A task exists

**Steps:**
1. Find a task in the list
2. Click the Delete button
3. Confirm the action

**Expected Result:** The task should be deleted.

<details>
<summary>Hint — categories of gaps in this test case</summary>

- **Pre-requisite:** "A task exists" — tester also needs to be logged in; should the test create a dedicated task to delete rather than using existing seed data?
- **Steps:** "Find a task" — which task? Using a seed task risks breaking other tests; a safe approach is to create a task specifically for deletion
- **Steps:** "Confirm the action" — what kind of confirmation? A browser dialog? A modal? How does the tester interact with it?
- **Expected result:** "Task is deleted" is unverifiable — the tester should check the task count decreased, the task card is no longer visible, and ideally that a GET request for the deleted task returns 404
- **Missing coverage:** No test for attempting to delete a task that does not exist, no test for cancelling the deletion dialog and verifying the task is still present

</details>

---
