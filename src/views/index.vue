<template lang="pug">
.app-container
  el-row
    el-col(:span="24")
      el-menu(
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      )
        el-menu-item(index="1") 处理中心
        el-submenu(index="2")
          template(slot="title") 我的工作台
          el-menu-item(index="2-1") 选项1
          el-submenu(index="2-2")
            template(slot="title") 选项2
            el-menu-item(index="2-2-1") 选项2-1
            el-menu-item(index="2-2-2") 选项2-2
  el-row
    el-col(:span="4")
      el-tree(
        :props="props"
        :load="loadNode"
        lazy
        show-checkbox
      )
    el-col(:span="20")
      el-carousel(height="300px")
        el-carousel-item(v-for="item in 4" :key="item")
          h3(class="small") {{ item }}

  //- ****  el-select + el-tree 实现下拉选择器结合树形控件  **** -//
  //- multiple 是否多选；collapse-tags 多选时是否将选中值按文字的形式展示
  el-select(v-model="mineStatus" placeholder="请选择" multiple collapse-tags @change="selectChange")
    //- 设置height为auto，使树形列表展开时高度变大
    el-option(:value="mineStatusValue" style="height: auto")
      //- highlight-current 是否高亮当前选中节点
      el-tree(:data="data" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps" @check-change="handleCheckChange")

  //- ****   el-table 实现多行合并   **** -//
  el-table(:data="table" :span-method="arraySpanMethod" border style="width: 100%")
    el-table-column(prop="checkRoom" label="检查室")
    el-table-column(prop="checkProject" label="检查项目")
    el-table-column(prop="checkMoney" label="检查费用(￥)")
    el-table-column(prop="attention" label="注意事项")
    el-table-column(label="预约日期/时间段")
      template(slot-scope="scope")
        span(v-if="scope.row.appointmentTime != ''") {{scope.row.appointmentTime}}
        el-button(type="text" v-if="scope.row.appointmentTime == ''" @click.native.prevent="addTime(scope.$index, table)") 预约
    el-table-column(label="操作")
      template(slot-scope="scope")
        el-button(type="text" @click.native.prevent="deleteRow(scope.$index, table)") 删除

  //- ****   el-table 实现多行合并(性能更好)   **** -//
  el-table(
    ref="multipleTable" 
    border 
    :span-method="objectSpanMethod" 
    :cell-class-name="tableRowClassName"
    @cell-mouse-leave="cellMouseLeave"  
    @cell-mouse-enter="cellMouseEnter" 
    :data="tableData" 
    style="width: 100%;"
  )
    el-table-column(label="商品类别" align="center")
      template(slot-scope="scope" width="160")
        div {{scope.row.productType}}
    el-table-column(label="商品价格" align="center")
      template(slot-scope="scope")
        p {{scope.row.price}}
    el-table-column(label="商品名称" width="180px" align="center")
      template(slot-scope="scope")
        p {{scope.row.productName}}
    el-table-column(label="操作人员" align="center")
      template(slot-scope="scope")
        p {{scope.row.operator}}
    el-table-column(prop="updateTime" label="更新时间" align="center")

    //- ****   vue组件之自定义tab切换组件(吸顶、滚动定位)等效果   **** -//
  el-button(type="submit" @click="tabModule") 滚动吸顶
</template>

<script>
import { mergeTableRow } from './merge';
export default {
  name: 'home',
  data() {
    return {
      activeIndex: '1',

      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },

      mineStatus: "",
      mineStatusValue: [],
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1"
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },

      table: [{
        id: '1',
        checkRoom: 'CTROOM',
        checkProject: '颈椎MRICT',
        checkMoney: '300.22',
        attention: '检查前空腹',
        appointmentTime: ''
      },{
        id: '1',
        checkRoom: 'CTROOM',
        checkProject: '颈椎MRICT1',
        checkMoney: '303.22',
        attention: '检查前空腹',
        appointmentTime: ''
      },{
        id: '1',
        checkRoom: 'CTROOM',
        checkProject: '颈椎MRICT22',
        checkMoney: '340.22',
        attention: '检查前空腹',
        appointmentTime: '2019-5-29 10：30'
      },{
        id: '2',
        checkRoom: 'DR',
        checkProject: '鼻骨',
        checkMoney: '500.22',
        attention: '检查前空腹',
        appointmentTime: '2019-5-29 9：30'
      }],

      tableData: [
        {
          productType: "纺织品",
          productName: '男装上衣',
          amount: 20,
          operate_number: "20180831142020",
          price: "36.00",
          updateTime: "2018-08-31",
          operator: "小吴"
        },{
          productType: "纺织品",
          productName: '男装裤子',
          amount: 20,
          operate_number: "20180831142020",
          price: "36.00",
          updateTime: "2018-08-31",
          operator: "小吴"
        },{
          productType: "饮料",
          productName: '康师傅冰红茶',
          amount: 20,
          operate_number: "20180823142020",
          price: "36.00",
          updateTime: "2018-08-31",
          operator: "小吴"
        },{
          productType: "纺织品",
          productName: '男装裤子',
          amount: 10,
          operate_number: "20180821142020",
          price: "36.00",
          updateTime: "2018-08-31",
          operator: "小王"
        },{
          productType: "绸缎",
          productName: '旗袍',
          amount: 200,
          operate_number: "20180821142020",
          price: "36.00",
          updateTime: "2018-08-31",
          operator: "小吴"
        },{
          productType: "绸缎",
          productName: '席子',
          amount: 20,
          operate_number: "20180821142020",
          price: "36.00",
          updateTime: "2018-08-31",
          operator: "小吴"
        },
      ],
      rowIndex: '-1',
      OrderIndexArr: [],
      hoverOrderArr: []
    }
  },
  created(){
    // 给table赋值，重新遍历新增rowSpan属性，checkRoom，appointmentTime为table里面需要合并的属性名称
    this.table = mergeTableRow(this.table, ['checkRoom', 'appointmentTime'])
  },
  mounted() {
    this.getOrderNumber()
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: '中心' }]);
      }
      if (node.level > 1) return resolve([]);
      setTimeout(() => {
        const data = [{
          name: '中心1',
          leaf: true
        }, {
          name: '中心2'
        }];
        resolve(data);
      }, 500);
    },

    selectChange(e){
      var arrNew = [];
      var dataLength = this.mineStatusValue.length;
      var eleng = e.length;
      for(let i = 0; i< dataLength ;i++){
        for(let j = 0; j < eleng; j++){
          if(e[j] === this.mineStatusValue[i].label){
            arrNew.push(this.mineStatusValue[i])
          }
        }
      }
      this.$refs.tree.setCheckedNodes(arrNew);//设置勾选的值
    },
    handleCheckChange() {
      let res = this.$refs.tree.getCheckedNodes(true, true); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      let arrLabel = [];
      let arr = [];
      // console.log(res); // res 是选中的节点数组
      res.forEach(item => {
        arrLabel.push(item.label);
        arr.push(item);
      });
      this.mineStatusValue = arr;
      this.mineStatus = arrLabel;
      // console.log('arr:'+JSON.stringify(arr))
      // console.log('arrLabel:'+arrLabel)
    },

    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log({ row, column, rowIndex, columnIndex });
      const span = column['property'] + '-span'
      if(row[span]){
        return row[span]
      }
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addTime(index, rows) {
      console.log(index, rows);
    },

    // 获取相同编号的数组
    getOrderNumber() {
      let OrderObj = {}
      this.tableData.forEach((element, index) => {
        element.rowIndex = index
        if (OrderObj[element.operate_number]) {
          OrderObj[element.operate_number].push(index)
        } else {
          OrderObj[element.operate_number] = []
          OrderObj[element.operate_number].push(index)
        }
      })
      // 将数组长度大于1的值 存储到this.OrderIndexArr（也就是需要合并的项）
      for (let k in OrderObj) {
        if (OrderObj[k].length > 1) {
          this.OrderIndexArr.push(OrderObj[k])
        }
      }
    },
    // 合并单元格
    objectSpanMethod({row,column,rowIndex,columnIndex}) {
      console.log({row,column,rowIndex,columnIndex});
      if (columnIndex === 0 || columnIndex === 3 || columnIndex === 4) {
        for (let i = 0; i < this.OrderIndexArr.length; i++) {
          let element = this.OrderIndexArr[i]
          for (let j = 0; j < element.length; j++) {
            let item = element[j]
            if (rowIndex == item) {
              if (j == 0) {
                return {
                  rowspan: element.length,
                  colspan: 1
                }
              } else if (j != 0) {
                return {
                  rowspan: 0,
                  colspan: 0
                }
              }
            }
          }
        }
      }
    },
    tableRowClassName({row,rowIndex}) {
      console.log({row,rowIndex});
      let arr = this.hoverOrderArr
      for (let i = 0; i < arr.length; i++) {
        if (rowIndex == arr[i]) {
          return 'hovered-row'
        }
      }
    },
    cellMouseEnter(row, column, cell, event) {
      console.log({row, column, cell, event});
      this.rowIndex = row.rowIndex;
      this.hoverOrderArr = [];
      this.OrderIndexArr.forEach(element => {
          if (element.indexOf(this.rowIndex) >= 0) {
            this.hoverOrderArr = element
          }
      })
    },
    cellMouseLeave(row, column, cell, event) {
      console.log({row, column, cell, event});
      this.rowIndex = '-1'
      this.hoverOrderArr = [];
    },

    tabModule() {
      this.$router.push({
        path: '/tabModule'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

  .el-table .hovered-row {
    background: #f5f7fa;
  }
</style>