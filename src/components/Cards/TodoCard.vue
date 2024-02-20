<template>
  <article class="card">
    <h2>{{ todo.title }}</h2>
    <div class="card__options">
      <button class="update" :disabled="disabled" @click="open(todo)">
        update
      </button>
      <button
        class="toggle"
        :class="{ undone: !todo.completed }"
        :disabled="disabled"
        @click="update(!todo.completed, 'completed', todo)"
      >
        {{ todo.completed ? "done" : "undone" }}
      </button>
      <button class="delete" :disabled="disabled" @click="remove(todo.id)">
        delete
      </button>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  todo: Object,
  disabled: Boolean,
});
const emit = defineEmits(["openModal", "updateStatus", "deleteTodo"]);

const update = (value, type, todo) => {
  emit("updateStatus", value, type, todo);
};

const open = (todo) => {
  emit("openModal", todo);
};
const remove = (id) => {
  emit("deleteTodo", id);
};
</script>

<style scoped lang="scss">
.card {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 15px;
  background-color: gainsboro;
  padding: 15px 15px;
  align-items: center;
  h2 {
    font-size: 24px;
    max-width: 80%;
  }
  &__options {
    display: flex;
    gap: 10px;
    button {
      width: 70px;
      border: none;
      padding: 15px 0;
      color: #fff;
    }
    .update {
      background-color: rgb(50, 146, 215);
    }
    .delete {
      background-color: rgb(224, 70, 70);
    }
    .toggle {
      background-color: rgb(73, 162, 73);
    }
    .undone {
      background-color: rgb(105, 104, 104);
    }
  }
}
@media screen and (max-width: 980px) {
  .card {
    flex-direction: column;
    gap: 10px;
    margin: 15px;
    h2 {
      max-width: 100%;
    }
  }
}
</style>
