<template>
    <div class="hello">
        <wxc-minibar
                :title="msg"
                background-color="#009ff0"
                text-color="#FFFFFF"
                left-button=""
                @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                right-text="更多"
        ></wxc-minibar>
        <h1 @click="gopage">{{ msg }}</h1>
    </div>
</template>

<script>
    import { WxcMinibar } from 'weex-ui'
    import weexRouter from '../../util/weexRouter'

    export default {
        name: 'shop',
        components: { WxcMinibar },
        data () {
            return {
                msg: 'shop！'
            }
        },
        created: function () {
            console.log(this.$route);
        },
        methods: {
            minibarLeftButtonClick () {
            },
            minibarRightButtonClick () {
            },
            gopage (){
                weexRouter.push('/goodsList', this)
            }
        }
    }
</script>

<style scoped >
</style>