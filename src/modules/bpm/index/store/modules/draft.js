import * as types from '../mutations-types';
// import API from '../../api';

const state = {
  draftProcessData: [],
  draftListTypesGroup: []
};

const getters = {
  draftProcessData: state => state.draftProcessData,
  draftListTypesGroup: state => state.draftListTypesGroup
};

const mutations = {
  [types.GET_DRAFT_PROCESS](state, data) {
    state.draftProcessData = data;
  },
  [types.SEARCH_DRAFT_PROCESS](state, searchText) {
    // const t = //'('+searchText+')'/g;
    state.draftProcessData = state.draftProcessData.filter(item => {
      return /a/g.test(item.title);
    });
  },
  // 调试接口
  [types.GET_DRAFT_LISTTYPESGROUP](state, val) {
    state.draftListTypesGroup = val;
  }
};

const actions = {
  getDraftProcess({ commit }, data) {
      return this.SWXHR.POST('/api/WorkFlow/GetDraftList', data);
  },
  searchDraftProcess({ commit }, data) {
    commit(types.SEARCH_DRAFT_PROCESS, data.searchText);
  },
  getDraftListTypesGroup({commit}, val) {
    return this.SWXHR.POST('/api/WorkFlow/GetMyDraftTypesGroup', val).then((res) => {
      commit(types.GET_DRAFT_LISTTYPESGROUP, res.List);
    });
  },
  DraftListApprove({ commit }, data) {
    return this.SWXHR.POST('/api/WorkFlow/DRAFTListApprove', data);
  },
  delDraftList({ commit }, data) {
    return this.SWXHR.POST('/api/WorkFlow/DeleteMyDrftList', data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
