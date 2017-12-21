<template>
    <div id="app">
        <sw-layout id="appBpm" head-height="50" foot-height="0">
            <app-header slot="head"></app-header>
            <router-view slot="body"></router-view>
            <!-- <app-footer slot="foot"></app-footer> -->
        </sw-layout>
    </div>
</template>
<script>
import appStore from './store';
import swLayout from '@/plugins/sweet-plugin-layout';
import appHeader from '../header';
import appFooter from '../footer';

export default {
    name: 'app',
    beforeCreate() {
        // 注册当前模块到Store
        if (!this.$store.state.app) this.$store.registerModule('app', appStore);

        this.$router.beforeResolve((to, from, next) => {
            if (this.menuData) {
                this.setMenu(to);
                next();
            } else {
                this.$store.dispatch('getMenu').then(() => {
                    this.setMenu(to);
                    next();
                });
            }
        });
    },
    components: {
        swLayout,
        appHeader,
        appFooter
    },
    computed: {
        menuData() {
            return this.$store.state.app.menuData;
        }
    },
    methods: {
        setMenu(to) {
            let pathArr = to.path.split('/'),
                newPath = pathArr.slice(0, pathArr.length - Object.keys(to.params).length).join('/');

            // console.log(newPath);
            this.$store.commit('CHANGE_CURRENT_URL', newPath);
            this.$store.dispatch('setMenuPath');
        }
    }
};

</script>
