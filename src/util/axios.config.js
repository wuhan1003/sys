import Vue from 'vue';
import axios from 'axios';
const qs = require('querystring');
const _this = new Vue();
axios.interceptors.request.use(config=>{
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : '' ;
    Object.assign(config.headers,{
        'sdkVersion':'1.0',
        'content-type':'application/json',
        'deviceType':'web',
        'deviceId':'',
        'token':token,
    });
    return config;
}, error=>Promise.reject(error));

axios.interceptors.response.use(res=>{
    if(res.data.code === 100001){
        return res;
    } else {
        _this.$message({
            message:res.data.msg,
            type:'error'
        });
        return res;
    }

},error => Promise.reject(error))
export default axios;
