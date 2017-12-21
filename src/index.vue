<template>
    <div style="flex-direction: column;">
        <tab-bar :tabItems="tabItems" @tabBarOnClick="tabBarOnClick"></tab-bar>
    </div>
</template>

<script>
    import weexRouter from './assets/util/weexRouter'
    import http from './assets/util/http'
    import TabBar from './assets/components/tabBar.vue'
    //    import { WxcPopup } from 'weex-ui';
    const storage = weex.requireModule('storage')

    export default {
        components: { TabBar },
        data() {
            return {
                dir: 'examples',
                tabItems: [
                    {
                        index: 0,
                        title: '首页',
                        titleColor: '#7d7d7d',
                        icon: '',
                        image: 'http://cdn.udian.me/index_gray.png',
                        selectedImage: 'http://cdn.udian.me/index.png',
                        src: '/index/order',
                        visibility: 'visible',
                    },
                    {
                        index: 1,
                        title: '订单',
                        titleColor: '#7d7d7d',
                        icon: '',
                        image: 'http://cdn.udian.me/query_gray.png',
                        selectedImage: 'http://cdn.udian.me/query.png',
                        src: '/index/checkOrder',
                        visibility: 'hidden',
                    },
                    {
                        index: 2,
                        title: '商品',
                        titleColor: '#7d7d7d',
                        icon: '',
                        image: 'http://cdn.udian.me/goods_gray.png',
                        selectedImage: 'http://cdn.udian.me/goods.png',
                        src: '/index/shop',
                        visibility: 'hidden',
                    },
                    {
                        index: 3,
                        title: '统计',
                        titleColor: '#7d7d7d',
                        icon: '',
                        image: 'http://cdn.udian.me/set_gray.png',
                        selectedImage: 'http://cdn.udian.me/set.png',
                        src: '/index/user',
                        visibility: 'hidden',
                    }
                ],
                isBottomShow: false,
                height: 400
            }
        },
        created: function() {
            for(var i = 0; i < this.tabItems.length; i++) {
                var tabItem = this.tabItems[i];
                tabItem.src = weexRouter.getURL(tabItem.src) ;
            }

//            http.storageGet('udotAuthToken',function (data) {
//                console.log("=====" + data)
//                if(!data){
//                    weexRouter.push('/login')
//                }
//            })
        },
        methods: {
            tabBarOnClick: function (e) {
                console.log('tabBarOnClick', e.index)
            },
            openBottomPopup () {
                this.isBottomShow = true;
            },
            //非状态组件，需要在这里关闭
            popupOverlayBottomClick () {
                this.isBottomShow = false;
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .iconfont{
        font-family: iconfont;
    }
    .img_src{
        width: 750px;
        height: 750px;
    }
    .wxc-demo {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: #fff;
    }
    .button-list {
        padding-left: 24px;
    }
    .button-text {
        margin-top: 40px;
        margin-left: 8px;
        margin-bottom: 16px;
    }
    .scroller {
        flex: 1;
    }
    .demo {
        align-items: center;
        margin-top: 40px;
        margin-bottom: 40px;
    }
    .input {
        width: 500px;
        text-align: right;
        font-size: 28px;
    }
</style>