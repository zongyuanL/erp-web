import localKey from './localKey'

const devApiUrl = 'http://localhost:8080';
// http://192.168.3.37:9999/service-sso/auth/oauth/token


const proApiUrl = 'http://api.youUrl.com';
//const proApiUrl = 'http://192.168.49.196:10003';

const nodeDevEnv = process.env.NODE_ENV == 'development' ? true : false;

export default {
  nodeDevEnv: nodeDevEnv,
  apiUrl: nodeDevEnv ? devApiUrl : proApiUrl,
  siteName: 'Alex zy Liang’s website',
  minSiteMame: 'EUI',
  apiPrefix: "",
  timeout: 10000,
  cookiesExpires: 7,
  requestRetry: 4,
  requestRetryDelay: 800,
  tokenKey: 'ACCESS_TOKEN',
  refreshTokenKey: 'REFRESH_TOKEN',
  userInfoKey: 'USER_INFO',
  mockKey: 'IS_MOCK',
  permissionsKey:'PERMISSION_ARRAY',
  gitHub: 'https://github.com/xusenlin/ElementUIAdmin2',
  ...localKey
}
