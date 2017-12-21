<template>
  <div class="finance">
    <el-table ref="financeTable" :data="financeInfo" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column prop="AccountName" label="账户名" width="120"></el-table-column>
    <el-table-column prop="ProvinceName" label="省" width="60"></el-table-column>
    <el-table-column prop="CityName" label="市" width="60"></el-table-column>
    <el-table-column prop="PayeeBankName" label="银行" width="120"></el-table-column>
    <el-table-column prop="PayeeBranchBank" label="支行" width="240"></el-table-column>
    <el-table-column prop="AccountNumber" label="账户" width="240"></el-table-column>
    <el-table-column label="默认" width="50" >
       <template slot-scope="scope">
        <!-- <el-radio class="radio" v-model="radio" :label="scope.row.FromSystem"></el-radio> -->
        <el-Checkbox name="radio" v-model="scope.row.DefaultTag === 1" @click.native="changeDefaultTag(scope.row.Id)"></el-Checkbox>
      </template>
    </el-table-column>
    <el-table-column label="相关操作" >
      <template slot-scope="scope">
          <el-button type="text"   size="mini" @click="edit('edit', scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="del(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
     <el-button type="primary" icon="el-icon-circle-plus-outline" @click="edit('add')">新建财务信息</el-button>
  <el-dialog :title="editFinanceDialogTitle" :visible.sync="editFinanceDialog">

  <el-form :model="form" label-width="100px" >
    <el-form-item label="账户名" >
      <el-input v-model="form.AccountName " disabled></el-input>
    </el-form-item>
    <el-form-item label="省"  >
      <el-select v-model="form.PayeeBankProvince" placeholder="--请选择--" filterable @change="changeProviences">
        <el-option v-for="item in proviencesInfo" :key='item.ProvinceId' :label="item.ProvinceName" :value="item.ProvinceId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="市" >
      <el-select v-model="form.PayeeBankCity" :disabled="canSelectedCity" placeholder="--请选择--" @click.native="getCitys" filterable @change="changeCitys">
        <el-option v-for="item in citysInfo" :key='item.CityId' :label="item.CityName" :value="item.CityId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="银行" >
      <el-select v-model="form.PayeeBank" placeholder="--请选择--" filterable @change="changeBanks">
        <el-option v-for="item in banksInfo" :key='item.HeadBankId' :label="item.HeadBankName" :value="item.HeadBankId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="支行" >
      <el-select v-model="form.PayeeBranchBank" :disabled="canSelectedBank" placeholder="--请选择--" @click.native="getSonBanks">
        <el-option v-for="item in sonBanksInfo" :key='item.BankCode':label="item.BankName" :value="item.BankCode"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="账户"  required>
      <el-input v-model="form.AccountNumber" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editFinanceDialog = false">取 消</el-button>
    <el-button type="primary" @click="editFinanceAgree">确 定</el-button>
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
    name: 'finance',
    data () {
      return {
        multipleSelection: [],
        editFinanceDialog: false,
        editFinanceDialogTitle: 'dialog初始化失败',
        canSelectedCity: false,
        canSelectedBank: false,
        form: {
          AccountName: '',
          AccountNumber: '',
          BankCode: '',
          CityName: '',
          DefaultTag: 0,
          FromSystem: true,
          Id: 0,
          PayeeBank: 0,
          PayeeBankCity: 0,
          PayeeBankName: '',
          PayeeBankProvince: 0,
          PayeeBranchBank: '',
          ProvinceName: '',
          UserID: '',

          provience: '',
          city: '',
          bank: '',
          sonBank: '',
          account: ''
        }
      };
    },
    computed: {
      ...mapGetters('options/', ['financeInfo', 'proviencesInfo', 'citysInfo', 'banksInfo', 'sonBanksInfo', 'oneFinanceInfo'])
    },
    mounted() {
      // this.$refs.financeTable.toggleRowSelection(this.financeInfo.find(d => d.FromSystem === true));
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.financeTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.financeTable.clearSelection();
        }
      },
      handleSelectionChange(data) {
        console.log('更改选择项');
        // this.multipleSelection = val;
      },
      selectionChange() {

      },
      changeDefaultTag(id) {
        console.log(id);
        const data = {};
        data.financeInfoId = id;
        data.userId = this.$store.state.loginStore.loginInfo.UserId;
        this.$store.dispatch('options/updateDefaultFlag', data);
      },
      addNewFinance() {
        this.editFinanceDialog = true;
        this.$store.dispatch('options/getProviencesInfo');
        this.$store.dispatch('options/getBanksInfo');
      },
      edit(todoFlag, row) {
        this.editFinanceDialog = true;
        this.$store.dispatch('options/getProviencesInfo');
        this.$store.dispatch('options/getBanksInfo');
        if (todoFlag === 'edit') {
            // this.canSelectedCity = false;
            // this.canSelectedBank = false;
            this.editFinanceDialogTitle = '编辑财务信息';
            this.$store.dispatch('options/getOneFinanceInfo', row.Id).then(res => {
            this.form = this.deepCopy(this.$store.state.bpm.options.oneFinanceInfo);
            console.log(this.form);
          });
        } else {
          // this.canSelectedCity = true;
          // this.canSelectedBank = true;
          this.editFinanceDialogTitle = '添加财务信息';
          const emptyForm = this.deepCopyByEmpty(this.form);
          this.form = emptyForm;
          this.form.UserID = this.$store.state.loginStore.loginInfo.UserId;
          console.log(this.form);
        }
      },
      del(index, row) {
        console.log(row);
        const data = {};
        data.financeInfoId = row.Id;
        this.$store.dispatch('options/deleteFinanceInfo', data);
      },
      changeProviences(value) {
        this.form.PayeeBranchBank = '';
        this.sonBanksInfo = [];
        this.form.PayeeBankCity = '';
        this.citysInfo = [];
        let obj = {};
        obj = this.proviencesInfo.find((item) => {
            return item.ProvinceId === value;
        });
        this.form.ProvinceName = obj.ProvinceName;
        console.log(this.form);
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
      changeBanks(value) {
        this.form.PayeeBranchBank = '';
        this.sonBanksInfo = [];
        let obj = {};
        obj = this.banksInfo.find((item) => {
            return item.HeadBankId === value;
        });
        this.form.PayeeBankName = obj.HeadBankName;
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
      editFinanceAgree() {
        console.log(this.form);
        // 判断是新增时，再加字段
        if (this.form.DefaultTag === '') {
          this.form.DefaultTag = 0;
          this.form.FromSystem = 'false';
        }
        this.form.BankCode = null;
        this.$store.dispatch('options/postNewOrEditFinance', this.form);
      },
      deepCopy(source) {
        var result = {};
        for (var key in source) {
          // 深拷贝函数i
          result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
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
  .finance{
    padding: 10px 50px;
  }
  .el-select {
    width: 100%;
  }
</style>