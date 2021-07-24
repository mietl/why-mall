<template>
  <div class="detail-params" v-if="Object.keys(paramsInfo).length !== 0">
    <table
      class="size-info"
      v-for="(table, index) in paramsInfo.rule.tables"
      :key="index"
    >
      <caption class="title">
        {{
          paramsInfo.rule.key
        }}
      </caption>

      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
      </tr>
    </table>

    <div class="disclaimer">
      {{ paramsInfo.rule.disclaimer }}
    </div>

    <table class="params-info">
      <caption class="title">
        {{
          paramsInfo.info.key
        }}
      </caption>
      <tr v-for="(item, index) of paramsInfo.info.set" :key="index">
        <td class="info-param-key">{{ item.key }}</td>
        <td class="params-value">{{ item.value }}</td>
      </tr>
    </table>

    <div class="info-image" v-if="paramsInfo.info.image">
      <img :src="paramsInfo.info.image[0]" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.detail-params {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f6f8;
}

.detail-params table {
  width: 100%;
  border-collapse: collapse;
}

.detail-params table tr {
  height: 42px;
}

.detail-params table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.info-param-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}

.params-info {
  margin-top: 20px;
}

.params-value {
  color: var(--color-high-text);
  font-size: 13px;
}

.info-images img {
  width: 100%;
}

.title {
  text-align: left;
  margin: 0 0 10px 0;
  color: #333;
  font-size: 14px;
}

.desc {
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.disclaimer {
  font-size: 12px;
  /* color: var(--color-high-text); */
  color: #f13e3a;
  margin-top: 20px;
}
</style>
