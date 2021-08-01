<template>
  <div id="goods-info" v-if="Object.keys(imageInfo).length !== 0">
    <div class="info-desc clear-fix">
      <div class="start left"></div>
      <div class="desc">{{ imageInfo.desc }}</div>
      <div class="end right"></div>
    </div>
    <div v-for="(item, index) in imageInfo.detailImage" :key="index">
      <div class="info-key">{{ item.key }}</div>
      <div class="info-list">
        <img
          v-for="(item, index) in item.list"
          :key="index"
          v-lazy="item"
          @load="imageLoad"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailImageInfo",
  data() {
    return {
      // counter: 0,
      // imagesLength: 0,
    };
  },
  // watch: {
  //   imageInfo(val) {
  //     this.imagesLength = val.detailImage[0].list.length;
  //   },
  // },
  props: {
    imageInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      // if (++this.counter === this.imagesLength) {
      this.$emit("imageLoad");
      // }
    },
  },
};
</script>

<style scoped>
#goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 14px;
}

.info-list img {
  width: 100%;
}
</style>
