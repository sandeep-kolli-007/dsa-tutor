import type { CodeProblem, CodeRunSummary } from '../types/code';

const workerSource = `
self.onmessage = (event) => {
  const { code, functionName, tests } = event.data;

  const stable = (value) => {
    if (Array.isArray(value)) return value.map(stable);
    if (value && typeof value === 'object') {
      return Object.keys(value).sort().reduce((out, key) => {
        out[key] = stable(value[key]);
        return out;
      }, {});
    }
    return value;
  };

  const same = (a, b) => JSON.stringify(stable(a)) === JSON.stringify(stable(b));

  try {
    const factory = new Function(
      code + '\\nreturn typeof ' + functionName + " === 'function' ? " + functionName + ' : null;'
    );
    const fn = factory();

    if (typeof fn !== 'function') {
      self.postMessage({ error: 'Expected function ' + functionName + ' was not defined.' });
      return;
    }

    const results = tests.map((test) => {
      const args = structuredClone(test.args);
      const started = performance.now();

      try {
        const actual = fn(...args);
        const durationMs = performance.now() - started;

        if (actual && typeof actual.then === 'function') {
          return {
            name: test.name,
            passed: false,
            expected: test.expected,
            error: 'Async solutions are not supported in this playground yet.',
            durationMs,
          };
        }

        return {
          name: test.name,
          passed: same(actual, test.expected),
          expected: test.expected,
          actual,
          durationMs,
        };
      } catch (error) {
        return {
          name: test.name,
          passed: false,
          expected: test.expected,
          error: error instanceof Error ? error.message : String(error),
          durationMs: performance.now() - started,
        };
      }
    });

    self.postMessage({ results });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
`;

export function runCodeProblem(
  problem: CodeProblem,
  code: string,
  timeoutMs = 1600
): Promise<CodeRunSummary> {
  return new Promise((resolve) => {
    const blob = new Blob([workerSource], { type: 'text/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));
    let settled = false;

    const finish = (summary: CodeRunSummary) => {
      if (settled) return;
      settled = true;
      worker.terminate();
      URL.revokeObjectURL(blob);
      resolve(summary);
    };

    const timeout = window.setTimeout(() => {
      finish({
        passed: 0,
        total: problem.tests.length,
        timedOut: true,
        results: problem.tests.map((test) => ({
          name: test.name,
          passed: false,
          expected: test.expected,
          error: 'Execution exceeded the time limit.',
        })),
      });
    }, timeoutMs);

    worker.onmessage = (event) => {
      window.clearTimeout(timeout);
      if (event.data.error) {
        finish({
          passed: 0,
          total: problem.tests.length,
          results: problem.tests.map((test) => ({
            name: test.name,
            passed: false,
            expected: test.expected,
            error: event.data.error,
          })),
        });
        return;
      }

      const results = event.data.results ?? [];
      finish({
        passed: results.filter((result: { passed: boolean }) => result.passed).length,
        total: problem.tests.length,
        results,
      });
    };

    worker.onerror = (event) => {
      window.clearTimeout(timeout);
      finish({
        passed: 0,
        total: problem.tests.length,
        results: problem.tests.map((test) => ({
          name: test.name,
          passed: false,
          expected: test.expected,
          error: event.message || 'Worker execution failed.',
        })),
      });
    };

    worker.postMessage({
      code,
      functionName: problem.functionName,
      tests: problem.tests,
    });
  });
}
