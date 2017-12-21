<style></style>
<template>
  <el-collapse accordion v-model="activeNames">
    <el-collapse-item class='textLeft' name='1'>
      <template slot="title">
        我审批的流程<i class="header-icon el-icon-info"></i>
      </template>
      <approval-table></approval-table>
    </el-collapse-item>
    <el-collapse-item  class='textLeft' name='2'>
      <template slot="title">
        我提交的流程<i class="header-icon el-icon-info"></i>
      </template>
      <request-table></request-table>
    </el-collapse-item>
</el-collapse>
</template>
<script>
 import approvalTable from './approvalTable';
 import requestTable from './requestTable';
import Vue from 'vue';
import { mapGetters } from 'vuex';
import {
    Collapse,
    CollapseItem
} from 'element-ui';

Vue.use(Collapse);
Vue.use(CollapseItem);

export default {
  data() {
    return {
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
  components: { approvalTable, requestTable }
};

</script>
