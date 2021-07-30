<template>
  <div id="shop-item">
    <div class="item-selector">
      <checkbox-button  @click.native="checkboxClick" :isChecked="product.checked">
          <img src="~assets/img/cart/tick.svg" alt="">
      </checkbox-button>
    </div>

    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>

    <div class="item-info">
      <div class="info-top">
        <div class="item-title">
          {{ product.title }}
        </div>
        <div class="item-desc">
          {{ product.desc }}
        </div>
      </div>
      <div class="info-bottom">
        <div class="item-price">¥{{ product.price }}</div>
        <div class="item-count">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckboxButton from "components/main/checkboxButton/CheckboxButton";

export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CheckboxButton,
  },
  methods:{
    checkboxClick(){
      this.product.checked = !this.product.checked;
    }
  }
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 5px;
}

.item-selector {
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  display: block;
  border-radius: 5px;
}

.item-info {
  color: #333;
  padding: 5px 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-info .item-desc {
  font-size: 13px;
  color: #666;
  margin-top: 10px;
}

.info-bottom {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.info-bottom .item-price {
  color: orangered;
}
</style>
