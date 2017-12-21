// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 91);
/******/ })
/************************************************************************/
/******/ ({

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var INPUT_ICON = "https://gw.alicdn.com/tfs/TB1FZB.pwMPMeJjy1XdXXasrXXa-30-30.png";
var CLOSE_ICON = "https://gw.alicdn.com/tfs/TB1sZB.pwMPMeJjy1XdXXasrXXa-24-24.png";
var ARROW_ICON = "https://gw.alicdn.com/tfs/TB1vZB.pwMPMeJjy1XdXXasrXXa-24-24.png";

exports.default = {
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
        needShowCancel: function needShowCancel() {
            return this.alwaysShowCancel || this.showCancel;
        }
    },
    data: function data() {
        return {
            inputIcon: INPUT_ICON,
            closeIcon: CLOSE_ICON,
            arrowIcon: ARROW_ICON,
            showCancel: false,
            showClose: false,
            value: ''
        };
    },
    created: function created() {
        this.defaultValue && (this.value = this.defaultValue);
        if (this.disabled) {
            this.showCancel = false;
            this.showClose = false;
        }
    },

    methods: {
        onBlur: function onBlur() {
            var self = this;
            setTimeout(function () {
                self.showCancel = false;
                self.detectShowClose();
                self.$emit('wxcSearchbarInputOnBlur', { value: self.value });
            }, 10);
        },
        autoBlur: function autoBlur() {
            this.$refs['search-input'].blur();
        },
        onFocus: function onFocus() {
            this.showCancel = true;
            this.detectShowClose();
            this.$emit('wxcSearchbarInputOnFocus', { value: this.value });
        },
        closeClicked: function closeClicked() {
            this.value = '';
            this.showCancel && (this.showCancel = false);
            this.showClose && (this.showClose = false);
            this.$emit('wxcSearchbarCloseClicked', { value: this.value });
            this.$emit('wxcSearchbarInputOnInput', { value: this.value });
        },
        onInput: function onInput(e) {
            this.value = e.value;
            this.showCancel = true;
            this.detectShowClose();
            this.$emit('wxcSearchbarInputOnInput', { value: this.value });
        },
        onSubmit: function onSubmit(e) {
            this.onBlur();
            this.value = e.value;
            this.showCancel = true;
            this.detectShowClose();
            this.$emit('wxcSearchbarInputReturned', { value: this.value });
        },
        cancelClicked: function cancelClicked() {
            this.showCancel && (this.showCancel = false);
            this.showClose && (this.showClose = false);
            this.onFocus();
            this.$emit('wxcSearchbarCancelClicked', { value: this.value });
        },
        detectShowClose: function detectShowClose() {
            this.showClose = this.value.length > 0 && this.showCancel;
        },
        depClicked: function depClicked() {
            this.$emit('wxcSearchbarDepChooseClicked', {});
        },
        inputDisabledClicked: function inputDisabledClicked() {
            this.$emit('wxcSearchbarInputDisabledClicked', {});
        },
        setValue: function setValue(value) {
            this.value = value;
        }
    }
};

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = {
  "wxc-search-bar": {
    "paddingLeft": 20,
    "paddingRight": 20,
    "backgroundColor": "#FC345C",
    "width": 750,
    "height": 84,
    "flexDirection": "row"
  },
  "search-bar-input": {
    "position": "absolute",
    "top": 10,
    "paddingTop": 0,
    "paddingBottom": 0,
    "paddingRight": 40,
    "paddingLeft": 60,
    "fontSize": 26,
    "width": 624,
    "height": 64,
    "lineHeight": 64,
    "backgroundColor": "#ffffff",
    "placeholderColor": "#666666",
    "outline": "none",
    "borderRadius": 200
  },
  "search-bar-ICON": {
    "position": "absolute",
    "width": 30,
    "height": 30,
    "left": 34,
    "top": 28
  },
  "search-bar-close": {
    "position": "absolute",
    "width": 30,
    "height": 30,
    "right": 120,
    "top": 28
  },
  "search-bar-button": {
    "width": 94,
    "height": 36,
    "fontSize": 30,
    "textAlign": "center",
    "backgroundColor": "#FC345C",
    "marginTop": 16,
    "marginRight": 0,
    "color": "#ffffff",
    "position": "absolute",
    "right": 8,
    "top": 9
  },
  "input-has-dep": {
    "paddingLeft": 240,
    "width": 710
  },
  "bar-dep": {
    "width": 170,
    "paddingRight": 12,
    "paddingLeft": 12,
    "height": 42,
    "alignItems": "center",
    "flexDirection": "row",
    "position": "absolute",
    "left": 24,
    "top": 22,
    "borderRightStyle": "solid",
    "borderRightWidth": 1,
    "borderRightColor": "#C7C7C7"
  },
  "dep-text": {
    "flex": 1,
    "textAlign": "center",
    "fontSize": 26,
    "color": "#666666",
    "marginRight": 6,
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  "dep-arrow": {
    "width": 24,
    "height": 24
  },
  "ICON-has-dep": {
    "left": 214
  },
  "disabled-input": {
    "width": 750,
    "height": 64,
    "position": "absolute",
    "left": 0,
    "backgroundColor": "rgba(0,0,0,0)"
  },
  "has-dep-disabled": {
    "width": 550,
    "left": 200
  }
}

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: ["wxc-search-bar"]
  }, [_c('input', {
    ref: "search-input",
    staticClass: ["search-bar-input"],
    style: {
      width: _vm.needShowCancel ? '624px' : '710px'
    },
    attrs: {
      "autofocus": _vm.autofocus,
      "disabled": _vm.disabled,
      "value": _vm.value,
      "type": _vm.inputType,
      "placeholder": _vm.placeholder
    },
    on: {
      "blur": _vm.onBlur,
      "focus": _vm.onFocus,
      "input": _vm.onInput,
      "return": _vm.onSubmit
    }
  }), (_vm.disabled) ? _c('div', {
    staticClass: ["disabled-input"],
    on: {
      "click": _vm.inputDisabledClicked
    }
  }) : _vm._e(), _c('image', {
    staticClass: ["search-bar-ICON"],
    attrs: {
      "ariaHidden": true,
      "src": _vm.inputIcon
    }
  }), (_vm.showClose) ? _c('image', {
    staticClass: ["search-bar-close"],
    attrs: {
      "ariaHidden": true,
      "src": _vm.closeIcon
    },
    on: {
      "click": _vm.closeClicked
    }
  }) : _vm._e(), (_vm.needShowCancel) ? _c('text', {
    staticClass: ["search-bar-button"],
    on: {
      "click": _vm.cancelClicked
    }
  }, [_vm._v("取消 ")]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(22)
)

/* script */
__vue_exports__ = __webpack_require__(12)

/* template */
var __vue_template__ = __webpack_require__(28)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/wilson/weex/weex-star/src/assets/components/searchBar.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4dd96a03"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__
module.exports.el = 'true'
new Vue(module.exports)


/***/ })

/******/ });