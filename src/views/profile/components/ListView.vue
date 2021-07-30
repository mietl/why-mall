<template>
  <div class="list">
    <list-view-item :item="item" v-for="(item, index) in list" :key="index" class="item" />
  </div>
</template>

<script>
import ListViewItem from  './ListViewItem.vue';

export default {
  name: "ListView",
  components:{
    ListViewItem
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.list {
  background: #fff;
  font-size: 15px;
  color: #333;
}

.list .item {
  height: 44px;
  /* line-height: 44px; */
  display: flex;
  align-items: center;
  padding-left: 16px;
}

</style>
