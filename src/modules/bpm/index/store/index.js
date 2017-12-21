import mutations from './mutations';
import actions from './actions';
import search from './modules/search';
import todoProcess from './modules/todoProcess';
import draft from './modules/draft';
import history from './modules/history';
import message from './modules/message';
import options from './modules/options';

export default {
  mutations,
  actions,
  modules: {
    search,
    todoProcess,
    draft,
    history,
    message,
    options
  }
};
