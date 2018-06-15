<template>
      <div class="pages-topbar">
        <div class="title" @click="mainAdd()">掌灵运营</div>
        <div class="right">
          <div class="img">
            <img :src="require('../assets/images/1.png')" alt="">
            <ul class="login">
              <li>个人中心</li>
              <li @click="exitLogin()">退出</li>
            </ul>
          </div>
        </div>
      </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    methods:{
      //退出登录
      exitLogin(){
          this.$confirm('是否退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then((res) => {
            this.$http({
              url: './api/client/logout',
              method: 'post',
              data: {
                id: JSON.parse(sessionStorage.getItem('userInfo')).userInfo.id
              }
            }).then(res => {
              if (res.data.code === 100001) {
                this.$router.push({path:'/login'})
                sessionStorage.clear()
              }
            }).catch(err => console.log(err))
          }).catch((err) => {
            this.$message({
              type: 'error',
              message: '退出失败'
            });
          });
      },
      mainAdd(){
        this.$router.push({path:'/content'})
      }
    }
  }
</script>
<style scoped>
  .pages-topbar{
    height: 48px;
    position: relative;
  }
.pages-topbar .title{
  float: left;
  line-height: 48px;
  margin: 0  20px;
  color: azure;
  font-size: 24px;
  font-family: cursive;
  cursor: pointer;
}
  .pages-topbar .right{
    float:right;
    padding: 0 20px;
  }
  .pages-topbar img{
  height: 30px;
  width: 30px;
  cursor: pointer;
}
  .pages-topbar .img{
    border-radius: 30px;
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    line-height: 1;
    margin:9px  0px;
    overflow: hidden;
  }
  .pages-topbar .right:hover .login{
    display: block;
  }
  .pages-topbar .login{
    display: none;
    position: absolute;
    top: 48px;
    right: 10px;
    z-index: 999;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 3px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border-radius: 3px 3px 0 0
  }
  .pages-topbar .login li{
    cursor: pointer;
    padding: 8px 15px;
    color: #303030;
  }
  .pages-topbar .login li:hover{
   background: #e7fdff;
  }
</style>
