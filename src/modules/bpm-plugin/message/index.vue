<template>
    <el-menu :active-text-color="activecolor" :text-color="textcolor" :collapse="isCollapse" :default-active="currentMenuId" :router="true">
        <template v-for="item in menuData" v-if="!item.hidden">
            <el-submenu :index="item.menuId" :key="item.menuId" v-if="item.hasChild && !item.separate">
                <i :class="item.icon"></i>
                <template slot="title">
                    <span>{{item.title}}</span>
                </template>
                <template v-for="subItem in item.children" v-if="!subItem.hidden">
                    <el-menu-item :index="subItem.menuId" :key="subItem.menuId" :route="{path:subItem.url}">
                        {{subItem.title}}
                    </el-menu-item>
                </template>
            </el-submenu>
            <el-menu-item :index="item.menuId" :key="item.menuId" v-if="!item.hasChild || item.separate" :route="{path:item.url}">
                <div class="bpm-menu-item">
                    <i :class="item.icon"></i>
                    <p>{{item.title}}</p>
                </div>
                <template slot="title">
                   <span>{{item.title}}</span>
                </template>
            </el-menu-item>
        </template>
    </el-menu>
</template>
<script>
import Vue from 'vue';
import {
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup
} from 'element-ui';

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

export default {
    name: 'appCloudAsiderMenu',
    props: ['menuData', 'currentMenuId'],
    data() {
        return {
            isCollapse: true,
            textcolor: '#dddddd',
            activecolor: '#ffffff'
        };
    },
    methods: {}
};

</script>
