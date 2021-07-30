<template>
  <div class="checkbox-button" :class="{ checked: isChecked }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CheckboxButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.checkbox-button {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.check-button img {
  width: 100%;
}

.checked {
  background: #ff8344;
  border-color: #ff8344;
}
</style>
