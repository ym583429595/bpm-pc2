<template>
  <div class="userGroup">
    <el-table ref="userGroupTable" :data="userGroupInfo" tooltip-effect="dark" style="width: 100%">
    <el-table-column prop="UserGroupName" label="用户组名称" width="240"></el-table-column>
    <el-table-column prop="CreateTime" label="创建时间" width="240"></el-table-column>
    <el-table-column label="相关操作" width="120">
      <template slot-scope="scope">
          <el-button type="text" size="mini" @click="edit('edit', scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="del(scope.$index, scope.row.Id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

     <el-button type="primary" icon="el-icon-circle-plus-outline" @click="edit('add')">添加用户组</el-button>
  <el-dialog :title="edituserGroupDialogTitle" :visible.sync="edituserGroupDialog">

  <el-form :model="form" label-width="100px" >

    <el-form-item label="用户组名称" >
      <el-input v-model="form.UserGroupName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户" >
      <el-button type="primary" icon="el-icon-circle-plus-outline
"></el-button>
    </el-date-picker>
    </el-form-item>
    <el-form-item label="组织" >
      <el-button type="primary" icon="el-icon-circle-plus-outline
"></el-button>
    </el-date-picker>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="edituserGroupDialog = false">取 消</el-button>
    <el-button type="primary" @click="edituserGroupAgree">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex';
import Vue from 'vue';
import {
    Table,
    TableColumn,
    Loading,
    Dialog,
    Form,
    FormItem
} from 'element-ui';

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);

  export default {
    name: 'userGroup',
    data () {
      return {
        edituserGroupDialog: false,
        edituserGroupDialogTitle: 'dialog初始化失败',
        form: {
          CreateBy: '',
          CreateTime: '',
          Enable: true,
          Id: 0,
          ReleaseOrgTarget: '',
          ReleaseUserTarget: '',
          UpdateTime: '',
          UpdateBy: '',
          UserGroupName: '',
          UserGroupType: 2
        }
      };
    },
    computed: {
      ...mapGetters('options/', ['userGroupInfo', 'oneuserGroupInfo'])
    },
    mounted() {
      // this.$refs.userGroupTable.toggleRowSelection(this.userGroupInfo.find(d => d.FromSystem === true));
      this.init();
    },
    methods: {
      init() {
        const usergroupData = {};
        usergroupData.UserId = this.$store.state.loginStore.loginInfo.UserId;
        usergroupData.pageIndex = 0;
        usergroupData.pageSize = 100;
        this.$store.dispatch('options/getUsergroupInfo', usergroupData);
      },
      addNewuserGroup() {
        this.edituserGroupDialog = true;
        this.$store.dispatch('options/getProviencesInfo');
        this.$store.dispatch('options/getBanksInfo');
      },
      edit(todoFlag, row) {
        this.edituserGroupDialog = true;
        // this.$store.dispatch('options/getAllProcItem');
        // this.$store.dispatch('options/getDelegationType');
        if (todoFlag === 'edit') {
            this.edituserGroupDialogTitle = '编辑用户组信息';
            this.$store.dispatch('options/getOneUserGroupInfo', row.Id).then(res => {
            this.form = this.deepCopy(this.$store.state.bpm.options.oneUserGroupInfo);
            console.log(this.form);
          });
        } else {
          this.edituserGroupDialogTitle = '添加用户组';
          const emptyForm = this.deepCopyByEmpty(this.form);
          this.form = emptyForm;
        }
      },
      del(index, row) {
        console.log(row);
        const data = {};
        data.userGroupId = row;
        this.$store.dispatch('options/deleteUserGroupInfo', data).then(() => {
          this.init();
          this.$message.success('删除成功');
        });
      },
      edituserGroupAgree() {
        console.log(this.form);
        // 判断是新增时，再加字段
        if (this.form.Id === '') {
          this.form.Id = 0;
          this.form.CreateTime = new Date();
          this.form.CreateBy = this.$store.state.loginStore.loginInfo.UserId;
          }
          this.form.Descr = '';
          this.form.UpdateBy = this.$store.state.loginStore.loginInfo.UserId;
          this.form.UpdateTime = new Date();
          this.form.ReleaseUserTarget = '[{"type":"1","id":20200,"userId":"He.Tao","dispName":"何涛(Tao He)"},{"type":"1","id":41964,"userId":"0112945","dispName":"李梦春(Malcolm Li)"}]';
          this.form.ReleaseOrgTarget = '[{"type":"4","id":512,"OrgCode":"002","dispName":"浙江吉利汽车零部件采购有限公司"},{"type":"4","id":581,"OrgCode":"003","dispName":"临海公司"},{"type":"4","id":633,"OrgCode":"004","dispName":"路桥公司"}]';

        const data = {};
        data.model = this.form;
        this.$store.dispatch('options/confirmSubmitUserGroup', data).then(res => {
          if (res.allowSubmit) {
            this.$store.dispatch('options/postNewOrEditUsergroup', data).then(() => {
            this.init();
            this.$message.success('添加/编辑成功');
        });
          }
        });
        this.edituserGroupDialog = false;
      },
      deepCopy(source) {
        var result = {};
        for (var key in source) {
          // 深拷贝函数i
          result[key] = typeof source[key] === 'object' && source[key] !== null ? this.deepCopy(source[key]) : source[key];
        }
        return result;
      },
      deepCopyByEmpty(source) {
        var result = {};
        for (var key in source) {
          // 深拷贝函数i
          if (key !== 'AccountName') {
          result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : '';
          } else {
            result[key] = this.$store.state.loginStore.loginInfo.NameCN;
          }
        }
        return result;
      }
    }
  };
</script>
<style type="text/css" scoped>
  .userGroup{
    padding: 10px 50px;
  }
  .el-select {
    width: 100%;
  }
</style>