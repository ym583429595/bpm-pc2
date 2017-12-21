<style lang="scss" src="./index.scss"></style>
<template>
    <sweet-modal ref="swMemberModal" :blocking="blocking" :width="width" :title="title" :pulse-on-block="pulseOnBlock" hide-close-button :enable-mobile-fullscreen="enableMobileFullscreen" :overlay-theme="overlayTheme" :modal-theme="modalTheme" class="bpm-member-picker" v-on:open="onModelOpen" v-on:close="onModelClose">
        <el-row class="bpm-member-picker-box">
            <el-col :span="6" class="bpm-member-picker-left">
                <div sw-role="cell" sw-valign="middle" class="bpm-member-picker-header">
                    待选组织架构
                </div>
                <div class="bpm-member-picker-content">
                    <el-tree :data="treeData" :props="treeProps" node-key="id" :expand-on-click-node="false">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="12">
                <div sw-role="cell" sw-valign="middle" class="bpm-member-picker-header">
                    <div sw-role="cell" sw-layout="fit">
                        待选组织
                    </div>
                    <div sw-role="cell">
                        <slot name="search"></slot>
                    </div>
                </div>
                <div class="bpm-member-picker-content">
                    <slot name="content"></slot>
                </div>
            </el-col>
            <el-col :span="6" class="bpm-member-picker-right">
                <div sw-role="cell" sw-valign="middle" class="bpm-member-picker-header">
                    选中组织
                </div>
                <div class="bpm-member-picker-content">选中</div>
            </el-col>
        </el-row>
        <el-button slot="button" type="primary">确认</el-button>
        <el-button slot="button" @click="close">取消</el-button>
    </sweet-modal>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue';

export default {
    name: 'bpmMemberPicker',
    props: [
        'blocking',
        'title',
        'pulseOnBlock',
        'icon',
        'width',
        'enableMobileFullscreen',
        'overlayTheme',
        'modalTheme',
        'treeData',
        'treeProps',
        'onOpen',
        'onClose'
    ],
    methods: {
        open(tabId) {
            this.$refs.swMemberModal.open(tabId);
        },
        close() {
            this.$refs.swMemberModal.close();
        },
        onModelOpen() {
            if (typeof this.onOpen === 'function') this.onOpen();
        },
        onModelClose() {
            if (typeof this.onClose === 'function') this.onClose();
        }
    },
    components: {
        SweetModal
    }
};
</script>
