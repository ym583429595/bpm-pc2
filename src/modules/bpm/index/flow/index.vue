<template>
  <el-collapse accordion v-model="activeNames">
    <el-collapse-item class='textLeft' name='1'>
      <template slot="title">
        待办流程<i class="header-icon el-icon-info"></i>
      </template>
      <div class="searchDiv">
        <el-input placeholder="请输入流程名" v-model="todoSearch" class="search" @keyup.13.native="toSearch">
        <template slot="append"><i class="el-icon-search" @click="toSearch"></i></template>
        </el-input>
      </div>
      <el-tabs v-model="tabName" >
        <el-tab-pane label="待处理流程（BPM）" name="bpm">
          <TableList :keyword="todoSearch" ref="todoTable"></TableList>
        </el-tab-pane>
        <el-tab-pane label="待处理流程（CPC）" name="cpc">cpc cpc</el-tab-pane>
      </el-tabs>
    </el-collapse-item>
    <el-collapse-item  class='textLeft' name='2'>
      <template slot="title">
        发起流程<i class="header-icon el-icon-info"></i>
      </template>
      <Search ></Search>
      <div v-show='!lightText'>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    </el-collapse-item>
</el-collapse>
</template>
<script type="text/javascript">
import Search from './Search';
import TableList from './TableList';
import Vue from 'vue';
import { mapGetters } from 'vuex';
import {
    Collapse,
    CollapseItem,
    Tabs,
    TabPane
} from 'element-ui';

Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Tabs);
Vue.use(TabPane);

export default {
  data() {
    return {
      todoSearch: '',
      activeNames: ['1'],
      tabName: 'bpm'
    };
  },
  computed: {
    ...mapGetters([
      'lightText'
    ])
  },
  methods: {
    toSearch() {
      let data = {};
      data.searchText = this.todoSearch;
      this.$refs.todoTable.toSearch();
    }
  },
  components: { Search, TableList }
};
</script>
<style type="text/css" >
  .textLeft{
    text-align: left;
  }
  .el-collapse{
    border:none;
  }
  .el-collapse-item{
    padding: 10px 20px;
    background-color: #fff;
    margin-top:10px;
  }
  .el-collapse-item__header,.el-collapse-item__wrap {
    border:none;
    font-size: 16px;
  }
  .el-collapse-item__arrow.el-icon-arrow-right{
    font-size: 20px;
    border-radius: 50%;
    background-color: #4CCEF1;
    height: 30px;
    line-height: 30px;
    color: #fff;
    display: inline-block;
    width: 30px;
    text-align: center;
    margin:9px;
  }
  /*为input居中,tabs种需取消居中*/
  .el-collapse-item__content {
    text-align: center;
  }
  .el-tabs{
    text-align: left;
    margin-top:25px;
  }
  .searchDiv{
    height:50px;
    width:100%;
    margin:15px auto;
  }
  .search{
    height:50px;
    width:60%;
    min-width: 500px;
    max-width: 780px;
    margin:15px auto;
  }
  .search .el-input__inner{
    height:50px;
    line-height: 50px;
    font-size: 14px;
  }
</style>