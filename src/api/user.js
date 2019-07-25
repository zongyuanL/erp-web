import {get,post} from '../utils/request.js'
import authConfig from '../config/authConfig.js'
import QS from 'qs'


// export function login(params) {
//   return request({
//     url: '/auth/oauth/token',
//     method: 'post',
//     data: QS.stringify(params)
//   })
// }

// export function sendSMS(params) {
//   return request({
//     url: '/pc/sendsms',
//     method: 'get',
//     params: params
//   })
// }



// export const login = p => post('service-sso/auth/oauth/token',p);
export const login = p => post(authConfig.userLoginUri,p);
export const getUserInfo = p => post('/auth/member',p);
// export const getUsers = p => get('/user/list',p);
// export const getUsers = p => get('http://localhost:8080/todo/list',p);
