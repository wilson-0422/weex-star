<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/25. -->
<!--A sSearch bar for city Search-->

<template>
    <div>
        <div class="wxc-search-bar"
             >
            <input @blur="onBlur"
                   @focus="onFocus"
                   @input="onInput"
                   @return="onSubmit"
                   :autofocus="autofocus"
                   :disabled="disabled"
                   :value="value"
                   ref="search-input"
                   :type="inputType"
                   :placeholder="placeholder"
                   :style="{ width: needShowCancel ? '624px' : '710px' }"
                   class="search-bar-input"/>
            <div v-if="disabled"
                 @click="inputDisabledClicked"
                 class="disabled-input"></div>
            <image class="search-bar-ICON"
                   :aria-hidden="true"
                   :src="inputIcon"></image>
            <image class="search-bar-close"
                   v-if="showClose"
                   :aria-hidden="true"
                   @click="closeClicked"
                   :src="closeIcon"></image>
            <text class="search-bar-button"
                  v-if="needShowCancel"
                  @click="cancelClicked">取消 </text>
        </div>
        <!--<div class="wxc-search-bar"-->
        <!--v-if="mod==='hasDep'">-->
        <!--<input @blur="onBlur"-->
        <!--@focus="onFocus"-->
        <!--@input="onInput"-->
        <!--@return="onSubmit"-->
        <!--:disabled="disabled"-->
        <!--:autofocus="autofocus"-->
        <!--:value="value"-->
        <!--:type="inputType"-->
        <!--:placeholder="placeholder"-->
        <!--:class="search-bar-input input-has-dep"/>-->
        <!--<div v-if="disabled"-->
        <!--@click="inputDisabledClicked"-->
        <!--class="disabled-input has-dep-disabled"></div>-->
        <!--<div :class="bar-dep"-->
        <!--@click="depClicked">-->
        <!--<text class="dep-text">{{depName}}</text>-->
        <!--<image :src="arrowIcon"-->
        <!--:aria-hidden="true"-->
        <!--class="dep-arrow"></image>-->
        <!--</div>-->
        <!--<image class="search-bar-ICON ICON-has-dep"-->
        <!--:aria-hidden="true"-->
        <!--:src="inputIcon"></image>-->
        <!--</div>
       -->
    </div>
</template>

<style scoped>
    .wxc-search-bar {
        padding-left: 20px;
        padding-right: 20px;
        background-color: #FC345C;
        width: 750px;
        height: 84px;
        flex-direction: row;
    }

    .search-bar-input {
        position: absolute;
        top: 10px;
        padding-top: 0;
        padding-bottom: 0;
        padding-right: 40px;
        padding-left: 60px;
        font-size: 26px;
        width: 624px;
        height: 64px;
        line-height: 64px;
        background-color: #ffffff;
        placeholder-color: #666666;
        outline: none;
        border-radius: 200px;
    }

    .search-bar-ICON {
        position: absolute;
        width: 30px;
        height: 30px;
        left: 34px;
        top: 28px;
    }

    .search-bar-close {
        position: absolute;
        width: 30px;
        height: 30px;
        right: 120px;
        top: 28px;
    }

    .search-bar-button {
        width: 94px;
        height: 36px;
        font-size: 30px;
        text-align: center;
        background-color: #FC345C;
        margin-top: 16px;
        margin-right: 0;
        color: #ffffff;
        position: absolute;
        right: 8px;
        top: 9px;
    }

    .input-has-dep {
        padding-left: 240px;
        width: 710px;
    }

    .bar-dep {
        width: 170px;
        padding-right: 12px;
        padding-left: 12px;
        height: 42px;
        align-items: center;
        flex-direction: row;
        position: absolute;
        left: 24px;
        top: 22px;
        border-right-style: solid;
        border-right-width: 1px;
        border-right-color: #C7C7C7;
    }

    .dep-text {
        flex: 1;
        text-align: center;
        font-size: 26px;
        color: #666666;
        margin-right: 6px;
        lines: 1;
        text-overflow: ellipsis;
    }

    .dep-arrow {
        width: 24px;
        height: 24px;
    }

    .ICON-has-dep {
        left: 214px;
    }

    .disabled-input {
        width: 750px;
        height: 64px;
        position: absolute;
        left: 0;
        background-color: transparent;
    }

    .has-dep-disabled {
        width: 550px;
        left: 200px;
    }
</style>

<script>
    const INPUT_ICON = "https://gw.alicdn.com/tfs/TB1FZB.pwMPMeJjy1XdXXasrXXa-30-30.png";
    const CLOSE_ICON = "https://gw.alicdn.com/tfs/TB1sZB.pwMPMeJjy1XdXXasrXXa-24-24.png";
    const ARROW_ICON = "https://gw.alicdn.com/tfs/TB1vZB.pwMPMeJjy1XdXXasrXXa-24-24.png";

    export default {
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            alwaysShowCancel: {
                type: Boolean,
                default: false
            },
            inputType: {
                type: String,
                default: 'text'
            },
            mod: {
                type: String,
                default: 'default'
            },
            autofocus: {
                type: Boolean,
                default: false
            },
            theme: {
                type: String,
                default: 'gray'
            },
            defaultValue: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: '搜索'
            },
            depName: {
                type: String,
                default: '杭州'
            }
        },
        computed: {
            needShowCancel () {
                return this.alwaysShowCancel || this.showCancel;
            }
        },
        data: () => ({
            inputIcon: INPUT_ICON,
            closeIcon: CLOSE_ICON,
            arrowIcon: ARROW_ICON,
            showCancel: false,
            showClose: false,
            value: ''
        }),
        created () {
            this.defaultValue && (this.value = this.defaultValue);
            if (this.disabled) {
                this.showCancel = false;
                this.showClose = false;
            }
        },
        methods: {
            onBlur () {
                const self = this;
                setTimeout(() => {
                    self.showCancel = false;
                    self.detectShowClose();
                    self.$emit('wxcSearchbarInputOnBlur', { value: self.value });
                }, 10);
            },
            autoBlur () {
                this.$refs['search-input'].blur();
            },
            onFocus () {
                this.showCancel = true;
                this.detectShowClose();
                this.$emit('wxcSearchbarInputOnFocus', { value: this.value });
            },
            closeClicked () {
                this.value = '';
                this.showCancel && (this.showCancel = false);
                this.showClose && (this.showClose = false);
                this.$emit('wxcSearchbarCloseClicked', { value: this.value });
                this.$emit('wxcSearchbarInputOnInput', { value: this.value });
            },
            onInput (e) {
                this.value = e.value;
                this.showCancel = true;
                this.detectShowClose();
                this.$emit('wxcSearchbarInputOnInput', { value: this.value });
            },
            onSubmit (e) {
                this.onBlur();
                this.value = e.value;
                this.showCancel = true;
                this.detectShowClose();
                this.$emit('wxcSearchbarInputReturned', { value: this.value });
            },
            cancelClicked () {
                this.showCancel && (this.showCancel = false);
                this.showClose && (this.showClose = false);
                this.onFocus();
                this.$emit('wxcSearchbarCancelClicked', { value: this.value });
            },
            detectShowClose () {
                this.showClose = (this.value.length > 0) && this.showCancel;
            },
            depClicked () {
                this.$emit('wxcSearchbarDepChooseClicked', {});
            },
            inputDisabledClicked () {
                this.$emit('wxcSearchbarInputDisabledClicked', {});
            },
            setValue (value) {
                this.value = value;
            }
        }
    };
</script>
