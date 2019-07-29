import Axios from 'axios'
import Config from '../config/app.js'
import { Notification,Loading  } from 'element-ui';
import {getToken,removeToken,getMockToken} from '../utils/dataStorage.js'
import QS from 'qs'
import router from '@/router'

const service = Axios.create({
    baseURL: Config.apiUrl + '/' + Config.apiPrefix,
    withCredentials: false,
    headers: {
        'Accept': '*/*'
        // 'Access-Control-Allow-Origin': '*'
    },
    timeout: Config.timeout
})
service.defaults.retry = Config.requestRetry;
service.defaults.retryDelay = Config.requestRetryDelay;
service.defaults.withCredentials= false;
service.defaults.responseType= 'json';
//service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

service.interceptors.request.use(
    config => {

        if(!config.closeLoading){
            window.loadingInstance = Loading.service();
        }
        if(!getMockToken()){

            let noParameters = config.url.indexOf('?')  == -1;
            //config.headers['X-Token'] = getToken() //
            config.url = noParameters ? config.url+'?access_token=' + getToken(): config.url+'&access_token='+ getToken();
        }

        return config
    },
    error => {
        Promise.reject(error)
    }
)

// service.defaults.headers.common



service.interceptors.response.use(
    response => {//Grade

        if(!response.config.closeLoading){
            setTimeout(_=>{
                window.loadingInstance.close();
            },400);
        }

        const res = response
        if (res.status !== 200) {
            Notification({
                title:'数据返回出错',
                message:"请稍后重试",
                type:'warning'
            });
            //return Promise.reject('error')
        } else {
            if((response.config).hasOwnProperty('closeInterceptors') && response.config.closeInterceptors){
                return res.data
            }
            // if(typeof(res.data.access_token) != "undefined" && res.data.access_token != "" && res.data.access_token != null){
            //     console.log('have token')
            //     return res.data
            // }else{
            //     console.log('no have token')
            // }

            if(res.data.code != 200){
                Notification({
                    title:res.data.message,
                    type:'warning'
                });
                if(res.data.code == 402){//登录状态失效
                    removeToken();
                    setTimeout(_=>{
                        window.location.href = './login.html';
                    },2000)
                }
                return Promise.reject('error');
            }
            if(typeof(res.data.data)==="object"){
                return res.data.data
            }else{
                return JSON.parse(res.data.data)
            }
        }
    },
    error => {
        console.log(error)
        setTimeout(_=>{
            window.loadingInstance.close();
        },300)
        Notification({
            title:"请求未响应",
            message:"服务器可能出了点问题",
            type:'warning'
        });
        return Promise.reject(error)//千万不能去掉，，，否则请求超时会进入到then方法，导致逻辑错误。
    }
)

//post get
// 封装get方法
export function get(url, params) {
    return new Promise((resolve, reject) => {
        service.get(url, {
            params: params
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    });
}

// 封装post方法
export function postJSON(url, params) {
    return new Promise((resolve, reject) => {
        service.transformRequest= [function (fData, headers) {
                    headers['Content-Type']='application/json'
                    return JSON.stringify(fData)
                }];
        service.post(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    });
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        service.transformRequest= [function (fData, headers) {
                    headers['Content-Type']='Content-Type为application/x-www-form-urlencoded'
                    return QS.stringify(fData)
                }];
        service.post(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    });
}

export default service
