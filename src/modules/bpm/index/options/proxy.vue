<template>
  <div class="proxy">
    <el-table ref="proxyTable" :data="proxyInfo" tooltip-effect="dark" style="width: 100%">
    <el-table-column prop="DelegationTypeName" label="代理类型" width="120"></el-table-column>
    <el-table-column prop="DelegateFromDispName" label="委托人" width="180"></el-table-column>
    <el-table-column prop="DelegateToDispName" label="代理人" width="120"></el-table-column>
    <el-table-column prop="StartTime" label="开始时间" width="120"></el-table-column>
    <el-table-column prop="EndTime" label="结束时间" width="120"></el-table-column>
    <el-table-column prop="CreatedByDispName" label="创建者" width="240"></el-table-column>
    <el-table-column prop="Enable" label="是否启用" width="120" ></el-table-column>
    <el-table-column prop="DelegationStatus" label="代理状态" width="120" ></el-table-column>
    <el-table-column label="相关操作" width="360">
      <template slot-scope="scope">
          <el-button type="text" size="mini" @click="edit('edit', scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="del(scope.$index, scope.row.Id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

     <el-button type="primary" icon="el-icon-circle-plus-outline" @click="edit('add')">添加代理</el-button>
  <el-dialog :title="editproxyDialogTitle" :visible.sync="editproxyDialog">

  <el-form :model="form" label-width="100px" >
    <el-form-item label="代理类型" >
      <el-select v-model.number="form.DelegationType" placeholder="--请选择代理类型--" @change="changeDelegationType">
        <el-option label="所有流程" :value="1"></el-option>
        <el-option label="指定流程" :value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="流程名称" v-show="form.DelegationType===2">
      <el-select  v-model="form.ProcDelegationDetailList" multiple placeholder="--请选择流程类型--" @click="changeProc" value-key="TextCn">
        <el-option v-for="item in allProcItem" :key='item.Value' :label="item.TextCn" :value="item.Value" ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="委托人" >
      <el-input v-model="form.DelegateFromDispName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="代理人" >
      <el-input v-model="form.DelegateToDispName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="开始时间" >
      <el-date-picker v-model="form.StartTime" type="datetime">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间" >
      <el-date-picker v-model="form.EndTime" type="datetime" >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="是否启用" >
      <el-checkbox v-model="form.Enable">备选项</el-checkbox>
    </el-form-item>
    <el-form-item label="描述" >
      <el-input v-model="form.Descr===null ? '':form.Descr" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editproxyDialog = false">取 消</el-button>
    <el-button type="primary" @click="editproxyAgree">确 定</el-button>
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
    Radio,
    Loading,
    Dialog,
    Form,
    FormItem,
    Select,
    Option,
    Checkbox
} from 'element-ui';

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Radio);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);

  export default {
    name: 'proxy',
    data () {
      return {
        multipleSelection: [],
        editproxyDialog: false,
        editproxyDialogTitle: 'dialog初始化失败',
        canSelectedCity: false,
        canSelectedBank: false,
        form: {
          Id: '',
          DelegationType: '',
          DelegationTypeName: '',
          DelegateFrom: '',
          DelegateTo: '',
          StartTime: new Date(),
          EndTime: new Date(),
          CreateBy: '',
          Enable: '',
          DelegateFromDispName: '',
          DelegateToDispName: '',
          CreatedByDispName: '',
          DelegationStatus: '',
          Descr: '',
          ProcDelegationDetailList: []
        }
      };
    },
    computed: {
      ...mapGetters('options/', ['proxyInfo', 'allProcItem', 'oneproxyInfo'])
    },
    mounted() {
      // this.$refs.proxyTable.toggleRowSelection(this.proxyInfo.find(d => d.FromSystem === true));
    },
    methods: {
      addNewproxy() {
        this.editproxyDialog = true;
        this.$store.dispatch('options/getProviencesInfo');
        this.$store.dispatch('options/getBanksInfo');
      },
      edit(todoFlag, row) {
        this.editproxyDialog = true;
        this.$store.dispatch('options/getAllProcItem');
        this.$store.dispatch('options/getDelegationType');
        if (todoFlag === 'edit') {
            this.editproxyDialogTitle = '编辑代理信息';
            this.$store.dispatch('options/getOneProxyInfo', row.Id).then(res => {
            this.form = this.deepCopy(this.$store.state.bpm.options.oneProxyInfo);
            // if (this.form.Descr === null) { this.form.Descr = ''; }
            // if (this.form.ProcDelegationDetailList === null) { this.form.ProcDelegationDetailList = []; }
            console.log(this.form);
          });
        } else {
          this.editproxyDialogTitle = '添加新代理';
          const emptyForm = this.deepCopyByEmpty(this.form);
          this.form = emptyForm;
          this.form.UserID = this.$store.state.loginStore.loginInfo.UserId;
          console.log(this.form);
        }
      },
      del(index, row) {
        console.log(row);
        const data = {};
        data.DelegationId = row;
        this.$store.dispatch('options/deleteProxyInfo', data);
      },
      changeProc(value) {
        console.log(value);
      },
      changeCitys(value) {
        this.form.PayeeBranchBank = '';
        this.sonBanksInfo = [];
        let obj = {};
        obj = this.citysInfo.find((item) => {
            return item.CityId === value;
        });
        this.form.CityName = obj.CityName;
        console.log(this.form);
      },
      changeDelegationType(value) {
      },
      getSelectionLabel(value) {
      },
      getCitys() {
        const nowProvience = this.form.provience || this.form.PayeeBankProvince;
        if (nowProvience === '') {
          // this.canSelectedCity = true;
          this.$message.error('请先选择或搜索省');
        } else {
          this.$store.dispatch('options/getCitysInfo', nowProvience);
        }
      },
      getSonBanks() {
        const nowData = {};
        nowData.provinceId = this.form.provience || this.form.PayeeBankProvince;
        nowData.cityId = this.form.city || this.form.PayeeBankCity;
        nowData.FirstBankId = this.form.bank || this.form.PayeeBank;
        if (nowData.provinceId === '') {
          // this.canSelectedBank = true;
          return this.$message.error('请先选择或搜索省');
        }
        if (nowData.cityId === '') {
          // this.canSelectedBank = true;
          return this.$message.error('请先选择或搜索市');
        }
        if (nowData.FirstBankId === '') {
          // this.canSelectedBank = true;
          return this.$message.error('请先选择或搜索银行');
        }
        this.$store.dispatch('options/getSonBanksInfo', nowData);
      },
      editproxyAgree() {
        console.log(this.form);
        // 判断是新增时，再加字段
        if (this.form.DefaultTag === '') {
          this.form.Id = 0;
          this.form.CreateBy = this.$store.state.loginStore.loginInfo.UserId;
          this.form.CreatedByDispName = this.$store.state.loginStore.loginInfo.NameCN;
        }
        if (this.form.ProcDelegationDetailList === '') { this.form.ProcDelegationDetailList = []; }
        const data = {};
        data.ProcDelegationModel = this.form;
        this.$store.dispatch('options/confirmSubmitDelegationProxy', this.form).then(res => {
          // this.$store.dispatch('options/postNewOrEditProxy', this.form);
        });
      },
      deepCopy(source) {
        var result = {};
        for (var key in source) {
          // 深拷贝函数i
           if (source[key] !== null) {
          result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
        } else {
          result[key] = '';
        }
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
  .proxy{
    padding: 10px 50px;
  }
  .el-select {
    width: 100%;
  }
</style>