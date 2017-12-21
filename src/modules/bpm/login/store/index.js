import { Message } from 'element-ui';

const state = {
    loginInfo: null,
    igroneUrl: null,
    role: 'guest',
    token: null
};

const mutations = {
    SET_LOGIN_INFO(state, val) {
        this.SWXHR.GET('/api/Account/GetLoginUserInfo').then((res) => {
            state.loginInfo = res.LoginUser;
        });
    },
    SET_IGRONE_URL(state, val) {
        state.igroneUrl = val;
    },
    SET_TOKEN(state, val) {
        state.token = val;
     }
    // 改用dispatch，因嵌套mutation
    // LOGIN_IN(state, data) {
    //     return this.SWXHR.POST('/api/Account/Login', data).then((res) => {
    //         if (res.code === 200) {
    //             state.token = res.TokenId;
    //             setTimeout(() => {
    //                 window.location.href = '#/index';
    //             }, 500);
    //         } else {
    //             Message({
    //                 message: res.msg,
    //                 type: 'error',
    //                 duration: 1000
    //             });
    //         }
    //     });
    // }
};
const actions = {
    logout({ commit, state, rootState }) {
        return this.SWXHR.DELETE('/session/logout').then((res) => {
            if (res.code === 'success') {
                Message({
                    message: '已成功登出',
                    type: 'success',
                    duration: 1000
                });

                commit('SET_LOGIN_INFO', null);

                let storeCurrentUrl = rootState.appCloudBase.currentUrl === '/' ? '' : rootState.appCloudBase.currentUrl;
                if (state.igroneUrl.indexOf(storeCurrentUrl) === -1) {
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 3000);
                }
            }
            return res;
        });
    },
    login({commit}, data) {
        return this.SWXHR.POST('/api/Account/Login', data).then((res) => {
            if (res.code === 200) {
                commit('SET_TOKEN', res.TokenId);
                commit('SET_LOGIN_INFO', '');
                setTimeout(() => {
                    window.location.href = '#/index';
                }, 500);
            } else {
                Message({
                    message: res.msg,
                    type: 'error',
                    duration: 1000
                });
            }
        });
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
};
