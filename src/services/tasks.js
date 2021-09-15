let tasks = [];

const create = (task) => {
  tasks = [task, ...tasks];
  // console.log("tasks", tasks);
};

const read = () => {
  return tasks;
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
};
