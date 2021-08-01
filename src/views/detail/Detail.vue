<template>
  <div id="detail">
    <detail-nav-bar ref="navbar" @themeClick="themeClick" />
    <scroll ref="scroll" @scroll="handleScroll" :probeType="3">
      <detail-swiper ref="goods" :topImages="topImages" />
      <detail-base-info :goodsInfo="goodsInfo" />
      <detail-shop-info :shopInfo="shopInfo" />
      <detail-image-info :imageInfo="imageInfo" @imageLoad="imageLoad" />
      <detail-params-info ref="params" :paramsInfo="paramsInfo" />
      <detail-comment-info ref="comment" :commentsInfo="commentsInfo" />
      <goods-list ref="recommend" :goods="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./components/DetailNavBar";
import DetailSwiper from "./components/DetailSwiper";
import DetailBaseInfo from "./components/DetailBaseInfo";
import DetailImageInfo from "./components/DetailImageInfo";
import DetailShopInfo from "./components/DetailShopInfo";
import DetailParamsInfo from "./components/DetailParamsInfo.vue";
import DetailCommentInfo from "./components/DetailCommentInfo.vue";
import DetailBottomBar from "./components/DetailBottomBar";

import GoodsList from "components/main/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, getRecommend } from "api/detail.js";

import { BScrollRefreshMixin, backTopMixin } from "utils/mixins";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  data() {
    return {
      id: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      imageInfo: {},
      paramsInfo: {},
      commentsInfo: [],
      recommend: [],
      themeDisTopY: [],
      getThemeDisTopY: null,
      currentIndex: 0,
      navbarHeight: 0,
      // isLoaded: false, // 用于判断图片是否已经加载完成
      // counter: 0,
    };
  },
  created() {
    // 请求详情数据并保存
    this.getDetailInfo();
    // 请求推荐数据
    this.getRecommend();

    // 对 this.themeTopDisY赋值操作进行防抖
  },
  mounted() {
    // 方案一
    // this.navbarHeight = this.$refs.navbar.$el.offsetHeight;
    // this.getThemeDisTopY = debounce(() => {
    // this.themeDisTop值的获取
    // 在 created中获取 ,压根获取不到元素
    // mounted 中回获取时,数据还未获取到
    // 在获取到数据的回调中也不行,dom还没有渲染完
    // $nextTick中, 图片高度没有计算在内
    // 因此在图片加载完后,获取高度
    // this.getThemeDisTopY()
    //   this.themeDisTopY = [0];
    //   this.themeDisTopY.push(this.$refs.params.$el.offsetTop - this.navbarHeight);
    //   this.themeDisTopY.push(this.$refs.comment.$el.offsetTop - this.navbarHeight);
    //   this.themeDisTopY.push(this.$refs.recommend.$el.offsetTop - this.navbarHeight);
    //   // 保存 js 中的最大数：
    //   this.themeDisTopY.push(Number.MAX_VALUE);
    // }, 100);
  },
  methods: {
    ...mapActions(["addCartAction"]),
    async addToCart() {
      // 1. 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.iid = this.id;

      // 2. 将商品添加到购物车里
      const message = await this.addCartAction(product);
      // this.$store.dispatch('addCartAction',product)

      this.$toast.show(message);
    },
    handleScroll(pos) {
      // 1. 获取y值
      let y = -pos.y;

      // 2. y和主题中值进行对比
      // [0, 6251, 7171, 7383]

      // y 在 0 和 6251 之间 ,index = 0
      // y 在 =6251 和 7171 之间 ,index =1
      // y 在 =7171 和 7383 之间 , index = 2

      // y 大于等于 7383 , index 3
      let len = this.themeDisTopY.length;
      // 多加了一个,因此少遍历他
      for (let i = 0; i < len - 1; i++) {
        if (
          this.currentIndex != i &&
          y >= this.themeDisTopY[i] &&
          y < this.themeDisTopY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
      }
      // for (let i = 0; i < len; i++) {
      //   if (
      //     this.currentIndex != i &&
      //     (
      //       i < len - 1 &&
      //       y >= this.themeDisTopY[i] &&
      //       y < this.themeDisTopY[i + 1]) ||
      //     (i == len - 1 && y >= this.themeDisTopY[i])
      //   ) {

      //     this.currentIndex = i;
      //     this.$refs.navbar.currentIndex = this.currentIndex;
      //   }
      // }

      this.backTopControl(pos);
    },
    imageLoad() {
      // 当图片加载完bscroll进行刷新
      // this.$refs.scroll.refresh();

      // 使用混入的防抖函数进行刷新
      // if (++this.counter === this.imageInfo.detailImage[0].list.length) {
      //   this.isLoaded = true;
      // }
      this.refresh();
    },
    themeClick(index) {
      let refKey = ["goods", "params", "comment", "recommend"],
        el = this.$refs[refKey[index]].$el;

      this.$refs.scroll.scrollToElement(el);

      // this.$refs.scroll.scrollTo(0, -this.themeDisTopY[index], 100);
    },
    async getDetailInfo() {
      // 1. 保存传入的id
      this.id = this.$route.params.id;

      // 2. 根据id请求详情数据
      let { result } = await getDetail(this.id);

      // 3. 获取顶部的图片轮播数据
      this.topImages = result.itemInfo.topImages;

      // 4. 整合商品基本信息数据
      this.goodsInfo = new Goods(result, result.shopInfo.services);

      // 5. 保存商家店铺信息
      this.shopInfo = result.shopInfo;

      // 6. 保存商品详情信息
      this.imageInfo = result.detailInfo;

      // 7. 保存参数信息
      this.paramsInfo = result.itemParams;

      // 8. 保存评论信息
      if (result.rate.cRate) {
        this.commentsInfo = result.rate.list;
      }
    },
    async getRecommend() {
      let { data } = await getRecommend();
      this.recommend = data.list;
    },
  },
  mixins: [BScrollRefreshMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  destroyed() {
    // 当离开详情时,取消监听事件
    this.$bus.$off("itemImageLoad", this.handleImageLoad);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 20;
  background-color: #fff;
}

.wrapper {
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>
