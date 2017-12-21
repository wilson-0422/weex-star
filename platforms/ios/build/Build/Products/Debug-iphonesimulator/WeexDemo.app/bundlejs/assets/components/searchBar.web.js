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
/******/ 	return __webpack_require__(__webpack_require__.s = 110);
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

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var App = __webpack_require__(16);
App.el = '#root';
new Vue(App);

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(45)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(22),
  /* template */
  __webpack_require__(38),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5fbe8ae4",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/src/assets/components/searchBar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] searchBar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5fbe8ae4", Component.options)
  } else {
    hotAPI.reload("data-v-5fbe8ae4", Component.options)
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

/***/ 22:
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

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.wxc-search-bar[data-v-5fbe8ae4] {\n    padding-left: 20px;\n    padding-right: 20px;\n    background-color: #FC345C;\n    width: 750px;\n    height: 84px;\n    flex-direction: row;\n}\n.search-bar-input[data-v-5fbe8ae4] {\n    position: absolute;\n    top: 10px;\n    padding-top: 0;\n    padding-bottom: 0;\n    padding-right: 40px;\n    padding-left: 60px;\n    font-size: 26px;\n    width: 624px;\n    height: 64px;\n    line-height: 64px;\n    background-color: #ffffff;\n    placeholder-color: #666666;\n    outline: none;\n    border-radius: 200px;\n}\n.search-bar-ICON[data-v-5fbe8ae4] {\n    position: absolute;\n    width: 30px;\n    height: 30px;\n    left: 34px;\n    top: 28px;\n}\n.search-bar-close[data-v-5fbe8ae4] {\n    position: absolute;\n    width: 30px;\n    height: 30px;\n    right: 120px;\n    top: 28px;\n}\n.search-bar-button[data-v-5fbe8ae4] {\n    width: 94px;\n    height: 36px;\n    font-size: 30px;\n    text-align: center;\n    background-color: #FC345C;\n    margin-top: 16px;\n    margin-right: 0;\n    color: #ffffff;\n    position: absolute;\n    right: 8px;\n    top: 9px;\n}\n.input-has-dep[data-v-5fbe8ae4] {\n    padding-left: 240px;\n    width: 710px;\n}\n.bar-dep[data-v-5fbe8ae4] {\n    width: 170px;\n    padding-right: 12px;\n    padding-left: 12px;\n    height: 42px;\n    align-items: center;\n    flex-direction: row;\n    position: absolute;\n    left: 24px;\n    top: 22px;\n    border-right-style: solid;\n    border-right-width: 1px;\n    border-right-color: #C7C7C7;\n}\n.dep-text[data-v-5fbe8ae4] {\n    flex: 1;\n    text-align: center;\n    font-size: 26px;\n    color: #666666;\n    margin-right: 6px;\n    lines: 1;\n    text-overflow: ellipsis;\n}\n.dep-arrow[data-v-5fbe8ae4] {\n    width: 24px;\n    height: 24px;\n}\n.ICON-has-dep[data-v-5fbe8ae4] {\n    left: 214px;\n}\n.disabled-input[data-v-5fbe8ae4] {\n    width: 750px;\n    height: 64px;\n    position: absolute;\n    left: 0;\n    background-color: transparent;\n}\n.has-dep-disabled[data-v-5fbe8ae4] {\n    width: 550px;\n    left: 200px;\n}\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/src/assets/components/searchBar.vue?c9264a00"],"names":[],"mappings":";AAkEA;IACA,mBAAA;IACA,oBAAA;IACA,0BAAA;IACA,aAAA;IACA,aAAA;IACA,oBAAA;CACA;AAEA;IACA,mBAAA;IACA,UAAA;IACA,eAAA;IACA,kBAAA;IACA,oBAAA;IACA,mBAAA;IACA,gBAAA;IACA,aAAA;IACA,aAAA;IACA,kBAAA;IACA,0BAAA;IACA,2BAAA;IACA,cAAA;IACA,qBAAA;CACA;AAEA;IACA,mBAAA;IACA,YAAA;IACA,aAAA;IACA,WAAA;IACA,UAAA;CACA;AAEA;IACA,mBAAA;IACA,YAAA;IACA,aAAA;IACA,aAAA;IACA,UAAA;CACA;AAEA;IACA,YAAA;IACA,aAAA;IACA,gBAAA;IACA,mBAAA;IACA,0BAAA;IACA,iBAAA;IACA,gBAAA;IACA,eAAA;IACA,mBAAA;IACA,WAAA;IACA,SAAA;CACA;AAEA;IACA,oBAAA;IACA,aAAA;CACA;AAEA;IACA,aAAA;IACA,oBAAA;IACA,mBAAA;IACA,aAAA;IACA,oBAAA;IACA,oBAAA;IACA,mBAAA;IACA,WAAA;IACA,UAAA;IACA,0BAAA;IACA,wBAAA;IACA,4BAAA;CACA;AAEA;IACA,QAAA;IACA,mBAAA;IACA,gBAAA;IACA,eAAA;IACA,kBAAA;IACA,SAAA;IACA,wBAAA;CACA;AAEA;IACA,YAAA;IACA,aAAA;CACA;AAEA;IACA,YAAA;CACA;AAEA;IACA,aAAA;IACA,aAAA;IACA,mBAAA;IACA,QAAA;IACA,8BAAA;CACA;AAEA;IACA,aAAA;IACA,YAAA;CACA","file":"searchBar.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A sSearch bar for city Search-->\n\n<template>\n    <div>\n        <div class=\"wxc-search-bar\"\n             >\n            <input @blur=\"onBlur\"\n                   @focus=\"onFocus\"\n                   @input=\"onInput\"\n                   @return=\"onSubmit\"\n                   :autofocus=\"autofocus\"\n                   :disabled=\"disabled\"\n                   :value=\"value\"\n                   ref=\"search-input\"\n                   :type=\"inputType\"\n                   :placeholder=\"placeholder\"\n                   :style=\"{ width: needShowCancel ? '624px' : '710px' }\"\n                   class=\"search-bar-input\"/>\n            <div v-if=\"disabled\"\n                 @click=\"inputDisabledClicked\"\n                 class=\"disabled-input\"></div>\n            <image class=\"search-bar-ICON\"\n                   :aria-hidden=\"true\"\n                   :src=\"inputIcon\"></image>\n            <image class=\"search-bar-close\"\n                   v-if=\"showClose\"\n                   :aria-hidden=\"true\"\n                   @click=\"closeClicked\"\n                   :src=\"closeIcon\"></image>\n            <text class=\"search-bar-button\"\n                  v-if=\"needShowCancel\"\n                  @click=\"cancelClicked\">取消 </text>\n        </div>\n        <!--<div class=\"wxc-search-bar\"-->\n        <!--v-if=\"mod==='hasDep'\">-->\n        <!--<input @blur=\"onBlur\"-->\n        <!--@focus=\"onFocus\"-->\n        <!--@input=\"onInput\"-->\n        <!--@return=\"onSubmit\"-->\n        <!--:disabled=\"disabled\"-->\n        <!--:autofocus=\"autofocus\"-->\n        <!--:value=\"value\"-->\n        <!--:type=\"inputType\"-->\n        <!--:placeholder=\"placeholder\"-->\n        <!--:class=\"search-bar-input input-has-dep\"/>-->\n        <!--<div v-if=\"disabled\"-->\n        <!--@click=\"inputDisabledClicked\"-->\n        <!--class=\"disabled-input has-dep-disabled\"></div>-->\n        <!--<div :class=\"bar-dep\"-->\n        <!--@click=\"depClicked\">-->\n        <!--<text class=\"dep-text\">{{depName}}</text>-->\n        <!--<image :src=\"arrowIcon\"-->\n        <!--:aria-hidden=\"true\"-->\n        <!--class=\"dep-arrow\"></image>-->\n        <!--</div>-->\n        <!--<image class=\"search-bar-ICON ICON-has-dep\"-->\n        <!--:aria-hidden=\"true\"-->\n        <!--:src=\"inputIcon\"></image>-->\n        <!--</div>\n       -->\n    </div>\n</template>\n\n<style scoped>\n    .wxc-search-bar {\n        padding-left: 20px;\n        padding-right: 20px;\n        background-color: #FC345C;\n        width: 750px;\n        height: 84px;\n        flex-direction: row;\n    }\n\n    .search-bar-input {\n        position: absolute;\n        top: 10px;\n        padding-top: 0;\n        padding-bottom: 0;\n        padding-right: 40px;\n        padding-left: 60px;\n        font-size: 26px;\n        width: 624px;\n        height: 64px;\n        line-height: 64px;\n        background-color: #ffffff;\n        placeholder-color: #666666;\n        outline: none;\n        border-radius: 200px;\n    }\n\n    .search-bar-ICON {\n        position: absolute;\n        width: 30px;\n        height: 30px;\n        left: 34px;\n        top: 28px;\n    }\n\n    .search-bar-close {\n        position: absolute;\n        width: 30px;\n        height: 30px;\n        right: 120px;\n        top: 28px;\n    }\n\n    .search-bar-button {\n        width: 94px;\n        height: 36px;\n        font-size: 30px;\n        text-align: center;\n        background-color: #FC345C;\n        margin-top: 16px;\n        margin-right: 0;\n        color: #ffffff;\n        position: absolute;\n        right: 8px;\n        top: 9px;\n    }\n\n    .input-has-dep {\n        padding-left: 240px;\n        width: 710px;\n    }\n\n    .bar-dep {\n        width: 170px;\n        padding-right: 12px;\n        padding-left: 12px;\n        height: 42px;\n        align-items: center;\n        flex-direction: row;\n        position: absolute;\n        left: 24px;\n        top: 22px;\n        border-right-style: solid;\n        border-right-width: 1px;\n        border-right-color: #C7C7C7;\n    }\n\n    .dep-text {\n        flex: 1;\n        text-align: center;\n        font-size: 26px;\n        color: #666666;\n        margin-right: 6px;\n        lines: 1;\n        text-overflow: ellipsis;\n    }\n\n    .dep-arrow {\n        width: 24px;\n        height: 24px;\n    }\n\n    .ICON-has-dep {\n        left: 214px;\n    }\n\n    .disabled-input {\n        width: 750px;\n        height: 64px;\n        position: absolute;\n        left: 0;\n        background-color: transparent;\n    }\n\n    .has-dep-disabled {\n        width: 550px;\n        left: 200px;\n    }\n</style>\n\n<script>\n    const INPUT_ICON = \"https://gw.alicdn.com/tfs/TB1FZB.pwMPMeJjy1XdXXasrXXa-30-30.png\";\n    const CLOSE_ICON = \"https://gw.alicdn.com/tfs/TB1sZB.pwMPMeJjy1XdXXasrXXa-24-24.png\";\n    const ARROW_ICON = \"https://gw.alicdn.com/tfs/TB1vZB.pwMPMeJjy1XdXXasrXXa-24-24.png\";\n\n    export default {\n        props: {\n            disabled: {\n                type: Boolean,\n                default: false\n            },\n            alwaysShowCancel: {\n                type: Boolean,\n                default: false\n            },\n            inputType: {\n                type: String,\n                default: 'text'\n            },\n            mod: {\n                type: String,\n                default: 'default'\n            },\n            autofocus: {\n                type: Boolean,\n                default: false\n            },\n            theme: {\n                type: String,\n                default: 'gray'\n            },\n            defaultValue: {\n                type: String,\n                default: ''\n            },\n            placeholder: {\n                type: String,\n                default: '搜索'\n            },\n            depName: {\n                type: String,\n                default: '杭州'\n            }\n        },\n        computed: {\n            needShowCancel () {\n                return this.alwaysShowCancel || this.showCancel;\n            }\n        },\n        data: () => ({\n            inputIcon: INPUT_ICON,\n            closeIcon: CLOSE_ICON,\n            arrowIcon: ARROW_ICON,\n            showCancel: false,\n            showClose: false,\n            value: ''\n        }),\n        created () {\n            this.defaultValue && (this.value = this.defaultValue);\n            if (this.disabled) {\n                this.showCancel = false;\n                this.showClose = false;\n            }\n        },\n        methods: {\n            onBlur () {\n                const self = this;\n                setTimeout(() => {\n                    self.showCancel = false;\n                    self.detectShowClose();\n                    self.$emit('wxcSearchbarInputOnBlur', { value: self.value });\n                }, 10);\n            },\n            autoBlur () {\n                this.$refs['search-input'].blur();\n            },\n            onFocus () {\n                this.showCancel = true;\n                this.detectShowClose();\n                this.$emit('wxcSearchbarInputOnFocus', { value: this.value });\n            },\n            closeClicked () {\n                this.value = '';\n                this.showCancel && (this.showCancel = false);\n                this.showClose && (this.showClose = false);\n                this.$emit('wxcSearchbarCloseClicked', { value: this.value });\n                this.$emit('wxcSearchbarInputOnInput', { value: this.value });\n            },\n            onInput (e) {\n                this.value = e.value;\n                this.showCancel = true;\n                this.detectShowClose();\n                this.$emit('wxcSearchbarInputOnInput', { value: this.value });\n            },\n            onSubmit (e) {\n                this.onBlur();\n                this.value = e.value;\n                this.showCancel = true;\n                this.detectShowClose();\n                this.$emit('wxcSearchbarInputReturned', { value: this.value });\n            },\n            cancelClicked () {\n                this.showCancel && (this.showCancel = false);\n                this.showClose && (this.showClose = false);\n                this.onFocus();\n                this.$emit('wxcSearchbarCancelClicked', { value: this.value });\n            },\n            detectShowClose () {\n                this.showClose = (this.value.length > 0) && this.showCancel;\n            },\n            depClicked () {\n                this.$emit('wxcSearchbarDepChooseClicked', {});\n            },\n            inputDisabledClicked () {\n                this.$emit('wxcSearchbarInputDisabledClicked', {});\n            },\n            setValue (value) {\n                this.value = value;\n            }\n        }\n    };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "wxc-search-bar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('input', {
    ref: "search-input",
    staticClass: "search-bar-input",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      width: _vm.needShowCancel ? '624px' : '710px'
    })),
    attrs: {
      "autofocus": _vm.autofocus,
      "disabled": _vm.disabled,
      "type": _vm.inputType,
      "placeholder": _vm.placeholder
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "blur": _vm.onBlur,
      "focus": _vm.onFocus,
      "input": _vm.onInput,
      "return": _vm.onSubmit
    }
  }), _vm._v(" "), (_vm.disabled) ? _c('div', {
    staticClass: "disabled-input",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.inputDisabledClicked
    }
  }) : _vm._e(), _vm._v(" "), _c('image', {
    staticClass: "search-bar-ICON",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "aria-hidden": true,
      "src": _vm.inputIcon
    }
  }), _vm._v(" "), (_vm.showClose) ? _c('image', {
    staticClass: "search-bar-close",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "aria-hidden": true,
      "src": _vm.closeIcon
    },
    on: {
      "click": _vm.closeClicked
    }
  }) : _vm._e(), _vm._v(" "), (_vm.needShowCancel) ? _c('text', {
    staticClass: "search-bar-button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.cancelClicked
    }
  }, [_vm._v("取消 ")]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5fbe8ae4", module.exports)
  }
}

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3bfefe50", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5fbe8ae4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./searchBar.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5fbe8ae4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./searchBar.vue");
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
//# sourceMappingURL=searchBar.web.js.map