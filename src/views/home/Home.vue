<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
    <tab-control
      v-show="isTabFixed"
      ref="tabControlSun"
      :titles="titles"
      class="tabControl"
      @itemClick="tabClick"
    />

    <scroll
      ref="scroll"
      :probe-type="3"
      @scroll="handleScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
      :data="myAsList"
    >
      <div class="content">
        <home-swiper :banners="banners" @homeImageLoad="imageLoad" />
        <recommend-view :recommends="recommends" @homeImageLoad="imageLoad" />
        <feature-view @homeImageLoad="imageLoad" />
        <tab-control ref="tabControlMoon" :titles="titles" @itemClick="tabClick" />
        <goods-list :goods="myAsList" />
        <pullup-tips :isPullUpLoad="isPullUpLoad" />
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

import HomeSwiper from "./components/HomeSwiper";
import RecommendView from "./components/RecommendView";
import FeatureView from "./components/FeatureView";
import PullupTips from "./components/PullupTips.vue";

import { getHomeMultidata, getHomeGoods } from "api/home.js";
import { BScrollRefreshMixin, backTopMixin, tabControlMixin } from "utils/mixins";

import { TYPES } from "constants";

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
    PullupTips,
  },
  data() {
    let model = {
      page: 0,
      list: [],
      scroll: 0,
    };
    return {
      banners: [],
      recommends: [],
      isTabFixed: false,
      titles: ["流行", "新款", "精选"],
      // 初始化保存数据的数据结构
      goods: {
        pop: JSON.parse(JSON.stringify(model)),
        new: JSON.parse(JSON.stringify(model)),
        sell: JSON.parse(JSON.stringify(model)),
      },
      saveY: 0,
      isPullUpLoad: false,
    };
  },
  async created() {
    // 1. 请求多个数据
    this.getMultiData();

    // 2. 请求商品数据
    TYPES.forEach(this.getGoodsInfo);
  },
  computed: {
    myAsList() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     *  事件监听相关方法
     */
    async tabClick(index) {
      // 缓存上次类型
      let lastType = this.currentType;

      // 方案一
      this.goods[lastType].scroll = this.scroll.getScrollY();

      // // 更改当前的类型
      this.switchType(index);

      // // 获取当前类型的scroll位置 (滚动坐标系向下滚动,y为负值)
      let pos = this.goods[this.currentType].scroll;

      let lastPos = this.goods[lastType].scroll;

      // 简写
      let y = this.isTabFixed
        ? -pos >= this.tabOffsetTop
          ? pos
          : -this.tabOffsetTop
        : lastPos;

      this.$refs.scroll.scroll.scrollTo(0, y, 0);

      // 方案二

      // // 当tabControl处于固定状态下, 我需要保存他滚动时当状态
      // if (this.isTabFixed) {
      //   // 记录上次滚动位置
      //   this.goods[lastType].scroll = this.scroll.getScrollY();
      //   // pos : 上次保存的y值
      //   // -this.tabOffsetTop 如果第一次没有保存上一次滚动位置, 初始化值为 -this.tabOffsetTop
      //   let y = -pos >= this.tabOffsetTop ? pos : -this.tabOffsetTop;
      //   this.$refs.scroll.scroll.scrollTo(0, y, 0);
      // }
      // else{
      // tabControl没有固定,那么不做滚动,只做数据的切换
      // }

      // 将两个tabControl的选中状态进行统一
      this.$refs.tabControlSun.currentIndex = index;
      this.$refs.tabControlMoon.currentIndex = index;
    },
    handleScroll(pos) {
      // 控制backtop是否显示
      this.backTopControl(pos);
      this.isTabFixed = -pos.y >= this.tabOffsetTop;
    },
    async loadMore() {
      this.isPullUpLoad = true;

      // 同步其他类型的数据,两者进行切换时,滚动最大值偏差太大,导致滚动出现问题
      TYPES.forEach(this.getGoodsInfo);
    },
    imageLoad() {
      // 轮播等图片加载完成后记录tabControl的y偏移
      this.tabOffsetTop = this.$refs.tabControlMoon.$el.offsetTop;
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
      let item = this.goods[type];
      const page = item.page + 1;

      let { data } = await getHomeGoods(type, page);
      item.list.push(...data.list);
      item.page = page;

      // 上拉加载后,数据已经展示,可以进行下次加载
      this.scroll.finishPullUp();
      // 每次下拉进行刷新
      this.scroll.refresh();
      this.isPullUpLoad = false;
    },
  },
  mixins: [BScrollRefreshMixin, backTopMixin, tabControlMixin],
  deactivated() {
    // 离开首页时取消监听
    this.$bus.$off("itemImageLoad", this.handleImageLoad);
    // 记录滚动位置
    this.saveY = this.scroll.getScrollY();
  },
  activated() {
    // 当进入页面时滚动到之前保存到位置
    this.scroll.scrollTo(0, this.saveY);
    this.scroll.refresh();
    this.$bus.$on("itemImageLoad", this.handleImageLoad);
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 10;
  font-size: 15px;
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
