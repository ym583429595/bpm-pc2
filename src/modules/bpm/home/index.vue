<style type="text/css">
  .inputDiv{
    position: relative;
  }
  .inputDiv i{
    width:20px;
    height:20px;
    position: absolute;
    z-index: 9;
    top:50px;
    left:20px;
    background-size: 100% 100%;
  }
  .nameIcon{
    background:url('./img/icon-name.png') ;
  }
  .pwdIcon{
    background:url('./img/icon-pwd.png') ;
  }
</style>
<template>
  <div class="home" >
      <!-- 欢迎打开BPM项目 <a href="#/index" style="z-index:999">点击进入主页</a> -->
      <form action="#/index" class="login-form">
        <div class="login-header">
          <img src="./img/bpm-logo.png" alt="BPM-LOGO" />
          <h4>BPM Flow Platform</h4>
          <h2>统一流程平台</h2>
        </div>
        <div class="inputDiv">
        <i class="nameIcon"></i>
        <input type="text" name="name" class='name' v-model="name" placeholder="请输入账号"/>
        </div>
        <div class="inputDiv">
        <i class="pwdIcon"></i>
        <input type="password" name="pwd" class='pwd' v-model="pwd" placeholder="请输入密码"/>
        </div>
        <h4 class="login-msg"></h4>
        <div class="submit" @click="login()"></div>
      </form>
  </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
          return {
            loginMsg: '',
            name: '',
            pwd: ''
          };
        },
        methods: {
          login() {
            const UserName = this.name;
            const PassWord = this.pwd;
            const data = {UserName, PassWord};
            this.$store.dispatch('login', data);
            console.log (this.$store.state.loginStore.loginResult);
          }
        }
    };
</script>
<style type="text/css">
  .home{
    width:100%;
    height:900px;
    background: url('./img/bg2.png');
    background-size: 100% 100%;
    position: relative;
    font-size: 20px;
    color:#fff;
    overflow: auto;
  }
  .home:after{
    content: '';
    width:100%;
    height:900px;
    display: block;
    background: url('./img/bg.png');
    background-size: 100% 100%;
    position: absolute;
    z-index: -1;
    top:0;
  }
  .login-form{
    /*width:40%;*/
    width:400px;
    height:500px;
    margin: 180px auto;
  }
  .login-header{
    padding: 0 15px;
    color:#fff;
  }
  .login-header img{
    width:140px;
    height:40px;
    float:left;
    margin-top: 8px;
  }
  .login-header h4,.login-header h2{
    display: inline-block;
    margin-left:20px;
  }
  .name, .pwd{
    width:100%;
    height:50px;
    line-height: 50px;
    padding:15px 15px 15px 55px;
    margin-top:35px;
    font-size: 20px;
    background-color: #4190D1;
    color:#fff;
    border:1px solid #4190D1;
  }
  /*.name{
    background:url('./img/icon-name.png') no-repeat 20px center;
  }
  .pwd{
    background:url('./img/icon-pwd.png') no-repeat 20px center;
  }*/
  :-webkit-autofill {
 -webkit-text-fill-color: #fff !important;
 transition: background-color 5000s ease-in-out 0s;
}
  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:#fff;
    font-size: 16px;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:#fff;font-size: 16px;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
     color:#fff;font-size: 16px;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
     color:#fff;font-size: 16px;
  }
  .login-msg{
    margin-top:10px;
  }
  .submit{
    width:100%;
    height:50px;
    line-height: 50px;
    margin-top: 40px;
    background:url('./img/login-btn.png') no-repeat ;
    background-size:100% 100%;
  }
</style>