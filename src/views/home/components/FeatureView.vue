<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" @load="imageLoad" alt="" />
    </a>
  </div>
</template>

<script>
export default {
  name: "Feature",
  methods: {
    imageLoad() {
      this.$emit("homeImageLoad");
    },
  },
};
</script>

<style scoped>
.feature img {
  width: 100%;
}
</style>
