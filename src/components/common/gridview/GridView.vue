<template>
  <div class="grid-view" ref="gridView">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GridView",
  created() {},
  data() {
    return {};
  },
  props: {
    col: {
      type: Number,
      default: 2,
    },
    ym: {
      type: Number,
      default: 8,
    },
    xm: {
      type: Number,
      default: 8,
    },
    gap: {
      type: Number,
      default: 8,
    },
    lineSpace: {
      type: Number,
      default: 8,
    },
  },
  mounted() {
    setTimeout(this._autoLayout, 20);
  },
  updated() {
    this._autoLayout();
  },
  methods: {
    _autoLayout() {
      let grid = this.$refs.gridView;
      let children = grid.children;

      grid.style.padding = `${this.ym}px ${this.xm}px`;

      let itemWidth =
        (grid.clientWidth - 2 * this.xm - (this.col - 1) * this.gap) / this.col;

      for (let i = 0; i < children.length; i++) {
        let item = children[i];

        item.style.width = parseInt(itemWidth) + "px";

        if ((i + 1) % this.col !== 0) {
          item.style.marginRight = this.gap + "px";
        }

        if (i >= this.col) {
          item.style.marginTop = this.lineSpace + "px";
        }
      }
    },
  },
};
</script>

<style scoped>
.grid-view {
  display: flex;
  flex-wrap: wrap;
  /* box-sizing: border-box; */
}
</style>
