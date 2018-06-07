<template>
  <div class="loginContainer">
    <hea-top :head-title="loginWay? '登录': '密码登录'" goBack="true">
      <div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay? "密码登录":"短信登录"}}</div>
    </hea-top>
    <form class="loginForm" v-if="loginWay">
      <section class="input_container phone_number">
        <input type="text" placeholder="账号密码随便输入" name="phone" maxlength="11" v-model="phoneNumber">
        <button @click.prevent="getVerifyCode" :class="{right_phone_number: rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
        <button @click.prevent v-show="computedTime">已发送{{computedTime}}s</button>
      </section>
      <section class="input_container">
        <input type="text" name="mobileCode" placeholder="验证码" maxlength="6" v-model="mobileCode">
      </section>
    </form>
    <form class="loginForm" v-else>
      <section class="input_container">
        <input type="text" v-model.lazy="userAccount" placeholder="账号">
      </section>
      <section class="input_container">
        <input type="password" placeholder="密码" v-model="passWord" v-if="!showPassWord">
        <input type="text" placeholder="密码" v-else v-model="passWord">
        <div class="button_switch" :class="{change_to_text: showPassWord}">
          <div class="circle_button" :class="{trans_to_right: showPassWord}" @click="changePassWordType"></div>
          <span>ab</span>
          <span>...</span>
        </div>
      </section>
      <section class="input_container captcha_code_container">
        <input type="text" v-model="codeNumber" maxlength="4" placeholder="验证码">
        <div class="img_change_img">
          <img v-show="captchaCodeImg" :src="captchaCodeImg">
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <p class="login_tips">
        温馨提示：未注册过的账号，登录时将自动注册
    </p>
    <p class="login_tips">
        注册过的用户可凭账号密码登录
    </p>
    <div class="login_container" @click="mobileLogin">登录</div>
    <router-link to="/forget" class="to_forget" v-if="!loginWay">重置密码</router-link>
    <alert-tip :closeTip="closeTip" v-if="showAlert" :showhide="showAlert" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
  import heaTop from 'components/header/head'
  import alertTip from 'components/common/alertTip'
  import {mapState, mapMutations} from 'vuex'
  import {sendLogin, checkExsis, mobileCode, accountLogin, getcaptchas} from '../../service/getData'
  export default {
    data () {
      return {
        loginWay: true, // 默认是短信登录
        phoneNumber: '', // 存放电话号码
        computedTime: null, // 设置验证的初始时间60s
        mobileCode: '', // 存放验证码
        showAlert: false, // 是否展示提示框
        alertText: '', // 提示消息文本信息
        userAccount: null, //用户名
        validate_token: '', // 用户的状态值
        captchaCodeImg: null, // 验证码地址
        showPassWord: false, // 默认显示密文模式
        passWord: '', // 存放密码
        codeNumber: '', // 验证码输入
      }
    },
    components: {
      heaTop,
      alertTip,
    },
    computed: {
      //判断手机号码
      rightPhoneNumber: function (){
          return /^1\d{10}$/gi.test(this.phoneNumber);
      }
    },
    mounted() {
      getcaptchas().then(res => {
        this.captchaCodeImg = res.code;
      })
    },
    methods: {
       ...mapMutations([
          'RECORD_USERINFO',
      ]),
      changePassWordType() {
        this.showPassWord = !this.showPassWord;
      },
      async getCaptchaCode() {
        let res = await getcaptchas();
        this.captchaCodeImg = res.code;
      },
      //改变登录方式
      changeLoginWay(){
          this.loginWay = !this.loginWay;
      },
      async getVerifyCode() {
        if (this.rightPhoneNumber) {
          this.computedTime = 30;
          this.timer = setInterval(() => {
            this.computedTime--;
            if (this.computedTime == 0) {
              clearInterval(this.timer);
            }
          }, 1000)

          let exsis = await checkExsis(this.phoneNumber, 'mobile');

          if (exsis.message) {
            this.alertText = exsis.message
            this.showAlert = true;
            return
          } else if (!exsis.is_exsis) {
            this.alertText = '您输入的手机号尚未绑定'
            this.showAlert = true;
            return
          }

          let res = await mobileCode(this.phoneNumber);
          if (res.message) {
            this.alertText = exsis.message
            this.showAlert = true;
            return
          }
          this.validate_token = res.validate_token;
        }
      },
      async mobileLogin() {
        if (this.loginWay) {
          if (!this.rightPhoneNumber) {
            this.alertText = '手机号码不正确'
            this.showAlert = true;
            return
          } else if (!(/^\d{6}$/gi.test(this.mobileCode))) {
            this.showAlert = true;
            this.alertText = '验证码不正确'
            return
          }
          this.userInfo = await sendLogin(this.mobileCode, this.phoneNumber, this.validate_token);
        } else {
          if (!this.userAccount) {
            this.alertText = '请输入手机号，邮箱和用户名'
            this.showAlert = true;
            return
          } else if(!this.passWord) {
            this.alertText = '请输入密码'
            this.showAlert = true;
            return
          } else if (!this.codeNumber) {
            this.alertText = '请输入验证码'
            this.showAlert = true;
            return
          }
          this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber);
        }

        // if (this.phoneNumber === '13466512832' && this.mobileCode === '123456') {
        //   this.$router.go(-1);
        // }
        // 如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
        if (!this.userInfo.user_id) {
          this.alertText = this.userInfo.message;
          this.showAlert = true;
          // 如果是密码登录。更新验证码
          if (!this.loginWay) this.getCaptchaCode()
        } else {
          this.RECORD_USERINFO(this.userInfo);
          this.$router.go(-1);
        }
      },
      closeTip() {
        this.showAlert = false;
      }
    }
  }
</script>

<style lang='less' scoped>
  @import '../../style/mixin';

    .loginContainer{
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .change_login{
        position: absolute;
        .ct;
        right: 0.75rem;
        .sc(.7rem, #fff);
    }

    .loginForm{
        background-color: #fff;
        margin-top: .6rem;
        .input_container{
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input{
                .sc(.7rem, #666);
            }
            button{
                .sc(.65rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
                padding: .28rem .4rem;
                border: 1px;
                border-radius: 0.15rem;
            }
            .right_phone_number{
                background-color: #4cd964;
            }
        }
        .phone_number{
            padding: .3rem .8rem;
        }
        .captcha_code_container{
            height: 2.2rem;
            .img_change_img{
                display: flex;
                align-items: center;
                img{
                    .wh(3.5rem, 1.5rem);
                    margin-right: .2rem;
                }
                .change_img{
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: 2rem;
                    justify-content: center;
                    p{
                        .sc(.55rem, #666);
                    }
                    p:nth-of-type(2){
                        color: @bc;
                        margin-top: .2rem;
                    }
                }
            }
        }
    }
    .login_tips{
        .sc(.5rem, red);
        padding: .4rem .6rem;
        line-height: .5rem;
        a{
            color: @bc;
        }
    }
    .login_container{
        margin: 0 .5rem 1rem;
        .sc(.7rem, #fff);
        background-color: #4cd964;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
    .button_switch{
        background-color: #ccc;
        display: flex;
        justify-content: center;
        .wh(2rem, .7rem);
        padding: 0 .2rem;
        border: 1px;
        border-radius: 0.5rem;
        position: relative;
        .circle_button{
            transition: all .3s;
            position: absolute;
            top: -0.2rem;
            z-index: 1;
            left: -0.3rem;
            .wh(1.2rem, 1.2rem);
            box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
            background-color: #f1f1f1;
            border-radius: 50%;
        }
        .trans_to_right{
            transform: translateX(1.3rem);
        }
        span{
            .sc(.45rem, #fff);
            transform: translateY(.05rem);
            line-height: .6rem;
        }
        span:nth-of-type(2){
            transform: translateY(-.08rem);
        }
    }
    .change_to_text{
        background-color: #4cd964;
    }
    .to_forget{
        float: right;
        .sc(.6rem, @bc);
        margin-right: .3rem;
    }

</style>

