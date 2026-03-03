let tasks = [];
const possiblePriorities = ["low", "medium", "high"];
let newId = 1;

const getNewId = () => {
  const id = newId;
  newId += 1;
  return id;
};
module.exports = { tasks, possiblePriorities, getNewId };
