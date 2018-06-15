<template>
  <div class="pages-index">
    <div class="topbar">
      <topbar></topbar>
    </div>
   <div class="box">
     <div class="leftbar">
       <leftbar></leftbar>
     </div>
     <router-view class="view"></router-view>
   </div>
  </div>
</template>

<script>
  import leftbar from '@/components/leftbar'
  import topbar from '@/components/topbar'

  export default {
    name: 'Index',
    data() {
      return {
        leftList:[]
      }
    },
    methods: {
    },
    components: {
      leftbar,
      topbar
    }
  }
</script>
<style scoped>
  .topbar{
    background: #303030;
  }
  .leftbar{
    background: #f5f5f5;
    display: none;
  }
  .box{
    margin-left: 10px;
  }
</style>
