let tasks = [];
const storageKey = "tasks-vue-compo-api";

const save = () => {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
};

const retrieveTasks = () => {
  const fromLocalStorage = localStorage.getItem(storageKey);
  return JSON.parse(fromLocalStorage);
};

const create = (task) => {
  // if (tasks === null) {
  //   tasks = [];
  // }
  tasks = [task, ...tasks];
  // console.log("tasks", tasks);
  save();
};

const read = () => {
  tasks = retrieveTasks();
  return tasks;
};

const deleteTask = (id) => {
  tasks = tasks.filter((t) => t.id !== id);
  save();
};

const convertCase = (temporalityKebabCase) => {
  let result;
  switch (temporalityKebabCase) {
    case "short-term":
      result = "court terme";
      break;
    case "medium-term":
      result = "moyen terme";
      break;
    case "long-term":
      result = "long terme";
      break;
    default:
      result = temporalityKebabCase;
      break;
  }
  return result;
};

export default {
  create,
  read,
  convertCase,
  deleteTask,
  // save,
  // retrieveTasks,
};
