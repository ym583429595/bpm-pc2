import * as types from '../mutations-types';
// import API from '../../api';

const state = {
  messageProcessData: [],
  messageDataListTypesGroup: []
};

const getters = {
  messageProcessData: state => state.messageProcessData,
  messageDataListTypesGroup: state => state.messageDataListTypesGroup
};

const mutations = {
  [types.GET_MESSAGE_PROCESS](state, data) {
    state.messageProcessData = data;
  },
  [types.SEARCH_MESSAGE_PROCESS](state, searchText) {
    // const t = //'('+searchText+')'/g;
    state.draftProcessData = state.draftProcessData.filter(item => {
      return /a/g.test(item.title);
    });
  },
  // 调试接口
  [types.GET_MESSAGE_LISTTYPESGROUP](state, val) {
    state.messageDataListTypesGroup = val;
  }
};

const actions = {
  getMsgProcess({ commit }, data) {
      return this.SWXHR.POST('/api/WorkFlow/GetMyNoticationFlowList', data);
  },
  searchDraftProcess({ commit }, data) {
    commit(types.SEARCH_MESSAGE_PROCESS, data.searchText);
  },
  getMsgListTypesGroup({commit}, val) {
    return this.SWXHR.POST('/api/WorkFlow/GetMyNoticationFlowTypeList', val).then((res) => {
      commit(types.GET_MESSAGE_LISTTYPESGROUP, res.List);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
