const fs = require("fs"); //file system trong nodejs
const readAllTodo = () => {
  const buffer = fs.readFileSync("app/todos.json"); //hex
  // chuyen sang chuoi
  const todoString = buffer.toString();
  //chuyen sang Json
  const todoJson = JSON.parse(todoString);

  console.log("read-all", todoJson);
  return todoJson;
};
const createTodo = (title, description) => {
  const newTodo = {
    id: Math.random().toString(),
    title,
    description,
  };
  let todoList = readAllTodo();
  todoList = [...todoList, newTodo];
  fs.writeFileSync("app/todos.json", JSON.stringify(todoList));
  console.log("newTodo", newTodo);
};
const readDetailTodo = (id) => {
  let todoList = readAllTodo();
  const todo = todoList.find((todo) => id == todo.id);
  return todo;
};
const updateTodo = (id, title, description) => {
  let todoList = readAllTodo();
  const index = todoList.findIndex((task) => task.id == id);
  if (index != -1) {
    //thuc hien update
    const oldTodo = todoList[index];
    const newTodo = { ...oldTodo, title, description };
    todoList[index] = newTodo;
    fs.writeFileSync("app/todos.json", JSON.stringify(todoList));
    return newTodo;
  } else {
    return false;
  }
};
const deleteTodo = (id) => {
  let todoList = readAllTodo();
  const index = todoList.findIndex((task) => task.id == id);
  if (index != -1) {
    const todo = todoList[index];
    todoList = todoList.filter((todo) => todo.id !== id);
    fs.writeFileSync("app/todos.json", JSON.stringify(todoList));
    return todo;
  } else {
    return false;
  }
};
module.exports = {
  readAllTodo,
  createTodo,
  readDetailTodo,
  updateTodo,
  deleteTodo,
};
