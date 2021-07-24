<template>
  <nav-bar id="nav-bar">
    <div slot="left" class="back" @click="back">
      <img src="~assets/img/common/back.svg" alt="" />
    </div>
    <div slot="center" class="title">
      <div
        v-for="(item, index) in titles"
        :key="index"
        class="title-item"
        :class="{ active: currentIndex == index }"
        @click="itemClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('themeClick',index)
    },
    back() {
      this.$router.back();
    },
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
#nav-bar {
  background-color: #fff;
  position: relative;
  z-index: 12;
}
.title {
  display: flex;
  font-size: 13px;
  align-items: center;
}

.title-item {
  flex: 1;
}

.back img {
  margin-top: 12px;
}
.active {
  color: var(--color-high-text);
}
</style>
