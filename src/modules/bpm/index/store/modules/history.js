import * as types from '../mutations-types';

const state = {
  myapprovalProcessData: [],
  myapprovalDataListTypesGroup: [],
  myrequestProcessData: [],
  myrequestDataListTypesGroup: []
};

const getters = {
  myapprovalProcessData: state => state.myapprovalProcessData,
  myapprovalDataListTypesGroup: state => state.myapprovalDataListTypesGroup,
  myrequestProcessData: state => state.myrequestProcessData,
  myrequestDataListTypesGroup: state => state.myrequestDataListTypesGroup
};

const mutations = {
  [types.GET_MYAPPROVAL_PROCESS](state, data) {
    state.myapprovalProcessData = data;
  },
  [types.GET_MYAPPROVAL_LISTTYPESGROUP](state, val) {
    state.myapprovalDataListTypesGroup = val;
  },
  [types.GET_MYREQUEST_PROCESS](state, data) {
    state.myrequestProcessData = data;
  },
  [types.SEARCH_MESSAGE_PROCESS](state, searchText) {
    // const t = //'('+searchText+')'/g;
    state.draftProcessData = state.draftProcessData.filter(item => {
      return /a/g.test(item.title);
    });
  },
  // 调试接口
  [types.GET_MYREQUEST_LISTTYPESGROUP](state, val) {
    state.myrequestDataListTypesGroup = val;
  }
};

const actions = {
  getMyapprovalProcess({ commit }, data) {
      return this.SWXHR.POST('/api/WorkFlow/GetMyApprovalFlowList', data);
  },
  getMyapprovalListTypesGroup({commit}, val) {
    return this.SWXHR.POST('/api/WorkFlow/GetMyApprovalFlowTypeList', val).then((res) => {
      commit(types.GET_MYAPPROVAL_LISTTYPESGROUP, res.List);
    });
  },
  getMyrequestProcess({ commit }, data) {
      return this.SWXHR.POST('/api/WorkFlow/GetMyRequestFlowTypeList', data);
  },
  getMyrequestListTypesGroup({commit}, val) {
    return this.SWXHR.POST('/api/WorkFlow/GetMyRequestFlowList', val).then((res) => {
      commit(types.GET_MYREQUEST_LISTTYPESGROUP, res.List);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
