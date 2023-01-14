const yargs = require("yargs");
const {
  readAllTodo,
  createTodo,
  readDetailTodo,
  updateTodo,
  deleteTodo,
} = require("./model/todo");

// tao lenh test
yargs.command({
  command: "test",
  handler: () => {
    console.log("test");
  },
});

// tạo các lệnh CRUD
//- node app/index.js create --title="Nau com" --description="chuan com me nau"
yargs.command({
  command: "create",
  //ham giup truyen tham so
  builder: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  //args nhan cac tham so truyen vao tu ham builder
  handler: (args) => {
    const { title, description } = args;
    createTodo(title, description);
  },
});
//- node app/index.js read-all
yargs.command({
  command: "read-all",
  handler: () => {
    readAllTodo();
  },
});
//- node app/index.js read-detail
yargs.command({
  command: "read-detail",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const todo = readDetailTodo(id);
    if (todo) {
      console.log("todo: ", todo);
    } else {
      console.log("not found");
    }
    console.log("read-detail");
  },
});
//- node app/index.js update --id="1" --title="acc" --description="ok man"
yargs.command({
  command: "update",
  builder: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, title, description } = args;
    const todo = updateTodo(id, title, description);
    if (todo) {
      console.log("todo update: ", todo);
    } else {
      console.log("not found");
    }
  },
});
//- node app/index.js delete
yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const todo = deleteTodo(id);
    if (todo) {
      console.log("todo delete: ", todo);
    } else {
      console.log("not found");
    }
  },
});
//save lenh vua tao
yargs.parse();
