<template>
  <div class="draft">
    <div class="searchCenter">
      <el-input placeholder="请输入流程名" v-model="keyword" class="search" @keyup.13.native="toSearch">
        <template slot="append"><i class="el-icon-search" @click="toSearch"></i></template>
      </el-input>
    </div>
    <el-tabs v-model="tabName" >
        <el-tab-pane label="待处理流程（BPM）" name="bpm">

    <div v-show='!loading'>
    <!-- 筛选按钮区域 -->
    <ul class="table-bagde" :class="{tabelOneLine: oneLine}">
      <li v-for="item in draftListTypesGroup" @click="filterTitle(item.ProcessName)">
        <span class='table-bagde-title'>{{item.ProcessNameCN}} ( <i class="table-bagde-count">{{item.Count}}</i>  ) </span>
      </li>
      <span class="table-bagde-opt"><i class="icon el-icon-refresh" @click="refresh"></i><i class="icon" :class="{'el-icon-arrow-down': oneLine,'el-icon-arrow-up': !oneLine}" @click='unfoldBadge'></i></span>
    </ul>
    </div>
    <!-- table列表区 -->
    <el-table :data="draftData" stripe v-loading="loading" element-loading-text="拼命加载中..." style="width: 100%" height="443" @row-click="rowClick" @sort-change="tableSortChange"  @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseLeave">
      <el-table-column show-overflow-tooltip prop="Summary" label="流程名称" width="500"></el-table-column>
     <!--  <el-table-column prop="BarCode" show-overflow-tooltip label="流程编号" width="240"></el-table-column> -->
      <el-table-column prop="ProcessNameCN" show-overflow-tooltip label="流程类型" width="240"></el-table-column>
     <!--  <el-table-column prop="ApplicantName" show-overflow-tooltip label="启动用户" width="120"></el-table-column>
      <el-table-column prop="ActivityNameCN" show-overflow-tooltip resizable label="当前过程" width="120"></el-table-column>
      <el-table-column prop="UpdateTime" :formatter="dateFormat" label="到达时间" width="130">
      </el-table-column>-->
      <el-table-column prop="CreateTime" :formatter="dateFormat" label="创建时间" width="200">
      </el-table-column>
      <el-table-column  label="操作" width="200">
        <template slot-scope="scope">
            <el-popover trigger="click" popper-class="delPopover" ref="delPopover" placement="bottom-end" width="160" >
              <p>是否确定驳回本流程？{{scope.row.end_time}}</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="delPopoverCancel(scope.$index)">取消</el-button>
                <el-button type="primary" size="mini" @click="delPopoverOK(true, scope.row)">确定</el-button>
              </div>
            </el-popover>
            <el-button type="text"  size="mini" >编辑</el-button>
            <el-button type="text"  size="mini" @click='delOption(scope.row)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      </el-tab-pane>
        <el-tab-pane label="待处理流程（CPC）" name="cpc">cpc cpc</el-tab-pane>
      </el-tabs>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex';
import Vue from 'vue';
import {
    Badge,
    Button,
    Table,
    TableColumn,
    Popover,
    Pagination,
    Loading
} from 'element-ui';

Vue.use(Badge);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Pagination);
Vue.use(Loading);

  export default {
    name: 'draft',
    data() {
      return {
        tabName: 'bpm',
        oneLine: true,
        draftData: [],
        keyword: '',
        delPopoverFlag: false,
        nowRowId: 0,
        loading: true,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        // keyword: '',
        // showIframe: false,
        // 小类接口data，所有代办接口data
        typesData: {
          userId: ''
          // status: false
        },
        proData: {
          'keyWord': '',
          'pageIndex': 1,
          'pageSize': 10,
          'barCode': '',
          'processName': '',
          'compCode': '',
          'deptCode': '',
          'startTime': '',
          'endTime': '',
          'dateRange': '',
          'orderField': 'UpdateTime',
          'orderByDescending': true,
          // 'status': false,
          'userId': ''
        }
      };
    },
    computed: {
      ...mapGetters(['draftProcessData', 'draftListTypesGroup'])
    },
    mounted() {
      this.getInitData();
    },
    methods: {
      getInitData() {
        this.typesData.userId = this.$store.state.loginStore.loginInfo.UserId;
        this.proData.userId = this.$store.state.loginStore.loginInfo.UserId;
        this.$store.dispatch('getDraftListTypesGroup', this.typesData).then(() => {
          // this.typesData.status = true;
        });
        this.getTableData();
        setTimeout(() => {
          this.draftData = this.draftProcessData;
          this.loading = false;
        }, 1000);
      },
      getTableData() {
        this.proData.keyWord = this.keyword;
        this.proData.pageSize = this.pageSize;
        this.proData.pageIndex = this.currentPage;
        this.$store.dispatch('getDraftProcess', this.proData).then((res) => {
          this.$store.commit('get_draft_process', res.List);
          this.draftData = this.$store.state.bpm.draft.draftProcessData;
          this.total = res.totalcount;
          // this.proData.status = true;
        });
      },
      unfoldBadge() {
        this.oneLine = !this.oneLine;
      },
      refresh() {
        this.$store.dispatch('getDraftListTypesGroup', this.typesData);
        this.getTableData();
      },
      // 过滤todoProcessData的副本，实现过滤流程类型
      filterTitle(filter) {
        if (filter !== 'Whole') {
          this.proData.processName = filter;
        } else {
          this.proData.processName = '';
        }
        this.getTableData();
      },
      toSearch() {
        console.log(this.keyword);
        this.refresh();
      },
      dateFormat(row, column) {
        // 时间格式化
        const date = row[column.property];
        return date.substr(0, 10) + ' ' + date.substr(11, 5);
      },
      showAgreePop(row) {
        console.log(row);
        const data = {};
        data.barcode = row.BarCode;
        data.workflowtype = row.ProcessName;
        data.actionType = '';
        data.activitynamecn = row.ProcessNameCN;
        data.SN = row.SN;
        data.comment = '同意';
        data.userId = this.$store.state.loginStore.loginInfo.UserId;
        this.$store.dispatch('toDoListApprove', data).then((res) => {
          if (res.code === 200) {
            this.refresh();
            const dom = document.querySelectorAll('div.agreePopover');
            for (let i = 0; i < dom.length; i++) {
              dom[i].style.display = 'none';
            }
          }
        });
      },
      delPopoverCancel(index) {
        console.log(index);
        const dom = document.querySelectorAll('div.delPopover');
        for (let i = 0; i < dom.length; i++) {
          dom[i].style.display = 'none';
        }
      },
      delPopoverOK(flag, row) {
        // console.log(row);
        // const rejectData = {};
        // // this.$store.dispatch('toDoListReject', rejectData);
        // const dom = document.querySelectorAll('div.delPopover');
        // for (let i = 0; i < dom.length; i++) {
        //   dom[i].style.display = 'none';
        // }
      },
      delOption(row) {
        const data = {};
        data.barcode = row.BarCode;
        // data.workflowtype = row.ProcessName;
        // data.actionType = '';
        // data.activitynamecn = row.ProcessNameCN;
        // data.SN = row.SN;
        // data.userId = this.$store.state.loginStore.loginInfo.UserId;
        // this.$prompt('请输入驳回原因', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消'
        //   }).then(({ value }) => {
        //     data.comment = value;
            this.$store.dispatch('delDraftList', data).then(() => {
              this.refresh();
            });
          // });
      },
      // 每页显示数据量变更
     handleSizeChange: function(val) {
        console.log(`每页 ${val} 条`);
         this.pagesize = val;
         this.proData.pagesize = val;
         this.getTableData();
     },
     // 页码变更
     handleCurrentChange: function(val) {
      this.currentPage = val;
      this.getTableData();
     }
    }
  };
</script>
<style type="text/css" scoped>
.draft{
  background-color: #fff;
  padding:60px 40px;
}
.searchCenter{
  /*text-align: center;
  position: absolute;
  top:30px;*/
  position: absolute;
  right:80px;
  top:60px;
  height:30px;
  z-index: 99;
}
.search{
    height:30px;
    width:30%;
    min-width: 250px;
    max-width: 300px;
  }
  .search>.el-input__inner{
    height:30px !important;
    line-height: 30px;
    font-size: 14px;
  }
  .table-bagde{
    /*height:50px;*/
    width:100%;
    padding-right: 100px;
    position: relative;
  }
  .table-bagde>li{
    border-right:1px solid #999;
    display: inline-block;
    padding:0 10px;
    margin:5px 0;
    line-height:18px;
    cursor: pointer;
  }
  .table-bagde-title{
    font-size: 14px;
    color:#999;
  }
  .table-bagde-count{
    font-style: normal;
  }
  .tabelOneLine{
    height: 33px;
  }
  .table-bagde-opt{
    position: absolute;
    right:10px;
    top:5px;
  }
  .table-bagde-opt>.icon{
    font-size: 20px;
    font-weight: 700;
    margin-right: 20px;
    cursor: pointer;
  }
  .item{
    padding:0 40px 0 10px;
    border-right: 1px solid #dedede;
  }
  .notAgree{
    color:#dedede;
    cursor: not-allowed;
  }
</style>
