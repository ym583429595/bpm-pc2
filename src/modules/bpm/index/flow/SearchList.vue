<template>
  <ul class="searchList">
    <!-- <li v-for="item in searchResult" class="father-li">
      <hr />
      <div class="father-icon" :class="item.icon" v-html="   item.category" :title="item.category"></div> -->
      <!-- <ul> -->
        <li v-for="item in searchResult" class="son-li" :class="{selected: nowSelectedSon == item.Id}" :Id='item.Id' @click='changeSelected(item.Id)' :url="item.DisplayUrl">
          <h4 v-html="item.DisplayNameCN"> <i :class="item.IconStyle"></i></h4>
          <h4 v-html="item.DescrCN"></h4>
        </li>
      <!-- </ul> -->
    <!-- </li> -->
  </ul>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex';

export default {
  name: 'searchList',
  data() {
    return {
      lightText: '',
      nowSelectedSon: ''
    };
  },
  computed: {
    ...mapGetters([
      'searchResult'
    ])
  },
  methods: {
    changeSelected(title) {
      this.nowSelectedSon = title;
      this.$store.commit('to_show_service');
      this.$store.dispatch('getServiceInfo', this.nowSelectedSon);
    }
  }

};
</script>
<style type="text/css" scoped>
  ul{
    list-style-type: none;
}
  .searchList{
    text-align: left;
    font-size: 16px;
    color:#dedede;
  }
  .father-li{
    padding:20px 0;
    color:#999;
  }
  .father-li > hr{
    width:70%;
    height:1px;
    background-color:#ddd;
    border: none;
  }
  .father-icon{
    height:40px;
    line-height:40px;
    margin: 10px 0 5px;
    font-size: 14px;
  }
  .father-icon:before{
    font-size: 25px;
    margin:0 10px 0 35px;
    vertical-align: top;
  }
  .son-li{
    margin-left:20px;
    padding:20px 15px;
    font-size: 14px;
    color:#999;
  }
  .son-li>h4:first-child{
    font-size: 16px;
    font-weight: 600;
  }
  .selected{
    background-color: #f6f6f6;
  }
</style>