<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true,
    },
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    setTimeout(() => {
      // 1. 创建 BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: this.click,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      });

      // 2. 监听滚动位置
      this.scroll.on("scroll", (pos) => {
        this.$emit("scroll", pos);
      });

      if (this.pullUpLoad) {
        // 3.监听上拉事件
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
        });
      }
    }, 300);
  },
  methods: {
    scrollTo(x, y, duration = 300) {
      this.scroll?.scrollTo(x, y, duration);
    },
    // 代理better-scroll的refresh方法
    refresh() {
      this.scroll?.refresh();
    },
    finishPullUp() {
      this.scroll?.finishPullUp();
    },
    getScrollY(){
      return this.scroll?.y;
    }

  },
};
</script>
