import Vue from 'vue';
import { sweetStore, sweetRouter, SWXHR, SWTOOL } from '@sweetui/sweet';
import App from '@/modules/bpm/app';
import chkLogin from '@/modules/bpm/login';
import '@/modules/bpm-theme/index.scss';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

const SWXHR_OPTIONS = {
    config: {
        // 配置全局接口前缀
        baseURL: '',
        // 配置全局接口延迟
        timeout: 0,
        // 配置全局接口请求头 ...其他更多配置项可以参考axios文档
        headers: {}
    },
    intercept: {
        // 配置全局SWXHR拦截器 -- > 请求前
        request(p) {
            // console.log('请求前');
            return p;
        },
        // 配置全局SWXHR拦截器 -- > 请求后
        response(res) {
            var result = res.data;
            if (result.code === 'user-not-login') {
                let currentUrl = window.location.hash.replace(/#/g, ''),
                    matchUrl = currentUrl === '/' ? '' : currentUrl,
                    re = matchUrl.match(/\/.*?(?=\/)/)[0],
                    isMatch = sweetStore.state.loginStore.igroneUrl.indexOf(re) === -1;

                if (isMatch) {
                    Vue.prototype.$message(result.message);

                    return;
                }
                return result;
            }

            if (res.status === 200 && result.code !== 'success') {
                Vue.prototype.$message(result.message);
            }

            return result;
        }
    }
};

// 注册全局ajax方法 -- > SWXHR
const xhr = new SWXHR(SWXHR_OPTIONS, sweetStore, SWTOOL);

chkLogin({
    router: sweetRouter,
    store: sweetStore,
    xhr
});

Vue.use(SWTOOL);

sweetStore.dispatch('initLang').then(i18n => {
    new Vue({
        el: '#app',
        router: sweetRouter,
        store: sweetStore,
        i18n,
        template: '<App/>',
        components: { App }
    });
});

// webpack热加载
if (module.hot) { module.hot.accept(); };
