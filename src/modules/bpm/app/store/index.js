const state = {
    currentUrl: '/',
    currentMenuId: '1',
    serviceInstence: null,
    menuPath: [],
    menuData: null,
    permission: false
};

const mutations = {
    CHANGE_CURRENT_URL(state, val) {
        state.currentUrl = val;
    },
    SET_MENU(state, val) {
        state.menuData = val;
    },
    SET_MENU_PATH(state, val) {
        state.menuPath = val;
    },
    SET_CURRENT_MENUID(state, val) {
        state.currentMenuId = val;
    },
    SET_SERVICEINSTENCE(state, val) {
        state.serviceInstence = val;
    },
    PERMISSION_CHECK(state, val) {
        // 权限校验
        state.permission = val.permission;
    }
};

const actions = {
    // 获取菜单数据
    getMenu({ commit }) {
        let list = {},
            urlList = {};
        let formatData = (data, parentId = 0) => {
            let arr = [],
                obj = {};
            for (let i = 0; i < data.length; i++) {
                let hasChild = data[i].children ? data[i].children.length > 0 : false,
                    initIdx = i + 1,
                    menuId = parentId ? parentId + '-' + initIdx : String(initIdx),
                    children = hasChild ? formatData(data[i].children, menuId) : [],
                    itemData = {
                        ...data[i],
                        menuId,
                        hasChild,
                        parentId
                    };
                arr.push({
                    ...itemData,
                    children: children.arr ? children.arr : []
                });

                obj[menuId] = {
                    ...itemData,
                    children: children.obj ? children.obj : []
                };

                list[menuId] = {
                    ...itemData,
                    children: children.arr ? children.arr : []
                };

                urlList[data[i].url] = {
                    ...itemData,
                    children: children.arr ? children.arr : []
                };
            }

            return {
                arr,
                obj,
                list,
                urlList
            };
        };
        return this.SWXHR.GET('./json/menu.json').then((res) => {
            console.log(formatData(res.data));
            commit('SET_MENU', formatData(res.data));
        });
    },
    setMenuPath({ state, commit }) {
        if (!state.menuData) return;
        let urlList = state.menuData.urlList,
            list = state.menuData.list,
            pathArr = [],
            fn = (menu) => {
                pathArr.push(menu.menuId);

                if (menu.parentId === 0) return;
                fn(list[menu.parentId]);
            },
            currentData = urlList[state.currentUrl];
        if (!currentData) return;
        commit('SET_CURRENT_MENUID', currentData.menuId);
        fn(currentData);
        console.log(pathArr);
        commit('SET_MENU_PATH', pathArr);
    },
    setServiceInstence({ state, commit }, { serviceId, appId }) {
        if (!serviceId) return false;
        if (!appId) appId = null;
        let serviceInstence = state.serviceInstence;
        if (serviceInstence) {
            if (serviceInstence.serviceId === serviceId && serviceInstence.appId === appId) {
                return serviceInstence;
            }
        }
        return this.SWXHR.GET('/service/instance', {
            params: {
                serviceId,
                appId
            }
        }).then((res) => {
            if (res.code === 'success') {
                commit('SET_SERVICEINSTENCE', res.data);
                return res.data;
            }
        });
    }
};

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
};
