<template>
  <div class="category-item">
    <a :href="categoryItem.link">
      <img :src="categoryItem.image" @load="imageload" class="item-img" alt="" />
      <div class="item-text">{{ categoryItem.title }}</div>
    </a>
  </div>
</template>

<script>
export default {
  name: "CategoryListItem",
  props: {
    categoryItem: Object,
  },
  methods: {
    imageload() {
      this.$bus.$emit("itemImageLoad");
    },
  },
};
</script>

<style scoped>
.category-item {
  text-align: center;
  font-size: 12px;
}

.item-img {
  width: 80%;
}

.item-text {
  margin-top: 15px;
}
</style>
