<template>
  <section class="filter">
    <div class="wrap">
      <div class="filter__option">
        <input
          type="radio"
          id="all"
          name="filter"
          value="all"
          v-model="filter"
        />
        <label for="all">all</label>
      </div>
      <div class="filter__option">
        <input
          type="radio"
          id="done"
          name="filter"
          value="done"
          v-model="filter"
        />
        <label for="done">done</label>
      </div>
      <div class="filter__option">
        <input
          type="radio"
          id="undone"
          name="filter"
          value="undone"
          v-model="filter"
        />
        <label for="undone">undone</label>
      </div>
    </div>
    <button class="filter__button" @click="toggleModal">New</button>
  </section>
</template>

<script setup>
const filter = defineModel();

const emit = defineEmits(["openModal"]);

const toggleModal = () => {
  emit("openModal");
};
</script>

<style lang="scss" scoped>
.filter {
  &__option {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  &__button {
    background-color: rgb(50, 146, 215);
    border: none;
    color: #fff;
    padding: 15px;
    width: 100%;
  }
}
@media screen and (max-width: 980px) {
  .filter {
    .wrap {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }
  }
}
</style>
