import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gh-copilot-usecase1.vercel.app';

let authToken: string;
let createdTaskId: string;

test.describe('Tasks API', () => {

  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/auth/login`, {
      data: { username: 'admin', password: 'password123' },
    });
    const body = await response.json();
    authToken = body.data.token;
  });

  // TC-API-005: GET /api/tasks — Authenticated
  test('TC-API-005 - GET /api/tasks Authenticated', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/tasks`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.tasks.length).toBeGreaterThanOrEqual(5);
  });

  // TC-API-009: POST /api/tasks — Create Task
  test('TC-API-009 - POST /api/tasks Create Task', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        taskTitle: 'API test task',
        description: 'Created via Playwright API testing',
        status: 'todo',
        priority: 'high',
        assignee: 'admin',
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    createdTaskId = body.data.id;
    expect(body.data.title).toBe('API test task');
    expect(body.message).toBe('Task created');
  });

  // TC-API-011: GET /api/tasks/:id — Existing Task
  test('TC-API-011 - GET /api/tasks/t1', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/tasks/t1`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.id).toBe('t1');
    expect(body.data.title).toBeTruthy();
  });

  // TC-API-013: PUT /api/tasks/:id — Update Task
  test('TC-API-013 - PUT /api/tasks/t3 Update Task', async ({ request }) => {
    const response = await request.patch(`${BASE_URL}/api/tasks/t3`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        status: 'in-progress',
        priority: 'high',
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.status).toBe('in-progress');
    expect(body.message).toBe('Task updated');
  });

});
