const iterations = 10000;
const numModules = 500;

let progressArray = [];
for (let i = 0; i < numModules; i++) {
  progressArray.push({
    course_id: `course_${i % 10}`,
    module_id: `module_${i}`,
    progress: 50,
    completed_lessons: 2,
    total_lessons: 5,
    is_completed: false
  });
}

const startTimeArr = performance.now();
for (let i = 0; i < iterations; i++) {
  const targetModuleId = `module_${Math.floor(Math.random() * numModules)}`;
  const existingIndex = progressArray.findIndex(p => p.module_id === targetModuleId);
  const found = existingIndex >= 0 ? progressArray[existingIndex] : null;
}
const endTimeArr = performance.now();
console.log(`Array findIndex: ${endTimeArr - startTimeArr} ms`);

let progressMap = new Map();
for (let i = 0; i < numModules; i++) {
  progressMap.set(`module_${i}`, {
    course_id: `course_${i % 10}`,
    module_id: `module_${i}`,
    progress: 50,
    completed_lessons: 2,
    total_lessons: 5,
    is_completed: false
  });
}

const startTimeMap = performance.now();
for (let i = 0; i < iterations; i++) {
  const targetModuleId = `module_${Math.floor(Math.random() * numModules)}`;
  const found = progressMap.get(targetModuleId) || null;
}
const endTimeMap = performance.now();
console.log(`Map get: ${endTimeMap - startTimeMap} ms`);

let progressRecord = {};
for (let i = 0; i < numModules; i++) {
  progressRecord[`module_${i}`] = {
    course_id: `course_${i % 10}`,
    module_id: `module_${i}`,
    progress: 50,
    completed_lessons: 2,
    total_lessons: 5,
    is_completed: false
  };
}

const startTimeRec = performance.now();
for (let i = 0; i < iterations; i++) {
  const targetModuleId = `module_${Math.floor(Math.random() * numModules)}`;
  const found = progressRecord[targetModuleId] || null;
}
const endTimeRec = performance.now();
console.log(`Record lookup: ${endTimeRec - startTimeRec} ms`);
