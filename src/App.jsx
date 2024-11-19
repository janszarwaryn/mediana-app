import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import { solution1, solution2, sampleExpenses } from './utils/solutions';
import TabPanel from './components/TabPanel';
import SolutionPanel from './components/SolutionPanel';

const solution1Code = `function solution1(expenses) {
  if (!expenses) return null;
  
  const values = [];
  
  for (const [yearMonth, days] of Object.entries(expenses)) {
    const [year, month] = yearMonth.split('-').map(Number);
    const firstSunday = getFirstSundayOfMonth(year, month);
    
    for (const [day, categories] of Object.entries(days)) {
      if (parseInt(day) > firstSunday) continue;
      
      for (const expenses of Object.values(categories)) {
        values.push(...expenses);
      }
    }
  }
  
  if (values.length === 0) return null;
  
  values.sort((a, b) => a - b);
  const mid = Math.floor(values.length / 2);
  return values[mid];
}`;

const solution2Code = `function solution2(expenses) {
  if (!expenses) return null;
  
  let min = Infinity;
  let max = -Infinity;
  const values = [];

  for (const [yearMonth, days] of Object.entries(expenses)) {
    const [year, month] = yearMonth.split('-').map(Number);
    const firstSunday = getFirstSundayOfMonth(year, month);
    
    for (const [day, categories] of Object.entries(days)) {
      if (parseInt(day) > firstSunday) continue;
      
      for (const categoryExpenses of Object.values(categories)) {
        values.push(...categoryExpenses);
        for (const val of categoryExpenses) {
          min = Math.min(min, val);
          max = Math.max(max, val);
        }
      }
    }
  }
  
  if (values.length === 0) return null;
  
  const targetCount = Math.floor(values.length / 2);
  let left = min;
  let right = max;
  
  while (right - left > 0.0001) {
    const mid = (left + right) / 2;
    const count = values.filter(x => x <= mid).length;
    
    if (count <= targetCount) {
      left = mid;
    } else {
      right = mid;
    }
  }
  
  return left;
}`;

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Expense Median Calculator</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Sample Data</h2>
          <div className="bg-gray-50 rounded p-4 overflow-auto max-h-96">
            <ReactJson 
              src={sampleExpenses} 
              theme="monokai"
              collapsed={2}
              displayDataTypes={false}
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab(0)}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 0
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Solution 1 (Basic)
              </button>
              <button
                onClick={() => setActiveTab(1)}
                className={`ml-8 py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 1
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Solution 2 (Optimized)
              </button>
            </nav>
          </div>
        </div>

        <TabPanel value={activeTab} index={0}>
          <SolutionPanel
            title="Solution 1 (Basic Implementation)"
            description="Simple implementation using array sorting to find the median. Time complexity: O(n log n)"
            code={solution1Code}
            runTest={solution1}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <SolutionPanel
            title="Solution 2 (Optimized Implementation)"
            description="Optimized implementation using binary search to find the median. Time complexity: O(n)"
            code={solution2Code}
            runTest={solution2}
          />
        </TabPanel>
      </div>
    </div>
  );
}

export default App;