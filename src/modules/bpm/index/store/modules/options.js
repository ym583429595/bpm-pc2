import * as types from '../mutations-types';

const state = {
  userInfo: [],
  financeInfo: [],
  proviencesInfo: [],
  citysInfo: [],
  banksInfo: [],
  sonBanksInfo: [],
  oneFinanceInfo: {},
  // 代理数据
  proxyInfo: [],
  delegationType: [],
  allProcItem: [],
  oneProxyInfo: {},
  // 用户组数据
  userGroupInfo: [],
  oneUserGroupInfo: {}
};
const getters = {
  userInfo: state => state.userInfo,
  financeInfo: state => state.financeInfo,
  oneFinanceInfo: state => state.oneFinanceInfo,
  proviencesInfo: state => state.proviencesInfo,
  citysInfo: state => state.citysInfo,
  banksInfo: state => state.banksInfo,
  sonBanksInfo: state => state.sonBanksInfo,
  proxyInfo: state => state.proxyInfo,
  delegationType: state => state.delegationType,
  allProcItem: state => state.allProcItem,
  oneProxyInfo: state => state.oneProxyInfo,
  userGroupInfo: state => state.userGroupInfo,
  oneUserGroupInfo: state => state.oneUserGroupInfo
};
const mutations = {
  [types.GET_USERINFO](state, val) {
    state.userInfo = val;
  },
  [types.GET_FINANCEINFO](state, val) {
    state.financeInfo = val;
  },
  [types.GET_ONE_FINANCEINFO](state, val) {
    state.oneFinanceInfo = val;
  },
  [types.GET_PROVIENCESINFO](state, val) {
    state.proviencesInfo = val;
  },
  [types.GET_CITYSINFO](state, val) {
    state.citysInfo = val;
  },
  [types.GET_BANKSINFO](state, val) {
    state.banksInfo = val;
  },
  [types.GET_SONBANKSINFO](state, val) {
    state.sonBanksInfo = val;
  },
  [types.GET_PROXYINFO](state, val) {
    state.proxyInfo = val;
  },
  [types.GET_DELEGATION_TYPE](state, val) {
    state.delegationType = val;
  },
  [types.GET_ALL_PROC_ITEM](state, val) {
    state.allProcItem = val;
  },
  [types.GET_ONE_PROXYINFO](state, val) {
    state.oneProxyInfo = val;
  },
  [types.GET_USEGROUPINFO](state, val) {
    state.userGroupInfo = val;
  },
  [types.GET_ONE_USEGROUPINFO](state, val) {
    state.oneUserGroupInfo = val;
  }
};
const actions = {
  getUserInfo({ commit }, data) {
    this.SWXHR.POST('/api/WorkFlow/GetPersonalInfo', data).then((res) => {
      commit(types.GET_USERINFO, res.personalInfoModel);
    });
  },
  getFinanceInfo({commit}, data) {
    this.SWXHR.POST('/api/WorkFlow/GetFinanceInfoList', data).then((res) => {
      commit(types.GET_FINANCEINFO, res.financeList);
    });
  },
  getOneFinanceInfo({commit}, val) {
    const data = {};
    data.financeInfoId = val;
    return this.SWXHR.POST('/api/WorkFlow/EditFinanceInfo', data).then((res) => {
      commit(types.GET_ONE_FINANCEINFO, res.model);
    });
  },
  getProviencesInfo({commit}) {
    const data = {};
    data.ProvinceName = '';
    data.ProvinceCode = '';
    this.SWXHR.POST('/api/WorkFlow/GetProvince', data).then((res) => {
      commit(types.GET_PROVIENCESINFO, res.provinces);
    });
  },
  getCitysInfo({commit}, val) {
    const data = {};
    data.CityName = '';
    data.CityCode = '';
    data.ProvinceId = val;
    this.SWXHR.POST('/api/WorkFlow/GetCity', data).then((res) => {
      commit(types.GET_CITYSINFO, res.cities);
    });
  },
  getBanksInfo({commit}) {
    const data = {};
    data.FirstBankName = '';
    data.FirstBankCode = '';
    this.SWXHR.POST('/api/WorkFlow/GetFirstBank', data).then((res) => {
      commit(types.GET_BANKSINFO, res.banks);
    });
  },
  getSonBanksInfo({commit}, val) {
    this.SWXHR.POST('/api/WorkFlow/GetSecondBank', val).then((res) => {
      commit(types.GET_SONBANKSINFO, res.branchBanks);
    });
  },
  updateDefaultFlag({commit}, val) {
    this.SWXHR.POST('/api/WorkFlow/UpdateDefaultFlag', val).then((res) => {
      // console.log(2);
    });
  },
  postNewOrEditFinance ({commit}, data) {
    this.SWXHR.POST('/api/WorkFlow/AddOrUpdateFinanceInfo', data).then((res) => {
      // commit(types.POST_NEW_OR_EDIT_FINANCE, res.banks);
    });
  },
  deleteFinanceInfo({commit}, val) {
    this.SWXHR.POST('/api/WorkFlow/DeleteFinanceInfo', val).then((res) => {
       console.log(2);
    });
  },
  getProxyInfo({commit}, data) {
    this.SWXHR.POST('/api/WorkFlow/GetDelegationProxyList', data).then((res) => {
      commit(types.GET_PROXYINFO, res.List);
    });
  },
  getDelegationType({commit}) {
    this.SWXHR.POST('/api/WorkFlow/GetDelegationType').then((res) => {
      commit(types.GET_DELEGATION_TYPE, res.list);
    });
  },
  getAllProcItem({commit}) {
    this.SWXHR.POST('/api/WorkFlow/GetAllProcItem').then((res) => {
      commit(types.GET_ALL_PROC_ITEM, res.list);
    });
  },
  deleteProxyInfo({commit}, val) {
    this.SWXHR.POST('/api/WorkFlow/DeleteDelegationProxy', val).then((res) => {
       console.log('DeleteDelegationProxy');
    });
  },
  getOneProxyInfo({commit}, val) {
    const data = {};
    data.DelegationId = val;
    return this.SWXHR.POST('/api/WorkFlow/EditDelegationProxy', data).then((res) => {
      commit(types.GET_ONE_PROXYINFO, res.procDelegationModel);
    });
  },
  postNewOrEditProxy ({commit}, data) {
    this.SWXHR.POST('/api/WorkFlow/AddOrUpdateDelegationProxy', data).then((res) => {
      // commit(types.POST_NEW_OR_EDIT_FINANCE, res.banks);
    });
  },
  confirmSubmitDelegationProxy ({commit}, data) {
    return this.SWXHR.POST('/api/WorkFlow/ConfirmSubmitDelegationProxy', data);
  },
  // USEGROUP
  getUsergroupInfo({commit}, data) {
    this.SWXHR.POST('/api/WorkFlow/GetUserGroupList', data).then((res) => {
      commit(types.GET_USEGROUPINFO, res.userGroups);
    });
  },
  getOneUserGroupInfo({commit}, val) {
    const data = {};
    data.userGroupId = val;
    return this.SWXHR.POST('/api/WorkFlow/EditUserGroup', data).then((res) => {
      commit(types.GET_ONE_USEGROUPINFO, res.userGroupModel);
    });
  },
  deleteUserGroupInfo({commit}, val) {
    return this.SWXHR.POST('/api/WorkFlow/DeleteUserGroup', val).then((res) => {
       console.log('DeleteDelegation');
    });
  },
  confirmSubmitUserGroup ({commit}, data) {
    return this.SWXHR.POST('/api/WorkFlow/ConfirmSubmitUserGroup', data);
  },
  postNewOrEditUsergroup ({commit}, data) {
    return this.SWXHR.POST('/api/WorkFlow/AddOrUpdateUserGroup', data).then((res) => {
      // commit(types.POST_NEW_OR_EDIT_FINANCE, res.banks);
    });
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
// 1,刷新后布局正常 2.userid问题 3.自动刷新页面，修改默认,4.tooken 5侧边bar颜色
