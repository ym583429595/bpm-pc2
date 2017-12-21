<template>
  <div style="text-align: center;">
    <el-input :placeholder="role" v-model="searchText" class="search" @keyup.13.native="changeSearch">
      <template slot="append"><i class="el-icon-search" @click="changeSearch"></i></template>
    </el-input>
    <div class="result" v-if="showResult">
      <SearchResult></SearchResult>
    </div>

  </div>
</template>
<script type="text/javascript">
import Vue from 'vue';
import SearchResult from './SearchResult';
import {
    Input
} from 'element-ui';

Vue.use(Input);

export default {
  name: 'Search',
  data() {
    return {
      searchText: '',
      showResult: false
    };
  },
  props: ['role'],
  methods: {
    changeSearch() {
      this.showResult = true;
      const role = this.role;
      const KeyWord = this.searchText;
      const UserId = '';
      const data = { role, UserId, KeyWord };
      this.$store.dispatch('toSearch', data);
      console.log(this.searchText);
    }
  },
  components: { SearchResult }
};
</script>
<style type="text/css" scoped>
  .search{
    width:600px;
    margin:50px auto;
    color:#999;
    vertical-align: middle;
  }
  .search i{
    font-size: 25px;
  }
  .search .el-input__inner {
    vertical-align: middle;
  }
</style>