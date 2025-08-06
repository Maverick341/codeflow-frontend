import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
} from 'lucide-react';

const ExecutionResults = ({ execution }) => {
  const { allPassed, status, testResults, totalTestCases, passedTestCases } = execution;

  const memoryArr = testResults.some((r) => r.memory)
    ? testResults.map((r) => r.memory)
    : [];
  const timeArr = testResults.some((r) => r.time)
    ? testResults.map((r) => r.time)
    : [];
  
  const avgMemory =
    memoryArr
      .map((m) => parseFloat(m)) // remove ' KB' using parseFloat
      .reduce((a, b) => a + b, 0) / memoryArr.length;

  const avgTime =
    timeArr
      .map((t) => parseFloat(t)) // remove ' s' using parseFloat
      .reduce((a, b) => a + b, 0) / timeArr.length;
  
  const successRate = (passedTestCases / totalTestCases) * 100;
  

  return (
      <div className="space-y-6">
        {/* Overall Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body p-4">
              <h3 className="card-title text-sm">Status</h3>
              <div
                className={`text-lg font-bold ${
                  status === 'ACCEPTED' ? 'text-success' : 'text-error'
                }`}
              >
                {status}
              </div>
            </div>
          </div>
  
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body p-4">
              <h3 className="card-title text-sm">Success Rate</h3>
              <div className="text-lg font-bold">{successRate.toFixed(1)}%</div>
            </div>
          </div>
  
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body p-4">
              <h3 className="card-title text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Avg. Runtime
              </h3>
              <div className="text-lg font-bold">{avgTime.toFixed(3)} s</div>
            </div>
          </div>
  
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body p-4">
              <h3 className="card-title text-sm flex items-center gap-2">
                <Memory className="w-4 h-4" />
                Avg. Memory
              </h3>
              <div className="text-lg font-bold">{avgMemory.toFixed(0)} KB</div>
            </div>
          </div>
        </div>
  
        {/* Test Cases Results */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Test Cases Results</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Expected Output</th>
                    <th>Your Output</th>
                    <th>Memory</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {testResults.map((result) => (
                    <tr key={result.id}>
                      <td>
                        {result.passed ? (
                          <div className="flex items-center gap-2 text-success">
                            <CheckCircle2 className="w-5 h-5" />
                            Passed
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-error">
                            <XCircle className="w-5 h-5" />
                            Failed
                          </div>
                        )}
                      </td>
                      <td className="font-mono">{result.expected}</td>
                      <td className="font-mono">{result.stdout || 'null'}</td>
                      <td>{result.memory}</td>
                      <td>{result.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ExecutionResults;
