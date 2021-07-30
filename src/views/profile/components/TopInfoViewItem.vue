<template>
  <div class="info-item">
    <div class="number">
      <span class="balance">{{ itemInfo.num }}</span
      >元
    </div>
    <div class="account-info">{{ itemInfo.info }}</div>
  </div>
</template>

<script>
export default {
  name: "TopInfoViewItem",
  props: {
    itemInfo: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style scoped>
.info-item {
  background-color: #fff;
  text-align: center;
  color: #666;
  font-size: 13px;
  padding: 18px;
}

.info-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}

.info {
  margin-top: 6px;
}
</style>
