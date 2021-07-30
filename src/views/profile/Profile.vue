<template>
  <div id="profile">
    <nav-bar><div slot="center">个人中心</div></nav-bar>
    <!-- 1. 单独封装一个组件 : 利用slot -->
    <UserInfo></UserInfo>

    
    <top-info-view :info="balance" />

    <!-- 3. 封装成一个整体 -->
    <list-view :list="orderList" class="order-list"></list-view>
    <list-view :list="serviceList" class="order-list"></list-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import UserInfo from "./components/UserInfo";
import TopInfoView from './components/TopInfoView.vue';
import ListView from "./components/ListView.vue";

export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    ListView,
    TopInfoView
  },
  data() {
    return {
      balance: [
        {
          info: "我的余额",
          num: 0,
        },
        {
          info: "我的优惠",
          num: 0,
        },
        {
          info: "我的积分",
          num: 0,
        },
      ],
      orderList: [
        { icon: "#order", iconColor: "#ff8198", info: "我的消息" },
        { icon: "#point", iconColor: "#fc7b53", info: "积分商城" },
        { icon: "#vip", iconColor: "#ffc636", info: "会员卡" },
      ],
      serviceList: [
        { icon: "#service", iconColor: "#ff8198", info: "我的购物车" },
        { icon: "#download", iconColor: "#ff8198", info: "下载购物APP" },
      ],
    };
  },
};
</script>

<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: #fff;
}

#profile {
  background-color: #f2f2f2;
}

.order-list,
.service-list {
  margin-top: 12px;
}
</style>
