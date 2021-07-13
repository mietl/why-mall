<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      @click="itemClick(index)"
      :class="{ active: currentIndex === index }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    },
  },
};
</script>

<style  scoped>
.tab-control {
  display: flex;
  text-align: center;
  background: #fff;
  height: 11.73333vw;
  line-height: 11.73333vw;
  z-index: 5;
}

.tab-control-item {
  flex: 1;
  font-size: 4vw;
}

.active {
  color: var(--color-high-text);
}
.active span {
  padding: 1.6vw 1.33333vw;
  border-bottom: 0.53333vw solid var(--color-high-text);
}
</style>