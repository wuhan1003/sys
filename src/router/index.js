import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index';
import Content from '@/pages/content';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Particulars from '@/pages/particulars';

const vue = new Vue();



Vue.use(Router)

const routers = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect:'content',
      component: Index,
      children:[
        {
          path:'/content',
          component:Content,
          meta:{
            requireAuth:true
          }
        } ,
        {
          name:'particulars',
          path:'/particulars/:id',
          component:Particulars,
          meta:{
            requireAuth:true
          }
        }
      ]
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    }
  ]
})
routers.beforeEach((to,from,next)=>{
  if(to.meta&&to.meta.requireAuth){
    if(!sessionStorage.getItem('userInfo')){

      vue.$message({
        message:'请登录',
        type:'warning',
        duration:1500
      })
      setTimeout(()=>{next({path:'/login'})},1500);
    } else{
      next();
    }
  }else{
    next();
  }
})


export default routers;
