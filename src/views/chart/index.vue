<template lang="pug">
.container
  el-row(:gutter="20")
    el-col(:span="24")
      chartHistogram(:chartJson="histogramJson")
  el-row(:gutter="20")
    el-col(:span="12")
      chartGauge(:chartJson="gaugeJson")
    el-col(:span="12")
      chartLine(:chartJson="lineJson")
  el-row(:gutter="20")
    el-col(:span="12")
      chartRadar(:chartJson="radarJson")
    el-col(:span="12")
      chartWaterBall(:chartJson="waterballJson")
</template>

<script>
import chartGauge from "@/components/vcharts/chartGauge.vue";
import chartHistogram from "@/components/vcharts/chartHistogram.vue";
import chartLine from "@/components/vcharts/chartLine.vue";
import chartRadar from "@/components/vcharts/chartRadar.vue";
import chartWaterBall from "@/components/vcharts/chartWaterBall.vue";
export default {
  name: "chart",
  components: {
    chartGauge,
    chartHistogram,
    chartLine,
    chartRadar,
    chartWaterBall,
  },
  data() {
    return {
      histogramJson: {
        chartData: {
          columns: ["bala", "b", "c", "d"],
          rows: [
            { bala: 1, b: 2, c: 3, d: 4 },
            { bala: 1, b: 2, c: 3, d: 4 },
            { bala: 1, b: 2, c: 3, d: 4 },
            { bala: 1, b: 2, c: 3, d: 4 },
            { bala: 1, b: 2, c: 3, d: 4 },
          ],
        },
        chartSetting: {},
        extend: {},
        height: "250px",
      },
      gaugeJson: {
        chartData: {
          columns: ["type", "a", "b", "value"],
          rows: [{ type: "速度", value: 80, a: 1, b: 2 }]
        },
        chartSetting: {},
        extend: {},
        height: "250px",
      },
      lineJson: {
        chartData: {
          columns: ["bala", "b", "c", "d"],
          rows: [
            { bala: 1, b: 2, c: 3, d: 4 },
            { bala: 2, b: 12, c: 13, d: 14 },
            { bala: 3, b: 22, c: 23, d: 24 },
            { bala: 4, b: 32, c: 33, d: 34 },
            { bala: 5, b: 42, c: 43, d: 44 },
          ],
        },
        chartSetting: {},
        extend: {},
        height: "250px",
      },
      radarJson: {
        chartData: {
          columns: ["", "通知", "公告", "会议", "游戏", "系统升级"],
          rows: [
            { "": 20, 通知: 20, 公告: 13, 会议: 22, 游戏: 12, 系统升级: 20 },
          ],
        },
        chartSetting: {},
        extend: {
          legend: {
            show: false,
          },
          label: {
            show: false,
          },
          grid: {},
        },
        height: "250px",
      },
      waterballJson: {
        chartData: {
          columns: ["city", "percent"],
          rows: [{ city: "上海", percent: 0.6 }]
        },
        chartSetting: {},
        extend: {},
        height: "250px",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>