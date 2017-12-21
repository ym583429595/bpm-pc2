<template>
  <div class="optionsInfo">
    <el-row :gutter="20" type="flex" justify="center" >
      <el-col :span="4">
        <div class="grid-content">
          <img src="" alt="placeholder+image" class="userImg"/>
          <h4>{{userInfo.NameCN}}</h4>
        </div>
      </el-col>
      <el-col :span="17">
        <el-row >
          <el-col :span="3" class="tag">姓名</el-col>
          <el-col :span="9">
            <el-input placeholder="初始化字段错误" :value="userInfo.NameCN" :disabled="true"></el-input>
          </el-col>
          <el-col :span="3" class="tag">性别</el-col>
          <el-col :span="9">
            <el-input placeholder="初始化字段错误" :value="userInfo.SEX == 'M' ? '男':'女'" :disabled="true"></el-input>
          </el-col>
        </el-row >
        <el-row class="sonRow">
        <el-col :span="3" class="tag">工号</el-col>
        <el-col :span="9">
          <el-input placeholder="初始化字段错误" :value="userInfo.Eid" :disabled="true"></el-input>
        </el-col>
        <el-col :span="3" class="tag">岗级</el-col>
        <el-col :span="9">
          <el-input placeholder="初始化字段错误" :value="userInfo.Grade" :disabled="true"></el-input>
        </el-col>
        </el-row >
        <el-row class="sonRow">
        <el-col :span="3" class="tag">公司</el-col>
        <el-col :span="9">
          <el-input placeholder="初始化字段错误" :value="userInfo.CompNameCN" :disabled="true"></el-input>
        </el-col>
        <el-col :span="3" class="tag">部门</el-col>
        <el-col :span="9">
          <el-input placeholder="初始化字段错误" :value="userInfo.DeptNameCN" :disabled="true"></el-input>
        </el-col>
        </el-row >
        <el-row class="sonRow">
        <el-col :span="3" class="tag">上级领导</el-col>
        <el-col :span="9">
          <el-input placeholder="初始化字段错误" :value="userInfo.LeaderName" :disabled="true"></el-input>
        </el-col>
        </el-row >
      </el-col>
      <el-col :span="3"><div class="grid-content"></div></el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import {
    Row,
    Col,
    Input,
    Button
} from 'element-ui';

Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Button);

  export default {
    name: 'optionsInfo',
    computed: {
      ...mapGetters('options/', ['userInfo'])
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.$store.dispatch('options/getUserInfo');
      }
    }
  };
</script>
<style type="text/css" scoped>
  .optionsInfo{
    background-color: #fff;
    padding:25px;
    text-align: center;
    border-bottom:1px solid #ddd;
  }
  .userImg{
    display: inline-block;
    width:120px;
    height:120px;
  }
  .sonRow{
    margin-top:10px;
  }
  .tag{
    height:40px;
    line-height: 40px;
    font-size: 14px;
    color:#999;
    text-align: left;
    padding-left: 15px;
  }
</style>