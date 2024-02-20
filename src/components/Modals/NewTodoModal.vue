<template>
  <div class="modal">
    <button class="close" @click="close">Close</button>
    <div class="modal__wrap">
      <div class="modal__wrap--content">
        <h2>
          {{
            typeOfForm == "update"
              ? `Update todo ${updatingTodo.id}`
              : "Create new todo"
          }}
        </h2>
        <form @submit.prevent="submit">
          <input type="text" v-model="inputValue" />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRef } from "vue";

const emit = defineEmits(["close", "update", "create"]);
const props = defineProps({
  updatingTodo: Object,
  typeOfForm: String,
});

const inputValue = toRef(props.updatingTodo?.title);

const update = () => {
  if (inputValue.value === props.updatingTodo.title) {
    return;
  }
  emit("update", inputValue.value);
  emit("close");
};

const create = () => {
  if (!inputValue.value) {
    return;
  }
  emit("create", inputValue.value);
  emit("close");
};

const submit = () => {
  if (props.typeOfForm === "create") {
    create();
  } else if (props.typeOfForm === "update") {
    update();
  }
};

const close = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  .close {
    background-color: transparent;
    color: #fff;
    border: none;
    font-size: 24px;
    margin-top: 10px;
  }
  &__wrap {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &--content {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #fff;
      padding: 15px;
      gap: 10px;
      form {
        display: flex;
        flex-direction: column;
        gap: 5px;
        input {
          font-size: 24px;
        }
        button {
          background-color: rgb(50, 146, 215);
          color: #fff;
          border: none;
          padding: 10px;
        }
      }
    }
  }
}
</style>
