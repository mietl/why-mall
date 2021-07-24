<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
    <tab-control
      v-show="isShowTopTabControl"
      ref="tabControlSun"
      :titles="titles"
      class="tabControl"
      @tabClick="tabClick"
    />

    <scroll
      ref="scroll"
      :probe-type="3"
      @scroll="handleScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <div class="content">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
        <recommend-view :recommends="recommends" />
        <feature-view />
        <tab-control ref="tabControlMoon" :titles="titles" @tabClick="tabClick" />

        <goods-list :goods="myMapAsList" />
      </div>
    </scroll>
    <!-- navtive  监听组件根元素的原生事件 -->
    <back-top @click.native="backTop" v-show="isShowBackTop" />
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

import { getHomeMultidata, getHomeGoods } from "api/home.js";
import { mixin } from "utils/mixins";

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
    BackTop,
  },
  data() {
    let obj = { page: 0, list: [], scroll: 0 };

    return {
      type: "pop",
      banners: [],
      recommends: [],
      isShowTopTabControl: false,
      isShowBackTop: false,
      isInit: false,
      titles: ["流行", "新款", "精选"],
      // goods: new Map(
      //   Object.entries({
      //     pop: new Map(Object.entries(JSON.parse(JSON.stringify(obj)))),
      //     new: new Map(Object.entries(JSON.parse(JSON.stringify(obj)))),
      //     sell: new Map(Object.entries(JSON.parse(JSON.stringify(obj)))),
      //   })
      // ),
      goods: {
        pop: JSON.parse(JSON.stringify(obj)),
        new: JSON.parse(JSON.stringify(obj)),
        sell: JSON.parse(JSON.stringify(obj)),
      },
      // myMapChangeTracker: 1,
    };
  },
  async created() {
    // 1. 请求多个数据
    this.getMultiData();

    // 2. 请求商品数据
    this.getGoodsInfo("pop");
    this.getGoodsInfo("new");
    this.getGoodsInfo("sell");
  },
  computed: {
    myMapAsList() {
      // By using `mySetChangeTracker` we tell Vue that this property depends on it,
      // so it gets re-evaluated whenever `mySetChangeTracker` changes
      // return this.myMapChangeTracker && Array.from(this.goods.get(this.type).get("list"));
      return this.goods[this.type].list;
    },
  },
  methods: {
    /**
     *  事件监听相关方法
     */
    tabClick(index) {
      let types = ["pop", "new", "sell"];

      // 缓存上次类型
      let cache = this.type;

      // 更改当前的类型
      this.type = types[index];

      // 只有当TabControl处于固定状态时, 才需要保存上个类型的scroll(当TabControl不处于固定 直接切换会导致 滚动到之前保存scroll位置)
      if (!(-this.$refs.scroll.getScrollY() < this.tabOffsetTop)) {
        // 保存上个类型的scroll位置
        this.goods[cache].scroll = -this.$refs.scroll.getScrollY();
        // 滚动到要切换到当前类型
        this.$refs.scroll.scrollTo(0, -this.goods[this.type].scroll, 0);
      }

      // 将两个tabControl的选中状态进行统一
      this.$refs.tabControlSun.currentIndex = index;
      this.$refs.tabControlMoon.currentIndex = index;
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    handleScroll(pos) {
      this.isShowBackTop = -pos.y > 1000;
      this.isShowTopTabControl = -pos.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getGoodsInfo(this.type);
    },
    swiperImageLoad() {
      // 轮播图片加载完成后记录tabControl的y偏移
      this.tabOffsetTop = this.$refs.tabControlMoon.$el.offsetTop;
      
      // 初始化scroll到状态
      this.goods["pop"].scroll = this.tabOffsetTop;
      this.goods["new"].scroll = this.tabOffsetTop;
      this.goods["sell"].scroll = this.tabOffsetTop;
    },

    /**
     *  网络请求相关方法
     */
    async getMultiData() {
      let { banner, recommend } = (await getHomeMultidata()).data;
      this.banners = banner.list;
      this.recommends = recommend.list;
    },
    async getGoodsInfo(type) {
      // let item = this.goods.get(type);
      // const page = item.get("page") + 1;
      // item.get("list").push(...data.list);
      // item.set("page", page);

      // myMapChangeTracker发生改变, myMapAsList发生了变化,需要重新计算,从而达到监听map的变化
      // this.myMapChangeTracker += 1;

      let item = this.goods[type];
      const page = item.page + 1;

      let { data } = await getHomeGoods(type, page);
      item.list.push(...data.list);
      item.page = page;

      // 上拉加载后,数据已经展示,可以进行下次加载
      this.$refs.scroll.finishPullUp();
    },
  },
  mixins: [mixin],
  deactivated() {
    this.$bus.$off("itemImageLoad", this.itemImagehandler);
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

.tabControl {
  position: relative;
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
