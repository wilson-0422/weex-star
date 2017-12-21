<template>
    <wxc-minibar
            :title="title"
            :background-color="backgroundColor"
            :text-color="textColor"
            @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
            @wxcMinibarRightButtonClicked="minibarRightButtonClick"
            :right-text="rightText"
            :right-button="rightButton"
            :left-button="leftButton"
            :use-default-return="useDefaultReturn"
            :show="show"
            :style="{height: height, paddingTop: top}"
    >
        <text slot="title">
            <image src="https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png"></image>
        </text>
    </wxc-minibar>
</template>

<script>
    import { WxcMinibar } from 'weex-ui';
    import weexRouter from '../util/weexRouter'

    export default {
        components: { WxcMinibar },
        props: {
            backgroundColor: {
                type: String,
                default: '#FFC900'
            },
            leftButton: {
                type: String,
                default: 'https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png'
            },
            textColor: {
                type: String,
                default: '#3D3D3D'
            },
            rightButton: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: '标题'
            },
            rightText: {
                type: String,
                default: ''
            },
            useDefaultReturn: {
                type: Boolean,
                default: true
            },
            show: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                height: 88,
                top: 0,
            }
        },
        created() {
            if(weexRouter.getOs() == 'ios'){
                this.height = 88 + 40
                this.top = 40;
            }
        },
        methods: {
            minibarLeftButtonClick () {
                this.$emit('wxcMinibarLeftButtonClicked', {});
            },
            minibarRightButtonClick () {
                if (this.rightText || this.rightButton) {
                    this.$emit('wxcMinibarRightButtonClicked', {});
                }
            }
        }
    }
</script>