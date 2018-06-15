<template>
    <section class="container pages-login">
        <section class="login-box">
            <h2>用户注册</h2>
            <section class="login-form">
                <el-form
                    :model = "formData"
                    ref = "regForm"
                    :rules = "rules"
                >
                    <el-form-item prop = "phone">
                        <el-input type="text" v-model="formData.phone" placeholder="请输入手机号"  />
                    </el-form-item>
                    <el-form-item prop = "clientName">
                        <el-input type="text" v-model="formData.clientName" placeholder="请输入公司名称"  />
                    </el-form-item>
                    <!-- <el-form-item prop = "checkCode">
                        <div class="item-inline">
                            <el-input type="text" v-model="formData.checkCode" placeholder="请输入验证码"  />
                            <p><el-button :disabled="checking" @click="getCode">{{checkBtnMsg}}</el-button></p>
                        </div>
                    </el-form-item> -->
                    <el-form-item prop = "password">
                        <el-input type="password" v-model="formData.password" placeholder="请输入密码"  />
                    </el-form-item>
                    <el-form-item prop = "checkPassword">
                        <el-input type="password" v-model="formData.checkPassword" placeholder="请确认密码"  />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" class="button-large" @click="submitForm('regForm')">注册</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </section>
    </section>
</template>
<script>
export default {
    name:'Register',
    data(){
        const checkCode=(rule,value,callback)=>{
            if(!value){
                callback(new Error('请再次输入密码'))
            }else if(value != this.formData.password){
                callback(new Error('两次输入密码不一致'))
            }else{
                callback();
            }
        };
        return{
            formData :{
                phone:'',
                clientName:'',
                password:'',
                checkPassword:'',
                // checkCode:''
            },
            checkBtnMsg:'获取验证码',
            checking:false,
            rules:{
                phone:[
                    {required:true,message:'请输入手机号',trigger:'blur'},
                    {pattern:/^1\d{10}$/,message:'请输入正确的手机号',trigger:'blur'}
                ],
                clientName:{required:true,message:'公司名称不能为空',trigger:'blur'},
                checkCode:{required:true,message:'验证码不能为空',trigger:'blur'},
                password:{required:true,message:'密码不能为空',trigger:'blur'},
                checkPassword:{required:true,validator:checkCode,trigger:'blur'}
            }
        }
    },
    created(){
    },
    methods:{
        goRegister(){
            this.$router.push({path:'/index'});
        },
        submitForm(formName) {
            const _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                        phone : _this.formData.phone,
                        clientName : _this.formData.clientName,
                        password : _this.formData.password
                    }
                    this.$http({
                        url:'./api/client/add',
                        method:'post',
                        data:JSON.stringify(params)
                    }).then(res=>{
                        if(res.data.code === 100001){
                            this.$message({
                                message:'注册成功',
                                type:'success',
                                duraion:1500
                            });
                            setTimeout(()=>{
                                this.$router.replace({
                                    path:'/login'
                                })
                            },1500)
                            
                        }
                    }).catch(err=>console.log(err))
                } else {
                    
                    return false;
                }
            });
        },
        getCode(){
            if(!this.checking){
                this.checking = !this.checking;
                let m = 10;
                let setTime = setInterval(()=>{
                    this.checkBtnMsg = `${m}秒后重新发送`;
                    if( m ===0 ){
                        this.checking = !this.checking;
                        this.checkBtnMsg = "获取验证码"
                        clearInterval(setTime);
                    }
                    m--;
                },1000)
                
            }
        }
    }


}

</script>
<style scoped>
    .pages-login{
        width:100vw; height:100vh;background:url(../assets/images/bg.jpg) left top no-repeat; background-size:100% 100%;
        /* display:flex; justify-content:center; align-items:center; */overflow:hidden;
    }
    .login-box{
        background-color:#f5f5f5; padding:3rem; padding-bottom:1rem; border-radius:5px; margin:0 auto; 
         box-shadow:1px 1px 9px #999;width:380px; box-sizing:border-box; margin-top:18rem;
    }
    .login-box > h2 { font-weight:normal; font-size:2rem; color:#666; text-align:center; line-height:3;}
    .button-large{ display:block; width:100%;}
    .form-last-item{margin-top:4.5rem;}
    .item-inline{
        /* width:100%; display:flex; justify-content:center; align-items:center; */
    }
    .item-inline>p{margin-left:15px;}
</style>






