const possiblePriorities = ["low", "medium", "high"];

const now = Date.now();

const tasks = [
  {
    id: 1,
    title: "Plan weekly sprint",
    description: "Define priorities and deadlines for this week.",
    completed: true,
    priority: "high",
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: 2,
    title: "Review pull requests",
    description: "Review backend PRs and leave actionable comments.",
    completed: false,
    priority: "high",
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 9).toISOString(),
  },
  {
    id: 3,
    title: "Write API documentation",
    description: "Document task endpoints with examples and edge cases.",
    completed: false,
    priority: "medium",
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 8).toISOString(),
  },
  {
    id: 4,
    title: "Refactor form validation",
    description: "Reduce duplicated validation logic in form handlers.",
    completed: false,
    priority: "medium",
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: 5,
    title: "Sync with design team",
    description: "Collect feedback for mobile spacing and color contrast.",
    completed: true,
    priority: "low",
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    id: 6,
    title: "Update dashboard metrics",
    description: "Add completed and pending counters to project dashboard.",
    completed: false,
    priority: "medium",
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 7,
    title: "Fix flaky UI test",
    description: "Stabilize task toggle test in CI environment.",
    completed: false,
    priority: "high",
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: 8,
    title: "Organize backlog",
    description: "Archive outdated issues and regroup remaining work.",
    completed: true,
    priority: "low",
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 9,
    title: "Prepare release notes",
    description: "Summarize latest frontend and backend improvements.",
    completed: false,
    priority: "medium",
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 10,
    title: "Database backup check",
    description: "Verify nightly backup job and storage retention policy.",
    completed: false,
    priority: "high",
    createdAt: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
  },
];

let newId = tasks.length + 1;

const getNewId = () => {
  const id = newId;
  newId += 1;
  return id;
};
module.exports = { tasks, possiblePriorities, getNewId };
