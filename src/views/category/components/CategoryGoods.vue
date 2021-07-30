<template>
  <goods-list :goods="goods" />
</template>

<script>
import GoodsList from "components/main/goods/GoodsList";

export default {
  name: "CategoryGoods",
  components: {
    GoodsList,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style  scoped>

</style>