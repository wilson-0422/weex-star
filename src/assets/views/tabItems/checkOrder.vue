<template>
    <div class="wrapper">
        <udot-search-bar
                ref="wxc-searchbar"
                @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"
                :style="{height: height, paddingTop: top}"
                placeholder="输入订单号/买家用户名"
                mod=""
        ></udot-search-bar>
        <udot-tabtop :itemList="itemList" @tabTopItemOnClick="tabTopItemOnClick"></udot-tabtop>
        <!--<scroller>-->
            <!--<udot-order-item v-for="item in orderList" :orderInfo="item"></udot-order-item>-->
        <!--</scroller>-->
    </div>
</template>

<script>
    import { WxcTabBar } from 'weex-ui'
    import weexRouter from '../../util/weexRouter'
    import udotSearchBar from '../../components/searchBar.vue'
    import udotTabtop from '../../components/tabTop.vue'
    import udotOrderItem from '../../components/orderItem.vue'
    import http from '../../util/http'

    export default {
        name: 'checkOrder',
        components: { udotSearchBar, udotTabtop, udotOrderItem },
        data () {
            return {
                value: '',
                height: 88,
                top: 0,
                itemList:[
                    {
                        title: '待接单',
                        active: true,
                    },
                    {
                        title: '待发货',
                        active: false,
                    },
                    {
                        title: '待送达',
                        active: false,
                    },
                    {
                        title: '已送达',
                        active: false,
                    },
                ],
                orderList: []
            }
        },
        created: function () {
            if(weexRouter.getOs() == 'ios'){
                this.height = 88 + 40
                this.top = 40;
            }
            this.getOrderList()
        },
        methods: {
            wxcSearchbarInputOnFocus () {
            },
            wxcSearchbarInputOnBlur () {
            },
            wxcSearchbarInputReturned (){
            },
            wxcSearchbarCloseClicked () {
            },
            wxcSearchbarInputOnInput (e) {
                this.value = e.value;
            },
            wxcSearchbarCancelClicked () {
            },
            wxcSearchbarInputDisabledClicked () {
            },
            wxcSearchbarDepChooseClicked () {
            },
            tabTopItemOnClick(e){
                console.log(e)
            },
            getOrderList(){

                let _data = {
                    type: 4
                }

//                http.postAjax('sellerOrder/orderList', _data, function (data) {
//                    console.log(data)
//                })
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper{
        /*background-color: #f6f6f6;*/
    }
    .searchBox{
        background-color: #FC345C;
    }
</style>