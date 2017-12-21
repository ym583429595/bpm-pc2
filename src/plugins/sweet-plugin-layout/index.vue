<style lang="less" src="./style/index.less"></style>
<template>
    <div class="sw-frame">
        <div class="sw-frame-head" :class="headClass" :style="headerStyle">
            <div class="sw-frame-head-inner" :style="headerStyle">
                <slot name="head"></slot>
            </div>
        </div>
        <div class="sw-frame-body" :style="bodyStyle">
            <slot name="body"></slot>
        </div>
        <div class="sw-frame-foot" :style="footerStyle">
            <div class="sw-frame-foot-inner" :style="footerStyle">
                <slot name="foot"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import store from './store';
import { mapState } from 'vuex';

export default {
    name: 'sw-layout',
    props: ['headHeight', 'footHeight', 'headMode', 'footMode'],
    beforeCreate() {
        this.$store.registerModule('sweetLayout', store);
    },
    created() {
        this.$store.commit('CHANGE_HEADMODE', this.headMode);
        this.$store.commit('CHANGE_HEADERHEIGHT', this.headHeight);
        this.$store.commit('CHANGE_FOOTERHEIGHT', this.footHeight);

        this.setBodyHeight();

        let resizeTimeout = null;
        window.addEventListener('resize', () => {
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(() => {
                    resizeTimeout = null;
                    this.setBodyHeight();
                }, 66);
            }
        }, false);
    },
    computed: {
        ...mapState({
            headerHeight: state => state.sweetLayout.headerHeight,
            footerHeight: state => state.sweetLayout.footerHeight,
            bodyMinHeight: state => state.sweetLayout.bodyMinHeight
        }),
        headerStyle() {
            return {
                height: this.headerHeight + 'px'
            };
        },
        footerStyle() {
            return {
                height: this.footerHeight + 'px'
            };
        },
        headClass() {
            return this.$store.state.sweetLayout.headModeCls;
        },
        bodyStyle() {
            return {
                'min-height': this.bodyMinHeight + 'px'
            };
        }
    },
    methods: {
        setBodyHeight() {
            let bodyH = document.documentElement.clientHeight - (this.headerHeight + this.footerHeight);
            this.$store.commit('CHANGE_BODYHEIGHT', bodyH);
        }
    }
};

</script>
