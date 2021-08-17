<template>
  <div id="hl-swiper">
    <div
      class="swiper"
      ref="swiper"
      @touchstart="touchSatrt"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot ref="item"></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div
          v-for="(item, i) in slideCount"
          class="indi-item"
          :class="{ active: i === index - 1 }"
          :key="i"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000,
    },
    duration: {
      type: Number,
      default: 300,
    },
    moveRatio: {
      type: Number,
      default: 0.25,
    },
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      totalWidth: 0,
      index: 1,
      slideCount: 0,
      swiperStyle: {},
      scrolling: false,
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      // 1.操作dom，在前后添加Slide
      this.handleDom();
      // 2. 开启定时器
      this.startTimer();
    }, 300);
  },
  methods: {
    startTimer() {
      this.playTimer = setInterval(() => {
        this.index++;
        this.scroll(-this.index * this.totalWidth);
      }, this.interval);
    },
    stopTimer: function () {
      clearInterval(this.playTimer);
    },
    scroll(pos) {
      // 设置正在滚动

      this.scrolling = true;

      // 设置滚动动画
      this.swiperStyle.transition = `transform ${this.duration}ms`;
      // 进行偏移
      this.setTransform(pos);

      // 判断滚动到的位置
      this.checkPos();

      // 滚动结束
      this.scrolling = false;
    },

    touchSatrt(e) {
      // 如果当前正在滚动，不可拖动
      if (this.scrolling) {
        return;
      }
      // 关闭定时器
      this.stopTimer();

      this.startX = e.touches[0].pageX;
    },
    touchMove(e) {
      // 1. 计算用户拖动距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;

      this.currentPosition = -this.index * this.totalWidth;
      this.moveTodistance = this.currentPosition + this.distance;

      // 2. 设置当前的位置
      this.setTransform(this.moveTodistance);
    },
    touchEnd(e) {
      const currentMove = Math.abs(this.distance);
      const ratio = this.totalWidth * this.moveRatio;

      if (this.distance == 0) {
        return;
      } else if (this.distance > 0 && currentMove > ratio) {
        this.index--;
      } else if (this.distance < 0 && currentMove > ratio) {
        this.index++;
      }

      // 3.移动到正确的位置
      this.scroll(-this.index * this.totalWidth);
    },
    setTransform(pos) {
      this.swiperStyle.transform = `translate3d(${pos}px, 0, 0)`;
      this.swiperStyle["-webkit-transform"] = `translate3d(${pos}px), 0, 0`;
      this.swiperStyle["-ms-transform"] = `translate3d(${pos}px), 0, 0`;
    },
    checkPos() {
      // 每次过渡完在进行判断
      setTimeout(() => {
        // 过渡完后，关闭过渡动画
        this.swiperStyle.transition = "0ms";

        if (this.index >= this.slideCount + 1) {
          this.index = 1;
          // 在进行下次偏移时，就不会有过渡效果
        } else if (this.index <= 0) {
          this.index = this.slideCount;
        }

        this.setTransform(-this.index * this.totalWidth);
      }, this.duration);
    },
    handleDom() {
      let swiper = this.$refs.swiper;

      let slides = swiper.getElementsByClassName("slide");

      // 2. 保存个数
      this.slideCount = slides.length;

      // 如果大于一个，，那么就在前后分别添加一个slide
      if (this.slideCount > 1) {
        let cloneFirst = slides[0].cloneNode(true);
        let cloneLast = [...slides].pop().cloneNode(true);

        swiper.insertBefore(cloneLast, slides[0]);

        swiper.append(cloneFirst);

        this.totalWidth = swiper.offsetWidth;
        this.swiperStyle = swiper.style;

        // 显示第一个元素(目前是显示前面添加的最后一个元素)
      }

      this.setTransform(-this.totalWidth);
    },
  },
};
</script>

<style scoped>
#hl-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 10px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  margin: 0 5px;
  font-size: 12px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>
