<template>
  <div id="cart">
    <cart-nav-bar />
    <scroll ref="scroll">
      <cart-list />
    </scroll>
    <cart-bottom-bar />

  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";

import CartNavBar from './components/CartNavBar'
import CartList from "./components/CartList";
import CartBottomBar from './components/CartBottomBar';

export default {
  name: "Cart",
  components: {
    CartList,
    Scroll,
    CartNavBar,
    CartBottomBar
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>


.wrapper {
  height: calc(100vh - 44px - 49px - 44px);
  overflow: hidden;
}
</style>
