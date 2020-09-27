<!--
  vue组件之自定义tab切换组件(吸顶、滚动定位)等效果
-->
<template>
  <div>
    <div class="div__header"></div>
    <tabModule :prop="tabattributes"></tabModule>
    <div
      :id="tabattributes.attr.tab_content[index].anchor_point"
      class="div__item"
      v-for="(item, index) in fordiv"
      :key="item"
    >
      {{ item }}
    </div>
    <div class="div__footer">我是有底线的</div>
  </div>
</template>
<script>
import TabModule from "@/components/tabScroll";
export default {
  components: {
    TabModule,
  },
  data() {
    return {
      tabattributes: {
        box_style: "margin-top: 10px;",
        attr: {
          cur_tab_style: "font-weight: 700;",
          cur_slide_style: "",
          tab_content: [
            {
              tab_menu: "控件1",
              anchor_point: "DomPoint1",
              tab_style: "",
            },
            {
              tab_menu: "控件2",
              anchor_point: "DomPoint2",
              tab_style: "",
            },
            {
              tab_menu: "控件3",
              anchor_point: "DomPoint3",
              tab_style: "",
            },
            {
              tab_menu: "控件4",
              anchor_point: "DomPoint4",
              tab_style: "",
            },
          ],
        },
      },
      fordiv: ["页面控件1", "页面控件2", "页面控件3", "页面控件4"],
    };
  },
};
</script>
<style lang="scss" scoped>
.div__header {
  width: 100%;
  height: 200px;
  background-color: #909;
}
.div__item {
  width: 100%;
  height: 800px;
  background-color: rgb(78, 215, 224);
  text-align: center;
  font-size: 26px;
}
.div__footer {
  width: 100%;
  height: 200px;
  background-color: #090;
}
</style>