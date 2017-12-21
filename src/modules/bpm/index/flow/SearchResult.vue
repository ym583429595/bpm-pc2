<template>
  <el-row type="flex">
    <el-col :span="17">
      <SearchList></SearchList>
    </el-col>
    <el-col :span="1">
    </el-col>
    <el-col :span="6">
      <Service v-show="showService"></Service>
    </el-col>
  </el-row>
</template>
<script type="text/javascript">
import Service from './service';
import SearchList from './SearchList';
import { mapGetters } from 'vuex';
import Vue from 'vue';
import {
    Row,
    Col
} from 'element-ui';

Vue.use(Row);
Vue.use(Col);

export default {
  name: '',
  computed: {
    ...mapGetters([
      'showService'
    ])
  },
  components: { Service, SearchList }
};
</script>
<style type="text/css" scoped>

</style>