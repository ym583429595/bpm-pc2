const state = {
    headModeCls: '',
    headerHeight: 0,
    footerHeight: 0,
    bodyMinHeight: 0
};

const mutations = {
    CHANGE_HEADMODE(state, val) {
        let cls = {};
        switch (val) {
            case 'static':
                cls = { 'static': true };
                break;
            case 'immersive':
                cls = { 'immersive': true };
                break;
            default:
                cls = { 'fixed': true };
        }
        state.headModeCls = cls;
    },
    CHANGE_HEADERHEIGHT(state, val) {
        state.headerHeight = Number(val);
    },
    CHANGE_FOOTERHEIGHT(state, val) {
        state.footerHeight = Number(val);
    },
    CHANGE_BODYHEIGHT(state, val) {
        state.bodyMinHeight = Number(val);
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
