<template>
  <div class="bottom-bar">
    <div class="check-area">
      <checkbox-button
        class="checkbox-button"
        :isChecked="isCheckAll"
        @click.native="checkboxClick"
      >
        <img src="~assets/img/cart/tick1.svg" alt="" />
      </checkbox-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计:{{ totalPrice }}</div>
    <div class="buy-calculate" @click="buyClick">去结算:({{ checkedNum }})</div>
  </div>
</template>

<script>
import CheckboxButton from "components/main/checkboxButton/CheckboxButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckboxButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return this.cartList
        .filter((item) => item.checked)
        .reduce(
          (preValue, currentValue) => currentValue.count * currentValue.price + preValue,
          0
        )
        .toFixed(2);
    },
    checkedNum() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isCheckAll() {
      if (!this.cartList.length) {
        return false;
      }

      // 方案一 filter
      // return !(this.cartList.filter(item=>!item.checked).length)
      // 方案二 find
      // return !(this.cartList.find(item=>!item.checked))
      // 方案三
      // for (const item of this.cartList) {
      //   if(!item.checked){
      //     return false;
      //   }
      // }
      // return true;
      return !this.cartList.some((item) => !item.checked);
      // return !this.cartList.every(item=>item.checked);
    },
  },
  methods: {
    checkboxClick() {
      // 保存this.isCheckAll的状态, 当修改cartList元素中checked状态时,会影响this.isCheckAll, this.isCheckAll会决定 cartList中元素checked状态 为了不影响,因此保存
      let isCheckAll = this.isCheckAll;
      this.cartList.forEach((el) => {
        el.checked = !isCheckAll;
      });
    },
    buyClick() {
      let tips = "";
      if (!this.cartList.length) {
        tips = "当前购物车为空";
      } else if (!this.isCheckAll) {
        tips = "请选择要购买到商品";
      } else {
        // 结算的实现
        return;
      }
      this.$toast.show(tips);
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  align-items: center;

  background-color: #eee;
  height: 44px;
  font-size: 14px;
  /* box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2); */
  padding-left: 20px;
  box-sizing: border-box;
}

.check-area {
  display: flex;
  align-items: center;
}

.checkbox-button {
  margin-right: 5px;
  width: 20px;
  height: 20px;
}


.total-price {
  margin-left: 15px;
  font-size: 13px;
  color: #666;
  flex-grow: 1;
}

.buy-calculate {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
}
</style>
