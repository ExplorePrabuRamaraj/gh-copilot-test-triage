---
description: "Use when analyzing, fixing, or reviewing API test failures in tasks-api spec files. Covers HTTP method validation, request body fields, response shape parsing, status codes, and dynamic ID lookup."
applyTo: "use-case-2/tests/tasks-api*.spec.ts"
---

# API Test Analysis Rules

## Rule: API Test Diagnostics

For API test failures:

1. **HTTP Status Errors** — verify the method (GET/POST/PUT/DELETE) matches what the endpoint accepts. `PATCH` is often not supported — use `PUT` instead
2. **Request Validation** — verify all required fields are included in the request body. Field names must exactly match what the API expects (e.g., `title` not `taskTitle`)
3. **Response Parsing** — ensure correct path to access nested data:
   - `body.data` vs `body.data.tasks` vs `body.tasks`
   - Always verify the actual response shape before asserting
4. **Authentication** — confirm auth tokens/headers are properly set in `beforeAll`

## Rule: API-Specific Patterns

- **HTTP method matching** — GET/POST/PUT/DELETE only; `PATCH` is often not supported
- **Field name precision** — request body field names must exactly match the API spec (e.g., `title` vs `taskTitle`)
- **Response shape validation** — `body.data` vs `body.data.tasks` vs `body.tasks`
- **Status codes** — creation endpoints return `201`, not `200`; updates return `200`
- **Never hardcode resource IDs** (e.g., `t1`, `t3`) — fetch a real ID dynamically from a list call first
- **`beforeAll` auth token** — ensure it is captured correctly before any test runs

## Dynamic ID Lookup Pattern

❌ Bad — hardcoded IDs break when data changes:
```typescript
const response = await request.get(`/api/tasks/t1`);
```

✅ Good — fetch a real ID dynamically:
```typescript
const listResponse = await request.get('/api/tasks', { headers });
const tasks = (await listResponse.json()).data;
const taskId = tasks[0].id;
const response = await request.get(`/api/tasks/${taskId}`, { headers });
```
