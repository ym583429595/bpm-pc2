const state = {
    headerHeight: 0,
    breadCrumb: []
};

const mutations = {
    CHANGE_FRAME_HEADHEIGHT(state, val) {
        state.headerHeight = val;
    },
    CHANGE_FRAME_BREAD_CRUMB(state, val) {
        state.breadCrumb = val;
    }
};

const actions = {
    
};

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
};
