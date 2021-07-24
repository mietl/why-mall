<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shopInfo.shopLogo" alt="" />
      <span class="title">{{ shopInfo.name }}</span>
    </div>
    <div class="shop-content">
      <div class="shop-content-item shop-content-left">
        <div class="info-sell">
          <div class="sell-count">{{ shopInfo.cSells | sellNumFilter }}</div>
          <div class="sell-text">总销量</div>
        </div>
        <div class="info-baby">
          <div class="baby-count">{{ shopInfo.cGoods }}</div>
          <div class="bady-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-content-item shop-content-right">
        <table>
          <tr v-for="(item, index) in shopInfo.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-rect': item.isBetter }">
              {{ item.isBetter ? "高" : "低" }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <a class="enter-shop" :href="shopInfo.shopUrl">进入店铺</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellNumFilter(value) {
      if (value < 10000) return;
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped>
.shop-info {
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}

.shop-top {
  display: flex;
  line-height: 45px;
  align-items: center;
}

.shop-top img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.shop-top .title {
  margin-left: 10px;
}

.shop-content {
  margin-top: 15px;
  display: flex;
  align-items: center;
}

.shop-content .shop-content-item {
  flex: 1;
}

.shop-content-left {
  display: flex;
  justify-content: space-evenly;
  color: #333;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.sell-count,
.baby-count {
  font-size: 14px;
}

.sell-text,
.bady-text {
  margin-top: 10px;
  font-size: 12px;
}

.shop-content-right {
  font-size: 13px;
  color: #333;
}

.shop-content-right table {
  width: 120px;
  margin-left: 30px;
}

.shop-content-right table td {
  padding: 2px 2px;
  border-radius: 1px;
}

.shop-content-right .score {
  color: #5ea732;
}

.shop-content-right .score-better {
  color: #f13e3a;
}

.shop-content-right .better {
  background-color: #5ea732;
  text-align: center;
  color: #fff;
}

.shop-content-right .better-rect {
  background-color: #f13e3a;
}

.shop-bottom {
  text-align: center;
  margin-top: 10px;
}

.enter-shop {
  display: inline-block;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}
</style>
