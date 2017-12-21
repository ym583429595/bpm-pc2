<template>
  <el-tabs v-model="initSelected" type="border-card" class="serviceCard">
    <el-tab-pane label="支持人员" name="people" >
      <ul>
        <li class='serviceLi' v-for="item in serviceInfo">
          <i class="el-icon-service serviceIcon"></i>
          <div class="liSee">
            <h5>{{item.name}}</h5>
            <h5>{{item.tel}}</h5>
          </div>
        </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="制度文档" name="document">制度文</el-tab-pane>
  </el-tabs>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex';
// import Vue from 'vue';
// import {
//     Collapse,
//     Col,
// } from 'element-ui';

// Vue.use(Collapse);
// Vue.use(Col);
  export default {
    name: 'serviceCard',
    data() {
      return {
        initSelected: 'people'
      };
    },
    computed: {
    ...mapGetters([
      'serviceInfo'
    ])
    }
  };
</script>
<style type="text/css" scoped>
  ul{
    list-style: none;
  }
  .serviceTab{
    width: 135px;
    text-align: center;
  }
  .serviceLi{
    overflow: hidden;
    color:#999;
  }
  .serviceIcon{
    padding-top: 15px;
    vertical-align: top;
    float: left;
    font-size: 20px;
  }
  .serviceCard{
    width:270px;
    height: 500px;
    float:right;
    margin:30px 30px 0 0;
  }
  .liSee{
    margin-left:20px;
    border-bottom: 1px solid #dedede;
    padding: 10px 0;
    float: left;
    width: 82%;
  }
</style>