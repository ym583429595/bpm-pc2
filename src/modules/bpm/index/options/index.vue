<style>
  .bpmOptions{
    margin:10px;
  }
  .options-tab{
    margin-top: 10px;
    background-color: #fff;
    min-height:500px;
  }
</style>
<template>
  <div class="bpmOptions">
    <options-info></options-info>
    <el-tabs v-model="activeTab" type="card"  class="options-tab">
      <el-tab-pane label="财务信息" name="financeTab">
        <finance></finance>
      </el-tab-pane>
      <el-tab-pane label="我的代理" name="proxyTab"><Proxy></Proxy></el-tab-pane>
      <el-tab-pane label="我的用户组" name="usersTab"><UserGroup></UserGroup></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import OptionsInfo from './optionsInfo';
import Finance from './finance';
import Proxy from './proxy';
import UserGroup from './userGroup';
import Vue from 'vue';
import {Tabs, TabPane} from 'element-ui';

Vue.use(Tabs);
Vue.use(TabPane);

export default {
    name: 'bpmOptions',
    data() {
      return {
        activeTab: 'financeTab'
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.$store.dispatch('options/getFinanceInfo');
        const proxyData = {};
        proxyData.UserId = this.$store.state.loginStore.loginInfo.UserId;
        proxyData.pageIndex = 0;
        proxyData.pageSize = 100;
        this.$store.dispatch('options/getProxyInfo', proxyData);
        this.$store.dispatch('options/getUsergroupInfo', proxyData);
      }
    },
    components: { OptionsInfo, Finance, Proxy, UserGroup }
};

</script>
