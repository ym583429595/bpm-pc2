<style></style>
<template>
  <bpm-layout head-height="62" :min-height="getBodyHeight">
      <div slot="left">
          <router-view name="asiderMenu"></router-view>
      </div>
      <router-view slot="main"></router-view>
  </bpm-layout>
</template>
<script>
import bpmStore from './store';
import bpmLayout from '@/modules/bpm/layout';

export default {
    name: 'bpmIndex',
    beforeCreate() {
        // 注册当前模块到Store
        if (!this.$store.state.bpm) this.$store.registerModule('bpm', bpmStore);
    },
    computed: {
        getBodyHeight() {
            return this.$store.state.sweetLayout.bodyMinHeight;
        }
    },
    components: {
        bpmLayout
    }
};

</script>
