<template>
  <nav-bar>
    <div slot="center">购物车({{ cartLength }})</div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";


import { mapGetters } from "vuex";

export default {
  name: "CartNavBar",
  components:{
    NavBar
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: white;
  font-size: 16px;
}
</style>
