<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/main/mainTabbar/MainTabBar.vue';
export default {
  name: "App",
  components: {
    MainTabBar
  },
};
</script>

<style>
  @import "assets/css/style.css";
</style>
