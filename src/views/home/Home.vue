<template>
  <div id="home">
    <nav-bar class="home-nav">
        <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" />
  </div>
</template>



<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./components/HomeSwiper.vue"

import { getHomeMultidata } from 'api/home'
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper
  },
  data(){
    return {
      banners: [],
      recommends:[],
    }
  },
  async created(){
    // 1. 请求多个数据
    let { banner,recommend } = (await getHomeMultidata()).data;

    this.banners = banner.list;
    this.recommends = recommend.list

  }


};
</script>

<style scoped>

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
