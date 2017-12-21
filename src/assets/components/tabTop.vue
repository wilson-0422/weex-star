<template>
    <div class="tabTop" append="tree">
        <div    v-for="(item, i) in itemList"
                class="container"
                @click="onclickitem(i)">
            <!--<text class="iconfont" :style="{ color: titleColor }">&#xe68b;</text>-->
            <text
                    :class="['tab-text',(item.active && 'tab-text-active')]">{{item.title}}</text>
        </div>
        <div ref="tab-slider" class="slider" :style="{width: pwidth, backgroundColor: '#FC345C', left: left }"></div>
    </div>
</template>

<script>
    const animation = weex.requireModule('animation');

    export default {
        props: {
            itemList:{ default: []},
        },
        data() {
            return {
                pwidth: 165,
                left: 11.25,
                index: 0
            }
        },
        created () {
            this.pwidth = (750-90)/this.itemList.length
            this.left = 45/this.itemList.length
        },
        methods: {
            onclickitem(e){
                this.itemList.forEach(function (obj, index) {
                    if(index==e){
                        obj.active = true
                    }else{
                        obj.active = false
                    }
                })
                let dist = 750/this.itemList.length * e
                this.sliderAnimation(dist)
                this.$emit('tabTopItemOnClick', e);
            },
            sliderAnimation(dist){
                const containerEl = this.$refs[`tab-slider`];
                animation.transition(containerEl, {
                    styles: {
                        transform: `translateX(${dist}px)`
                    },
                    duration: 300,
                    timingFunction: 'ease-in-out',
                    delay: 0
                }, () => {
                });
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .tabTop{
        flex-direction: row;
        background-color: #ffffff;

    }
    .container{
        flex: 1;
        flex-direction: column;
        align-items:center;
        justify-content:center;
        height: 88;
        position: relative;
    }
    .tab-text {
        margin-top: 5;
        text-align: center;
        font-size: 20;
        color: #000000;
    }
    .tab-text-active{
        color: #FC345C;
    }
    .slider{
        position:absolute;
        content:" ";
        left:0;
        bottom:0;
        height:6px;
        background-color:#1aad19;
        -webkit-transition:-webkit-transform .3s;
        transition:-webkit-transform .3s;
        transition:transform .3s;
        transition:transform .3s,-webkit-transform .3s;
    }
</style>