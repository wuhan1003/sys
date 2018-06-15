<template>
    <section class="container pages-login">
        <section class="login-box">
            <h2>登录</h2>
            <section class="login-form">
                <el-form
                    :model = "formData"
                    ref = "loginForm"
                    :rules = "rules"
                >
                    <el-form-item prop = "username">
                        <el-input type="text" v-model="formData.phone" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item prop = "password">
                        <el-input type="password" v-model="formData.password" placeholder="请输入密码"  />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" class="button-large" @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>
                    <el-form-item>
                        <p style="text-align:center;color:#999; height:2rem; line-height:2rem;">或</p>
                    </el-form-item>
                    <el-form-item>
                        <el-button plain size="medium" class="button-large" @click="goRegister">注册</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </section>
    </section>
</template>
<script>
export default {
    name:'Login',
    data(){
        return{
            formData :{
                phone:'',
                password:'',
            },
            rules:{
                phone:{required:true,message:'用户名不能为空',trigger:'blur'},
                password:{required:true,message:'密码不能为空',trigger:'blur'}
            }
        }
    },
    created(){
    },
    methods:{
        goRegister(){
            this.$router.push({path:'/register'});
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http({
                        url:'./api/client/login',
                        method:'post',
                        data:JSON.stringify(this.formData)
                    }).then(res=>{
                        if(res.data.code === 100001){
                            sessionStorage.setItem('userInfo',JSON.stringify(res.data.data));
                            this.$router.push({
                                path:'/content'
                            })
                        }
                    })
                } else {
                    
                    return false;
                }
            });
        },
    }


}

</script>
<style scoped>
    .pages-login{
        width:100vw; height:100vh;background:url(../assets/images/bg.jpg) left top no-repeat; background-size:100% 100%;
        /* display:flex; justify-content:center; align-items:center; */overflow:hidden;
    }
    .login-box{
        background-color:#f5f5f5; padding:3rem; padding-bottom:1rem; border-radius:5px;
         box-shadow:1px 1px 9px #999;width:380px; box-sizing:border-box;margin:0 auto; margin-top:20rem;
    }
    .login-box > h2 { font-weight:normal; font-size:2rem; color:#666; text-align:center; line-height:3;}
    .button-large{ display:block; width:100%;}
    .form-last-item{margin-top:4.5rem;}
</style>





