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
/******/ 	return __webpack_require__(__webpack_require__.s = 116);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var App = __webpack_require__(19);
App.el = '#root';
new Vue(App);

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(42)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(25),
  /* template */
  __webpack_require__(35),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1b256082",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/src/assets/views/my.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] my.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1b256082", Component.options)
  } else {
    hotAPI.reload("data-v-1b256082", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(6)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 25:
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

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.iconfont[data-v-1b256082] {\n    font-family:iconfont;\n}\n.wrapper[data-v-1b256082]{\n    background-color: #f4f4f4;\n}\n.cell-button[data-v-1b256082]{\n    margin-bottom: 18px;\n}\n.header[data-v-1b256082]{\n    height: 280px;\n}\n.header-bg[data-v-1b256082]{\n    position: absolute;\n    top:0;\n    left: 0;\n    right: 0;\n    height: 280px;\n}\n.i-photo[data-v-1b256082]{\n    position: absolute;\n    top:90px;\n    left: 30px;\n    height: 130px;\n    width: 130px;\n    border-radius: 130px;\n}\n.i-name[data-v-1b256082]{\n    position: absolute;\n    top:110px;\n    left: 190px;\n    height: 50px;\n    width: 300px;\n    font-size: 38px;\n    color:#fff;\n}\n.b-tlt[data-v-1b256082]{\n    position: absolute;\n    top:170px;\n    left: 190px;\n    height: 40px;\n    width: 350px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n}\n.i-tag[data-v-1b256082]{\n    width: 30px;\n    height: 30px;\n    font-size: 24px;\n    padding-top: 2px;\n    margin-right: 6px;\n    border-radius: 4px;\n}\n.tag-e[data-v-1b256082]{\n    width: 32px;\n    height: 32px;\n}\n.tag-v8[data-v-1b256082]{\n    color:#fff;\n    background-color: #b29e75;\n    text-align: center;\n}\n.txt-tag[data-v-1b256082]{\n    color:#b4a078;\n    flex: 1;\n    height: 40px;\n    font-size: 28px;\n    overflow: hidden;\n    lines:1;\n    text-overflow: ellipsis;\n}\n.b-qrcode[data-v-1b256082]{\n    position: absolute;\n    top:120px;\n    right: 40px;\n    height: 80px;\n    width: 80px;\n    border-radius: 70px;\n    text-align: center;\n    font-size: 40px;\n    padding-top: 18px;\n    color:#fff;\n    background-color: rgba(255,255,255,.3);\n}\n.s-box[data-v-1b256082]{\n    padding-left: 26px;\n    background-color: #fff;\n}\n.box-tlt[data-v-1b256082]{\n    height: 94px;\n}\n.box-txt[data-v-1b256082]{\n    font-size: 26px;\n    padding-top: 34px;\n    color:#333;\n}\n.i-box-in[data-v-1b256082]{\n    position: absolute;\n    top:34px;\n    right: 30px;\n    color:#333;\n}\n.box-line[data-v-1b256082]{\n    height: 132px;\n    display: flex;\n    padding-right: 30px;\n    flex-wrap: nowrap;\n    flex-direction: row;\n    justify-content: space-between;\n}\n.i-box-l[data-v-1b256082]{\n    width: 130px;\n    height: 132px;\n}\n.i-box-icon[data-v-1b256082]{\n    font-size: 50px;\n    text-align: center;\n    padding-top: 15px;\n    height:79px;\n    padding-bottom: 10px;\n    color:#666;\n}\n.i-box-tlt[data-v-1b256082]{\n    font-size: 26px;\n    text-align: center;\n    color:#666;\n}\n.line-serve[data-v-1b256082]{\n    padding-top: 20px;\n    height: 150px;\n}\n.border-bottom[data-v-1b256082]{\n    border-bottom-width: 1px;\n    border-bottom-color: rgba(0,0,0,.15) ;\n}\n.i-c-orange[data-v-1b256082]{\n    color:#ff744d;\n}\n.i-c-yellow[data-v-1b256082]{\n    color:#f6a121;\n}\n.i-c-blue[data-v-1b256082]{\n    color:#689de5;\n}\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/src/assets/views/my.vue?69e7df82"],"names":[],"mappings":";AA+DA;IACA,qBAAA;CACA;AACA;IACA,0BAAA;CACA;AACA;IACA,oBAAA;CACA;AACA;IACA,cAAA;CACA;AACA;IACA,mBAAA;IACA,MAAA;IACA,QAAA;IACA,SAAA;IACA,cAAA;CACA;AACA;IACA,mBAAA;IACA,SAAA;IACA,WAAA;IACA,cAAA;IACA,aAAA;IACA,qBAAA;CACA;AACA;IACA,mBAAA;IACA,UAAA;IACA,YAAA;IACA,aAAA;IACA,aAAA;IACA,gBAAA;IACA,WAAA;CACA;AACA;IACA,mBAAA;IACA,UAAA;IACA,YAAA;IACA,aAAA;IACA,aAAA;IACA,cAAA;IACA,oBAAA;IACA,kBAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;IACA,gBAAA;IACA,iBAAA;IACA,kBAAA;IACA,mBAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;CACA;AACA;IACA,WAAA;IACA,0BAAA;IACA,mBAAA;CACA;AACA;IACA,cAAA;IACA,QAAA;IACA,aAAA;IACA,gBAAA;IACA,iBAAA;IACA,QAAA;IACA,wBAAA;CACA;AACA;IACA,mBAAA;IACA,UAAA;IACA,YAAA;IACA,aAAA;IACA,YAAA;IACA,oBAAA;IACA,mBAAA;IACA,gBAAA;IACA,kBAAA;IACA,WAAA;IACA,uCAAA;CACA;AACA;IACA,mBAAA;IACA,uBAAA;CACA;AACA;IACA,aAAA;CACA;AACA;IACA,gBAAA;IACA,kBAAA;IACA,WAAA;CACA;AACA;IACA,mBAAA;IACA,SAAA;IACA,YAAA;IACA,WAAA;CACA;AACA;IACA,cAAA;IACA,cAAA;IACA,oBAAA;IACA,kBAAA;IACA,oBAAA;IACA,+BAAA;CACA;AACA;IACA,aAAA;IACA,cAAA;CACA;AACA;IACA,gBAAA;IACA,mBAAA;IACA,kBAAA;IACA,YAAA;IACA,qBAAA;IACA,WAAA;CACA;AACA;IACA,gBAAA;IACA,mBAAA;IACA,WAAA;CACA;AACA;IACA,kBAAA;IACA,cAAA;CACA;AACA;IACA,yBAAA;IACA,sCAAA;CACA;AACA;IACA,cAAA;CACA;AACA;IACA,cAAA;CACA;AACA;IACA,cAAA;CACA","file":"my.vue","sourcesContent":["<template>\n    <div class=\"wrapper\">\n        <div class=\"header\"  @click=\"jump()\">\n            <!--<image class=\"header-bg\" resize=\"cover\" src=\"http://yanxuan.nosdn.127.net/6ae93353e95b3450a2710bb43f925a63.jpg\"></image>-->\n            <!--<image class=\"i-photo\" resize=\"cover\" src=\"http://yanxuan.nosdn.127.net/885e3901d0a3501362530435d76bebb3.jpg\"></image>-->\n            <text class=\"i-name\">zwwill7</text>\n            <div class=\"b-tlt\">\n                <image class=\"i-tag tag-e\" resize=\"contain\" src=\"http://yanxuan.nosdn.127.net/3dc6e876620bb84a5dac3deb6ecd4916.png\"></image>\n                <text class=\"i-tag tag-v8 iconfont\">&#xe6cc;</text>\n                <text class=\"txt-tag\">品质生活家</text>\n            </div>\n            <text class=\"b-qrcode iconfont\" >&#xe60e;</text>\n        </div>\n        <div class=\"s-box cell-button\">\n            <div class=\"box-tlt border-bottom\"><text class=\"box-txt\">我的订单</text><text class=\"i-box-in iconfont\">&#xe600;</text></div>\n            <div class=\"box-line\">\n                <div class=\"i-box-l\">\n                    <text class=\"i-box-icon iconfont\">&#xe673;</text>\n                    <text class=\"i-box-tlt\">待付款</text>\n                </div>\n                <div class=\"i-box-l\">\n                    <text class=\"i-box-icon iconfont\">&#xe675;</text>\n                    <text class=\"i-box-tlt\">待发货</text>\n                </div>\n                <div class=\"i-box-l\">\n                    <text class=\"i-box-icon iconfont\">&#xe671;</text>\n                    <text class=\"i-box-tlt\">已发货</text>\n                </div>\n                <div class=\"i-box-l\">\n                    <text class=\"i-box-icon iconfont\">&#xe672;</text>\n                    <text class=\"i-box-tlt\">待评价</text>\n                </div>\n                <div class=\"i-box-l\">\n                    <text class=\"i-box-icon iconfont\">&#xe6ac;</text>\n                    <text class=\"i-box-tlt\">退换/售后</text>\n                </div>\n            </div>\n        </div>\n        <div class=\"s-box\">\n            <div class=\"box-tlt border-bottom\"><text class=\"box-txt\">我的服务</text></div>\n            <div class=\"box-line line-serve border-bottom\" @click=\"jumpWeb('https://id.163.com/gj/m/')\">\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-orange\">&#xe658;</text><text class=\"i-box-tlt\">拼团订单</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-yellow\">&#xe61d;</text><text class=\"i-box-tlt\">邀请好友</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-orange\">&#xef12;</text><text class=\"i-box-tlt\">优惠券</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-yellow\">&#xe615;</text><text class=\"i-box-tlt\">优先购</text></div>\n            </div>\n            <div class=\"box-line line-serve border-bottom\" @click=\"jumpWeb('https://gj.reg.163.com/faq/')\">\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-orange\">&#xe67d;</text><text class=\"i-box-tlt\">礼品卡</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-yellow\">&#xe777;</text><text class=\"i-box-tlt\">会员</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-orange\">&#xe69d;</text><text class=\"i-box-tlt\">足迹</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-yellow\">&#xe64c;</text><text class=\"i-box-tlt\">收藏</text></div>\n            </div>\n            <div class=\"box-line line-serve\" @click=\"jumpWeb('http%3A%2F%2Fm.you.163.com%2Fhelp%23%2F%3F_k%3Dyn4ucc')\">\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-blue\">&#xe66a;</text><text class=\"i-box-tlt\">地址</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-blue\">&#xe60a;</text><text class=\"i-box-tlt\">客服</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-blue\">&#xe691;</text><text class=\"i-box-tlt\">帮助</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-blue\">&#xe68a;</text><text class=\"i-box-tlt\">设置</text></div>\n            </div>\n        </div>\n    </div>\n</template>\n<style scoped>\n\n    .iconfont {\n        font-family:iconfont;\n    }\n    .wrapper{\n        background-color: #f4f4f4;\n    }\n    .cell-button{\n        margin-bottom: 18px;\n    }\n    .header{\n        height: 280px;\n    }\n    .header-bg{\n        position: absolute;\n        top:0;\n        left: 0;\n        right: 0;\n        height: 280px;\n    }\n    .i-photo{\n        position: absolute;\n        top:90px;\n        left: 30px;\n        height: 130px;\n        width: 130px;\n        border-radius: 130px;\n    }\n    .i-name{\n        position: absolute;\n        top:110px;\n        left: 190px;\n        height: 50px;\n        width: 300px;\n        font-size: 38px;\n        color:#fff;\n    }\n    .b-tlt{\n        position: absolute;\n        top:170px;\n        left: 190px;\n        height: 40px;\n        width: 350px;\n        display: flex;\n        flex-direction: row;\n        flex-wrap: nowrap;\n    }\n    .i-tag{\n        width: 30px;\n        height: 30px;\n        font-size: 24px;\n        padding-top: 2px;\n        margin-right: 6px;\n        border-radius: 4px;\n    }\n    .tag-e{\n        width: 32px;\n        height: 32px;\n    }\n    .tag-v8{\n        color:#fff;\n        background-color: #b29e75;\n        text-align: center;\n    }\n    .txt-tag{\n        color:#b4a078;\n        flex: 1;\n        height: 40px;\n        font-size: 28px;\n        overflow: hidden;\n        lines:1;\n        text-overflow: ellipsis;\n    }\n    .b-qrcode{\n        position: absolute;\n        top:120px;\n        right: 40px;\n        height: 80px;\n        width: 80px;\n        border-radius: 70px;\n        text-align: center;\n        font-size: 40px;\n        padding-top: 18px;\n        color:#fff;\n        background-color: rgba(255,255,255,.3);\n    }\n    .s-box{\n        padding-left: 26px;\n        background-color: #fff;\n    }\n    .box-tlt{\n        height: 94px;\n    }\n    .box-txt{\n        font-size: 26px;\n        padding-top: 34px;\n        color:#333;\n    }\n    .i-box-in{\n        position: absolute;\n        top:34px;\n        right: 30px;\n        color:#333;\n    }\n    .box-line{\n        height: 132px;\n        display: flex;\n        padding-right: 30px;\n        flex-wrap: nowrap;\n        flex-direction: row;\n        justify-content: space-between;\n    }\n    .i-box-l{\n        width: 130px;\n        height: 132px;\n    }\n    .i-box-icon{\n        font-size: 50px;\n        text-align: center;\n        padding-top: 15px;\n        height:79px;\n        padding-bottom: 10px;\n        color:#666;\n    }\n    .i-box-tlt{\n        font-size: 26px;\n        text-align: center;\n        color:#666;\n    }\n    .line-serve{\n        padding-top: 20px;\n        height: 150px;\n    }\n    .border-bottom{\n        border-bottom-width: 1px;\n        border-bottom-color: rgba(0,0,0,.15) ;\n    }\n    .i-c-orange{\n        color:#ff744d;\n    }\n    .i-c-yellow{\n        color:#f6a121;\n    }\n    .i-c-blue{\n        color:#689de5;\n    }\n</style>\n\n<script>\n    var navigator = weex.requireModule('navigator');\n    export default {\n\n        data () {\n            return {\n            }\n        },\n\n        components: {\n        },\n        created(){\n\n//            meta.setViewport({\n//                width: 1750\n//            });\n        },\n        methods: {\n            jump: function () {\n                this.jump('/index');\n            }\n        }\n    }\n</script>"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "header",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": function($event) {
        _vm.jump()
      }
    }
  }, [_c('text', {
    staticClass: "i-name",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("zwwill7")]), _vm._v(" "), _c('div', {
    staticClass: "b-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('image', {
    staticClass: "i-tag tag-e",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "resize": "contain",
      "src": "http://yanxuan.nosdn.127.net/3dc6e876620bb84a5dac3deb6ecd4916.png"
    }
  }), _vm._v(" "), _c('text', {
    staticClass: "i-tag tag-v8 iconfont",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _vm._v(" "), _c('text', {
    staticClass: "txt-tag",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("品质生活家")])]), _vm._v(" "), _c('text', {
    staticClass: "b-qrcode iconfont",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")])]), _vm._v(" "), _c('div', {
    staticClass: "s-box cell-button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "box-tlt border-bottom",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "box-txt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("我的订单")]), _c('text', {
    staticClass: "i-box-in iconfont",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")])]), _vm._v(" "), _c('div', {
    staticClass: "box-line",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _vm._v(" "), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("待付款")])]), _vm._v(" "), _c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _vm._v(" "), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("待发货")])]), _vm._v(" "), _c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _vm._v(" "), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("已发货")])]), _vm._v(" "), _c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _vm._v(" "), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("待评价")])]), _vm._v(" "), _c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _vm._v(" "), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("退换/售后")])])])]), _vm._v(" "), _c('div', {
    staticClass: "s-box",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "box-tlt border-bottom",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "box-txt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("我的服务")])]), _vm._v(" "), _c('div', {
    staticClass: "box-line line-serve border-bottom",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": function($event) {
        _vm.jumpWeb('https://id.163.com/gj/m/')
      }
    }
  }, [_c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont i-c-orange",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("拼团订单")])]), _vm._v(" "), _c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont i-c-yellow",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("邀请好友")])]), _vm._v(" "), _c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont i-c-orange",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("优惠券")])]), _vm._v(" "), _c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont i-c-yellow",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("优先购")])])]), _vm._v(" "), _c('div', {
    staticClass: "box-line line-serve border-bottom",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": function($event) {
        _vm.jumpWeb('https://gj.reg.163.com/faq/')
      }
    }
  }, [_c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont i-c-orange",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("礼品卡")])]), _vm._v(" "), _c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont i-c-yellow",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("会员")])]), _vm._v(" "), _c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont i-c-orange",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("足迹")])]), _vm._v(" "), _c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont i-c-yellow",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("收藏")])])]), _vm._v(" "), _c('div', {
    staticClass: "box-line line-serve",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": function($event) {
        _vm.jumpWeb('http%3A%2F%2Fm.you.163.com%2Fhelp%23%2F%3F_k%3Dyn4ucc')
      }
    }
  }, [_c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont i-c-blue",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("地址")])]), _vm._v(" "), _c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont i-c-blue",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("客服")])]), _vm._v(" "), _c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont i-c-blue",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("帮助")])]), _vm._v(" "), _c('div', {
    staticClass: "i-box-l",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "i-box-icon iconfont i-c-blue",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("")]), _c('text', {
    staticClass: "i-box-tlt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("设置")])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1b256082", module.exports)
  }
}

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3f4d80a9", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1b256082\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./my.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1b256082\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./my.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })

/******/ });
//# sourceMappingURL=my.web.js.map