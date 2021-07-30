<template>
  <div class="toast" v-show="isShow">
    {{ tips }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  created() {},
  data() {
    return {
      tips: "",
      isShow: false,
    };
  },
  methods: {
    show(tips, duration = 1500) {
      this.tips = tips;
      this.isShow = true;
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.tips = "";
        this.isShow = false;
      }, duration);
    },
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 100px;
  left: 50%;
  box-sizing: border-box;
  max-width: 80%;
  height: 40px;
  line-height: 20px;
  padding: 10px 20px;
  transform: translateX(-50%);
  text-align: center;
  z-index: 9999;
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  animation: show-toast 0.5s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@-webkit-keyframes show-toast {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes show-toast {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
