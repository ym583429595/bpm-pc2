<style lang="scss" src="./style/index.scss"></style>
<template>
    <div class="bpm-index-frame">
        <div class="bpm-index-frame__head"></div>
        <div class="bpm-index-frame__main clearfix">
            <div class="bpm-index-frame__left">
                <slot name="left"></slot>
            </div>
            <div class="bpm-index-frame__body" :style="frameBodyStyle">
                <slot name="main"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import store from './store';
import { mapState } from 'vuex';


export default {
    name: 'bpm-layout',
    props: ['headHeight', 'minHeight'],
    beforeCreate() {
        this.$store.registerModule('bpmLayout', store);
    },
    computed: {
        ...mapState({
            headerHeight: state => state.bpmLayout.headerHeight
        }),
        headStyle() {
            return {
                height: this.headerHeight + 'px'
            };
        },
        frameStyle() {
            return {
                'min-height': this.minHeight + 'px'
            };
        },
        frameBodyStyle() {
            return {
                'min-height': (this.minHeight - this.headerHeight) + 'px'
            };
        }
    }
};

</script>
