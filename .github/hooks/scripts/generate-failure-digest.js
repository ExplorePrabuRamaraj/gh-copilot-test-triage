/**
 * SessionStart hook: generates a compact failure digest from all error-context.md files.
 *
 * Reads every test-results/*\/error-context.md and extracts only the essential fields:
 *   - testName, location, errorType, errorMessage
 *
 * Writes test-results/failure-digest.json so the agent can triage all failures in a
 * single read instead of opening 11 individual error-context.md files.
 *
 * Also emits a systemMessage with the failure count and folder list so the agent
 * never needs a list_dir call.
 */

const fs = require('fs');
const path = require('path');

const RESULTS_DIR = path.join(process.cwd(), 'test-results');

function extractSection(content, heading) {
  const start = content.indexOf(`# ${heading}`);
  if (start === -1) return '';
  const nextHeading = content.indexOf('\n# ', start + 1);
  return (nextHeading === -1 ? content.slice(start) : content.slice(start, nextHeading)).trim();
}

function parseErrorContext(content) {
  // Test info
  const infoSection = extractSection(content, 'Test info');
  const nameMatch = infoSection.match(/- Name: (.+)/);
  const locMatch = infoSection.match(/- Location: (.+)/);

  // Error details — first code block only (skip call logs)
  const errSection = extractSection(content, 'Error details');
  const codeBlocks = [...errSection.matchAll(/```[\w]*\n([\s\S]*?)```/g)].map(m => m[1].trim());
  const primaryError = codeBlocks[0] || '';
  const errorTypeMatch = primaryError.match(/^(Error|TypeError|TimeoutError|AssertionError)[\s:]/);
  const errorType = errorTypeMatch ? errorTypeMatch[1] : 'Unknown';

  // Truncate error message to first 2 lines
  const errorMessage = primaryError.split('\n').slice(0, 2).join(' ').replace(/\s+/g, ' ').trim();

  return {
    testName: nameMatch ? nameMatch[1].trim() : 'Unknown',
    location: locMatch ? locMatch[1].trim() : 'Unknown',
    errorType,
    errorMessage,
  };
}

try {
  if (!fs.existsSync(RESULTS_DIR)) {
    console.log(JSON.stringify({ systemMessage: 'No test-results/ directory found — tests have not been run yet.' }));
    process.exit(0);
  }

  const folders = fs.readdirSync(RESULTS_DIR).filter(f => {
    const full = path.join(RESULTS_DIR, f);
    return fs.statSync(full).isDirectory();
  });

  if (folders.length === 0) {
    console.log(JSON.stringify({ systemMessage: 'No failure folders found in test-results/ — all tests may have passed.' }));
    process.exit(0);
  }

  const digest = [];
  for (const folder of folders) {
    const ecPath = path.join(RESULTS_DIR, folder, 'error-context.md');
    if (!fs.existsSync(ecPath)) continue;
    const content = fs.readFileSync(ecPath, 'utf8');
    const parsed = parseErrorContext(content);
    digest.push({ folder, ...parsed });
  }

  // Write compact digest
  const digestPath = path.join(RESULTS_DIR, 'failure-digest.json');
  fs.writeFileSync(digestPath, JSON.stringify(digest, null, 2), 'utf8');

  // Emit system message: status + folder list + digest summary
  const lastRunPath = path.join(RESULTS_DIR, '.last-run.json');
  let status = 'unknown';
  try { status = JSON.parse(fs.readFileSync(lastRunPath, 'utf8')).status; } catch {}

  const folderList = folders.join(', ');
  const summary = digest.map(d => `  [${d.folder}] ${d.errorType}: ${d.errorMessage}`).join('\n');

  console.log(JSON.stringify({
    systemMessage:
      `Test status: ${status}. Failed folders (${folders.length}): ${folderList}\n` +
      `Failure digest written to test-results/failure-digest.json. Read that file for triage — do NOT read individual error-context.md files unless snapshot analysis is required for a UI locator failure.\n\nDigest preview:\n${summary}`,
  }));
} catch (err) {
  // Non-fatal — agent can still proceed manually
  console.log(JSON.stringify({ systemMessage: `Failure digest generation error: ${err.message}` }));
}
