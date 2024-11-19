export const sampleExpenses = {
  "2023-01": {
    "01": {
      "food": [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
      "fuel": [210.22]
    },
    "09": {
      "food": [11.9],
      "fuel": [190.22]
    }
  },
  "2023-03": {
    "07": {
      "food": [20, 11.9, 30.20, 11.9]
    },
    "04": {
      "food": [10.20, 11.50, 2.5],
      "fuel": []
    }
  },
  "2023-04": {}
};

function getFirstSundayOfMonth(year, month) {
  const date = new Date(year, month - 1, 1);
  const day = date.getDay();
  return day === 0 ? 1 : 8 - day;
}

export function solution1(expenses) {
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
}

export function solution2(expenses) {
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
}

export function generateLargeDataset(size = 100) {
  const entriesPerDay = Math.ceil(size / (12 * 28 * 2)); // Distribute entries across months/days/categories
  const data = {};
  
  for (let month = 1; month <= 12; month++) {
    const monthStr = month.toString().padStart(2, '0');
    data[`2023-${monthStr}`] = {};
    
    for (let day = 1; day <= 28; day++) {
      const dayStr = day.toString().padStart(2, '0');
      data[`2023-${monthStr}`][dayStr] = {
        "food": Array.from({ length: entriesPerDay }, () => Math.random() * 1000),
        "fuel": Array.from({ length: entriesPerDay }, () => Math.random() * 1000)
      };
    }
  }
  
  return data;
}