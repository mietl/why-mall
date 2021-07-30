<template>
  <div id="tab-menu">
    <div class="menu-list">
      <div
        v-for="(item, index) in categories"
        :key="index"
        class="menu-list-item"
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "TabMenu",
  created() {},
  data() {
    return {
      currentIndex: 0,
    };
  },
  components: {
    Scroll,
  },
  props: {
    categories: Array,
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('selectItem',index)
    },
  },
};
</script>

<style scoped>
#tab-menu {
  background-color: #f6f6f6;
  width: 100px;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.menu-list-item.active {
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 2.5px solid var(--color-high-text);
}
</style>
