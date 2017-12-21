import * as types from '../mutations-types';
// import API from '../../api';

const state = {
  todoProcessData: [],
  searchText: '',
  searchResult: [],
  toDoListTypesGroup: []
};

const getters = {
  // searchResult: state => {
  //   console.log(state.lightText);
  //   const reg = new RegExp('(' + state.lightText + ')', 'g');
  //   return state.searchResult.map(item =>{
  //     if( state.lightText ) {
  //        item.category = item.category.replace(reg, "<i style='color:red'>" + state.lightText + "</i>");
  //        let sonItem = item.data;
  //        for(let i = 0; i < sonItem.length; i++) {
  //         sonItem[i].smCat = sonItem[i].smCat.replace(reg, "<i style='color:red'>" + state.lightText + "</i>");
  //        }
  //     }
  //      return item;
  //   });
  // },
  // lightText: state => state.lightText,
  todoProcessData: state => state.todoProcessData,
  toDoListTypesGroup: state => state.toDoListTypesGroup
};

const mutations = {
  [types.TO_SEARCH](state, data) {
    state.searchText = data.searchText;
    state.searchResult = [];
  },
  [types.GET_TODO_PROCESS](state, data) {
    state.todoProcessData = data;
  },
  [types.SEARCH_TODO_PROCESS](state, searchText) {
    // const t = //'('+searchText+')'/g;
    state.todoProcessData = state.todoProcessData.filter(item => {
      return /a/g.test(item.title);
    });
  },
  // 调试接口
  [types.GET_TODO_LISTTYPESGROUP](state, val) {
    state.toDoListTypesGroup = val;
  }
};

const actions = {
  getTodoProcess({ commit }, data) {
      return this.SWXHR.POST('/api/WorkFlow/GetMyToDoList', data);
  },
  searchTodoProcess({ commit }, data) {
    commit(types.SEARCH_TODO_PROCESS, data.searchText);
  },
  getToDoListTypesGroup({commit}, val) {
    return this.SWXHR.POST('/api/WorkFlow/GetMyToToListTypesGroup', val).then((res) => {
      commit(types.GET_TODO_LISTTYPESGROUP, res.List);
    });
  },
  toDoListApprove({ commit }, data) {
    return this.SWXHR.POST('/api/WorkFlow/ToDoListApprove', data);
  },
  toDoListReject({ commit }, data) {
    return this.SWXHR.POST('/api/WorkFlow/ToDoListReject', data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
