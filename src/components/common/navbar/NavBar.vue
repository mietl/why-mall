<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
  .nav-bar {
    display:flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    -webkit-box-shadow:0 -1px 1px hsl(0deg 0% 59% / 10%);
    box-shadow:0 -1px 1px hsl(0deg 0% 59% / 10%);
  }

  .left,.right{
    width: 60px;
  }

  .center{
    flex: 1;
  }
</style>