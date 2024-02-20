/*IMPORTANT
idk why but data do no change on sever side so ofc i made req on update/delete/create but i didnt make request to actual data (getTodos) bc
it is make no sense so... may be im wrong and just didnt find the way to get updated data but as i remebmer it is default issue 
with this api
*/

import { fetchData } from "./config";
import {
  getLocalStorageArray,
  setLocalStorageArray,
  deleteFromLocalStorageById,
  updateLocalStorageById,
  createLocalStorageTodo,
} from "./localstorage";

async function* fetchTodos() {
  for (let i = 1; i <= 10; i++) {
    const response = await fetchData("GET", `todos/${i}`, {});
    yield response;
  }
}

export const api = {
  getTodos: async () => {
    if (!getLocalStorageArray("todolist")) {
      const todoList = [];
      for await (const todo of fetchTodos()) {
        todoList.push(todo);
      }
      setLocalStorageArray("todolist", todoList);

      return getLocalStorageArray("todolist");
    }

    return getLocalStorageArray("todolist");
  },
  updateTodo: async (id, newVal, oldVal) => {
    const data = await fetchData("PUT", `todos/${id}`, {
      body: JSON.stringify({
        ...oldVal,
        ...newVal,
      }),
    });
    updateLocalStorageById(id, "todolist", newVal);

    return data;
  },
  deleteTodo: async (id) => {
    const data = await fetchData("DELETE", `todos/${id}`, {});
    deleteFromLocalStorageById("todolist", id);

    return data;
  },
  createTodo: async (value, id) => {
    await fetchData("POST", `todos`, {
      body: JSON.stringify({
        id: id,
        title: value,
        userId: 1,
      }),
    });

    createLocalStorageTodo("todolist", {
      id: id,
      title: value,
      userId: 1,
      completed: false,
    });

    return {
      id: id,
      title: value,
      userId: 1,
      completed: false,
    };
  },
};
