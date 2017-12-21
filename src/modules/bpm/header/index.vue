<style lang="scss" src="./style/index.scss" scoped></style>
<style type="text/css">
    .headHome{
        background:url('/src/modules/home/img/bg2.png');
    }
    .logoHome{
        position: absolute;
        top: 170%;
        left: 7%;
    }
</style>
<template>
    <header class="header" :class="{headHome:$route.path =='/'}" >
        <div sw-role="cell" class="header-inner">
            <router-link to="/" sw-role="cell" sw-valign="middle" class="logo" :class="{logoHome:$route.path =='/'}">
                <i class="iconfont icon-geely"></i>
            </router-link>
            <div sw-role="cell" sw-layout="fit" class="header-menu" ></div>
            <div sw-role="cell" class="header-right" v-if="$route.path !='/'">
                    <el-button type="text">
                        <i class="el-icon-location"></i>
                    </el-button>
                    <el-button-group class="language-btn" >
                                  <el-button class="active" type="text" >中文</el-button>
                                  <el-button type="text">英文</el-button>
                                </el-button-group>
                <el-dropdown size="small" trigger="click" >
                    <a href="javascript:;" class="el-dropdown-link header-avatar" sw-role="cell" sw-valign="middle">
                        <div class="avatar">
                            <img :src="'http://up.qqjia.com/z/face01/face06/facejunyong/junyong02.jpg'" alt="">
                        </div>
                    </a>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout">
                            <i class="iconfont icon-yingyongyun_cuowuma m-r-8 m-l-8"></i>
                            <span>注销</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </header>
</template>
<script>
import Vue from 'vue';
import {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Button,
    ButtonGroup
} from 'element-ui';

Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Button);
Vue.use(ButtonGroup);

export default {
    name: 'Header'
};

</script>
