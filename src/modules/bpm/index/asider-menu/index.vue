<template>
    <app-cloud-asider-menu :current-menu-id="currentMenuId" :menuData="menuData"></app-cloud-asider-menu>
</template>
<script>
import appCloudAsiderMenu from '@/modules/bpm-plugin/asiderMenu';
export default {
    name: 'indexAsiderMenu',
    computed: {
        currentMenuId() {
            return this.$store.state.app.currentMenuId;
        },
        menuData() {
            let asiderMenuData = [],
                menuDataState = this.$store.state.app.menuData,
                menuPath = this.$store.state.app.menuPath,
                pid = menuPath[menuPath.length - 1];

            if (menuDataState) {
                asiderMenuData = menuDataState.list[pid].children;
            }
            return asiderMenuData;
        }
    },
    components: {
        appCloudAsiderMenu
    }
};

</script>
