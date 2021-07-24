<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }} </span>
      <span class="o-price">{{ goods.oldPrice }} </span>
      <span class="discount" v-if="goods.discountDesc">{{ goods.discountDesc }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }} </span>
      <span>{{ goods.columns[1] }} </span>
      <span>{{ [...goods.services].pop().name }} </span>
    </div>
    <div class="info-service">
      <div
        class="info-service-item"
        v-for="(item, index) of [...goods.services].splice(0, goods.services.length - 1)"
        :key="index"
      >
        <img :src="item.icon" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  border-bottom: 5px solid #f2f5f8;
}

.info-title {
  color: #222;
}

.info-price {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.info-price .n-price {
  color: #f13e3a;
  font-size: 24px;
}

.info-price .o-price {
  font-size: 14px;
  margin-left: 5px;
  text-decoration: line-through;
  align-self: flex-end;
}

.info-price .discount {
  font-size: 12px;
  padding: 2px 6px 1px 6px;
  background-color: var(--color-high-text);
  border-radius: 14px;
  margin-left: 8px;
  color: #fff;
  text-align: center;
}

.info-other {
  margin-top: 15px;
  line-height: 30px;
  display: flex;
  font-size: 13px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  justify-content: space-between;
}

.info-service {
  display: flex;
  line-height: 60px;
  justify-content: space-between;
  align-items: center;
}

.info-service-item img {
  width: 14px;
  height: 14px;
  margin-right: 4px;
  position: relative;
  top: 2px;
}

.info-service-item span {
  font-size: 13px;
  color: #333;
}
</style>
