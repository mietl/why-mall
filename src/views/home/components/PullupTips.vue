<template>
  <div class="pullup-tips">
    <div v-if="!isPullUpLoad" class="before-trigger">
      <span class="pullup-txt">Pull up and load more</span>
    </div>
    <div v-else class="after-trigger">
      <span class="pullup-txt">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PullupTips",
  created() {},
  data() {
    return {};
  },
  props: {
    isPullUpLoad:Boolean
  },
  methods: {},
};
</script>

<style scoped>
.pullup-tips{
  padding: 20px ;
  text-align: center;
  color: #999;
}
</style>
