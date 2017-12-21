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
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
    import { WxcMinibar } from 'weex-ui';
    export default {
        name: 'user',
        components: { WxcMinibar },
        data () {
            return {
                msg: 'user！'
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
        }
    }
</script>

<style scoped >
</style>