<template>
    <div class="components-leftbar">
        <el-col :span="12" class="left">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <router-link v-for="(item, index) in list" tag="li" :to="{path:item.path}" :key="index">
            <el-menu-item  :index=String(index+1)>
              <i class="el-icon-setting"></i>
              <span>{{item.title}}</span>
            </el-menu-item>
            </router-link>
          </el-menu>
        </el-col>
    </div>
</template>
<script>
  export default {
   data(){
     return{
       list:[
         {path:'/content',title:'首页'}
       ]
     }
   },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped>
  .el-col-12 {
    width: 200px;
  }
  .el-menu{
    background: #f5f5f5;
  }
</style>
