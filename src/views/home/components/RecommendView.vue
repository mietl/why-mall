<template>
  <div class="recommend">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="recommend-item"
    >
      <a href="item.link">
        <img :src="item.image" :alt="item.link" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  text-align: center;
  font-size: 3.46667vw;
  padding-bottom: 6.66667vw;
  border-bottom: 2.13333vw solid #eee;
}

.recommend-item {
  flex: 1;
  margin-top: 2.66667vw;
}

.recommend-item a {
  display: block;
}

.recommend-item a img {
  width: 85%;
  margin-bottom: 2.66667vw;
}
</style>