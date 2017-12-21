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
/******/ 	return __webpack_require__(__webpack_require__.s = 93);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
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

var animation = weex.requireModule('animation');

exports.default = {
    props: {
        itemList: { default: [] }
    },
    data: function data() {
        return {
            pwidth: 165,
            left: 11.25,
            index: 0
        };
    },
    created: function created() {
        this.pwidth = (750 - 90) / this.itemList.length;
        this.left = 45 / this.itemList.length;
    },

    methods: {
        onclickitem: function onclickitem(e) {
            this.itemList.forEach(function (obj, index) {
                if (index == e) {
                    obj.active = true;
                } else {
                    obj.active = false;
                }
            });
            var dist = 750 / this.itemList.length * e;
            this.sliderAnimation(dist);
            this.$emit('tabTopItemOnClick', e);
        },
        sliderAnimation: function sliderAnimation(dist) {
            var containerEl = this.$refs['tab-slider'];
            animation.transition(containerEl, {
                styles: {
                    transform: 'translateX(' + dist + 'px)'
                },
                duration: 300,
                timingFunction: 'ease-in-out',
                delay: 0
            }, function () {});
        }
    }
};

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports = {
  "tabTop": {
    "flexDirection": "row",
    "backgroundColor": "#ffffff"
  },
  "container": {
    "flex": 1,
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "height": 88,
    "position": "relative"
  },
  "tab-text": {
    "marginTop": 5,
    "textAlign": "center",
    "fontSize": 20,
    "color": "#000000"
  },
  "tab-text-active": {
    "color": "#FC345C"
  },
  "slider": {
    "position": "absolute",
    "content": "\" \"",
    "left": 0,
    "bottom": 0,
    "height": 6,
    "backgroundColor": "#1aad19",
    "WebkitTransition": "-webkit-transform .3s",
    "transitionDuration": 300,
    "transitionProperty": "transform",
    "transitionDelay": 300
  },
  "@TRANSITION": {
    "slider": {
      "duration": 300,
      "property": "transform",
      "delay": 300
    }
  }
}

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["tabTop"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_vm._l((_vm.itemList), function(item, i) {
    return _c('div', {
      staticClass: ["container"],
      on: {
        "click": function($event) {
          _vm.onclickitem(i)
        }
      }
    }, [_c('text', {
      class: ['tab-text', (item.active && 'tab-text-active')]
    }, [_vm._v(_vm._s(item.title))])])
  }), _c('div', {
    ref: "tab-slider",
    staticClass: ["slider"],
    style: {
      width: _vm.pwidth,
      backgroundColor: '#FC345C',
      left: _vm.left
    }
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(18)
)

/* script */
__vue_exports__ = __webpack_require__(13)

/* template */
var __vue_template__ = __webpack_require__(24)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/src/assets/components/tabTop.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1d9f8478"
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