<template>
  <div id="detail">
    <detail-nav-bar ref='navbar' @themeClick="themeClick"/>
    <scroll ref="scroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shopInfo="shopInfo" />
      <detail-image-info :imageInfo="imageInfo" @imageLoad="imageLoad" />
      <detail-params-info ref='params' :paramsInfo="paramsInfo" />
      <detail-comment-info ref='comment' :commentsInfo="commentsInfo" />
      <goods-list ref='recommend' :goods="recommend" ></goods-list>
    </scroll>
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

import GoodsList from "components/main/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, getRecommend } from "api/detail.js";

import { mixin } from "utils/mixins";
import { debounce } from 'utils';

export default {
  name: "Detail",
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shopInfo: {},
      imageInfo: {},
      paramsInfo: {},
      commentsInfo: [],
      recommend: [],
      themeDisTopY:[],
      getThemeDisTopY:null
    };
  },
  created() {
    // 请求详情数据并保存
    this.getDetailInfo();
    // 请求推荐数据
    this.getRecommend();



    // 对 this.themeTopDisY赋值操作进行防抖
    this.getThemeDisTopY = debounce(()=>{
      this.themeDisTopY = [0]
      this.themeDisTopY.push(this.$refs.params.$el.offsetTop);
      this.themeDisTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeDisTopY.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeDisTopY);
    },100);
  },
  methods: {
    imageLoad() {
      // 当图片加载完bscroll进行刷新
      // this.$refs.scroll.refresh();

      // 使用混入的防抖函数进行刷新
      this.refresh();


    // this.themeDisTop值的获取
    // 在 created中获取 ,压根获取不到元素
    // mounted 中回获取时,数据还未获取到
    // 在获取到数据的回调中也不行,dom还没有渲染完
    // $nextTick中, 用完图片高度没有计算在内

    // 因此在图片加载完后,获取高度
      this.getThemeDisTopY();
    },
    themeClick(index){
      let disY = this.themeDisTopY[index] - this.$refs.navbar.$el.offsetHeight;
      console.log(disY);
      this.$refs.scroll.scrollTo(0,-disY,100)
    },
    async getDetailInfo() {
      // 1. 保存传入的id
      this.id = this.$route.params.id;

      // 2. 根据id请求详情数据
      let { result } = await getDetail(this.id);

      // 3. 获取顶部的图片轮播数据
      this.topImages = result.itemInfo.topImages;

      // 4. 整合商品基本信息数据
      this.goods = new Goods(result, result.shopInfo.services);

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
  mixins: [mixin],
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
  },
  destroyed() {
    // 当离开详情时,取消监听事件
    this.$bus.$off("itemImageLoad", this.itemImagehandler);
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
  height: calc(100vh - 44px);
}
</style>
