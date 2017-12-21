<template>
    <div class="wrapper" style="background-color: #ffffff">
        <image src="http://cdn.udian.me/logo.png" style="width: 162px;height: 162px;"></image>
        <wxc-cell
                :has-top-border="false"
                class="wxc-dom"
        >
            <image slot="title" src="http://cdn.udian.me/mobile.png" style="width: 32px;height: 32px;"></image>
            <input class="input2"
                   placeholder="请输入标题"
                   :value="mobile"
                   type="tel"
                   maxlength="11"
                   @input="mobile=$event.value"/>
            <text :class="[is_send ? 'btn_send_after': 'btn_send']" @click="send_msg">{{sendContent}}{{is_send ? '('+ second + ')' : ''}}</text>
        </wxc-cell>
        <wxc-cell
                :has-top-border="false"
                class=""
        >
            <image slot="title" src="http://cdn.udian.me/code.png" style="width: 32px;height: 32px;"></image>
            <input class="input"
                   placeholder="请输入密码"
                   type="password"
                   maxlength="4"
                   v-model="password"/>
        </wxc-cell>
        <div class="button-list" >
            <wxc-button text="确定"
                        type="fliggy"
                        class="btn_input"
                        @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        </div>
    </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">

    @import "../style/common.scss";
    .iconfont{
        font-family: iconfont;
    }
    .wrapper{
        background-color: #ffffff;
        align-items: center;
        padding-top: 112px;
    }
    .red{
        color: $themgColor;
    }
    .wxc-dom{
        margin-top: 30px;
    }
    .login-test{
        color: #FC345C;
    }
    .button-list {
        /*padding-left: 24px;*/
    }
    .button-text {
        margin-top: 40px;
        margin-left: 8px;
        margin-bottom: 16px;
    }
    .input {
        width: 560px;
        height: 80px;
        line-height: 80px;
        text-align: left;
        margin-left: 30px;
    }
    .input2 {
        width: 360px;
        height: 80px;
        line-height: 80px;
        text-align: left;
        margin-left: 30px;
    }
    .btn_send{
        width: 200px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        border-width: 1px;
        border-style: solid;
        border-color: #FC345C;
        border-radius: 6px;
        color: #FC345C;
    }
    .btn_send_after{
        border-width: 1px;
        border-color: #cccccc;
        border-style: solid;
        color: #cccccc;
        width: 200px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        border-radius: 6px;
    }
    .btn_input{
        margin-top: 30px;
    }
</style>
<script>
    import { wxcCell, WxcButton, WxcResult } from 'weex-ui';
    import weexRouter from '../util/weexRouter'
    import http from '../util/http'

    var modal = weex.requireModule('modal')
    const storage = weex.requireModule('storage')
    const clipboard = weex.requireModule('clipboard')

    export default {
        components: { wxcCell, WxcButton, WxcResult },
        data() {
            return {
                height: 833,
                password: '',
                mobile: '',
                is_send: false,
                sendContent: '发送验证码',
                second: 60,
                show: true,
                customSet:{
                    errorPage: {
                        button: '',
                        content: '',
                        pic: 'http://cdn.udian.me/logo.png'
                    }
                }
            }
        },
        created () {
            storage.getItem('phone', event => {
                if(event.data && event.data != "undefined"){
                    this.mobile = event.data
                }
            })

        },
        methods: {
            wxcCellClicked () {
                this.isShow = true;
            },
            wxcButtonClicked () {

                if(!this.mobile){
                    modal.toast({
                        message: '请填写正确的手机号!',
                        duration: 1
                    })
                    return false
                }
                var patt1 = new RegExp(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/);
                if(!patt1.test(this.mobile)){
                    modal.toast({
                        message: '请填写正确的手机号!',
                        duration: 1
                    })
                    return false
                }
                var _url = 'seller/loginByApp'
                var _data = {
                    account: this.mobile,
                    code: this.password,
                }
                http.postAjax(_url, _data, function (data) {
                    http.storageSet('udotAuthToken', data.authToken)
                    http.storageSet('seller', data.data)
                    modal.toast({
                        message: '登录成功!',
                        duration: 1
                    })
                    weexRouter.push('/index')
                })
            },
            send_msg () {
                if(this.is_send){
                    return false;
                }
                let that = this
                if(!this.mobile){
                    modal.toast({
                        message: '请填写正确的手机号!',
                        duration: 1
                    })
                    return false
                }
                var patt1 = new RegExp(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/);
                if(!patt1.test(this.mobile)){
                    modal.toast({
                        message: '请填写正确的手机号!',
                        duration: 1
                    })
                    return false
                }
                var _url = 'user/sendSms'
                var _data = {
                    mobile: this.mobile,
                    type: 3
                }
                that.is_send = true
                    that.sendContent = '等待'
                    that.setTime();
                that.is_send = true
                http.postAjax(_url, _data, function (data) {
                    storage.setItem('phone', that.mobile)
                    that.is_send = true
                    that.sendContent = '等待'
                    that.setTime();
                })
            },
            setTime () {
                setTimeout(() => {
                    if(this.second == 0){
                        this.is_send = false
                        this.sendContent = '发送验证码'
                        this.second = 60
                        return false
                    }
                    this.second = this.second - 1
                    this.setTime();
                }, 1000)
            }
        },
    }
</script>
