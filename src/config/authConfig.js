export default {
  //请求授权地址
  userAuthorizationUri: "/auth/oauth/authorize",
    //请求授权地址
  // userLoginUri: "/auth/oauth/token",
  userLoginUri: "/auth/appLogin",
  //accessToken请求地址
  accessTokenUri: "/auth/oauth/access_token",
  //用户信息请求地址
  userInfoUri: "/auth/member",
  //登出请求地址
  logoutUri: "/auth/logout",

 //回调地址
  redirect_uri: "/auth/login",
  //案例资源服务器地址
  resUri: "http://localhost:8080",
  //客户端相关标识，请从认证服务器申请
  clientId: "zysfx",
  client_secret: "user123",
  //申请的权限范围
  scope: "user",
  //可选参数，客户端的当前状态，可以指定任意值，用于校验，此次案例不做相关认证
  state: "",
  //一些固定的请求参数
  response_type: "token",
  // grant_type : "authorization_code",
  grant_type: "password",
  code: "",
}
