import loginStore from './store';

const chkLogin = function({ router, store, xhr, igroneUrl }) {
    router.beforeEach((to, from, next) => {
        if (!store.state.loginStore) {
            store.registerModule('loginStore', loginStore);
        }

        if (igroneUrl) {
            store.commit('SET_IGRONE_URL', igroneUrl);
            for (var i = 0; i < to.matched.length; i++) {
                if (igroneUrl.indexOf(to.matched[i].path) > -1) {
                    next();
                }
            }
        }

        const loginInfo = store.state.loginStore.loginInfo;

        if (!loginInfo) {
            /*
            xhr.GET('/session/session-info').then(res => {
                if (res.code !== 'user-not-login') {
                    store.commit('SET_LOGIN_INFO', res.data);
                }
                next();
            });
            */
            store.commit('SET_LOGIN_INFO', { name: 'user', id: 1 });
            next();
        } else {
            next();
        }
    });
};

export default chkLogin;
