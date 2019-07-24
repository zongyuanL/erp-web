<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <img src="../../assets/images/logo.svg" width="100" height="100" alt="">
        <p>{{ $Config.siteName }}</p>
      </div>
      <el-input
          placeholder="请输入用户名"
          suffix-icon="fa fa-user"
          v-model="username"
          style="margin-bottom: 18px"
      >
      </el-input>

      <el-input
          placeholder="请输入密码"
          suffix-icon="fa fa-keyboard-o"
          v-model="password"
          type="password"
          style="margin-bottom: 18px"
          @keyup.native.enter="login"
      >
      </el-input>

      <el-button
          type="primary" :loading="loginLoading"
          style="width: 100%;margin-bottom: 18px"
          @click.native="login"
      >登录
      </el-button>
      <el-button
          type="primary" :loading="loginLoading"
          style="width: 100%;margin-bottom: 18px"
          @click.native="testMock"
      >测试
      </el-button>
      <div>
        <el-checkbox v-model="Remenber"> Remenber</el-checkbox>
        <a href="javascript:;" style="float: right;color: #3C8DBC;font-size: 14px">Register</a>
      </div>

    </div>
  </div>
</template>

<script>
  import {setToken,setRefreshToken} from '../../utils/dataStorage'
  import {login as loginApi} from '../../api/user'
  import {getUsers as getUsers} from '../../api/user'
  import authConfig from '../../config/authConfig'

  export default {
    data() {
      return {
        username: '',
        password: '',
        Remenber: true,
        loginLoading: false
      }
    },

    methods: {
      processLogin(data){
        console.log(data)
        setToken(data.access_token);
        setRefreshToken(data.refresh_token);
        this.loginLoading = false;
        this.$router.push({path: '/'});

               // router.replace({
               //      path: '/',
               //      query: {redirect: router.currentRoute.fullPath}
               //  })
      },
      testMock(){
        debugger
        getUsers({}).then(r=>{
          console.log(r);
        })
        .catch(r=>{
          console.log(r);
        });
      },



      login() {
        this.loginLoading = true;
        loginApi({
          grant_type: authConfig.grant_type,
          client_id:authConfig.clientId,
          client_secret:authConfig.client_secret,
          username:this.username,
          password:this.password
        }).then(r=>{
          console.log(r)
          this.processLogin(r)
        }).catch(_=>{
          console.log(_);
          this.loginLoading = false;

        })
        setTimeout(() => {
          // setToken('123456789');
          this.$notify({
            title: '登录成功',
            message: '很高兴你使用ElementUIAdmin！别忘了给个Star哦。',
            type: 'success'
          });
          this.loginLoading = false;
          this.$router.push({path: '/'});
        }, 1000);
      }
    }
  }
</script>

<style lang="scss">
  @import "Login.scss";
</style>
