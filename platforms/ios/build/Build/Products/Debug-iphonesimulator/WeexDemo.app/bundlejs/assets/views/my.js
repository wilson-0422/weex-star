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
/******/ 	return __webpack_require__(__webpack_require__.s = 97);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
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

var navigator = weex.requireModule('navigator');
exports.default = {
    data: function data() {
        return {};
    },


    components: {},
    created: function created() {

        //            meta.setViewport({
        //                width: 1750
        //            });
    },

    methods: {
        jump: function jump() {
            this.jump('/index');
        }
    }
};

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = {
  "iconfont": {
    "fontFamily": "iconfont"
  },
  "wrapper": {
    "backgroundColor": "#f4f4f4"
  },
  "cell-button": {
    "marginBottom": 18
  },
  "header": {
    "height": 280
  },
  "header-bg": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "height": 280
  },
  "i-photo": {
    "position": "absolute",
    "top": 90,
    "left": 30,
    "height": 130,
    "width": 130,
    "borderRadius": 130
  },
  "i-name": {
    "position": "absolute",
    "top": 110,
    "left": 190,
    "height": 50,
    "width": 300,
    "fontSize": 38,
    "color": "#ffffff"
  },
  "b-tlt": {
    "position": "absolute",
    "top": 170,
    "left": 190,
    "height": 40,
    "width": 350,
    "display": "flex",
    "flexDirection": "row",
    "flexWrap": "nowrap"
  },
  "i-tag": {
    "width": 30,
    "height": 30,
    "fontSize": 24,
    "paddingTop": 2,
    "marginRight": 6,
    "borderRadius": 4
  },
  "tag-e": {
    "width": 32,
    "height": 32
  },
  "tag-v8": {
    "color": "#ffffff",
    "backgroundColor": "#b29e75",
    "textAlign": "center"
  },
  "txt-tag": {
    "color": "#b4a078",
    "flex": 1,
    "height": 40,
    "fontSize": 28,
    "overflow": "hidden",
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  "b-qrcode": {
    "position": "absolute",
    "top": 120,
    "right": 40,
    "height": 80,
    "width": 80,
    "borderRadius": 70,
    "textAlign": "center",
    "fontSize": 40,
    "paddingTop": 18,
    "color": "#ffffff",
    "backgroundColor": "rgba(255,255,255,0.3)"
  },
  "s-box": {
    "paddingLeft": 26,
    "backgroundColor": "#ffffff"
  },
  "box-tlt": {
    "height": 94
  },
  "box-txt": {
    "fontSize": 26,
    "paddingTop": 34,
    "color": "#333333"
  },
  "i-box-in": {
    "position": "absolute",
    "top": 34,
    "right": 30,
    "color": "#333333"
  },
  "box-line": {
    "height": 132,
    "display": "flex",
    "paddingRight": 30,
    "flexWrap": "nowrap",
    "flexDirection": "row",
    "justifyContent": "space-between"
  },
  "i-box-l": {
    "width": 130,
    "height": 132
  },
  "i-box-icon": {
    "fontSize": 50,
    "textAlign": "center",
    "paddingTop": 15,
    "height": 79,
    "paddingBottom": 10,
    "color": "#666666"
  },
  "i-box-tlt": {
    "fontSize": 26,
    "textAlign": "center",
    "color": "#666666"
  },
  "line-serve": {
    "paddingTop": 20,
    "height": 150
  },
  "border-bottom": {
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(0,0,0,0.15)"
  },
  "i-c-orange": {
    "color": "#ff744d"
  },
  "i-c-yellow": {
    "color": "#f6a121"
  },
  "i-c-blue": {
    "color": "#689de5"
  }
}

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('div', {
    staticClass: ["header"],
    on: {
      "click": function($event) {
        _vm.jump()
      }
    }
  }, [_c('text', {
    staticClass: ["i-name"]
  }, [_vm._v("zwwill7")]), _vm._m(0), _c('text', {
    staticClass: ["b-qrcode", "iconfont"]
  }, [_vm._v("")])]), _vm._m(1), _c('div', {
    staticClass: ["s-box"]
  }, [_vm._m(2), _c('div', {
    staticClass: ["box-line", "line-serve", "border-bottom"],
    on: {
      "click": function($event) {
        _vm.jumpWeb('https://id.163.com/gj/m/')
      }
    }
  }, [_vm._m(3), _vm._m(4), _vm._m(5), _vm._m(6)]), _c('div', {
    staticClass: ["box-line", "line-serve", "border-bottom"],
    on: {
      "click": function($event) {
        _vm.jumpWeb('https://gj.reg.163.com/faq/')
      }
    }
  }, [_vm._m(7), _vm._m(8), _vm._m(9), _vm._m(10)]), _c('div', {
    staticClass: ["box-line", "line-serve"],
    on: {
      "click": function($event) {
        _vm.jumpWeb('http%3A%2F%2Fm.you.163.com%2Fhelp%23%2F%3F_k%3Dyn4ucc')
      }
    }
  }, [_vm._m(11), _vm._m(12), _vm._m(13), _vm._m(14)])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["b-tlt"]
  }, [_c('image', {
    staticClass: ["i-tag", "tag-e"],
    attrs: {
      "resize": "contain",
      "src": "http://yanxuan.nosdn.127.net/3dc6e876620bb84a5dac3deb6ecd4916.png"
    }
  }), _c('text', {
    staticClass: ["i-tag", "tag-v8", "iconfont"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["txt-tag"]
  }, [_vm._v("品质生活家")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["s-box", "cell-button"]
  }, [_c('div', {
    staticClass: ["box-tlt", "border-bottom"]
  }, [_c('text', {
    staticClass: ["box-txt"]
  }, [_vm._v("我的订单")]), _c('text', {
    staticClass: ["i-box-in", "iconfont"]
  }, [_vm._v("")])]), _c('div', {
    staticClass: ["box-line"]
  }, [_c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("待付款")])]), _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("待发货")])]), _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("已发货")])]), _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("待评价")])]), _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("退换/售后")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["box-tlt", "border-bottom"]
  }, [_c('text', {
    staticClass: ["box-txt"]
  }, [_vm._v("我的服务")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont", "i-c-orange"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("拼团订单")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont", "i-c-yellow"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("邀请好友")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont", "i-c-orange"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("优惠券")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont", "i-c-yellow"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("优先购")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont", "i-c-orange"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("礼品卡")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont", "i-c-yellow"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("会员")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont", "i-c-orange"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("足迹")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont", "i-c-yellow"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("收藏")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont", "i-c-blue"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("地址")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont", "i-c-blue"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("客服")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont", "i-c-blue"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("帮助")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["i-box-l"]
  }, [_c('text', {
    staticClass: ["i-box-icon", "iconfont", "i-c-blue"]
  }, [_vm._v("")]), _c('text', {
    staticClass: ["i-box-tlt"]
  }, [_vm._v("设置")])])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(21)
)

/* script */
__vue_exports__ = __webpack_require__(15)

/* template */
var __vue_template__ = __webpack_require__(27)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/src/assets/views/my.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4d7ea55e"
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