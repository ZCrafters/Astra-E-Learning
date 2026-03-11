const iterations = 10000;
const numModules = 500;

// Setup initial state: array of 500 modules
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

const startTime = performance.now();

// Simulate updateProgress
for (let i = 0; i < iterations; i++) {
  // Update a random module
  const targetModuleId = `module_${Math.floor(Math.random() * numModules)}`;
  const newProgress = {
    course_id: `course_${Math.floor(Math.random() * 10)}`,
    module_id: targetModuleId,
    progress: 100,
    completed_lessons: 5,
    total_lessons: 5,
    is_completed: true
  };

  const updatedProgress = [...progressArray];
  const existingIndex = updatedProgress.findIndex(p => p.module_id === targetModuleId);
  if (existingIndex >= 0) {
    updatedProgress[existingIndex] = newProgress;
  } else {
    updatedProgress.push(newProgress);
  }
  progressArray = updatedProgress;
}

const endTime = performance.now();
console.log(`Array Benchmark (findIndex): ${endTime - startTime} ms`);
