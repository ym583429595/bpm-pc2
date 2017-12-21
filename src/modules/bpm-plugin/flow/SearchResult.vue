<template>
  <el-row type="flex">
    <el-col :span="17">
      <SearchList></SearchList>
    </el-col>
    <el-col :span="1">
    </el-col>
    <el-col :span="6">
      <Service></Service>
    </el-col>
  </el-row>
</template>
<script type="text/javascript">
import Service from './service';
import SearchList from './SearchList';

export default {
  name: '',
  components: { Service, SearchList }
};
</script>
<style type="text/css" scoped>

</style>