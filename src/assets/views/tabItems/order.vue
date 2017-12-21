<template>
    <div class="wrapper">
        <udot-nav-bar
                title="优点24h便利店"
                background-color="#fc345c"
                text-color="#FFFFFF"
                @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                :use-default-return="useDefaultReturn"
                right-text="设置"
                left-button=""
        ></udot-nav-bar>
        <!--<div class="header">-->
            <!--<div class="shop-title">-->
                <!--<text class="header-left" style="padding-right: 5px">优点24h便利店</text>-->
                <!--<image src="http://cdn.udian.me/down_triangle.png" class="down-la" style="width:36px;height: 36px;"></image>-->
            <!--</div>-->
            <!--<div>-->
                <!--<text class="header-right">设置</text>-->
            <!--</div>-->
        <!--</div>-->
        <div class="home-menu">
            <div class="home-menu-item">
                <image src="http://ozfrvjgew.bkt.clouddn.com/order.png" class="home-menu-item_img"></image>
                <text class="home-menu-item_title">待接单</text>
                <text class="home-menu-item_blef" style="top:90px;right: 34px;padding-left: 3px;padding-right: 3px;">123</text>
            </div >
            <div class="home-menu-item">
                <image src="http://ozfrvjgew.bkt.clouddn.com/send.png" class="home-menu-item_img"></image>
                <text class="home-menu-item_title">待发货</text>
                <text class="home-menu-item_blef" style="width: 18px;height: 18px"></text>
            </div>
            <div class="home-menu-item">
                <image src="http://ozfrvjgew.bkt.clouddn.com/delivery.png" class="home-menu-item_img"></image>
                <text class="home-menu-item_title">待送达</text>
                <text class="home-menu-item_blef" style="width: 18px;height: 18px"></text>
            </div>
            <div class="home-menu-item">
                <image src="http://ozfrvjgew.bkt.clouddn.com/server.png" class="home-menu-item_img"></image>
                <text class="home-menu-item_title">售后</text>
                <text class="home-menu-item_blef" style="width: 18px;height: 18px"></text>
            </div>
        </div>
        <wxc-cell
                  :has-arrow="true"
                  @wxcCellClicked="wxcCellClicked"
                  class="list-top">
            <image slot="label" class="list-img" src="http://ozfrvjgew.bkt.clouddn.com/bing.png"></image>
            <text slot="title">经营数据统计</text>
        </wxc-cell>
        <div class="home-bill">
            <div class="home-bill-item border-right">
                <text class="home-bill-item_title">278.00</text>
                <text class="home-bill-item_brief">今日营业额(元)</text>
            </div >
            <div class="home-bill-item border-right">
                <text class="home-bill-item_title">126</text>
                <text class="home-bill-item_brief">今日订单</text>
            </div>
            <div class="home-bill-item">
                <text class="home-bill-item_title">40.00</text>
                <text class="home-bill-item_brief">客单价(元)</text>
            </div>
        </div>
        <wxc-cell
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                class="list-top">
            <image slot="label" class="list-img" src="http://ozfrvjgew.bkt.clouddn.com/bill_detail.png"></image>
            <text slot="title">账单明细</text>
        </wxc-cell>
        <wxc-cell
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-bottom-border="false"
                >
            <image slot="label" class="list-img" src="http://ozfrvjgew.bkt.clouddn.com/shop_set.png"></image>
            <text slot="title">店铺管理</text>
        </wxc-cell>
    </div>
</template>

<script>
    import { WxcMinibar, wxcCell } from 'weex-ui';
    import udotNavBar from '../../components/navBar.vue';
    import weexRouter from '../../util/weexRouter'

    const storage = weex.requireModule('storage')

    export default {
        name: 'order',
        components: { WxcMinibar, udotNavBar, wxcCell },
        data () {
            return {
                msg: '欢222迎！',
                isBottomShow: false,
                height: 400,
                useDefaultReturn: false,
            }
        },
        created: function () {
            this.height = weex.config.env.deviceHeight

            storage.getItem('udotAuthToken', event => {
                this.msg = event.data;
            })
        },
        methods: {
            minibarLeftButtonClick () {
                console.log(111)
                return false
            },
            minibarRightButtonClick () {
                weexRouter.push('/login')
            },
            openBottomPopup () {
                this.isBottomShow = true;
            },
            //非状态组件，需要在这里关闭
            popupOverlayBottomClick () {
                this.isBottomShow = false;
            },
            wxcCellClicked (){

            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper{
        background-color: #f6f6f6;
    }
    .header{
        flex-direction: row;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        color: #ffffff;
        width: 750;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(252, 52, 92);
        padding-top: 0px;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-box-pack: justify;
        -webkit-box-align: center;
        padding-left: 40px;
        padding-right: 20px;
        font-size: 28px;
    }
    .down-la{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -30;
    }
    .shop-title{
        flex-direction: row;
        position: relative;
    }
    .header-left, .header-right{
        color: #ffffff;
    }
    .home-menu{
        flex-direction: row;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        height: 300;
        color: #ffffff;
        width: 750;
    }
    .home-menu-item{
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #FC345C;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        -webkit-box-flex: 1;
        height: 300;
        position: relative;
    }
    .home-menu-item_img{
        margin-top: 10px;
        height: 60;
        width: 60;
    }
    .home-menu-item_title{
        margin-top: 10px;
        color: #ffffff;
        ont-family: PingFangSC-Regular;
        font-size: 24px;
    }
    .home-menu-item_blef{
        position: absolute;
        right: 54px;
        top:96;
        text-align: center;
        background-color: #f8f800;
        color: #FC345C;
        border-radius: 100px;
        font-size: 20px;
    }
    .home-bill{
        flex-direction: row;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        height: 200;
        color: #ffffff;
        background-color: #ffffff;
        width: 750;
    }
    .home-bill-item{
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        -webkit-box-flex: 1;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .home-bill-item_title{
        color: #333;
        font-family: PingFangSC-Medium;
        font-size: 40px;
    }
    .home-bill-item_brief{
        color: #4a4a4a;
        ont-family: PingFangSC-Regular;
        font-size: 26px;
    }
    .list-top{
        margin-top: 20px;
    }
    .border-right{
        border-right-width: 2px;
        border-right-color: #F6F6F6;
    }
    .list-img{
        width: 36px;
        height: 36px;
        margin-right: 10px;
    }
</style>