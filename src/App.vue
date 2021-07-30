<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
    <icon />
    <svg-icon />
  </div>
</template>

<script>
import MainTabBar from "components/main/mainTabbar/MainTabBar.vue";

import Icon from "components/main/icon/Icon.vue";
import SvgIcon from "components/main/icon/SVG.vue";

export default {
  name: "App",
  components: {
    MainTabBar,
    Icon,
    SvgIcon
  },
};
</script>

<style>
@import "assets/css/style.css";
</style>
