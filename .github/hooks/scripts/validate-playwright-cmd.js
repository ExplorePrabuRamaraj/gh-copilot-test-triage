/**
 * PreToolUse hook: validates Playwright terminal commands during failure analysis.
 *
 * Rules enforced:
 * 1. Playwright test runs must target use-case-2/tests/ (not the full suite)
 * 2. Workers must not exceed 2
 *
 * Receives JSON on stdin, outputs JSON on stdout.
 * Exit 0 = allow, Exit 2 = block.
 */

const chunks = [];
process.stdin.on('data', (chunk) => chunks.push(chunk));
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(Buffer.concat(chunks).toString());

    // Only inspect terminal/execute tool invocations
    const toolName = input?.toolName || input?.tool_name || '';
    if (!toolName.includes('terminal') && !toolName.includes('execute')) {
      // Not a terminal command — allow
      process.stdout.write(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    const command = input?.toolInput?.command || input?.tool_input?.command || '';

    // Only validate playwright commands
    if (!command.includes('playwright test')) {
      process.stdout.write(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    // Rule 1: Must target use-case-2/tests/ not bare "playwright test" with no path
    const hasTestPath = command.includes('use-case-2/tests/') || command.includes('--last-failed');
    if (!hasTestPath) {
      process.stdout.write(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'ask',
          permissionDecisionReason: 'Playwright command does not target use-case-2/tests/. Running the full suite during fix iterations is discouraged — target specific test files or use --last-failed.'
        }
      }));
      process.exit(0);
    }

    // Rule 2: Workers should not exceed 2
    const workersMatch = command.match(/--workers=(\d+)/);
    if (workersMatch && parseInt(workersMatch[1], 10) > 2) {
      process.stdout.write(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'ask',
          permissionDecisionReason: `Playwright workers set to ${workersMatch[1]}. During failure analysis, max 2 workers is recommended to keep output readable.`
        }
      }));
      process.exit(0);
    }

    // All checks passed — allow
    process.stdout.write(JSON.stringify({ continue: true }));
    process.exit(0);
  } catch {
    // Parse error — allow (non-blocking)
    process.stdout.write(JSON.stringify({ continue: true }));
    process.exit(0);
  }
});
