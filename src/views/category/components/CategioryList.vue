<template>
    <grid-view :col="3" :lineSpace="15" :ym="15" v-if="subcategory.list">
        <category-list-item v-for="(item,index) in subcategory.list" :key="index" :categoryItem="item"/>
    </grid-view>
</template>

<script>
import GridView from "components/common/gridview/GridView";
import CategoryListItem from './CategoryListItem';



export default {
  name: "CategoryList",
  created() {},
  data() {
    return {};
  },
  components: {
    GridView,
    CategoryListItem,
  },
  props: {
    subcategory: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped></style>
