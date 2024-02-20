<template>
  <main class="main">
    <div class="container">
      <TodoFilter v-model="filter" @openModal="toggleModal" />
      <section class="list" v-if="filteredList.length">
        <TodoCard
          v-for="todo in filteredList"
          :key="todo.id"
          :todo="todo"
          :disabled="disabledAll"
          @openModal="toggleUpdateModal"
          @updateStatus="updateStatus"
          @deleteTodo="deleteTodo"
        />
      </section>
      <section class="loader" v-else-if="listLoading">
        <BigLoader />
      </section>
      <section v-else-if="listError">
        <h2>Something went wrong</h2>
      </section>
      <section v-else>
        <h2>Nothing found</h2>
      </section>
    </div>
    <NewTodoModal
      v-if="isModalOpen"
      @close="toggleModal"
      @update="updateTitle"
      @create="createTodo"
      :updatingTodo="aboutToUpdate"
      :typeOfForm="typeOfForm"
    />
  </main>
</template>

<script setup>
import { api } from "./api/main";
import { computed, onMounted, ref } from "vue";

import TodoCard from "./components/Cards/TodoCard.vue";
import TodoFilter from "./components/Filters/TodoFilter.vue";
import NewTodoModal from "./components/Modals/NewTodoModal.vue";
import BigLoader from "./components/Loaders/BigLoader.vue";

const todoList = ref([]);
const listLoading = ref(false);
const listError = ref(false);

const disabledAll = ref(false);

const filter = ref("all");

const isModalOpen = ref(false);

const aboutToUpdate = ref(null);

const typeOfForm = ref("update");

const filteredList = computed(() => {
  switch (filter.value) {
    case "all":
      return todoList.value;
    case "done":
      return todoList.value.filter((el) => el.completed);
    case "undone":
      return todoList.value.filter((el) => !el.completed);
    default:
      return todoList.value;
  }
});

const deleteTodo = async (id) => {
  try {
    disabledAll.value = true;
    await api.deleteTodo(id);
    const deletedEl = todoList.value.findIndex((el) => el.id === id);
    todoList.value.splice(deletedEl, 1);
  } catch {
    console.log("del err");
  } finally {
    disabledAll.value = false;
  }
};

const createTodo = async (value) => {
  try {
    disabledAll.value = true;
    const idx = todoList.value.map((el) => el.id);
    let max = Math.max(...idx);
    const data = await api.createTodo(value, ++max);
    todoList.value.push(data);
  } catch {
    console.log("create err");
  } finally {
    disabledAll.value = false;
  }
};

const updateHandler = async (value, type) => {
  try {
    disabledAll.value = true;
    const data = await api.updateTodo(
      aboutToUpdate.value.id,
      { ...aboutToUpdate.value, [type]: value },
      aboutToUpdate.value
    );
    const updatedEl = todoList.value.findIndex((el) => el.id === data.id);
    todoList.value[updatedEl][type] = value;
  } catch {
    console.log("update err");
  } finally {
    disabledAll.value = false;
  }
};

const updateStatus = async (value, type, todo) => {
  aboutToUpdate.value = todo;
  await updateHandler(value, type);
};

const updateTitle = async (value) => {
  if (aboutToUpdate.value) {
    await updateHandler(value, "title");
  }
};

const getData = async () => {
  try {
    listError.value = false;
    listLoading.value = true;
    const data = await api.getTodos();
    todoList.value = data;
  } catch {
    listError.value = true;
  } finally {
    listLoading.value = false;
  }
};

const toggleModal = () => {
  aboutToUpdate.value = null;
  typeOfForm.value = "create";
  isModalOpen.value = !isModalOpen.value;
};

const toggleUpdateModal = (todo) => {
  aboutToUpdate.value = todo;
  typeOfForm.value = "update";
  isModalOpen.value = !isModalOpen.value;
};

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.loader {
  width: 100%;
}
.container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  gap: 15px;
  margin-top: 50px;
}
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
@media screen and (max-width: 1280px) {
  .container {
    max-width: 980px;
  }
}
@media screen and (max-width: 980px) {
  .container {
    flex-direction: column;
    margin: 15px;
  }
}
</style>
