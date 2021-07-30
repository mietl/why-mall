<template>
  <div id="category">
    <nav-bar> <div slot="center">商品分类</div> </nav-bar>
    <div class="category-content">
      <scroll>
        <tab-menu :categories="types" @selectItem="selectType"></tab-menu>
      </scroll>

      <scroll class="tab-content" ref="scroll">
        <category-list :subcategory="currentCategory" />

        <tab-control
          :titles="['综合', '新品', '销量']"
          @itemClick="switchType"
        />

        <category-goods :goods="categoryGoods" />
      </scroll>
    </div>
  </div>
</template>
<script>
import TabControl from "components/main/tabControl/TabControl.vue";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabMenu from "./components/TabMenu.vue";
import CategoryList from "./components/CategioryList.vue";
import CategoryGoods from "./components/CategoryGoods.vue";

import {
  getCategory,
  getSubCategory,
  getCategoryDetail,
} from "api/category.js";

import { BScrollRefreshMixin, tabControlMixin } from "utils/mixins";

import { TYPES } from "constants";

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    Scroll,
    CategoryList,
    TabControl,
    CategoryGoods,
  },
  data() {
    return {
      types: [],
      currentIndex: -1,
      categories: [],
      category: {},
    };
  },
  created() {
    this.getCategory();
  },
  computed: {
    currentCategory() {
      if (this.currentIndex === -1) return {};
      return this.categories[this.currentIndex].subcategory;
    },
    categoryGoods() {
      console.log('12');
      if (this.currentIndex === -1) return [];
      // 注 此处this.currentType来自tabControllMixin
      return this.categories[this.currentIndex].goods[this.currentType];
    },
  },
  mixins: [BScrollRefreshMixin, tabControlMixin],
  methods: {
    async getCategory() {
      // 1. 获取分类数据
      let { data } = await getCategory();
      this.types = data.category.list;

      // 2. 初始化每个类别的子数据
      for (let i in this.types) {
        this.categories.push({
          subcategory: {},
          goods: { pop: [], new: [], sell: [] },
        });
      }

      // 3. 请求第一个分类的数据
      this.getSubcategory(0);
    },
    async getSubcategory(index) {
      // 更改this.currentIndex值使他从新计算
      this.currentIndex = index;

      this.category = this.types[index];
      const maitKey = this.category.maitKey;

      // 根据传入的minWallkey发送请求
      let { data } = await getSubCategory(maitKey);
      this.categories[index].subcategory = data;

      // 将 this.categories 重新复制使得重新计算
      // this.categories = {...this.categories}
      TYPES.forEach(this.getCategoryGoods);
    },
    selectType(index) {
      this.getSubcategory(index);
    },
    async getCategoryGoods(type) {
      // 1. 获取请求到miniWallkey
      const miniWallkey = this.category.miniWallkey;

      let result = await getCategoryDetail(miniWallkey, type);
      this.categories[this.currentIndex].goods[type] = result;
    },
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}

.category-content {
  display: flex;
}

.nav-bar {
  background-color: var(--color-tint);
  border-bottom: 1px solid #e5e5e5;
  font-size: 15px;
  color: #fff;
}

.wrapper {
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}

.tab-content {
  flex: 1;
}
</style>
