<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>

    <scroll ref="scroll" :probe-type="3" 
    @scroll="handleScroll"
    :pull-up-load="true"
    @pullingUp="loadMore"
    >
      <div class="content">
        <home-swiper :banners="banners" />
        <recommend-view :recommends="recommends" />
        <feature-view />
        <tab-control
          :titles="['流行', '新款', '精选']"
          class="tabControl"
          @tabClick="tabClick"
        />

        <goods-list :goods="myMapAsList" />
      </div>
    </scroll>
    <!-- navtive  监听组件根元素的原生事件 -->
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/main/tabControl/TabControl";
import GoodsList from "components/main/goods/GoodsList";
import BackTop from "components/main/backTop/BackTop";

import HomeSwiper from "./components/HomeSwiper";
import RecommendView from "./components/RecommendView";
import FeatureView from "./components/FeatureView";

import { getHomeMultidata, getHomeGoods } from "api/home";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    let obj = { page: 0, list: [] };

    return {
      type: "pop",
      banners: [],
      recommends: [],
      isShowBackTop:false,
      goods: new Map(
        Object.entries({
          pop: new Map(Object.entries(JSON.parse(JSON.stringify(obj)))),
          new: new Map(Object.entries(JSON.parse(JSON.stringify(obj)))),
          sell: new Map(Object.entries(JSON.parse(JSON.stringify(obj)))),
        })
      ),
      myMapChangeTracker: 1,
    };
  },
  async created() {
    // 1. 请求多个数据
    this.getMultiData();

    // 2. 请求商品数据
    this.getGoods("pop");
    this.getGoods("new");
    this.getGoods("sell");
  },
  computed: {
    myMapAsList() {
      // By using `mySetChangeTracker` we tell Vue that this property depends on it,
      // so it gets re-evaluated whenever `mySetChangeTracker` changes
      return (
        this.myMapChangeTracker &&
        Array.from(this.goods.get(this.type).get("list"))
      );
    },
  },
  methods: {
    /**
     *  事件监听相关方法
     */
    tabClick(index) {
      let types = ["pop", "new", "sell"];
      this.type = types[index];
    },
    backTop(){
      this.$refs.scroll.scrollTo(0,0);
    },
    handleScroll(pos){
      this.isShowBackTop = (-pos > 1000);
    },
    loadMore(){
      console.log('上拉加载更多了');
      this.getGoods(this.type);
    },
    

    /**
     *  网络请求相关方法
     */
    async getMultiData() {
      let { banner, recommend } = (await getHomeMultidata()).data;
      this.banners = banner.list;
      this.recommends = recommend.list;
    },
    async getGoods(type) {
      let item = this.goods.get(type);
      const page = item.get("page") + 1;
      let { data } = await getHomeGoods(type, page);

      item.get("list").push(...data.list);
      item.set("page", page);
      this.myMapChangeTracker += 1;
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  z-index: 10;
}

.fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
}

.wrapper {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
</style>
