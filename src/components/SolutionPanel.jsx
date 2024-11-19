import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import { sampleExpenses, generateLargeDataset } from '../utils/solutions';

export default function SolutionPanel({ title, description, code, runTest }) {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    const testResults = {};

    // Test 1: Sample Data Test
    const sampleStartTime = performance.now();
    const sampleResult = runTest(sampleExpenses);
    const sampleEndTime = performance.now();
    testResults.sample = {
      result: sampleResult,
      time: sampleEndTime - sampleStartTime,
      memory: window.performance.memory?.usedJSHeapSize / 1024 / 1024 || 'N/A'
    };

    // Test 2: Empty Object Test
    const emptyResult = runTest({});
    testResults.empty = {
      result: emptyResult,
      expected: null,
      passed: emptyResult === null
    };

    // Test 3: Null Input Test
    const nullResult = runTest(null);
    testResults.null = {
      result: nullResult,
      expected: null,
      passed: nullResult === null
    };

    // Test 4: Large Dataset Test (1M entries)
    const largeData = generateLargeDataset(1000000); // Modified to generate 1M entries
    const largeStartTime = performance.now();
    const startMemory = window.performance.memory?.usedJSHeapSize || 0;
    const largeResult = runTest(largeData);
    const endMemory = window.performance.memory?.usedJSHeapSize || 0;
    const largeEndTime = performance.now();

    testResults.large = {
      result: largeResult,
      time: largeEndTime - largeStartTime,
      memory: (endMemory - startMemory) / 1024 / 1024, // Memory usage in MB
      cpuTime: largeEndTime - largeStartTime // CPU time approximation
    };

    setResults(testResults);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <pre className="text-white overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Test Results</h3>
        <button
          onClick={runTests}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300 mb-4"
        >
          {isLoading ? 'Running Tests...' : 'Run Tests'}
        </button>

        {results && (
          <div className="space-y-4">
            {/* Sample Data Test */}
            <div className="border rounded p-4">
              <h4 className="font-semibold mb-2">Sample Data Test</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Result:</p>
                  <p className="font-mono">{results.sample.result}</p>
                </div>
                <div>
                  <p className="text-gray-600">Execution Time:</p>
                  <p className="font-mono">{results.sample.time.toFixed(2)}ms</p>
                </div>
                <div>
                  <p className="text-gray-600">Memory Usage:</p>
                  <p className="font-mono">{typeof results.sample.memory === 'number' ? 
                    `${results.sample.memory.toFixed(2)} MB` : 
                    results.sample.memory}</p>
                </div>
              </div>
            </div>

            {/* Edge Cases */}
            <div className="border rounded p-4">
              <h4 className="font-semibold mb-2">Edge Cases</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Empty Object:</p>
                  <p className={`font-mono ${results.empty.passed ? 'text-green-600' : 'text-red-600'}`}>
                    {results.empty.passed ? 'PASSED' : 'FAILED'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Null Input:</p>
                  <p className={`font-mono ${results.null.passed ? 'text-green-600' : 'text-red-600'}`}>
                    {results.null.passed ? 'PASSED' : 'FAILED'}
                  </p>
                </div>
              </div>
            </div>

            {/* Large Dataset Test */}
            <div className="border rounded p-4">
              <h4 className="font-semibold mb-2">Large Dataset Test (1M entries)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Result:</p>
                  <p className="font-mono">{results.large.result}</p>
                </div>
                <div>
                  <p className="text-gray-600">Execution Time:</p>
                  <p className="font-mono">{results.large.time.toFixed(2)}ms</p>
                </div>
                <div>
                  <p className="text-gray-600">CPU Usage:</p>
                  <p className="font-mono">{results.large.cpuTime.toFixed(2)}ms</p>
                </div>
                <div>
                  <p className="text-gray-600">Memory Usage:</p>
                  <p className="font-mono">{results.large.memory.toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}