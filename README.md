# Expense Analysis System

## Task Overview
Create an expense analysis system that calculates the median of all expenses up to (and including) the first Sunday of each month. The task evaluates:
- Algorithm optimization skills
- Data structure handling
- Code quality and cleanliness
- Memory management

![image](https://github.com/user-attachments/assets/1344ab1b-67c2-4c22-a485-6934cc4750a8)


## Technical Requirements
1. Language: JavaScript or Python
2. Libraries: Standard libraries only (e.g., math)
3. Input data format: JSON object with expenses grouped by:
  - Year and month (e.g., "2023-01")
  - Day of month (e.g., "01")
  - Expense categories ("food", "fuel", etc.)

## Solution Structure
Code must include two implementations:
1. solution1() - first, straightforward version
2. solution2() - optimized version using one of:
  - Priority queues
  - Quick select
  - Quick sort
  - Other (with justification)

## Assessment Criteria
1. Calculation accuracy
2. Performance (CPU, memory)
3. Edge case handling
4. Code clarity and readability
5. Quality of optimization in solution2

## Verification Process
1. Automated tests checking:
  - Result correctness
  - Performance with large datasets (million records)
  - Resource utilization
2. Code review by developers (after passing automated tests)

## Important Notes
- Solution must be final (no corrections allowed)
- Failed tests = 90-day waiting period before next attempt
- Passing tests = proceed to second stage (framework task)

## Example Data Structure
```javascript
expenses = {
   "2023-01": {
       "01": {
           "food": [ 22.11, 43, 11.72, 2.2, 36.29, 2.5, 19 ],
           "fuel": [ 210.22 ]
       },
       "09": {
           "food": [ 11.9 ],
           "fuel": [ 190.22 ]
       }
   }
   // ... more months
}
