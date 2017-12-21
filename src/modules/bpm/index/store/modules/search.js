import * as types from '../mutations-types';

const state = {
  searchResult: [],
  newResult: [],
  lightText: '',
  showService: false,
  serviceInfo: []
};

const getters = {
  searchResult: state => state.newResult,
  lightText: state => state.lightText,
  showService: state => state.showService,
  serviceInfo: state => state.serviceInfo
};

const mutations = {
  [types.TO_SEARCH](state, val) {
     state.searchResult = val;
     const reg = new RegExp('(' + state.lightText + ')', 'g');
     state.newResult = val.map(item => {
      if (state.lightText) {
         // item.category = item.category.replace(reg, "<i style='color:red'>" + state.lightText + "</i>");
         // let sonItem = item.data;
         // for (let i = 0; i < sonItem.length; i++) {
         // sonItem[i].smCat = sonItem[i].smCat.replace(reg, "<i style='color:#4CCEF1'>" + state.lightText + "</i>");
         // }
          item.DisplayNameCN = item.DisplayNameCN.replace(reg, "<i style='color:#4CCEF1'>" + state.lightText + '</i>');
      }
       return item;
    });
     console.log('1');
  },
  [types.SET_LIGHT_TEXT](state, val) {
    state.lightText = val;
  },
  to_show_service(state) {
    state.showService = true;
  },
  [types.GET_SERVICE_INFO](state, data) {
    state.serviceInfo = [{
          name: '运维热线',
          tel: '40000-0571-11'
        }, {
          name: '李东辉',
          tel: '费用报销流程负责报销流程负人'
        }, {
          name: '江狼狼',
          tel: '人力资源it支持'
        }];
  }
};

const actions = {
  toSearch({ commit }, data) {
      commit(types.SET_LIGHT_TEXT, data.KeyWord);
      this.SWXHR.POST('/api/WorkFlow/GetAllThirdTypes', data).then((res) => {
        console.log(res);
        commit(types.TO_SEARCH, res.AllThirdTypes);
      });
    // commit(types.TO_SEARCH, data);
  },
  getServiceInfo({ commit }, val) {
    const data = {};
    data.ThirdTypeId = val;
    console.log('res');
    this.SWXHR.POST('/api/WorkFlow/GetWorkflowSupporters', data).then((res) => {
        console.log(res);
        // commit(types.GET_SERVICE_INFO, data);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
