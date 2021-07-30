<template>
  <div class="list-item">
    <span class="icon">
      <svg :fill="item.iconColor"><use :xlink:href="item.icon"></use></svg>
    </span>
    <div class="info">{{ item.info }}</div>
  </div>
</template>

<script>
export default {
  name: "ListViewItem",
  created() {},
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style  scoped>
.icon {
  width: 18px;
  height: 18px;
}
.icon svg {
  width: 100%;
  height: 100%;
}

.list-item .info {
  line-height: 44px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-left: 5px;
  flex-grow: 1;
}

.list-item:last-of-type .info {
  border-bottom: none;
}
</style>
