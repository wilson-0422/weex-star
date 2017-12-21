<template>

    <div class="wrapper" >
        <wxc-minibar
                :title="msg"
                background-color="#009ff0"
                text-color="#FFFFFF"
                left-button=""
                @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                right-text="更多"
        ></wxc-minibar>
        <text @click="update()">goodsList</text>
    </div>
</template>

<script>
    import { WxcMinibar } from 'weex-ui';
    export default {
        name: 'goodsList',
        data() {
            return {}
        },
        created: function () {
            console.log(this.$route);
        },
        methods: {}
    }
</script>

<style scoped >
</style>