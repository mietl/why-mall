<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
    <tab-control
      v-show="isShowTopTabControl"
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
      :data="myMapAsList"
    >
      <div class="content">
        <home-swiper :banners="banners" @homeImageLoad="imageLoad" />
        <recommend-view :recommends="recommends" @homeImageLoad="imageLoad" />
        <feature-view @homeImageLoad="imageLoad" />
        <tab-control ref="tabControlMoon" :titles="titles" @itemClick="tabClick" />
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

import HomeSwiper from "./components/HomeSwiper";
import RecommendView from "./components/RecommendView";
import FeatureView from "./components/FeatureView";

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
  },
  data() {
    return {
      type: TYPES[0],
      banners: [],
      recommends: [],
      isShowTopTabControl: false,
      titles: ["流行", "新款", "精选"],
      // goods: new Map(
      //   Object.entries({
      //     pop: new Map(Object.entries(JSON.parse(JSON.stringify(obj)))),
      //     new: new Map(Object.entries(JSON.parse(JSON.stringify(obj)))),
      //     sell: new Map(Object.entries(JSON.parse(JSON.stringify(obj)))),
      //   })
      // ),
      goods: {},
      saveY: 0,
      // myMapChangeTracker: 1,
    };
  },
  async created() {
    // 初始化保存数据的数据结构
    this._initData();

    // 1. 请求多个数据
    this.getMultiData();

    // 2. 请求商品数据
    TYPES.forEach(this.getGoodsInfo);
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
    _initData() {
      let temp = { page: 0, list: [], scroll: 626 },
        create = (item) => this.$set(this.goods, item, JSON.parse(JSON.stringify(temp)));
      TYPES.forEach(create);
    },
    /**
     *  事件监听相关方法
     */
    tabClick(index) {
      // bug 当没有滚动动画时,图片可能会闪动

      // 缓存上次类型
      let cache = this.type;
      // 更改当前的类型
      // this.switchType(index);
      this.type = TYPES[index];

      // 只有当TabControl处于固定状态时, 才需要保存上个类型的scroll(当TabControl不处于固定 直接切换会导致 滚动到之前保存scroll位置)
      if (!(-this.$refs.scroll.getScrollY() < this.tabOffsetTop)) {
        // 保存上个类型的scroll位置
        this.goods[cache].scroll = -this.$refs.scroll.getScrollY();

        // 滚动到要切换到当前类型

        //  注意 当我滚动到指定距离时会触发数据的更新,必须当数据发送改变时必须刷新
        this.$refs.scroll.scroll.scrollTo(0, -1000, 0);
      }


      // 将两个tabControl的选中状态进行统一
      this.$refs.tabControlSun.currentIndex = index;
      this.$refs.tabControlMoon.currentIndex = index;
    },

    handleScroll(pos) {
      // 控制backtop是否显示
      this.backTopControl(pos);

      this.isShowTopTabControl = -pos.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getGoodsInfo(this.type);
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
  mixins: [BScrollRefreshMixin, backTopMixin, tabControlMixin],
  deactivated() {
    // 离开首页时取消监听
    this.$bus.$off("itemImageLoad", this.handleImageLoad);
    // 记录滚动位置
    this.saveY = this.$refs.scroll.getScrollY();
  },
  activated() {
    // 当进入页面时滚动到之前保存到位置
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh();
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
