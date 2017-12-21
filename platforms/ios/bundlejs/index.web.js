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
/******/ 	return __webpack_require__(__webpack_require__.s = 121);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pageRouter = __webpack_require__(67);

var event = weex.requireModule('event');

function push(url) {

    url = getURL(url);

    var navigator = weex.requireModule('navigator');

    var platform = getOs();

    if (platform == 'web') {
        url = '?page=./dist' + url;
    }

    if (navigator) {
        navigator.push({
            'url': url,
            'animated': 'true'
        }, function () {
            console.log('skip complete');
        });
    }
}
function getURL(url) {

    var platform = getOs();

    var bundleUrl = weex.config.bundleUrl;

    var mainUrl = (0, _pageRouter.pageRouter)(url).split('src')[1];

    mainUrl = mainUrl.split('.')[0];

    var full_url = '';

    if (bundleUrl.lastIndexOf('file://') != -1) {

        if (platform == 'ios') {

            bundleUrl = bundleUrl.substr(0, bundleUrl.lastIndexOf('bundlejs'));

            full_url = bundleUrl + 'bundlejs' + mainUrl + '.js';
        } else if (platform == 'android') {

            bundleUrl = bundleUrl.substr(0, bundleUrl.lastIndexOf('dist'));

            full_url = bundleUrl + 'dist' + mainUrl + '.js';
        } else {}
    } else {

        if (platform == 'web') {

            full_url = mainUrl + '.js';
        } else {

            bundleUrl = bundleUrl.substr(0, bundleUrl.lastIndexOf('dist'));

            full_url = bundleUrl + 'dist' + mainUrl + '.js';
        }
    }

    return full_url;
}

function getOs() {

    var platform = weex.config.env ? weex.config.env.platform : weex.config.platform;

    return platform.toLowerCase();
}
exports.default = {
    push: push,
    getURL: getURL,
    getOs: getOs
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(34);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _qs = __webpack_require__(77);

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = weex.requireModule('storage');
var stream = weex.requireModule('stream');
var modal = weex.requireModule('modal');

var _URL_API = 'https://api.udian.me/';
var _token = 'c92114bcc9e4454f1d2b7399dc9d62a9';
var _time = 1480576266;

function postAjax(_url, _postData, successBack, errorBack) {

    var header = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    _postData.authToken = storageGet('udotAuthToken') ? storageGet('udotAuthToken') : '';

    _postData.time = _time;

    _postData.token = _token;

    var shop = storageGet('seller') ? storageGet('seller') : '';

    console.log(shop);

    _postData.shop_id = shop ? shop._id : 0;

    stream.fetch({
        method: 'POST',
        headers: header,
        url: _URL_API + _url,
        body: _qs2.default.stringify(_postData)
    }, function (_ref) {
        var data = _ref.data;

        data = JSON.parse(data);
        if (data.status == 1) {
            successBack(data);
        } else if (errorBack) {
            errorBack(data);
        } else {
            modal.toast({
                message: data.msg,
                duration: 1
            });
        }
    });
}

function storageGet(name, callback) {
    storage.getItem(name, function (event) {
        if (event.result == "success") {
            callback(event.data);
        } else {
            callback(null);
        }
    });
}

function storageSet(name, object) {
    object = JSON.stringify(object);
    var getData = storage.setItem(name, object);
}
exports.default = {
    postAjax: postAjax,
    storageGet: storageGet,
    storageSet: storageSet
};

/***/ }),
/* 6 */
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(48)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(26),
  /* template */
  __webpack_require__(41),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-81e9b628",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/src/assets/views/tabItems/user.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] user.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-81e9b628", Component.options)
  } else {
    hotAPI.reload("data-v-81e9b628", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(97)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(59),
  /* template */
  __webpack_require__(88),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-39fec007",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/src/assets/views/tabItems/checkOrder.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] checkOrder.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-39fec007", Component.options)
  } else {
    hotAPI.reload("data-v-39fec007", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(96)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(60),
  /* template */
  __webpack_require__(86),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0d340006",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/src/assets/views/tabItems/order.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] order.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0d340006", Component.options)
  } else {
    hotAPI.reload("data-v-0d340006", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(101)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(61),
  /* template */
  __webpack_require__(92),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8b4ef2d2",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/src/assets/views/tabItems/shop.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] shop.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8b4ef2d2", Component.options)
  } else {
    hotAPI.reload("data-v-8b4ef2d2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                                * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
                                                                                                                                                                                                                                                                                * Created by Tw93 on 17/11/01
                                                                                                                                                                                                                                                                                */

var _urlParse = __webpack_require__(81);

var _urlParse2 = _interopRequireDefault(_urlParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Utils = {
  UrlParser: _urlParse2.default,
  _typeof: function _typeof(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  },
  isPlainObject: function isPlainObject(obj) {
    return Utils._typeof(obj) === 'object';
  },
  isString: function isString(obj) {
    return typeof obj === 'string';
  },
  isNonEmptyArray: function isNonEmptyArray() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
  },
  isObject: function isObject(item) {
    return item && (typeof item === 'undefined' ? 'undefined' : _typeof2(item)) === 'object' && !Array.isArray(item);
  },
  isEmptyObject: function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  },
  mergeDeep: function mergeDeep(target) {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    if (!sources.length) return target;
    var source = sources.shift();
    if (Utils.isObject(target) && Utils.isObject(source)) {
      for (var key in source) {
        if (Utils.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, _defineProperty({}, key, {}));
          }
          Utils.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, _defineProperty({}, key, source[key]));
        }
      }
    }
    return Utils.mergeDeep.apply(Utils, [target].concat(sources));
  },
  appendProtocol: function appendProtocol(url) {
    if (/^\/\//.test(url)) {
      var bundleUrl = weex.config.bundleUrl;

      return 'http' + (/^https:/.test(bundleUrl) ? 's' : '') + ':' + url;
    }
    return url;
  },
  encodeURLParams: function encodeURLParams(url) {
    var parsedUrl = new _urlParse2.default(url, true);
    return parsedUrl.toString();
  },
  goToH5Page: function goToH5Page(jumpUrl) {
    var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var Navigator = weex.requireModule('navigator');
    var jumpUrlObj = new Utils.UrlParser(jumpUrl, true);
    var url = Utils.appendProtocol(jumpUrlObj.toString());
    Navigator.push({
      url: Utils.encodeURLParams(url),
      animated: animated
    }, callback);
  },

  env: {
    isTaobao: function isTaobao() {
      var appName = weex.config.env.appName;

      return (/(tb|taobao|淘宝)/i.test(appName)
      );
    },
    isTrip: function isTrip() {
      var appName = weex.config.env.appName;

      return appName === 'LX';
    },
    isWeb: function isWeb() {
      var platform = weex.config.env.platform;

      return (typeof window === 'undefined' ? 'undefined' : _typeof2(window)) === 'object' && platform.toLowerCase() === 'web';
    },
    isIOS: function isIOS() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'ios';
    },

    /**
     * 是否为 iPhone X
     * @returns {boolean}
     */
    isIPhoneX: function isIPhoneX() {
      var deviceHeight = weex.config.env.deviceHeight;

      if (Utils.env.isWeb()) {
        return (typeof window === 'undefined' ? 'undefined' : _typeof2(window)) !== undefined && window.screen && window.screen.width && window.screen.height && parseInt(window.screen.width, 10) === 375 && parseInt(window.screen.height, 10) === 812;
      }
      return Utils.env.isIOS() && deviceHeight === 2436;
    },
    isAndroid: function isAndroid() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'android';
    },
    isAlipay: function isAlipay() {
      var appName = weex.config.env.appName;

      return appName === 'AP';
    },
    isAlipayWeb: function isAlipayWeb() {
      return Utils.env.isAlipay() && Utils.env.isWeb();
    },
    supportsEB: function supportsEB() {
      var weexVersion = weex.config.env.weexVersion || '0';
      var isHighWeex = Utils.compareVersion(weexVersion, '0.10.1.4') && (Utils.env.isIOS() || Utils.env.isAndroid());
      var expressionBinding = weex.requireModule('expressionBinding');
      return expressionBinding && expressionBinding.enableBinding && isHighWeex;
    },


    /**
     * 判断Android容器是否支持是否支持expressionBinding(处理方式很不一致)
     * @returns {boolean}
     */
    supportsEBForAndroid: function supportsEBForAndroid() {
      return Utils.env.isAndroid() && Utils.env.supportsEB();
    },


    /**
     * 判断IOS容器是否支持是否支持expressionBinding
     * @returns {boolean}
     */
    supportsEBForIos: function supportsEBForIos() {
      return Utils.env.isIOS() && Utils.env.supportsEB();
    },


    /**
     * 获取weex屏幕真实的设置高度，需要减去导航栏高度
     * @returns {Number}
     */
    getPageHeight: function getPageHeight() {
      var env = weex.config.env;

      var navHeight = Utils.env.isWeb() ? 0 : Utils.env.isIPhoneX() ? 176 : 132;
      return env.deviceHeight / env.deviceWidth * 750 - navHeight;
    }
  },

  /**
   * 版本号比较
   * @memberOf Utils
   * @param currVer {string}
   * @param promoteVer {string}
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wx-bridge');
   * const { compareVersion } = Utils;
   * console.log(compareVersion('0.1.100', '0.1.11')); // 'true'
   */
  compareVersion: function compareVersion() {
    var currVer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0.0.0';
    var promoteVer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0.0.0';

    if (currVer === promoteVer) return true;
    var currVerArr = currVer.split('.');
    var promoteVerArr = promoteVer.split('.');
    var len = Math.max(currVerArr.length, promoteVerArr.length);
    for (var i = 0; i < len; i++) {
      var proVal = ~~promoteVerArr[i];
      var curVal = ~~currVerArr[i];
      if (proVal < curVal) {
        return true;
      } else if (proVal > curVal) {
        return false;
      }
    }
    return false;
  },

  /**
   * 分割数组
   * @param arr 被分割数组
   * @param size 分割数组的长度
   * @returns {Array}
   */
  arrayChunk: function arrayChunk() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

    var groups = [];
    if (arr && arr.length > 0) {
      groups = arr.map(function (e, i) {
        return i % size === 0 ? arr.slice(i, i + size) : null;
      }).filter(function (e) {
        return e;
      });
    }
    return groups;
  },
  truncateString: function truncateString(str, len) {
    var hasDot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var newLength = 0;
    var newStr = '';
    var singleChar = '';
    var chineseRegex = /[^\x00-\xff]/g;
    var strLength = str.replace(chineseRegex, '**').length;
    for (var i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) !== null) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if (hasDot && strLength > len) {
      newStr += '...';
    }
    return newStr;
  }
};

exports.default = Utils;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(84);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

exports.arrayToObject = function (source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function (target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function (str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D    // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

exports.compact = function (obj, references) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    var refs = references || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i] && typeof obj[i] === 'object') {
                compacted.push(exports.compact(obj[i], refs));
            } else if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    keys.forEach(function (key) {
        obj[key] = exports.compact(obj[key], refs);
    });

    return obj;
};

exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function (obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(44)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(21),
  /* template */
  __webpack_require__(37),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-50247bcc",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/src/assets/components/orderItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] orderItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50247bcc", Component.options)
  } else {
    hotAPI.reload("data-v-50247bcc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(47)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(23),
  /* template */
  __webpack_require__(40),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7963f737",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/src/assets/components/tabTop.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] tabTop.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7963f737", Component.options)
  } else {
    hotAPI.reload("data-v-7963f737", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(43)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(24),
  /* template */
  __webpack_require__(36),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-31a48b81",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/src/assets/components/tabitem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] tabitem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-31a48b81", Component.options)
  } else {
    hotAPI.reload("data-v-31a48b81", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 19 */
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
/* 20 */
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

var Navigator = weex.requireModule('navigator');
exports.default = {
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
  methods: {
    leftButtonClicked: function leftButtonClicked() {
      var self = this;
      if (self.useDefaultReturn) {
        Navigator.pop({}, function (e) {});
      }
      self.$emit('wxcMinibarLeftButtonClicked', {});
    },
    rightButtonClicked: function rightButtonClicked() {
      var self = this;
      if (self.rightText || self.rightButton) {
        self.$emit('wxcMinibarRightButtonClicked', {});
      }
    }
  }
};

/***/ }),
/* 21 */
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

exports.default = {
    props: {
        orderInfo: { default: {} }
    },
    data: function data() {
        return {};
    },

    methods: {}
};

/***/ }),
/* 22 */
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
/* 23 */
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
/* 24 */
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

exports.default = {
    props: {
        index: { default: 0 },
        title: { default: '' },
        titleColor: { default: '#000000' },
        icon: { default: '' },
        backgroundColor: { default: '#ffffff' }
    },
    methods: {
        onclickitem: function onclickitem(e) {
            var params = {
                index: this.index
            };
            this.$emit('tabItemOnClick', params);
        }
    }
};

/***/ }),
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wxcMinibar = __webpack_require__(4);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'user',
    components: { WxcMinibar: _wxcMinibar2.default },
    data: function data() {
        return {
            msg: 'user！'
        };
    },

    created: function created() {
        console.log(this.$route);
    },
    methods: {
        minibarLeftButtonClick: function minibarLeftButtonClick() {},
        minibarRightButtonClick: function minibarRightButtonClick() {}
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.iconfont[data-v-1b256082] {\n    font-family:iconfont;\n}\n.wrapper[data-v-1b256082]{\n    background-color: #f4f4f4;\n}\n.cell-button[data-v-1b256082]{\n    margin-bottom: 18px;\n}\n.header[data-v-1b256082]{\n    height: 280px;\n}\n.header-bg[data-v-1b256082]{\n    position: absolute;\n    top:0;\n    left: 0;\n    right: 0;\n    height: 280px;\n}\n.i-photo[data-v-1b256082]{\n    position: absolute;\n    top:90px;\n    left: 30px;\n    height: 130px;\n    width: 130px;\n    border-radius: 130px;\n}\n.i-name[data-v-1b256082]{\n    position: absolute;\n    top:110px;\n    left: 190px;\n    height: 50px;\n    width: 300px;\n    font-size: 38px;\n    color:#fff;\n}\n.b-tlt[data-v-1b256082]{\n    position: absolute;\n    top:170px;\n    left: 190px;\n    height: 40px;\n    width: 350px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n}\n.i-tag[data-v-1b256082]{\n    width: 30px;\n    height: 30px;\n    font-size: 24px;\n    padding-top: 2px;\n    margin-right: 6px;\n    border-radius: 4px;\n}\n.tag-e[data-v-1b256082]{\n    width: 32px;\n    height: 32px;\n}\n.tag-v8[data-v-1b256082]{\n    color:#fff;\n    background-color: #b29e75;\n    text-align: center;\n}\n.txt-tag[data-v-1b256082]{\n    color:#b4a078;\n    flex: 1;\n    height: 40px;\n    font-size: 28px;\n    overflow: hidden;\n    lines:1;\n    text-overflow: ellipsis;\n}\n.b-qrcode[data-v-1b256082]{\n    position: absolute;\n    top:120px;\n    right: 40px;\n    height: 80px;\n    width: 80px;\n    border-radius: 70px;\n    text-align: center;\n    font-size: 40px;\n    padding-top: 18px;\n    color:#fff;\n    background-color: rgba(255,255,255,.3);\n}\n.s-box[data-v-1b256082]{\n    padding-left: 26px;\n    background-color: #fff;\n}\n.box-tlt[data-v-1b256082]{\n    height: 94px;\n}\n.box-txt[data-v-1b256082]{\n    font-size: 26px;\n    padding-top: 34px;\n    color:#333;\n}\n.i-box-in[data-v-1b256082]{\n    position: absolute;\n    top:34px;\n    right: 30px;\n    color:#333;\n}\n.box-line[data-v-1b256082]{\n    height: 132px;\n    display: flex;\n    padding-right: 30px;\n    flex-wrap: nowrap;\n    flex-direction: row;\n    justify-content: space-between;\n}\n.i-box-l[data-v-1b256082]{\n    width: 130px;\n    height: 132px;\n}\n.i-box-icon[data-v-1b256082]{\n    font-size: 50px;\n    text-align: center;\n    padding-top: 15px;\n    height:79px;\n    padding-bottom: 10px;\n    color:#666;\n}\n.i-box-tlt[data-v-1b256082]{\n    font-size: 26px;\n    text-align: center;\n    color:#666;\n}\n.line-serve[data-v-1b256082]{\n    padding-top: 20px;\n    height: 150px;\n}\n.border-bottom[data-v-1b256082]{\n    border-bottom-width: 1px;\n    border-bottom-color: rgba(0,0,0,.15) ;\n}\n.i-c-orange[data-v-1b256082]{\n    color:#ff744d;\n}\n.i-c-yellow[data-v-1b256082]{\n    color:#f6a121;\n}\n.i-c-blue[data-v-1b256082]{\n    color:#689de5;\n}\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/src/assets/views/my.vue?69e7df82"],"names":[],"mappings":";AA+DA;IACA,qBAAA;CACA;AACA;IACA,0BAAA;CACA;AACA;IACA,oBAAA;CACA;AACA;IACA,cAAA;CACA;AACA;IACA,mBAAA;IACA,MAAA;IACA,QAAA;IACA,SAAA;IACA,cAAA;CACA;AACA;IACA,mBAAA;IACA,SAAA;IACA,WAAA;IACA,cAAA;IACA,aAAA;IACA,qBAAA;CACA;AACA;IACA,mBAAA;IACA,UAAA;IACA,YAAA;IACA,aAAA;IACA,aAAA;IACA,gBAAA;IACA,WAAA;CACA;AACA;IACA,mBAAA;IACA,UAAA;IACA,YAAA;IACA,aAAA;IACA,aAAA;IACA,cAAA;IACA,oBAAA;IACA,kBAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;IACA,gBAAA;IACA,iBAAA;IACA,kBAAA;IACA,mBAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;CACA;AACA;IACA,WAAA;IACA,0BAAA;IACA,mBAAA;CACA;AACA;IACA,cAAA;IACA,QAAA;IACA,aAAA;IACA,gBAAA;IACA,iBAAA;IACA,QAAA;IACA,wBAAA;CACA;AACA;IACA,mBAAA;IACA,UAAA;IACA,YAAA;IACA,aAAA;IACA,YAAA;IACA,oBAAA;IACA,mBAAA;IACA,gBAAA;IACA,kBAAA;IACA,WAAA;IACA,uCAAA;CACA;AACA;IACA,mBAAA;IACA,uBAAA;CACA;AACA;IACA,aAAA;CACA;AACA;IACA,gBAAA;IACA,kBAAA;IACA,WAAA;CACA;AACA;IACA,mBAAA;IACA,SAAA;IACA,YAAA;IACA,WAAA;CACA;AACA;IACA,cAAA;IACA,cAAA;IACA,oBAAA;IACA,kBAAA;IACA,oBAAA;IACA,+BAAA;CACA;AACA;IACA,aAAA;IACA,cAAA;CACA;AACA;IACA,gBAAA;IACA,mBAAA;IACA,kBAAA;IACA,YAAA;IACA,qBAAA;IACA,WAAA;CACA;AACA;IACA,gBAAA;IACA,mBAAA;IACA,WAAA;CACA;AACA;IACA,kBAAA;IACA,cAAA;CACA;AACA;IACA,yBAAA;IACA,sCAAA;CACA;AACA;IACA,cAAA;CACA;AACA;IACA,cAAA;CACA;AACA;IACA,cAAA;CACA","file":"my.vue","sourcesContent":["<template>\n    <div class=\"wrapper\">\n        <div class=\"header\"  @click=\"jump()\">\n            <!--<image class=\"header-bg\" resize=\"cover\" src=\"http://yanxuan.nosdn.127.net/6ae93353e95b3450a2710bb43f925a63.jpg\"></image>-->\n            <!--<image class=\"i-photo\" resize=\"cover\" src=\"http://yanxuan.nosdn.127.net/885e3901d0a3501362530435d76bebb3.jpg\"></image>-->\n            <text class=\"i-name\">zwwill7</text>\n            <div class=\"b-tlt\">\n                <image class=\"i-tag tag-e\" resize=\"contain\" src=\"http://yanxuan.nosdn.127.net/3dc6e876620bb84a5dac3deb6ecd4916.png\"></image>\n                <text class=\"i-tag tag-v8 iconfont\">&#xe6cc;</text>\n                <text class=\"txt-tag\">品质生活家</text>\n            </div>\n            <text class=\"b-qrcode iconfont\" >&#xe60e;</text>\n        </div>\n        <div class=\"s-box cell-button\">\n            <div class=\"box-tlt border-bottom\"><text class=\"box-txt\">我的订单</text><text class=\"i-box-in iconfont\">&#xe600;</text></div>\n            <div class=\"box-line\">\n                <div class=\"i-box-l\">\n                    <text class=\"i-box-icon iconfont\">&#xe673;</text>\n                    <text class=\"i-box-tlt\">待付款</text>\n                </div>\n                <div class=\"i-box-l\">\n                    <text class=\"i-box-icon iconfont\">&#xe675;</text>\n                    <text class=\"i-box-tlt\">待发货</text>\n                </div>\n                <div class=\"i-box-l\">\n                    <text class=\"i-box-icon iconfont\">&#xe671;</text>\n                    <text class=\"i-box-tlt\">已发货</text>\n                </div>\n                <div class=\"i-box-l\">\n                    <text class=\"i-box-icon iconfont\">&#xe672;</text>\n                    <text class=\"i-box-tlt\">待评价</text>\n                </div>\n                <div class=\"i-box-l\">\n                    <text class=\"i-box-icon iconfont\">&#xe6ac;</text>\n                    <text class=\"i-box-tlt\">退换/售后</text>\n                </div>\n            </div>\n        </div>\n        <div class=\"s-box\">\n            <div class=\"box-tlt border-bottom\"><text class=\"box-txt\">我的服务</text></div>\n            <div class=\"box-line line-serve border-bottom\" @click=\"jumpWeb('https://id.163.com/gj/m/')\">\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-orange\">&#xe658;</text><text class=\"i-box-tlt\">拼团订单</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-yellow\">&#xe61d;</text><text class=\"i-box-tlt\">邀请好友</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-orange\">&#xef12;</text><text class=\"i-box-tlt\">优惠券</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-yellow\">&#xe615;</text><text class=\"i-box-tlt\">优先购</text></div>\n            </div>\n            <div class=\"box-line line-serve border-bottom\" @click=\"jumpWeb('https://gj.reg.163.com/faq/')\">\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-orange\">&#xe67d;</text><text class=\"i-box-tlt\">礼品卡</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-yellow\">&#xe777;</text><text class=\"i-box-tlt\">会员</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-orange\">&#xe69d;</text><text class=\"i-box-tlt\">足迹</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-yellow\">&#xe64c;</text><text class=\"i-box-tlt\">收藏</text></div>\n            </div>\n            <div class=\"box-line line-serve\" @click=\"jumpWeb('http%3A%2F%2Fm.you.163.com%2Fhelp%23%2F%3F_k%3Dyn4ucc')\">\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-blue\">&#xe66a;</text><text class=\"i-box-tlt\">地址</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-blue\">&#xe60a;</text><text class=\"i-box-tlt\">客服</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-blue\">&#xe691;</text><text class=\"i-box-tlt\">帮助</text></div>\n                <div class=\"i-box-l\"><text class=\"i-box-icon iconfont i-c-blue\">&#xe68a;</text><text class=\"i-box-tlt\">设置</text></div>\n            </div>\n        </div>\n    </div>\n</template>\n<style scoped>\n\n    .iconfont {\n        font-family:iconfont;\n    }\n    .wrapper{\n        background-color: #f4f4f4;\n    }\n    .cell-button{\n        margin-bottom: 18px;\n    }\n    .header{\n        height: 280px;\n    }\n    .header-bg{\n        position: absolute;\n        top:0;\n        left: 0;\n        right: 0;\n        height: 280px;\n    }\n    .i-photo{\n        position: absolute;\n        top:90px;\n        left: 30px;\n        height: 130px;\n        width: 130px;\n        border-radius: 130px;\n    }\n    .i-name{\n        position: absolute;\n        top:110px;\n        left: 190px;\n        height: 50px;\n        width: 300px;\n        font-size: 38px;\n        color:#fff;\n    }\n    .b-tlt{\n        position: absolute;\n        top:170px;\n        left: 190px;\n        height: 40px;\n        width: 350px;\n        display: flex;\n        flex-direction: row;\n        flex-wrap: nowrap;\n    }\n    .i-tag{\n        width: 30px;\n        height: 30px;\n        font-size: 24px;\n        padding-top: 2px;\n        margin-right: 6px;\n        border-radius: 4px;\n    }\n    .tag-e{\n        width: 32px;\n        height: 32px;\n    }\n    .tag-v8{\n        color:#fff;\n        background-color: #b29e75;\n        text-align: center;\n    }\n    .txt-tag{\n        color:#b4a078;\n        flex: 1;\n        height: 40px;\n        font-size: 28px;\n        overflow: hidden;\n        lines:1;\n        text-overflow: ellipsis;\n    }\n    .b-qrcode{\n        position: absolute;\n        top:120px;\n        right: 40px;\n        height: 80px;\n        width: 80px;\n        border-radius: 70px;\n        text-align: center;\n        font-size: 40px;\n        padding-top: 18px;\n        color:#fff;\n        background-color: rgba(255,255,255,.3);\n    }\n    .s-box{\n        padding-left: 26px;\n        background-color: #fff;\n    }\n    .box-tlt{\n        height: 94px;\n    }\n    .box-txt{\n        font-size: 26px;\n        padding-top: 34px;\n        color:#333;\n    }\n    .i-box-in{\n        position: absolute;\n        top:34px;\n        right: 30px;\n        color:#333;\n    }\n    .box-line{\n        height: 132px;\n        display: flex;\n        padding-right: 30px;\n        flex-wrap: nowrap;\n        flex-direction: row;\n        justify-content: space-between;\n    }\n    .i-box-l{\n        width: 130px;\n        height: 132px;\n    }\n    .i-box-icon{\n        font-size: 50px;\n        text-align: center;\n        padding-top: 15px;\n        height:79px;\n        padding-bottom: 10px;\n        color:#666;\n    }\n    .i-box-tlt{\n        font-size: 26px;\n        text-align: center;\n        color:#666;\n    }\n    .line-serve{\n        padding-top: 20px;\n        height: 150px;\n    }\n    .border-bottom{\n        border-bottom-width: 1px;\n        border-bottom-color: rgba(0,0,0,.15) ;\n    }\n    .i-c-orange{\n        color:#ff744d;\n    }\n    .i-c-yellow{\n        color:#f6a121;\n    }\n    .i-c-blue{\n        color:#689de5;\n    }\n</style>\n\n<script>\n    var navigator = weex.requireModule('navigator');\n    export default {\n\n        data () {\n            return {\n            }\n        },\n\n        components: {\n        },\n        created(){\n\n//            meta.setViewport({\n//                width: 1750\n//            });\n        },\n        methods: {\n            jump: function () {\n                this.jump('/index');\n            }\n        }\n    }\n</script>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.iconfont[data-v-31a48b81]{\n    font-family: iconfont;\n}\n.container[data-v-31a48b81] {\n    flex: 1;\n    flex-direction: column;\n    align-items:center;\n    justify-content:center;\n    height: 88;\n}\n.top-line[data-v-31a48b81] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 2;\n}\n.tab-icon[data-v-31a48b81] {\n    margin-top: 5;\n    width: 40;\n    height: 40\n}\n.tab-text[data-v-31a48b81] {\n    margin-top: 5;\n    text-align: center;\n    font-size: 20;\n}\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/src/assets/components/tabitem.vue?71c03478"],"names":[],"mappings":";AAmBA;IACA,sBAAA;CACA;AACA;IACA,QAAA;IACA,uBAAA;IACA,mBAAA;IACA,uBAAA;IACA,WAAA;CACA;AACA;IACA,mBAAA;IACA,OAAA;IACA,QAAA;IACA,SAAA;IACA,UAAA;CACA;AACA;IACA,cAAA;IACA,UAAA;IACA,UAAA;CACA;AACA;IACA,cAAA;IACA,mBAAA;IACA,cAAA;CACA","file":"tabitem.vue","sourcesContent":["<template>\n    <div\n            :style=\"{ backgroundColor: backgroundColor }\"\n            class=\"container\"\n            @click=\"onclickitem\">\n        <image\n                src=\"http://gtms03.alicdn.com/tps/i3/TB1mdsiMpXXXXXpXXXXNw4JIXXX-640-4.png\"\n                class=\"top-line\"></image>\n        <image\n                :src=\"icon\"\n                class=\"tab-icon\"></image>\n        <!--<text class=\"iconfont\" :style=\"{ color: titleColor }\">&#xe68b;</text>-->\n        <text\n                :style=\"{ color: titleColor }\"\n                class=\"tab-text\">{{title}}</text>\n    </div>\n</template>\n\n<style scoped>\n    .iconfont{\n        font-family: iconfont;\n    }\n    .container {\n        flex: 1;\n        flex-direction: column;\n        align-items:center;\n        justify-content:center;\n        height: 88;\n    }\n    .top-line {\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        height: 2;\n    }\n    .tab-icon {\n        margin-top: 5;\n        width: 40;\n        height: 40\n    }\n    .tab-text {\n        margin-top: 5;\n        text-align: center;\n        font-size: 20;\n    }\n</style>\n\n<script>\n    export default {\n        props: {\n            index: { default: 0 },\n            title: { default: '' },\n            titleColor: { default: '#000000' },\n            icon: { default: '' },\n            backgroundColor: { default: '#ffffff' }\n        },\n        methods: {\n            onclickitem: function (e) {\n                var params = {\n                    index: this.index\n                };\n                this.$emit('tabItemOnClick', params);\n            }\n        }\n    }\n</script>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"orderItem.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.wxc-search-bar[data-v-5fbe8ae4] {\n    padding-left: 20px;\n    padding-right: 20px;\n    background-color: #FC345C;\n    width: 750px;\n    height: 84px;\n    flex-direction: row;\n}\n.search-bar-input[data-v-5fbe8ae4] {\n    position: absolute;\n    top: 10px;\n    padding-top: 0;\n    padding-bottom: 0;\n    padding-right: 40px;\n    padding-left: 60px;\n    font-size: 26px;\n    width: 624px;\n    height: 64px;\n    line-height: 64px;\n    background-color: #ffffff;\n    placeholder-color: #666666;\n    outline: none;\n    border-radius: 200px;\n}\n.search-bar-ICON[data-v-5fbe8ae4] {\n    position: absolute;\n    width: 30px;\n    height: 30px;\n    left: 34px;\n    top: 28px;\n}\n.search-bar-close[data-v-5fbe8ae4] {\n    position: absolute;\n    width: 30px;\n    height: 30px;\n    right: 120px;\n    top: 28px;\n}\n.search-bar-button[data-v-5fbe8ae4] {\n    width: 94px;\n    height: 36px;\n    font-size: 30px;\n    text-align: center;\n    background-color: #FC345C;\n    margin-top: 16px;\n    margin-right: 0;\n    color: #ffffff;\n    position: absolute;\n    right: 8px;\n    top: 9px;\n}\n.input-has-dep[data-v-5fbe8ae4] {\n    padding-left: 240px;\n    width: 710px;\n}\n.bar-dep[data-v-5fbe8ae4] {\n    width: 170px;\n    padding-right: 12px;\n    padding-left: 12px;\n    height: 42px;\n    align-items: center;\n    flex-direction: row;\n    position: absolute;\n    left: 24px;\n    top: 22px;\n    border-right-style: solid;\n    border-right-width: 1px;\n    border-right-color: #C7C7C7;\n}\n.dep-text[data-v-5fbe8ae4] {\n    flex: 1;\n    text-align: center;\n    font-size: 26px;\n    color: #666666;\n    margin-right: 6px;\n    lines: 1;\n    text-overflow: ellipsis;\n}\n.dep-arrow[data-v-5fbe8ae4] {\n    width: 24px;\n    height: 24px;\n}\n.ICON-has-dep[data-v-5fbe8ae4] {\n    left: 214px;\n}\n.disabled-input[data-v-5fbe8ae4] {\n    width: 750px;\n    height: 64px;\n    position: absolute;\n    left: 0;\n    background-color: transparent;\n}\n.has-dep-disabled[data-v-5fbe8ae4] {\n    width: 550px;\n    left: 200px;\n}\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/src/assets/components/searchBar.vue?c9264a00"],"names":[],"mappings":";AAkEA;IACA,mBAAA;IACA,oBAAA;IACA,0BAAA;IACA,aAAA;IACA,aAAA;IACA,oBAAA;CACA;AAEA;IACA,mBAAA;IACA,UAAA;IACA,eAAA;IACA,kBAAA;IACA,oBAAA;IACA,mBAAA;IACA,gBAAA;IACA,aAAA;IACA,aAAA;IACA,kBAAA;IACA,0BAAA;IACA,2BAAA;IACA,cAAA;IACA,qBAAA;CACA;AAEA;IACA,mBAAA;IACA,YAAA;IACA,aAAA;IACA,WAAA;IACA,UAAA;CACA;AAEA;IACA,mBAAA;IACA,YAAA;IACA,aAAA;IACA,aAAA;IACA,UAAA;CACA;AAEA;IACA,YAAA;IACA,aAAA;IACA,gBAAA;IACA,mBAAA;IACA,0BAAA;IACA,iBAAA;IACA,gBAAA;IACA,eAAA;IACA,mBAAA;IACA,WAAA;IACA,SAAA;CACA;AAEA;IACA,oBAAA;IACA,aAAA;CACA;AAEA;IACA,aAAA;IACA,oBAAA;IACA,mBAAA;IACA,aAAA;IACA,oBAAA;IACA,oBAAA;IACA,mBAAA;IACA,WAAA;IACA,UAAA;IACA,0BAAA;IACA,wBAAA;IACA,4BAAA;CACA;AAEA;IACA,QAAA;IACA,mBAAA;IACA,gBAAA;IACA,eAAA;IACA,kBAAA;IACA,SAAA;IACA,wBAAA;CACA;AAEA;IACA,YAAA;IACA,aAAA;CACA;AAEA;IACA,YAAA;CACA;AAEA;IACA,aAAA;IACA,aAAA;IACA,mBAAA;IACA,QAAA;IACA,8BAAA;CACA;AAEA;IACA,aAAA;IACA,YAAA;CACA","file":"searchBar.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A sSearch bar for city Search-->\n\n<template>\n    <div>\n        <div class=\"wxc-search-bar\"\n             >\n            <input @blur=\"onBlur\"\n                   @focus=\"onFocus\"\n                   @input=\"onInput\"\n                   @return=\"onSubmit\"\n                   :autofocus=\"autofocus\"\n                   :disabled=\"disabled\"\n                   :value=\"value\"\n                   ref=\"search-input\"\n                   :type=\"inputType\"\n                   :placeholder=\"placeholder\"\n                   :style=\"{ width: needShowCancel ? '624px' : '710px' }\"\n                   class=\"search-bar-input\"/>\n            <div v-if=\"disabled\"\n                 @click=\"inputDisabledClicked\"\n                 class=\"disabled-input\"></div>\n            <image class=\"search-bar-ICON\"\n                   :aria-hidden=\"true\"\n                   :src=\"inputIcon\"></image>\n            <image class=\"search-bar-close\"\n                   v-if=\"showClose\"\n                   :aria-hidden=\"true\"\n                   @click=\"closeClicked\"\n                   :src=\"closeIcon\"></image>\n            <text class=\"search-bar-button\"\n                  v-if=\"needShowCancel\"\n                  @click=\"cancelClicked\">取消 </text>\n        </div>\n        <!--<div class=\"wxc-search-bar\"-->\n        <!--v-if=\"mod==='hasDep'\">-->\n        <!--<input @blur=\"onBlur\"-->\n        <!--@focus=\"onFocus\"-->\n        <!--@input=\"onInput\"-->\n        <!--@return=\"onSubmit\"-->\n        <!--:disabled=\"disabled\"-->\n        <!--:autofocus=\"autofocus\"-->\n        <!--:value=\"value\"-->\n        <!--:type=\"inputType\"-->\n        <!--:placeholder=\"placeholder\"-->\n        <!--:class=\"search-bar-input input-has-dep\"/>-->\n        <!--<div v-if=\"disabled\"-->\n        <!--@click=\"inputDisabledClicked\"-->\n        <!--class=\"disabled-input has-dep-disabled\"></div>-->\n        <!--<div :class=\"bar-dep\"-->\n        <!--@click=\"depClicked\">-->\n        <!--<text class=\"dep-text\">{{depName}}</text>-->\n        <!--<image :src=\"arrowIcon\"-->\n        <!--:aria-hidden=\"true\"-->\n        <!--class=\"dep-arrow\"></image>-->\n        <!--</div>-->\n        <!--<image class=\"search-bar-ICON ICON-has-dep\"-->\n        <!--:aria-hidden=\"true\"-->\n        <!--:src=\"inputIcon\"></image>-->\n        <!--</div>\n       -->\n    </div>\n</template>\n\n<style scoped>\n    .wxc-search-bar {\n        padding-left: 20px;\n        padding-right: 20px;\n        background-color: #FC345C;\n        width: 750px;\n        height: 84px;\n        flex-direction: row;\n    }\n\n    .search-bar-input {\n        position: absolute;\n        top: 10px;\n        padding-top: 0;\n        padding-bottom: 0;\n        padding-right: 40px;\n        padding-left: 60px;\n        font-size: 26px;\n        width: 624px;\n        height: 64px;\n        line-height: 64px;\n        background-color: #ffffff;\n        placeholder-color: #666666;\n        outline: none;\n        border-radius: 200px;\n    }\n\n    .search-bar-ICON {\n        position: absolute;\n        width: 30px;\n        height: 30px;\n        left: 34px;\n        top: 28px;\n    }\n\n    .search-bar-close {\n        position: absolute;\n        width: 30px;\n        height: 30px;\n        right: 120px;\n        top: 28px;\n    }\n\n    .search-bar-button {\n        width: 94px;\n        height: 36px;\n        font-size: 30px;\n        text-align: center;\n        background-color: #FC345C;\n        margin-top: 16px;\n        margin-right: 0;\n        color: #ffffff;\n        position: absolute;\n        right: 8px;\n        top: 9px;\n    }\n\n    .input-has-dep {\n        padding-left: 240px;\n        width: 710px;\n    }\n\n    .bar-dep {\n        width: 170px;\n        padding-right: 12px;\n        padding-left: 12px;\n        height: 42px;\n        align-items: center;\n        flex-direction: row;\n        position: absolute;\n        left: 24px;\n        top: 22px;\n        border-right-style: solid;\n        border-right-width: 1px;\n        border-right-color: #C7C7C7;\n    }\n\n    .dep-text {\n        flex: 1;\n        text-align: center;\n        font-size: 26px;\n        color: #666666;\n        margin-right: 6px;\n        lines: 1;\n        text-overflow: ellipsis;\n    }\n\n    .dep-arrow {\n        width: 24px;\n        height: 24px;\n    }\n\n    .ICON-has-dep {\n        left: 214px;\n    }\n\n    .disabled-input {\n        width: 750px;\n        height: 64px;\n        position: absolute;\n        left: 0;\n        background-color: transparent;\n    }\n\n    .has-dep-disabled {\n        width: 550px;\n        left: 200px;\n    }\n</style>\n\n<script>\n    const INPUT_ICON = \"https://gw.alicdn.com/tfs/TB1FZB.pwMPMeJjy1XdXXasrXXa-30-30.png\";\n    const CLOSE_ICON = \"https://gw.alicdn.com/tfs/TB1sZB.pwMPMeJjy1XdXXasrXXa-24-24.png\";\n    const ARROW_ICON = \"https://gw.alicdn.com/tfs/TB1vZB.pwMPMeJjy1XdXXasrXXa-24-24.png\";\n\n    export default {\n        props: {\n            disabled: {\n                type: Boolean,\n                default: false\n            },\n            alwaysShowCancel: {\n                type: Boolean,\n                default: false\n            },\n            inputType: {\n                type: String,\n                default: 'text'\n            },\n            mod: {\n                type: String,\n                default: 'default'\n            },\n            autofocus: {\n                type: Boolean,\n                default: false\n            },\n            theme: {\n                type: String,\n                default: 'gray'\n            },\n            defaultValue: {\n                type: String,\n                default: ''\n            },\n            placeholder: {\n                type: String,\n                default: '搜索'\n            },\n            depName: {\n                type: String,\n                default: '杭州'\n            }\n        },\n        computed: {\n            needShowCancel () {\n                return this.alwaysShowCancel || this.showCancel;\n            }\n        },\n        data: () => ({\n            inputIcon: INPUT_ICON,\n            closeIcon: CLOSE_ICON,\n            arrowIcon: ARROW_ICON,\n            showCancel: false,\n            showClose: false,\n            value: ''\n        }),\n        created () {\n            this.defaultValue && (this.value = this.defaultValue);\n            if (this.disabled) {\n                this.showCancel = false;\n                this.showClose = false;\n            }\n        },\n        methods: {\n            onBlur () {\n                const self = this;\n                setTimeout(() => {\n                    self.showCancel = false;\n                    self.detectShowClose();\n                    self.$emit('wxcSearchbarInputOnBlur', { value: self.value });\n                }, 10);\n            },\n            autoBlur () {\n                this.$refs['search-input'].blur();\n            },\n            onFocus () {\n                this.showCancel = true;\n                this.detectShowClose();\n                this.$emit('wxcSearchbarInputOnFocus', { value: this.value });\n            },\n            closeClicked () {\n                this.value = '';\n                this.showCancel && (this.showCancel = false);\n                this.showClose && (this.showClose = false);\n                this.$emit('wxcSearchbarCloseClicked', { value: this.value });\n                this.$emit('wxcSearchbarInputOnInput', { value: this.value });\n            },\n            onInput (e) {\n                this.value = e.value;\n                this.showCancel = true;\n                this.detectShowClose();\n                this.$emit('wxcSearchbarInputOnInput', { value: this.value });\n            },\n            onSubmit (e) {\n                this.onBlur();\n                this.value = e.value;\n                this.showCancel = true;\n                this.detectShowClose();\n                this.$emit('wxcSearchbarInputReturned', { value: this.value });\n            },\n            cancelClicked () {\n                this.showCancel && (this.showCancel = false);\n                this.showClose && (this.showClose = false);\n                this.onFocus();\n                this.$emit('wxcSearchbarCancelClicked', { value: this.value });\n            },\n            detectShowClose () {\n                this.showClose = (this.value.length > 0) && this.showCancel;\n            },\n            depClicked () {\n                this.$emit('wxcSearchbarDepChooseClicked', {});\n            },\n            inputDisabledClicked () {\n                this.$emit('wxcSearchbarInputDisabledClicked', {});\n            },\n            setValue (value) {\n                this.value = value;\n            }\n        }\n    };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.wxc-minibar[data-v-768f2db7] {\n  width: 750px;\n  height: 90px;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  background-color: #009ff0;\n}\n.left[data-v-768f2db7] {\n  width: 90px;\n}\n.middle-title[data-v-768f2db7] {\n  font-size: 30px;\n  color: #ffffff;\n  height: 36px;\n  line-height: 34px;\n}\n.right[data-v-768f2db7] {\n  width: 80px;\n}\n.left-button[data-v-768f2db7] {\n  width: 21px;\n  height: 36px;\n  margin-left: 40px;\n}\n.right-button[data-v-768f2db7] {\n  width: 32px;\n  height: 32px;\n  margin-right: 16px;\n}\n.right-text[data-v-768f2db7] {\n  width: 80px;\n  margin-right: 20px;\n  font-size: 28px;\n  text-align: left;\n  color: #fff;\n}\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/node_modules/weex-ui/packages/wxc-minibar/index.vue?332449fa"],"names":[],"mappings":";AAkBA;EACA,aAAA;EACA,aAAA;EACA,oBAAA;EACA,+BAAA;EACA,oBAAA;EACA,0BAAA;CACA;AAEA;EACA,YAAA;CACA;AAEA;EACA,gBAAA;EACA,eAAA;EACA,aAAA;EACA,kBAAA;CACA;AAEA;EACA,YAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;CACA;AAEA;EACA,YAAA;EACA,mBAAA;EACA,gBAAA;EACA,iBAAA;EACA,YAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A top navigation bar.-->\n\n<template>\n  <div class=\"wxc-minibar\" :style=\"{ backgroundColor: backgroundColor }\" v-if=\"show\">\n    <div class=\"left\" @click=\"leftButtonClicked\" aria-label=\"返回\" :accessible=\"true\">\n      <image :src=\"leftButton\" class=\"left-button\"></image>\n    </div>\n    <text class=\"middle-title\" :style=\"{ color: textColor }\">{{title}}</text>\n    <div class=\"right\" @click=\"rightButtonClicked\">\n      <text class=\"right-text\" v-if=\"rightText\" :style=\"{ color: textColor }\">{{rightText}}</text>\n      <image :src=\"rightButton\" class=\"right-button\" v-if=\"rightButton\" :aria-hidden=\"true\"></image>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-minibar {\n    width: 750px;\n    height: 90px;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    background-color: #009ff0;\n  }\n\n  .left {\n    width: 90px;\n  }\n\n  .middle-title {\n    font-size: 30px;\n    color: #ffffff;\n    height: 36px;\n    line-height: 34px;\n  }\n\n  .right {\n    width: 80px;\n  }\n\n  .left-button {\n    width: 21px;\n    height: 36px;\n    margin-left: 40px;\n  }\n\n  .right-button {\n    width: 32px;\n    height: 32px;\n    margin-right: 16px;\n  }\n\n  .right-text {\n    width: 80px;\n    margin-right: 20px;\n    font-size: 28px;\n    text-align: left;\n    color: #fff;\n  }\n</style>\n\n<script>\n  const Navigator = weex.requireModule('navigator');\n  export default {\n    props: {\n      backgroundColor: {\n        type: String,\n        default: '#FFC900'\n      },\n      leftButton: {\n        type: String,\n        default: 'https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png'\n      },\n      textColor: {\n        type: String,\n        default: '#3D3D3D'\n      },\n      rightButton: {\n        type: String,\n        default: ''\n      },\n      title: {\n        type: String,\n        default: '标题'\n      },\n      rightText: {\n        type: String,\n        default: ''\n      },\n      useDefaultReturn: {\n        type: Boolean,\n        default: true\n      },\n      show: {\n        type: Boolean,\n        default: true\n      }\n    },\n    methods: {\n      leftButtonClicked () {\n        const self = this;\n        if (self.useDefaultReturn) {\n          Navigator.pop({}, e => {\n          });\n        }\n        self.$emit('wxcMinibarLeftButtonClicked', {});\n      },\n      rightButtonClicked () {\n        const self = this;\n        if (self.rightText || self.rightButton) {\n          self.$emit('wxcMinibarRightButtonClicked', {});\n        }\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.tabTop[data-v-7963f737] {\n  flex-direction: row;\n  background-color: #ffffff;\n}\n.container[data-v-7963f737] {\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 88;\n  position: relative;\n}\n.tab-text[data-v-7963f737] {\n  margin-top: 5;\n  text-align: center;\n  font-size: 20;\n  color: #000000;\n}\n.tab-text-active[data-v-7963f737] {\n  color: #FC345C;\n}\n.slider[data-v-7963f737] {\n  position: absolute;\n  content: \" \";\n  left: 0;\n  bottom: 0;\n  height: 6px;\n  background-color: #1aad19;\n  -webkit-transition: -webkit-transform .3s;\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s,-webkit-transform .3s;\n}\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/src/assets/components/tabTop.vue"],"names":[],"mappings":";AAAA;EACE,oBAAoB;EACpB,0BAA0B;CAAE;AAE9B;EACE,QAAQ;EACR,uBAAuB;EACvB,oBAAoB;EACpB,wBAAwB;EACxB,WAAW;EACX,mBAAmB;CAAE;AAEvB;EACE,cAAc;EACd,mBAAmB;EACnB,cAAc;EACd,eAAe;CAAE;AAEnB;EACE,eAAe;CAAE;AAEnB;EACE,mBAAmB;EACnB,aAAa;EACb,QAAQ;EACR,UAAU;EACV,YAAY;EACZ,0BAA0B;EAC1B,0CAA0C;EAC1C,kCAAkC;EAClC,0BAA0B;EAC1B,gDAAgD;CAAE","file":"tabTop.vue","sourcesContent":[".tabTop {\n  flex-direction: row;\n  background-color: #ffffff; }\n\n.container {\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 88;\n  position: relative; }\n\n.tab-text {\n  margin-top: 5;\n  text-align: center;\n  font-size: 20;\n  color: #000000; }\n\n.tab-text-active {\n  color: #FC345C; }\n\n.slider {\n  position: absolute;\n  content: \" \";\n  left: 0;\n  bottom: 0;\n  height: 6px;\n  background-color: #1aad19;\n  -webkit-transition: -webkit-transform .3s;\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s,-webkit-transform .3s; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"user.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(46)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(39),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-768f2db7",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/node_modules/weex-ui/packages/wxc-minibar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-768f2db7", Component.options)
  } else {
    hotAPI.reload("data-v-768f2db7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      backgroundColor: _vm.backgroundColor
    })),
    on: {
      "click": _vm.onclickitem
    }
  }, [_c('image', {
    staticClass: "top-line",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": "http://gtms03.alicdn.com/tps/i3/TB1mdsiMpXXXXXpXXXXNw4JIXXX-640-4.png"
    }
  }), _vm._v(" "), _c('image', {
    staticClass: "tab-icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.icon
    }
  }), _vm._v(" "), _c('text', {
    staticClass: "tab-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.titleColor
    }))
  }, [_vm._v(_vm._s(_vm.title))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-31a48b81", module.exports)
  }
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-50247bcc", module.exports)
  }
}

/***/ }),
/* 38 */
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: "wxc-minibar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      backgroundColor: _vm.backgroundColor
    }))
  }, [_c('div', {
    staticClass: "left",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "aria-label": "返回",
      "accessible": true
    },
    on: {
      "click": _vm.leftButtonClicked
    }
  }, [_c('image', {
    staticClass: "left-button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.leftButton
    }
  })]), _vm._v(" "), _c('text', {
    staticClass: "middle-title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.textColor
    }))
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', {
    staticClass: "right",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.rightButtonClicked
    }
  }, [(_vm.rightText) ? _c('text', {
    staticClass: "right-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.textColor
    }))
  }, [_vm._v(_vm._s(_vm.rightText))]) : _vm._e(), _vm._v(" "), (_vm.rightButton) ? _c('image', {
    staticClass: "right-button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.rightButton,
      "aria-hidden": true
    }
  }) : _vm._e()])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-768f2db7", module.exports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tabTop",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "append": "tree"
    }
  }, [_vm._l((_vm.itemList), function(item, i) {
    return _c('div', {
      staticClass: "container",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      on: {
        "click": function($event) {
          _vm.onclickitem(i)
        }
      }
    }, [_c('text', {
      class: ['tab-text', (item.active && 'tab-text-active')],
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [_vm._v(_vm._s(item.title))])])
  }), _vm._v(" "), _c('div', {
    ref: "tab-slider",
    staticClass: "slider",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      width: _vm.pwidth,
      backgroundColor: '#FC345C',
      left: _vm.left
    }))
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7963f737", module.exports)
  }
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "hello",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('wxc-minibar', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "title": _vm.msg,
      "background-color": "#009ff0",
      "text-color": "#FFFFFF",
      "left-button": "",
      "right-text": "更多"
    },
    on: {
      "wxcMinibarLeftButtonClicked": _vm.minibarLeftButtonClick,
      "wxcMinibarRightButtonClicked": _vm.minibarRightButtonClick
    }
  }), _vm._v(" "), _c('h1', [_vm._v(_vm._s(_vm.msg))])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-81e9b628", module.exports)
  }
}

/***/ }),
/* 42 */
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("71c87f0b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31a48b81\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tabitem.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31a48b81\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tabitem.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3d36b7b5", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-50247bcc\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./orderItem.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-50247bcc\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./orderItem.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 45 */
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1f67a7ce", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js?sourceMap!../../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-768f2db7\",\"scoped\":true,\"hasInlineConfig\":false}!../../../vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../css-loader/index.js?sourceMap!../../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-768f2db7\",\"scoped\":true,\"hasInlineConfig\":false}!../../../vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("00beecdb", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7963f737\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tabTop.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7963f737\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tabTop.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("37579f0c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-81e9b628\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./user.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-81e9b628\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./user.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(56),
  /* template */
  __webpack_require__(87),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/src/assets/components/navBar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] navBar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0d4afda7", Component.options)
  } else {
    hotAPI.reload("data-v-0d4afda7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(102)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(57),
  /* template */
  __webpack_require__(93),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-ad27ba16",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/src/assets/components/tabBar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] tabBar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ad27ba16", Component.options)
  } else {
    hotAPI.reload("data-v-ad27ba16", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(104)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(58),
  /* template */
  __webpack_require__(95),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-e7856bb4",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/src/assets/views/login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e7856bb4", Component.options)
  } else {
    hotAPI.reload("data-v-e7856bb4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(99)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(62),
  /* template */
  __webpack_require__(90),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6c8aef98",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/src/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c8aef98", Component.options)
  } else {
    hotAPI.reload("data-v-6c8aef98", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//

var _type = __webpack_require__(64);

exports.default = {
  props: {
    text: {
      type: String,
      default: '确认'
    },
    type: {
      type: String,
      default: 'taobao'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    btnStyle: Object,
    textStyle: Object
  },
  computed: {
    mrBtnStyle: function mrBtnStyle() {
      var type = this.type,
          disabled = this.disabled,
          btnStyle = this.btnStyle;

      var mrBtnStyle = _extends({}, _type.STYLE_MAP[type], btnStyle);
      return disabled ? _extends({}, mrBtnStyle, {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 0
      }) : mrBtnStyle;
    },
    mrTextStyle: function mrTextStyle() {
      var type = this.type,
          disabled = this.disabled,
          textStyle = this.textStyle;

      var mrTextStyle = _extends({}, _type.TEXT_STYLE_MAP[type], textStyle);
      return disabled ? _extends({}, mrTextStyle, { color: '#FFFFFF' }) : mrTextStyle;
    }
  },
  methods: {
    onClicked: function onClicked(e) {
      var type = this.type,
          disabled = this.disabled;

      this.$emit('wxcButtonClicked', { e: e, type: type, disabled: disabled });
    }
  }
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(11);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    label: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    hasMargin: {
      type: Boolean,
      default: false
    },
    hasBottomBorder: {
      type: Boolean,
      default: true
    },
    hasArrow: {
      type: Boolean,
      default: false
    },
    arrowIcon: {
      type: String,
      default: 'https://gw.alicdn.com/tfs/TB11zBUpwMPMeJjy1XbXXcwxVXa-22-22.png'
    },
    hasVerticalIndent: {
      type: Boolean,
      default: true
    },
    cellStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    autoAccessible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    cellClicked: function cellClicked(e) {
      var link = this.link;
      this.$emit('wxcCellClicked', { e: e });
      link && _utils2.default.goToH5Page(link, true);
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = __webpack_require__(66);

var _type2 = _interopRequireDefault(_type);

var _utils = __webpack_require__(11);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    type: {
      type: String,
      default: 'errorPage'
    },
    show: {
      type: Boolean,
      default: true
    },
    wrapStyle: Object,
    paddingTop: {
      type: [Number, String],
      default: 232
    },
    customSet: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    resultType: function resultType() {
      var type = this.type,
          customSet = this.customSet;

      var allTypes = _utils2.default.isEmptyObject(customSet) ? _type2.default : _utils2.default.mergeDeep(_type2.default, customSet);
      var types = allTypes['errorPage'];
      if (['errorPage', 'noGoods', 'noNetwork', 'errorLocation'].indexOf(type) > -1) {
        types = allTypes[type];
      }
      return types;
    },
    setPaddingTop: function setPaddingTop() {
      var paddingTop = this.paddingTop;
      return paddingTop + 'px';
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // web上面有点击穿透问题
      var platform = weex.config.env.platform;

      platform === 'Web' && e.preventDefault && e.preventDefault();
    },
    onClick: function onClick() {
      var type = this.type;
      this.$emit('wxcResultButtonClicked', { type: type });
    }
  }
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wxcMinibar = __webpack_require__(4);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

var _weexRouter = __webpack_require__(3);

var _weexRouter2 = _interopRequireDefault(_weexRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    components: { WxcMinibar: _wxcMinibar2.default },
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
    data: function data() {
        return {
            height: 88,
            top: 0
        };
    },
    created: function created() {
        if (_weexRouter2.default.getOs() == 'ios') {
            this.height = 88 + 40;
            this.top = 40;
        }
    },

    methods: {
        minibarLeftButtonClick: function minibarLeftButtonClick() {
            this.$emit('wxcMinibarLeftButtonClicked', {});
        },
        minibarRightButtonClick: function minibarRightButtonClick() {
            if (this.rightText || this.rightButton) {
                this.$emit('wxcMinibarRightButtonClicked', {});
            }
        }
    }
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _order = __webpack_require__(9);

var _order2 = _interopRequireDefault(_order);

var _checkOrder = __webpack_require__(8);

var _checkOrder2 = _interopRequireDefault(_checkOrder);

var _shop = __webpack_require__(10);

var _shop2 = _interopRequireDefault(_shop);

var _user = __webpack_require__(7);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    props: {
        tabItems: { default: [] },
        selectedColor: { default: '#ff0000' },
        unselectedColor: { default: '#000000' }
    },
    data: function data() {
        return {
            selectedIndex: 0,
            is_web: false,
            is_ios: 0
        };
    },
    components: {
        tabitem: __webpack_require__(18),
        order: _order2.default,
        checkOrder: _checkOrder2.default,
        shop: _shop2.default,
        user: _user2.default
    },
    created: function created() {
        var platform = weex.config.env ? weex.config.env.platform : weex.config.platform;
        if (platform.toLowerCase() == 'web') {
            this.is_web = true;
        }
        this.select(this.selectedIndex);
    },
    methods: {
        tabItemOnClick: function tabItemOnClick(e) {
            this.selectedIndex = e.index;
            this.select(e.index);
            this.$emit('tabBarOnClick', e);
        },
        select: function select(index) {
            for (var i = 0; i < this.tabItems.length; i++) {
                var tabItem = this.tabItems[i];
                if (i == index) {
                    tabItem.icon = tabItem.selectedImage;
                    tabItem.titleColor = this.selectedColor;
                    tabItem.visibility = 'visible';
                } else {
                    tabItem.icon = tabItem.image;
                    tabItem.titleColor = this.unselectedColor;
                    tabItem.visibility = 'hidden';
                }
            }
        }
    }
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wxcResult = __webpack_require__(65);

var _wxcResult2 = _interopRequireDefault(_wxcResult);

var _wxcButton = __webpack_require__(63);

var _wxcButton2 = _interopRequireDefault(_wxcButton);

var _wxcCell = __webpack_require__(12);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _weexRouter = __webpack_require__(3);

var _weexRouter2 = _interopRequireDefault(_weexRouter);

var _http = __webpack_require__(5);

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modal = weex.requireModule('modal'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var storage = weex.requireModule('storage');
var clipboard = weex.requireModule('clipboard');

exports.default = {
    components: { wxcCell: _wxcCell2.default, WxcButton: _wxcButton2.default, WxcResult: _wxcResult2.default },
    data: function data() {
        return {
            height: 833,
            password: '',
            mobile: '',
            is_send: false,
            sendContent: '发送验证码',
            second: 60,
            show: true,
            customSet: {
                errorPage: {
                    button: '',
                    content: '',
                    pic: 'http://cdn.udian.me/logo.png'
                }
            }
        };
    },
    created: function created() {
        var _this = this;

        storage.getItem('phone', function (event) {
            if (event.data && event.data != "undefined") {
                _this.mobile = event.data;
            }
        });
    },

    methods: {
        wxcCellClicked: function wxcCellClicked() {
            this.isShow = true;
        },
        wxcButtonClicked: function wxcButtonClicked() {

            if (!this.mobile) {
                modal.toast({
                    message: '请填写正确的手机号!',
                    duration: 1
                });
                return false;
            }
            var patt1 = new RegExp(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/);
            if (!patt1.test(this.mobile)) {
                modal.toast({
                    message: '请填写正确的手机号!',
                    duration: 1
                });
                return false;
            }
            var _url = 'seller/loginByApp';
            var _data = {
                account: this.mobile,
                code: this.password
            };
            _http2.default.postAjax(_url, _data, function (data) {
                _http2.default.storageSet('udotAuthToken', data.authToken);
                _http2.default.storageSet('seller', data.data);
                modal.toast({
                    message: '登录成功!',
                    duration: 1
                });
                _weexRouter2.default.push('/index');
            });
        },
        send_msg: function send_msg() {
            if (this.is_send) {
                return false;
            }
            var that = this;
            if (!this.mobile) {
                modal.toast({
                    message: '请填写正确的手机号!',
                    duration: 1
                });
                return false;
            }
            var patt1 = new RegExp(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/);
            if (!patt1.test(this.mobile)) {
                modal.toast({
                    message: '请填写正确的手机号!',
                    duration: 1
                });
                return false;
            }
            var _url = 'user/sendSms';
            var _data = {
                mobile: this.mobile,
                type: 3
            };
            that.is_send = true;
            that.sendContent = '等待';
            that.setTime();
            that.is_send = true;
            _http2.default.postAjax(_url, _data, function (data) {
                storage.setItem('phone', that.mobile);
                that.is_send = true;
                that.sendContent = '等待';
                that.setTime();
            });
        },
        setTime: function setTime() {
            var _this2 = this;

            setTimeout(function () {
                if (_this2.second == 0) {
                    _this2.is_send = false;
                    _this2.sendContent = '发送验证码';
                    _this2.second = 60;
                    return false;
                }
                _this2.second = _this2.second - 1;
                _this2.setTime();
            }, 1000);
        }
    }
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _weexRouter = __webpack_require__(3);

var _weexRouter2 = _interopRequireDefault(_weexRouter);

var _searchBar = __webpack_require__(16);

var _searchBar2 = _interopRequireDefault(_searchBar);

var _tabTop = __webpack_require__(17);

var _tabTop2 = _interopRequireDefault(_tabTop);

var _orderItem = __webpack_require__(15);

var _orderItem2 = _interopRequireDefault(_orderItem);

var _http = __webpack_require__(5);

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'checkOrder',
    components: { udotSearchBar: _searchBar2.default, udotTabtop: _tabTop2.default, udotOrderItem: _orderItem2.default },
    data: function data() {
        return {
            value: '',
            height: 88,
            top: 0,
            itemList: [{
                title: '待接单',
                active: true
            }, {
                title: '待发货',
                active: false
            }, {
                title: '待送达',
                active: false
            }, {
                title: '已送达',
                active: false
            }],
            orderList: []
        };
    },

    created: function created() {
        if (_weexRouter2.default.getOs() == 'ios') {
            this.height = 88 + 40;
            this.top = 40;
        }
        this.getOrderList();
    },
    methods: {
        wxcSearchbarInputOnFocus: function wxcSearchbarInputOnFocus() {},
        wxcSearchbarInputOnBlur: function wxcSearchbarInputOnBlur() {},
        wxcSearchbarInputReturned: function wxcSearchbarInputReturned() {},
        wxcSearchbarCloseClicked: function wxcSearchbarCloseClicked() {},
        wxcSearchbarInputOnInput: function wxcSearchbarInputOnInput(e) {
            this.value = e.value;
        },
        wxcSearchbarCancelClicked: function wxcSearchbarCancelClicked() {},
        wxcSearchbarInputDisabledClicked: function wxcSearchbarInputDisabledClicked() {},
        wxcSearchbarDepChooseClicked: function wxcSearchbarDepChooseClicked() {},
        tabTopItemOnClick: function tabTopItemOnClick(e) {
            console.log(e);
        },
        getOrderList: function getOrderList() {

            var _data = {
                type: 4

                //                http.postAjax('sellerOrder/orderList', _data, function (data) {
                //                    console.log(data)
                //                })
            };
        }
    }
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wxcCell = __webpack_require__(12);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _wxcMinibar = __webpack_require__(4);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

var _navBar = __webpack_require__(49);

var _navBar2 = _interopRequireDefault(_navBar);

var _weexRouter = __webpack_require__(3);

var _weexRouter2 = _interopRequireDefault(_weexRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = weex.requireModule('storage'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'order',
    components: { WxcMinibar: _wxcMinibar2.default, udotNavBar: _navBar2.default, wxcCell: _wxcCell2.default },
    data: function data() {
        return {
            msg: '欢222迎！',
            isBottomShow: false,
            height: 400,
            useDefaultReturn: false
        };
    },

    created: function created() {
        var _this = this;

        this.height = weex.config.env.deviceHeight;

        storage.getItem('udotAuthToken', function (event) {
            _this.msg = event.data;
        });
    },
    methods: {
        minibarLeftButtonClick: function minibarLeftButtonClick() {
            console.log(111);
            return false;
        },
        minibarRightButtonClick: function minibarRightButtonClick() {
            _weexRouter2.default.push('/login');
        },
        openBottomPopup: function openBottomPopup() {
            this.isBottomShow = true;
        },

        //非状态组件，需要在这里关闭
        popupOverlayBottomClick: function popupOverlayBottomClick() {
            this.isBottomShow = false;
        },
        wxcCellClicked: function wxcCellClicked() {}
    }
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wxcMinibar = __webpack_require__(4);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

var _weexRouter = __webpack_require__(3);

var _weexRouter2 = _interopRequireDefault(_weexRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'shop',
    components: { WxcMinibar: _wxcMinibar2.default },
    data: function data() {
        return {
            msg: 'shop！'
        };
    },

    created: function created() {
        console.log(this.$route);
    },
    methods: {
        minibarLeftButtonClick: function minibarLeftButtonClick() {},
        minibarRightButtonClick: function minibarRightButtonClick() {},
        gopage: function gopage() {
            _weexRouter2.default.push('/goodsList', this);
        }
    }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _weexRouter = __webpack_require__(3);

var _weexRouter2 = _interopRequireDefault(_weexRouter);

var _http = __webpack_require__(5);

var _http2 = _interopRequireDefault(_http);

var _tabBar = __webpack_require__(50);

var _tabBar2 = _interopRequireDefault(_tabBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//    import { WxcPopup } from 'weex-ui';
var storage = weex.requireModule('storage'); //
//
//
//
//
//

exports.default = {
    components: { TabBar: _tabBar2.default },
    data: function data() {
        return {
            dir: 'examples',
            tabItems: [{
                index: 0,
                title: '首页',
                titleColor: '#7d7d7d',
                icon: '',
                image: 'http://cdn.udian.me/index_gray.png',
                selectedImage: 'http://cdn.udian.me/index.png',
                src: '/index/order',
                visibility: 'visible'
            }, {
                index: 1,
                title: '订单',
                titleColor: '#7d7d7d',
                icon: '',
                image: 'http://cdn.udian.me/query_gray.png',
                selectedImage: 'http://cdn.udian.me/query.png',
                src: '/index/checkOrder',
                visibility: 'hidden'
            }, {
                index: 2,
                title: '商品',
                titleColor: '#7d7d7d',
                icon: '',
                image: 'http://cdn.udian.me/goods_gray.png',
                selectedImage: 'http://cdn.udian.me/goods.png',
                src: '/index/shop',
                visibility: 'hidden'
            }, {
                index: 3,
                title: '统计',
                titleColor: '#7d7d7d',
                icon: '',
                image: 'http://cdn.udian.me/set_gray.png',
                selectedImage: 'http://cdn.udian.me/set.png',
                src: '/index/user',
                visibility: 'hidden'
            }],
            isBottomShow: false,
            height: 400
        };
    },

    created: function created() {
        for (var i = 0; i < this.tabItems.length; i++) {
            var tabItem = this.tabItems[i];
            tabItem.src = _weexRouter2.default.getURL(tabItem.src);
        }

        _http2.default.storageGet('udotAuthToken', function (data) {
            console.log("=====" + data);
            if (!data) {
                _weexRouter2.default.push('/login');
            }
        });
    },
    methods: {
        tabBarOnClick: function tabBarOnClick(e) {
            console.log('tabBarOnClick', e.index);
        },
        openBottomPopup: function openBottomPopup() {
            this.isBottomShow = true;
        },

        //非状态组件，需要在这里关闭
        popupOverlayBottomClick: function popupOverlayBottomClick() {
            this.isBottomShow = false;
        }
    }
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(83);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var STYLE_MAP = exports.STYLE_MAP = {
  taobao: {
    backgroundColor: '#FF5000'
  },
  fliggy: {
    backgroundColor: '#FFC900'
  },
  normal: {
    backgroundColor: '#FFFFFF',
    borderColor: '#A5A5A5',
    borderWidth: '1px'
  },
  highlight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EE9900',
    borderWidth: '1px'
  }
};

var TEXT_STYLE_MAP = exports.TEXT_STYLE_MAP = {
  taobao: {
    color: '#FFFFFF'
  },
  fliggy: {
    color: '#3D3D3D'
  },
  normal: {
    color: '#3D3D3D'
  },
  highlight: {
    color: '#EE9900'
  }
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(85);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2016/11/4.
 */

exports.default = {
  errorPage: {
    pic: 'https://gtms01.alicdn.com/tfs/TB1HH4TSpXXXXauXVXXXXXXXXXX-320-320.png',
    content: '抱歉出错了，飞猪正在全力解决中',
    button: '再试一次',
    title: '出错啦'
  },
  noGoods: {
    pic: 'https://gw.alicdn.com/tfs/TB1QXlEQXXXXXcNXFXXXXXXXXXX-320-320.png',
    content: '主人，这里什么都没有找到',
    button: '再试一次',
    title: '暂无商品'
  },
  noNetwork: {
    pic: 'https://gw.alicdn.com/tfs/TB1rs83QXXXXXcBXpXXXXXXXXXX-320-320.png',
    content: '哎呀，没有网络了......',
    button: '刷新一下',
    title: '无网络'
  },
  errorLocation: {
    pic: 'https://gw.alicdn.com/tfs/TB1rs83QXXXXXcBXpXXXXXXXXXX-320-320.png',
    content: '哎呀，定位失败了......',
    button: '刷新一下',
    title: '定位失败'
  }
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _login = __webpack_require__(51);

var _login2 = _interopRequireDefault(_login);

var _index = __webpack_require__(52);

var _index2 = _interopRequireDefault(_index);

var _my = __webpack_require__(19);

var _my2 = _interopRequireDefault(_my);

var _order = __webpack_require__(9);

var _order2 = _interopRequireDefault(_order);

var _checkOrder = __webpack_require__(8);

var _checkOrder2 = _interopRequireDefault(_checkOrder);

var _shop = __webpack_require__(10);

var _shop2 = _interopRequireDefault(_shop);

var _user = __webpack_require__(7);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ViewGoodsList from './assets/views/goods/goodsList.vue'

var router = [{
    path: '/index',
    component: _index2.default
}, {
    path: '/login',
    component: _login2.default
}, {
    path: '/index/order',
    component: _order2.default
}, {
    path: '/index/checkOrder',
    component: _checkOrder2.default
}, {
    path: '/index/shop',
    component: _shop2.default
}, {
    path: '/index/user',
    component: _user2.default
}, {
    path: '/my',
    component: _my2.default
}];

exports.pageRouter = function (url) {

    var base = router.find(function (obj) {
        return obj.path == url;
    });

    return base.component.__file;
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.wrapper[data-v-0d340006] {\n  background-color: #f6f6f6;\n}\n.header[data-v-0d340006] {\n  flex-direction: row;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  color: #ffffff;\n  width: 750;\n  justify-content: space-between;\n  align-items: center;\n  background-color: #fc345c;\n  padding-top: 0px;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-box-pack: justify;\n  -webkit-box-align: center;\n  padding-left: 40px;\n  padding-right: 20px;\n  font-size: 28px;\n}\n.down-la[data-v-0d340006] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  right: -30;\n}\n.shop-title[data-v-0d340006] {\n  flex-direction: row;\n  position: relative;\n}\n.header-left[data-v-0d340006], .header-right[data-v-0d340006] {\n  color: #ffffff;\n}\n.home-menu[data-v-0d340006] {\n  flex-direction: row;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  height: 300;\n  color: #ffffff;\n  width: 750;\n}\n.home-menu-item[data-v-0d340006] {\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background-color: #FC345C;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-box-align: center;\n  -webkit-box-pack: center;\n  -webkit-box-flex: 1;\n  height: 300;\n  position: relative;\n}\n.home-menu-item_img[data-v-0d340006] {\n  margin-top: 10px;\n  height: 60;\n  width: 60;\n}\n.home-menu-item_title[data-v-0d340006] {\n  margin-top: 10px;\n  color: #ffffff;\n  ont-family: PingFangSC-Regular;\n  font-size: 24px;\n}\n.home-menu-item_blef[data-v-0d340006] {\n  position: absolute;\n  right: 54px;\n  top: 96;\n  text-align: center;\n  background-color: #f8f800;\n  color: #FC345C;\n  border-radius: 100px;\n  font-size: 20px;\n}\n.home-bill[data-v-0d340006] {\n  flex-direction: row;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  height: 200;\n  color: #ffffff;\n  background-color: #ffffff;\n  width: 750;\n}\n.home-bill-item[data-v-0d340006] {\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-box-align: center;\n  -webkit-box-pack: center;\n  -webkit-box-flex: 1;\n  margin-top: 30px;\n  margin-bottom: 30px;\n}\n.home-bill-item_title[data-v-0d340006] {\n  color: #333;\n  font-family: PingFangSC-Medium;\n  font-size: 40px;\n}\n.home-bill-item_brief[data-v-0d340006] {\n  color: #4a4a4a;\n  ont-family: PingFangSC-Regular;\n  font-size: 26px;\n}\n.list-top[data-v-0d340006] {\n  margin-top: 20px;\n}\n.border-right[data-v-0d340006] {\n  border-right-width: 2px;\n  border-right-color: #F6F6F6;\n}\n.list-img[data-v-0d340006] {\n  width: 36px;\n  height: 36px;\n  margin-right: 10px;\n}\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/src/assets/views/tabItems/order.vue"],"names":[],"mappings":";AAAA;EACE,0BAA0B;CAAE;AAE9B;EACE,oBAAoB;EACpB,+BAA+B;EAC/B,8BAA8B;EAC9B,eAAe;EACf,WAAW;EACX,+BAA+B;EAC/B,oBAAoB;EACpB,0BAA0B;EAC1B,iBAAiB;EACjB,+BAA+B;EAC/B,8BAA8B;EAC9B,0BAA0B;EAC1B,0BAA0B;EAC1B,mBAAmB;EACnB,oBAAoB;EACpB,gBAAgB;CAAE;AAEpB;EACE,mBAAmB;EACnB,SAAS;EACT,4BAA4B;EAC5B,WAAW;CAAE;AAEf;EACE,oBAAoB;EACpB,mBAAmB;CAAE;AAEvB;EACE,eAAe;CAAE;AAEnB;EACE,oBAAoB;EACpB,+BAA+B;EAC/B,8BAA8B;EAC9B,YAAY;EACZ,eAAe;EACf,WAAW;CAAE;AAEf;EACE,QAAQ;EACR,uBAAuB;EACvB,oBAAoB;EACpB,wBAAwB;EACxB,0BAA0B;EAC1B,6BAA6B;EAC7B,8BAA8B;EAC9B,0BAA0B;EAC1B,yBAAyB;EACzB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;CAAE;AAEvB;EACE,iBAAiB;EACjB,WAAW;EACX,UAAU;CAAE;AAEd;EACE,iBAAiB;EACjB,eAAe;EACf,+BAA+B;EAC/B,gBAAgB;CAAE;AAEpB;EACE,mBAAmB;EACnB,YAAY;EACZ,QAAQ;EACR,mBAAmB;EACnB,0BAA0B;EAC1B,eAAe;EACf,qBAAqB;EACrB,gBAAgB;CAAE;AAEpB;EACE,oBAAoB;EACpB,+BAA+B;EAC/B,8BAA8B;EAC9B,YAAY;EACZ,eAAe;EACf,0BAA0B;EAC1B,WAAW;CAAE;AAEf;EACE,QAAQ;EACR,uBAAuB;EACvB,oBAAoB;EACpB,wBAAwB;EACxB,6BAA6B;EAC7B,8BAA8B;EAC9B,0BAA0B;EAC1B,yBAAyB;EACzB,oBAAoB;EACpB,iBAAiB;EACjB,oBAAoB;CAAE;AAExB;EACE,YAAY;EACZ,+BAA+B;EAC/B,gBAAgB;CAAE;AAEpB;EACE,eAAe;EACf,+BAA+B;EAC/B,gBAAgB;CAAE;AAEpB;EACE,iBAAiB;CAAE;AAErB;EACE,wBAAwB;EACxB,4BAA4B;CAAE;AAEhC;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;CAAE","file":"order.vue","sourcesContent":[".wrapper {\n  background-color: #f6f6f6; }\n\n.header {\n  flex-direction: row;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  color: #ffffff;\n  width: 750;\n  justify-content: space-between;\n  align-items: center;\n  background-color: #fc345c;\n  padding-top: 0px;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-box-pack: justify;\n  -webkit-box-align: center;\n  padding-left: 40px;\n  padding-right: 20px;\n  font-size: 28px; }\n\n.down-la {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  right: -30; }\n\n.shop-title {\n  flex-direction: row;\n  position: relative; }\n\n.header-left, .header-right {\n  color: #ffffff; }\n\n.home-menu {\n  flex-direction: row;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  height: 300;\n  color: #ffffff;\n  width: 750; }\n\n.home-menu-item {\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background-color: #FC345C;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-box-align: center;\n  -webkit-box-pack: center;\n  -webkit-box-flex: 1;\n  height: 300;\n  position: relative; }\n\n.home-menu-item_img {\n  margin-top: 10px;\n  height: 60;\n  width: 60; }\n\n.home-menu-item_title {\n  margin-top: 10px;\n  color: #ffffff;\n  ont-family: PingFangSC-Regular;\n  font-size: 24px; }\n\n.home-menu-item_blef {\n  position: absolute;\n  right: 54px;\n  top: 96;\n  text-align: center;\n  background-color: #f8f800;\n  color: #FC345C;\n  border-radius: 100px;\n  font-size: 20px; }\n\n.home-bill {\n  flex-direction: row;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  height: 200;\n  color: #ffffff;\n  background-color: #ffffff;\n  width: 750; }\n\n.home-bill-item {\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-box-align: center;\n  -webkit-box-pack: center;\n  -webkit-box-flex: 1;\n  margin-top: 30px;\n  margin-bottom: 30px; }\n\n.home-bill-item_title {\n  color: #333;\n  font-family: PingFangSC-Medium;\n  font-size: 40px; }\n\n.home-bill-item_brief {\n  color: #4a4a4a;\n  ont-family: PingFangSC-Regular;\n  font-size: 26px; }\n\n.list-top {\n  margin-top: 20px; }\n\n.border-right {\n  border-right-width: 2px;\n  border-right-color: #F6F6F6; }\n\n.list-img {\n  width: 36px;\n  height: 36px;\n  margin-right: 10px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.wrapper[data-v-39fec007] {\n  /*background-color: #f6f6f6;*/\n}\n.searchBox[data-v-39fec007] {\n  background-color: #FC345C;\n}\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/src/assets/views/tabItems/checkOrder.vue"],"names":[],"mappings":";AAAA;EACE,8BAA8B;CAAE;AAElC;EACE,0BAA0B;CAAE","file":"checkOrder.vue","sourcesContent":[".wrapper {\n  /*background-color: #f6f6f6;*/ }\n\n.searchBox {\n  background-color: #FC345C; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.wxc-cell[data-v-4e0100bd] {\n  height: 100px;\n  position: relative;\n  flex-direction: row;\n  align-items: center;\n  padding-left: 24px;\n  padding-right: 24px;\n  background-color: #ffffff;\n}\n.cell-margin[data-v-4e0100bd] {\n  margin-bottom: 24px;\n}\n.cell-title[data-v-4e0100bd] {\n  flex: 1;\n}\n.cell-indent[data-v-4e0100bd] {\n  padding-bottom: 30px;\n  padding-top: 30px;\n}\n.has-desc[data-v-4e0100bd] {\n  padding-bottom: 18px;\n  padding-top: 18px;\n}\n.cell-top-border[data-v-4e0100bd] {\n  border-top-color: #e2e2e2;\n  border-top-width: 1px;\n}\n.cell-bottom-border[data-v-4e0100bd] {\n  border-bottom-color: #e2e2e2;\n  border-bottom-width: 1px;\n}\n.cell-label-text[data-v-4e0100bd] {\n  font-size: 30px;\n  color: #666666;\n  width: 188px;\n  margin-right: 10px;\n}\n.cell-arrow-icon[data-v-4e0100bd] {\n  width: 22px;\n  height: 22px;\n}\n.cell-content[data-v-4e0100bd] {\n  color: #333333;\n  font-size: 30px;\n  line-height: 40px;\n}\n.cell-desc-text[data-v-4e0100bd] {\n  color: #999999;\n  font-size: 24px;\n  line-height: 30px;\n  margin-top: 4px;\n}\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/node_modules/weex-ui/packages/wxc-cell/index.vue?3a6e942c"],"names":[],"mappings":";AAiCA;EACA,cAAA;EACA,mBAAA;EACA,oBAAA;EACA,oBAAA;EACA,mBAAA;EACA,oBAAA;EACA,0BAAA;CACA;AAEA;EACA,oBAAA;CACA;AAEA;EACA,QAAA;CACA;AAEA;EACA,qBAAA;EACA,kBAAA;CACA;AAEA;EACA,qBAAA;EACA,kBAAA;CACA;AAEA;EACA,0BAAA;EACA,sBAAA;CACA;AAEA;EACA,6BAAA;EACA,yBAAA;CACA;AAEA;EACA,gBAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,gBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/09/25. -->\n<!--A Cell -->\n\n<template>\n  <div\n    :class=\"['wxc-cell', hasTopBorder && 'cell-top-border', hasBottomBorder && 'cell-bottom-border', hasMargin && 'cell-margin', hasVerticalIndent && 'cell-indent', desc && 'has-desc']\"\n    :style=\"cellStyle\"\n    :accessible=\"autoAccessible\"\n    :aria-label=\"`${label},${title},${desc}`\"\n    @click=\"cellClicked\">\n    <slot name=\"label\">\n      <div v-if=\"label\">\n        <text class=\"cell-label-text\">{{label}}</text>\n      </div>\n    </slot>\n    <div class=\"cell-title\">\n      <slot name=\"title\">\n        <text class=\"cell-content\">{{title}}</text>\n        <text class=\"cell-desc-text\"\n              v-if=\"desc\">{{desc}}</text>\n      </slot>\n    </div>\n    <slot name=\"value\"></slot>\n    <slot></slot>\n    <image :src=\"arrowIcon\"\n           class=\"cell-arrow-icon\"\n           :aria-hidden=\"true\"\n           v-if=\"hasArrow\"></image>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-cell {\n    height: 100px;\n    position: relative;\n    flex-direction: row;\n    align-items: center;\n    padding-left: 24px;\n    padding-right: 24px;\n    background-color: #ffffff;\n  }\n\n  .cell-margin {\n    margin-bottom: 24px;\n  }\n\n  .cell-title {\n    flex: 1;\n  }\n\n  .cell-indent {\n    padding-bottom: 30px;\n    padding-top: 30px;\n  }\n\n  .has-desc {\n    padding-bottom: 18px;\n    padding-top: 18px;\n  }\n\n  .cell-top-border {\n    border-top-color: #e2e2e2;\n    border-top-width: 1px;\n  }\n\n  .cell-bottom-border {\n    border-bottom-color: #e2e2e2;\n    border-bottom-width: 1px;\n  }\n\n  .cell-label-text {\n    font-size: 30px;\n    color: #666666;\n    width: 188px;\n    margin-right: 10px;\n  }\n\n  .cell-arrow-icon {\n    width: 22px;\n    height: 22px;\n  }\n\n  .cell-content {\n    color: #333333;\n    font-size: 30px;\n    line-height: 40px;\n  }\n\n  .cell-desc-text {\n    color: #999999;\n    font-size: 24px;\n    line-height: 30px;\n    margin-top: 4px;\n  }\n</style>\n\n<script>\n  import Utils from '../utils';\n\n  export default {\n    props: {\n      label: {\n        type: String,\n        default: ''\n      },\n      title: {\n        type: String,\n        default: ''\n      },\n      desc: {\n        type: String,\n        default: ''\n      },\n      link: {\n        type: String,\n        default: ''\n      },\n      hasTopBorder: {\n        type: Boolean,\n        default: false\n      },\n      hasMargin: {\n        type: Boolean,\n        default: false\n      },\n      hasBottomBorder: {\n        type: Boolean,\n        default: true\n      },\n      hasArrow: {\n        type: Boolean,\n        default: false\n      },\n      arrowIcon: {\n        type: String,\n        default: 'https://gw.alicdn.com/tfs/TB11zBUpwMPMeJjy1XbXXcwxVXa-22-22.png'\n      },\n      hasVerticalIndent: {\n        type: Boolean,\n        default: true\n      },\n      cellStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      autoAccessible: {\n        type: Boolean,\n        default: true\n      }\n    },\n    methods: {\n      cellClicked (e) {\n        const link = this.link;\n        this.$emit('wxcCellClicked', { e });\n        link && Utils.goToH5Page(link, true);\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.iconfont[data-v-6c8aef98] {\n  font-family: iconfont;\n}\n.img_src[data-v-6c8aef98] {\n  width: 750px;\n  height: 750px;\n}\n.wxc-demo[data-v-6c8aef98] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background-color: #fff;\n}\n.button-list[data-v-6c8aef98] {\n  padding-left: 24px;\n}\n.button-text[data-v-6c8aef98] {\n  margin-top: 40px;\n  margin-left: 8px;\n  margin-bottom: 16px;\n}\n.scroller[data-v-6c8aef98] {\n  flex: 1;\n}\n.demo[data-v-6c8aef98] {\n  align-items: center;\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n.input[data-v-6c8aef98] {\n  width: 500px;\n  text-align: right;\n  font-size: 28px;\n}\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/src/index.vue"],"names":[],"mappings":";AAAA;EACE,sBAAsB;CAAE;AAE1B;EACE,aAAa;EACb,cAAc;CAAE;AAElB;EACE,mBAAmB;EACnB,OAAO;EACP,SAAS;EACT,QAAQ;EACR,UAAU;EACV,uBAAuB;CAAE;AAE3B;EACE,mBAAmB;CAAE;AAEvB;EACE,iBAAiB;EACjB,iBAAiB;EACjB,oBAAoB;CAAE;AAExB;EACE,QAAQ;CAAE;AAEZ;EACE,oBAAoB;EACpB,iBAAiB;EACjB,oBAAoB;CAAE;AAExB;EACE,aAAa;EACb,kBAAkB;EAClB,gBAAgB;CAAE","file":"index.vue","sourcesContent":[".iconfont {\n  font-family: iconfont; }\n\n.img_src {\n  width: 750px;\n  height: 750px; }\n\n.wxc-demo {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background-color: #fff; }\n\n.button-list {\n  padding-left: 24px; }\n\n.button-text {\n  margin-top: 40px;\n  margin-left: 8px;\n  margin-bottom: 16px; }\n\n.scroller {\n  flex: 1; }\n\n.demo {\n  align-items: center;\n  margin-top: 40px;\n  margin-bottom: 40px; }\n\n.input {\n  width: 500px;\n  text-align: right;\n  font-size: 28px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.wrap[data-v-7e2ba1b8] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.wxc-result[data-v-7e2ba1b8] {\n  width: 750px;\n  flex: 1;\n  align-items: center;\n  background-color: #f2f3f4;\n}\n.result-image[data-v-7e2ba1b8] {\n  width: 320px;\n  height: 320px;\n}\n.result-content[data-v-7e2ba1b8] {\n  margin-top: 36px;\n  align-items: center;\n}\n.content-text[data-v-7e2ba1b8] {\n  font-size: 30px;\n  color: #A5A5A5;\n  height: 42px;\n  line-height: 42px;\n  text-align: center;\n}\n.content-desc[data-v-7e2ba1b8] {\n  margin-top: 10px;\n}\n.result-button[data-v-7e2ba1b8] {\n  margin-top: 60px;\n  border-width: 1px;\n  border-color: #979797;\n  background-color: #FFFFFF;\n  border-radius: 6px;\n  width: 240px;\n  height: 72px;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n.button-text[data-v-7e2ba1b8] {\n  color: #666666;\n  font-size: 30px;\n}\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/node_modules/weex-ui/packages/wxc-result/index.vue?16e90a89"],"names":[],"mappings":";AA0BA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;CACA;AAEA;EACA,aAAA;EACA,QAAA;EACA,oBAAA;EACA,0BAAA;CACA;AAEA;EACA,aAAA;EACA,cAAA;CACA;AAEA;EACA,iBAAA;EACA,oBAAA;CACA;AAEA;EACA,gBAAA;EACA,eAAA;EACA,aAAA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,iBAAA;CACA;AAEA;EACA,iBAAA;EACA,kBAAA;EACA,sBAAA;EACA,0BAAA;EACA,mBAAA;EACA,aAAA;EACA,aAAA;EACA,oBAAA;EACA,oBAAA;EACA,wBAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A  result page-->\n\n<template>\n  <div class=\"wrap\" v-if=\"show\" :style=\"wrapStyle\">\n    <div class=\"wxc-result\" :style=\"{paddingTop: setPaddingTop }\">\n      <image class=\"result-image\"\n             :aria-hidden=\"true\"\n             :src=\"resultType.pic\"></image>\n      <div class=\"result-content\" v-if=\"resultType.content\">\n        <text class=\"content-text\">{{resultType.content}}</text>\n        <text class=\"content-text content-desc\"\n              v-if=\"resultType.desc\">{{resultType.desc}}</text>\n      </div>\n      <div class=\"result-button\"\n           v-if=\"resultType.button\"\n           @touchend=\"handleTouchEnd\"\n           @click=\"onClick\">\n        <text class=\"button-text\">{{resultType.button}}</text>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wrap {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n\n  .wxc-result {\n    width: 750px;\n    flex: 1;\n    align-items: center;\n    background-color: #f2f3f4;\n  }\n\n  .result-image {\n    width: 320px;\n    height: 320px;\n  }\n\n  .result-content {\n    margin-top: 36px;\n    align-items: center;\n  }\n\n  .content-text {\n    font-size: 30px;\n    color: #A5A5A5;\n    height: 42px;\n    line-height: 42px;\n    text-align: center;\n  }\n\n  .content-desc {\n    margin-top: 10px;\n  }\n\n  .result-button {\n    margin-top: 60px;\n    border-width: 1px;\n    border-color: #979797;\n    background-color: #FFFFFF;\n    border-radius: 6px;\n    width: 240px;\n    height: 72px;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .button-text {\n    color: #666666;\n    font-size: 30px;\n  }\n</style>\n\n<script>\n  import TYPES from './type';\n  import Utils from '../utils';\n\n  export default {\n    props: {\n      type: {\n        type: String,\n        default: 'errorPage'\n      },\n      show: {\n        type: Boolean,\n        default: true\n      },\n      wrapStyle: Object,\n      paddingTop: {\n        type: [Number, String],\n        default: 232\n      },\n      customSet: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    computed: {\n      resultType () {\n        const { type, customSet } = this;\n        const allTypes = Utils.isEmptyObject(customSet) ? TYPES : Utils.mergeDeep(TYPES, customSet);\n        let types = allTypes['errorPage'];\n        if (['errorPage', 'noGoods', 'noNetwork', 'errorLocation'].indexOf(type) > -1) {\n          types = allTypes[type];\n        }\n        return types;\n      },\n      setPaddingTop () {\n        const paddingTop = this.paddingTop;\n        return `${paddingTop}px`\n      }\n    },\n    methods: {\n      handleTouchEnd (e) {\n        // web上面有点击穿透问题\n        const { platform } = weex.config.env;\n        platform === 'Web' && e.preventDefault && e.preventDefault();\n      },\n      onClick () {\n        const type = this.type;\n        this.$emit('wxcResultButtonClicked', { type })\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"shop.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.wrapper[data-v-ad27ba16] {\n    width: 750;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: #f6f6f6;\n}\n.content[data-v-ad27ba16] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    margin-bottom: 88;\n}\n.tabbar[data-v-ad27ba16] {\n    flex-direction: row;\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 88;\n}\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/src/assets/components/tabBar.vue?553c5cc9"],"names":[],"mappings":";AAgCA;IACA,WAAA;IACA,mBAAA;IACA,OAAA;IACA,QAAA;IACA,SAAA;IACA,UAAA;IACA,0BAAA;CACA;AACA;IACA,mBAAA;IACA,OAAA;IACA,QAAA;IACA,SAAA;IACA,UAAA;IACA,kBAAA;CACA;AACA;IACA,oBAAA;IACA,gBAAA;IACA,UAAA;IACA,QAAA;IACA,SAAA;IACA,WAAA;CACA","file":"tabBar.vue","sourcesContent":["<template>\n    <div class=\"wrapper\">\n        <embed\n                v-for=\"(item , i) in tabItems\"\n                :src=\"item.src\"\n                :key=\"i\"\n                type=\"weex\"\n                :style=\"{ visibility: item.visibility}\"\n                class=\"content\"\n                v-if=\"!is_web\"\n        ></embed>\n        <div class=\"tabbar\" append=\"tree\">\n            <tabitem\n                    v-for=\"item in tabItems\"\n                    :key=\"item.index\"\n                    :index=\"item.index\"\n                    :icon=\"item.icon\"\n                    :title=\"item.title\"\n                    :titleColor=\"item.titleColor\"\n                    @tabItemOnClick=\"tabItemOnClick\"\n            ></tabItem>\n        </div>\n        <div v-if=\"is_web\" style=\"background-color: #f6f6f6\">\n            <order v-if=\"selectedIndex == 0\"></order>\n            <check-order v-if=\"selectedIndex == 1\"></check-order>\n            <shop v-if=\"selectedIndex == 2\"></shop>\n            <user v-if=\"selectedIndex == 3\"></user>\n        </div>\n    </div>\n</template>\n\n<style scoped >\n    .wrapper {\n        width: 750;\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background-color: #f6f6f6;\n    }\n    .content {\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        margin-bottom: 88;\n    }\n    .tabbar {\n        flex-direction: row;\n        position: fixed;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        height: 88;\n    }\n</style>\n\n<script>\n    import order from '../views/tabItems/order.vue'\n    import checkOrder from '../views/tabItems/checkOrder.vue'\n    import shop from '../views/tabItems/shop.vue'\n    import user from '../views/tabItems/user.vue'\n\n    export default {\n        props: {\n            tabItems: { default: [] },\n            selectedColor: { default: '#ff0000' },\n            unselectedColor: { default: '#000000' }\n        },\n        data: function () {\n            return {\n                selectedIndex: 0,\n                is_web: false,\n                is_ios: 0,\n            }\n        },\n        components: {\n            tabitem: require('./tabitem.vue'),\n            order,\n            checkOrder,\n            shop,\n            user,\n        },\n        created: function () {\n            let platform = weex.config.env ? weex.config.env.platform : weex.config.platform;\n            if (platform.toLowerCase() == 'web'){\n                this.is_web = true;\n            }\n            this.select(this.selectedIndex);\n        },\n        methods: {\n            tabItemOnClick: function (e) {\n                this.selectedIndex = e.index;\n                this.select(e.index);\n                this.$emit('tabBarOnClick', e);\n            },\n            select: function(index) {\n                for(var i = 0; i < this.tabItems.length; i++) {\n                    var tabItem = this.tabItems[i];\n                    if(i == index){\n                        tabItem.icon = tabItem.selectedImage;\n                        tabItem.titleColor = this.selectedColor;\n                        tabItem.visibility = 'visible';\n                    }\n                    else {\n                        tabItem.icon = tabItem.image;\n                        tabItem.titleColor = this.unselectedColor;\n                        tabItem.visibility = 'hidden';\n                    }\n                }\n            },\n        }\n    }\n</script>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.wxc-btn[data-v-e0502ae6] {\n  width: 702px;\n  height: 88px;\n  align-items: center;\n  justify-content: center;\n  border-radius: 12px;\n}\n.btn-text[data-v-e0502ae6] {\n  text-overflow: ellipsis;\n  lines: 1;\n  font-size: 36px;\n  color: #FFFFFF;\n}\n\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/node_modules/weex-ui/packages/wxc-button/index.vue?7bb118c3"],"names":[],"mappings":";AA8DA;EACA,aAAA;EACA,aAAA;EACA,oBAAA;EACA,wBAAA;EACA,oBAAA;CACA;AAEA;EACA,wBAAA;EACA,SAAA;EACA,gBAAA;EACA,eAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div class=\"wxc-btn\"\n       :style=\"mrBtnStyle\"\n       @click=\"onClicked\"\n       :accessible=\"true\"\n       :aria-label=\"text\">\n    <text class=\"btn-text\" :style=\"mrTextStyle\">{{text}}</text>\n  </div>\n</template>\n\n<script>\n  import { STYLE_MAP, TEXT_STYLE_MAP } from './type'\n\n  export default {\n    props: {\n      text: {\n        type: String,\n        default: '确认'\n      },\n      type: {\n        type: String,\n        default: 'taobao'\n      },\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      btnStyle: Object,\n      textStyle: Object\n    },\n    computed: {\n      mrBtnStyle () {\n        const { type, disabled, btnStyle } = this;\n        const mrBtnStyle = {\n          ...STYLE_MAP[type],\n          ...btnStyle\n        };\n        return disabled ? {\n          ...mrBtnStyle,\n          backgroundColor: 'rgba(0, 0, 0, 0.1)',\n          borderWidth: 0\n        } : mrBtnStyle;\n      },\n      mrTextStyle () {\n        const { type, disabled, textStyle } = this;\n        const mrTextStyle = { ...TEXT_STYLE_MAP[type], ...textStyle };\n        return disabled ? { ...mrTextStyle, color: '#FFFFFF' } : mrTextStyle;\n      }\n    },\n    methods: {\n      onClicked (e) {\n        const { type, disabled } = this;\n        this.$emit('wxcButtonClicked', { e, type, disabled })\n      }\n    }\n  }\n</script>\n\n<style scoped>\n  .wxc-btn {\n    width: 702px;\n    height: 88px;\n    align-items: center;\n    justify-content: center;\n    border-radius: 12px;\n  }\n\n  .btn-text {\n    text-overflow: ellipsis;\n    lines: 1;\n    font-size: 36px;\n    color: #FFFFFF;\n  }\n\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.iconfont[data-v-e7856bb4] {\n  font-family: iconfont;\n}\n.wrapper[data-v-e7856bb4] {\n  background-color: #ffffff;\n  align-items: center;\n  padding-top: 112px;\n}\n.red[data-v-e7856bb4] {\n  color: #FC345C;\n}\n.wxc-dom[data-v-e7856bb4] {\n  margin-top: 30px;\n}\n.login-test[data-v-e7856bb4] {\n  color: #FC345C;\n}\n.button-list[data-v-e7856bb4] {\n  /*padding-left: 24px;*/\n}\n.button-text[data-v-e7856bb4] {\n  margin-top: 40px;\n  margin-left: 8px;\n  margin-bottom: 16px;\n}\n.input[data-v-e7856bb4] {\n  width: 560px;\n  height: 80px;\n  line-height: 80px;\n  text-align: left;\n  margin-left: 30px;\n}\n.input2[data-v-e7856bb4] {\n  width: 360px;\n  height: 80px;\n  line-height: 80px;\n  text-align: left;\n  margin-left: 30px;\n}\n.btn_send[data-v-e7856bb4] {\n  width: 200px;\n  height: 80px;\n  line-height: 80px;\n  text-align: center;\n  border-width: 1px;\n  border-style: solid;\n  border-color: #FC345C;\n  border-radius: 6px;\n  color: #FC345C;\n}\n.btn_send_after[data-v-e7856bb4] {\n  border-width: 1px;\n  border-color: #cccccc;\n  border-style: solid;\n  color: #cccccc;\n  width: 200px;\n  height: 80px;\n  line-height: 80px;\n  text-align: center;\n  border-radius: 6px;\n}\n.btn_input[data-v-e7856bb4] {\n  margin-top: 30px;\n}\n", "", {"version":3,"sources":["/Users/wilson/weex/weex-star/src/assets/views/login.vue"],"names":[],"mappings":";AAAA;EACE,sBAAsB;CAAE;AAE1B;EACE,0BAA0B;EAC1B,oBAAoB;EACpB,mBAAmB;CAAE;AAEvB;EACE,eAAe;CAAE;AAEnB;EACE,iBAAiB;CAAE;AAErB;EACE,eAAe;CAAE;AAEnB;EACE,uBAAuB;CAAE;AAE3B;EACE,iBAAiB;EACjB,iBAAiB;EACjB,oBAAoB;CAAE;AAExB;EACE,aAAa;EACb,aAAa;EACb,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;CAAE;AAEtB;EACE,aAAa;EACb,aAAa;EACb,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;CAAE;AAEtB;EACE,aAAa;EACb,aAAa;EACb,kBAAkB;EAClB,mBAAmB;EACnB,kBAAkB;EAClB,oBAAoB;EACpB,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;CAAE;AAEnB;EACE,kBAAkB;EAClB,sBAAsB;EACtB,oBAAoB;EACpB,eAAe;EACf,aAAa;EACb,aAAa;EACb,kBAAkB;EAClB,mBAAmB;EACnB,mBAAmB;CAAE;AAEvB;EACE,iBAAiB;CAAE","file":"login.vue","sourcesContent":[".iconfont {\n  font-family: iconfont; }\n\n.wrapper {\n  background-color: #ffffff;\n  align-items: center;\n  padding-top: 112px; }\n\n.red {\n  color: #FC345C; }\n\n.wxc-dom {\n  margin-top: 30px; }\n\n.login-test {\n  color: #FC345C; }\n\n.button-list {\n  /*padding-left: 24px;*/ }\n\n.button-text {\n  margin-top: 40px;\n  margin-left: 8px;\n  margin-bottom: 16px; }\n\n.input {\n  width: 560px;\n  height: 80px;\n  line-height: 80px;\n  text-align: left;\n  margin-left: 30px; }\n\n.input2 {\n  width: 360px;\n  height: 80px;\n  line-height: 80px;\n  text-align: left;\n  margin-left: 30px; }\n\n.btn_send {\n  width: 200px;\n  height: 80px;\n  line-height: 80px;\n  text-align: center;\n  border-width: 1px;\n  border-style: solid;\n  border-color: #FC345C;\n  border-radius: 6px;\n  color: #FC345C; }\n\n.btn_send_after {\n  border-width: 1px;\n  border-color: #cccccc;\n  border-style: solid;\n  color: #cccccc;\n  width: 200px;\n  height: 80px;\n  line-height: 80px;\n  text-align: center;\n  border-radius: 6px; }\n\n.btn_input {\n  margin-top: 30px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(79);
var parse = __webpack_require__(78);
var formats = __webpack_require__(13);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObjectRecursive(chain, val, options) {
    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj;
    if (root === '[]') {
        obj = [];
        obj = obj.concat(parseObject(chain, val, options));
    } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
        var index = parseInt(cleanRoot, 10);
        if (
            !isNaN(index)
            && root !== cleanRoot
            && String(index) === cleanRoot
            && index >= 0
            && (options.parseArrays && index <= options.arrayLimit)
        ) {
            obj = [];
            obj[index] = parseObject(chain, val, options);
        } else {
            obj[cleanRoot] = parseObject(chain, val, options);
        }
    }

    return obj;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);
var formats = __webpack_require__(13);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var required = __webpack_require__(80)
  , qs = __webpack_require__(82)
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @api public
 */
function lolcation(loc) {
  loc = loc || global.location || {};

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new URL(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new URL(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @api private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @api private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @api public
 */
function URL(address, location, parser) {
  if (!(this instanceof URL)) {
    return new URL(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[2] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];
    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL}
 * @api public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
      url.pathname = value.length && value.charAt(0) !== '/' ? '/' + value : value;

      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String}
 * @api public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

URL.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
URL.extractProtocol = extractProtocol;
URL.location = lolcation;
URL.qs = qs;

module.exports = URL;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(105)))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  //
  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
  // the lastIndex property so we can continue executing this loop until we've
  // parsed all results.
  //
  for (;
    part = parser.exec(query);
    result[decode(part[1])] = decode(part[2])
  );

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(103)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(53),
  /* template */
  __webpack_require__(94),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-e0502ae6",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/node_modules/weex-ui/packages/wxc-button/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e0502ae6", Component.options)
  } else {
    hotAPI.reload("data-v-e0502ae6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(98)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(54),
  /* template */
  __webpack_require__(89),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4e0100bd",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/node_modules/weex-ui/packages/wxc-cell/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e0100bd", Component.options)
  } else {
    hotAPI.reload("data-v-4e0100bd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(100)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(91),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7e2ba1b8",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wilson/weex/weex-star/node_modules/weex-ui/packages/wxc-result/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e2ba1b8", Component.options)
  } else {
    hotAPI.reload("data-v-7e2ba1b8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('udot-nav-bar', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "title": "24h便利店",
      "background-color": "#fc345c",
      "text-color": "#FFFFFF",
      "use-default-return": _vm.useDefaultReturn,
      "right-text": "设置",
      "left-button": ""
    },
    on: {
      "wxcMinibarLeftButtonClicked": _vm.minibarLeftButtonClick,
      "wxcMinibarRightButtonClicked": _vm.minibarRightButtonClick
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "home-menu",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "home-menu-item",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('image', {
    staticClass: "home-menu-item_img",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": "http://ozfrvjgew.bkt.clouddn.com/order.png"
    }
  }), _vm._v(" "), _c('text', {
    staticClass: "home-menu-item_title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("待接单")]), _vm._v(" "), _c('text', {
    staticClass: "home-menu-item_blef",
    staticStyle: _vm.$processStyle({
      "top": "90px",
      "right": "34px",
      "padding-left": "3px",
      "padding-right": "3px"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("123")])]), _vm._v(" "), _c('div', {
    staticClass: "home-menu-item",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('image', {
    staticClass: "home-menu-item_img",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": "http://ozfrvjgew.bkt.clouddn.com/send.png"
    }
  }), _vm._v(" "), _c('text', {
    staticClass: "home-menu-item_title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("待发货")]), _vm._v(" "), _c('text', {
    staticClass: "home-menu-item_blef",
    staticStyle: _vm.$processStyle({
      "width": "18px",
      "height": "18px"
    }),
    style: (_vm.$processStyle(undefined))
  })]), _vm._v(" "), _c('div', {
    staticClass: "home-menu-item",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('image', {
    staticClass: "home-menu-item_img",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": "http://ozfrvjgew.bkt.clouddn.com/delivery.png"
    }
  }), _vm._v(" "), _c('text', {
    staticClass: "home-menu-item_title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("待送达")]), _vm._v(" "), _c('text', {
    staticClass: "home-menu-item_blef",
    staticStyle: _vm.$processStyle({
      "width": "18px",
      "height": "18px"
    }),
    style: (_vm.$processStyle(undefined))
  })]), _vm._v(" "), _c('div', {
    staticClass: "home-menu-item",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('image', {
    staticClass: "home-menu-item_img",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": "http://ozfrvjgew.bkt.clouddn.com/server.png"
    }
  }), _vm._v(" "), _c('text', {
    staticClass: "home-menu-item_title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("售后")]), _vm._v(" "), _c('text', {
    staticClass: "home-menu-item_blef",
    staticStyle: _vm.$processStyle({
      "width": "18px",
      "height": "18px"
    }),
    style: (_vm.$processStyle(undefined))
  })])]), _vm._v(" "), _c('wxc-cell', {
    staticClass: "list-top",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "has-arrow": true
    },
    on: {
      "wxcCellClicked": _vm.wxcCellClicked
    }
  }, [_c('image', {
    staticClass: "list-img",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "slot": "label",
      "src": "http://ozfrvjgew.bkt.clouddn.com/bing.png"
    },
    slot: "label"
  }), _vm._v(" "), _c('text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v("经营数据统计")])]), _vm._v(" "), _c('div', {
    staticClass: "home-bill",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "home-bill-item border-right",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "home-bill-item_title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("278.00")]), _vm._v(" "), _c('text', {
    staticClass: "home-bill-item_brief",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("今日营业额(元)")])]), _vm._v(" "), _c('div', {
    staticClass: "home-bill-item border-right",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "home-bill-item_title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("126")]), _vm._v(" "), _c('text', {
    staticClass: "home-bill-item_brief",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("今日订单")])]), _vm._v(" "), _c('div', {
    staticClass: "home-bill-item",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "home-bill-item_title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("40.00")]), _vm._v(" "), _c('text', {
    staticClass: "home-bill-item_brief",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("客单价(元)")])])]), _vm._v(" "), _c('wxc-cell', {
    staticClass: "list-top",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "has-arrow": true
    },
    on: {
      "wxcCellClicked": _vm.wxcCellClicked
    }
  }, [_c('image', {
    staticClass: "list-img",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "slot": "label",
      "src": "http://ozfrvjgew.bkt.clouddn.com/bill_detail.png"
    },
    slot: "label"
  }), _vm._v(" "), _c('text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v("账单明细")])]), _vm._v(" "), _c('wxc-cell', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "has-arrow": true,
      "has-bottom-border": false
    },
    on: {
      "wxcCellClicked": _vm.wxcCellClicked
    }
  }, [_c('image', {
    staticClass: "list-img",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "slot": "label",
      "src": "http://ozfrvjgew.bkt.clouddn.com/shop_set.png"
    },
    slot: "label"
  }), _vm._v(" "), _c('text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v("店铺管理")])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0d340006", module.exports)
  }
}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wxc-minibar', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: _vm.height,
      paddingTop: _vm.top
    })),
    attrs: {
      "title": _vm.title,
      "background-color": _vm.backgroundColor,
      "text-color": _vm.textColor,
      "right-text": _vm.rightText,
      "right-button": _vm.rightButton,
      "left-button": _vm.leftButton,
      "use-default-return": _vm.useDefaultReturn,
      "show": _vm.show
    },
    on: {
      "wxcMinibarLeftButtonClicked": _vm.minibarLeftButtonClick,
      "wxcMinibarRightButtonClicked": _vm.minibarRightButtonClick
    }
  }, [_c('text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_c('image', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": "https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png"
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0d4afda7", module.exports)
  }
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('udot-search-bar', {
    ref: "wxc-searchbar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: _vm.height,
      paddingTop: _vm.top
    })),
    attrs: {
      "placeholder": "输入订单号/买家用户名",
      "mod": ""
    },
    on: {
      "wxcSearchbarCancelClicked": _vm.wxcSearchbarCancelClicked,
      "wxcSearchbarInputReturned": _vm.wxcSearchbarInputReturned,
      "wxcSearchbarInputOnInput": _vm.wxcSearchbarInputOnInput,
      "wxcSearchbarCloseClicked": _vm.wxcSearchbarCloseClicked,
      "wxcSearchbarInputOnFocus": _vm.wxcSearchbarInputOnFocus,
      "wxcSearchbarInputOnBlur": _vm.wxcSearchbarInputOnBlur
    }
  }), _vm._v(" "), _c('udot-tabtop', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "itemList": _vm.itemList
    },
    on: {
      "tabTopItemOnClick": _vm.tabTopItemOnClick
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-39fec007", module.exports)
  }
}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['wxc-cell', _vm.hasTopBorder && 'cell-top-border', _vm.hasBottomBorder && 'cell-bottom-border', _vm.hasMargin && 'cell-margin', _vm.hasVerticalIndent && 'cell-indent', _vm.desc && 'has-desc'],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.cellStyle)),
    attrs: {
      "accessible": _vm.autoAccessible,
      "aria-label": (_vm.label + "," + _vm.title + "," + _vm.desc)
    },
    on: {
      "click": _vm.cellClicked
    }
  }, [_vm._t("label", [(_vm.label) ? _c('div', [_c('text', {
    staticClass: "cell-label-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.label))])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "cell-title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._t("title", [_c('text', {
    staticClass: "cell-content",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), (_vm.desc) ? _c('text', {
    staticClass: "cell-desc-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.desc))]) : _vm._e()])], 2), _vm._v(" "), _vm._t("value"), _vm._v(" "), _vm._t("default"), _vm._v(" "), (_vm.hasArrow) ? _c('image', {
    staticClass: "cell-arrow-icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.arrowIcon,
      "aria-hidden": true
    }
  }) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4e0100bd", module.exports)
  }
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: _vm.$processStyle({
      "flex-direction": "column"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_c('tab-bar', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "tabItems": _vm.tabItems
    },
    on: {
      "tabBarOnClick": _vm.tabBarOnClick
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6c8aef98", module.exports)
  }
}

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: "wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.wrapStyle))
  }, [_c('div', {
    staticClass: "wxc-result",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      paddingTop: _vm.setPaddingTop
    }))
  }, [_c('image', {
    staticClass: "result-image",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "aria-hidden": true,
      "src": _vm.resultType.pic
    }
  }), _vm._v(" "), (_vm.resultType.content) ? _c('div', {
    staticClass: "result-content",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "content-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.resultType.content))]), _vm._v(" "), (_vm.resultType.desc) ? _c('text', {
    staticClass: "content-text content-desc",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.resultType.desc))]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.resultType.button) ? _c('div', {
    staticClass: "result-button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "touchend": _vm.handleTouchEnd,
      "click": _vm.onClick
    }
  }, [_c('text', {
    staticClass: "button-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.resultType.button))])]) : _vm._e()])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7e2ba1b8", module.exports)
  }
}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "hello",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('wxc-minibar', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "title": _vm.msg,
      "background-color": "#009ff0",
      "text-color": "#FFFFFF",
      "left-button": "",
      "right-text": "更多"
    },
    on: {
      "wxcMinibarLeftButtonClicked": _vm.minibarLeftButtonClick,
      "wxcMinibarRightButtonClicked": _vm.minibarRightButtonClick
    }
  }), _vm._v(" "), _c('h1', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.gopage
    }
  }, [_vm._v(_vm._s(_vm.msg))])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8b4ef2d2", module.exports)
  }
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._l((_vm.tabItems), function(item, i) {
    return (!_vm.is_web) ? _c('embed', {
      key: i,
      staticClass: "content",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        visibility: item.visibility
      })),
      attrs: {
        "src": item.src,
        "type": "weex"
      }
    }) : _vm._e()
  }), _vm._v(" "), _c('div', {
    staticClass: "tabbar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "append": "tree"
    }
  }, _vm._l((_vm.tabItems), function(item) {
    return _c('tabitem', {
      key: item.index,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "index": item.index,
        "icon": item.icon,
        "title": item.title,
        "titleColor": item.titleColor
      },
      on: {
        "tabItemOnClick": _vm.tabItemOnClick
      }
    })
  })), _vm._v(" "), (_vm.is_web) ? _c('div', {
    staticStyle: _vm.$processStyle({
      "background-color": "#f6f6f6"
    }),
    style: (_vm.$processStyle(undefined))
  }, [(_vm.selectedIndex == 0) ? _c('order') : _vm._e(), _vm._v(" "), (_vm.selectedIndex == 1) ? _c('check-order') : _vm._e(), _vm._v(" "), (_vm.selectedIndex == 2) ? _c('shop') : _vm._e(), _vm._v(" "), (_vm.selectedIndex == 3) ? _c('user') : _vm._e()], 1) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ad27ba16", module.exports)
  }
}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-btn",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrBtnStyle)),
    attrs: {
      "accessible": true,
      "aria-label": _vm.text
    },
    on: {
      "click": _vm.onClicked
    }
  }, [_c('text', {
    staticClass: "btn-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrTextStyle))
  }, [_vm._v(_vm._s(_vm.text))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e0502ae6", module.exports)
  }
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper",
    staticStyle: _vm.$processStyle({
      "background-color": "#ffffff"
    }),
    style: (_vm.$processStyle(undefined))
  }, [_c('image', {
    staticStyle: _vm.$processStyle({
      "width": "162px",
      "height": "162px"
    }),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": "http://cdn.udian.me/logo.png"
    }
  }), _vm._v(" "), _c('wxc-cell', {
    staticClass: "wxc-dom",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "has-top-border": false
    }
  }, [_c('image', {
    staticStyle: _vm.$processStyle({
      "width": "32px",
      "height": "32px"
    }),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "slot": "title",
      "src": "http://cdn.udian.me/mobile.png"
    },
    slot: "title"
  }), _vm._v(" "), _c('input', {
    staticClass: "input2",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "placeholder": "请输入标题",
      "type": "tel",
      "maxlength": "11"
    },
    domProps: {
      "value": _vm.mobile
    },
    on: {
      "input": function($event) {
        _vm.mobile = $event.value
      }
    }
  }), _vm._v(" "), _c('text', {
    class: [_vm.is_send ? 'btn_send_after' : 'btn_send'],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.send_msg
    }
  }, [_vm._v(_vm._s(_vm.sendContent) + _vm._s(_vm.is_send ? '(' + _vm.second + ')' : ''))])]), _vm._v(" "), _c('wxc-cell', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "has-top-border": false
    }
  }, [_c('image', {
    staticStyle: _vm.$processStyle({
      "width": "32px",
      "height": "32px"
    }),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "slot": "title",
      "src": "http://cdn.udian.me/code.png"
    },
    slot: "title"
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.password),
      expression: "password"
    }],
    staticClass: "input",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "placeholder": "请输入密码",
      "type": "password",
      "maxlength": "4"
    },
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "button-list",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('wxc-button', {
    staticClass: "btn_input",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "text": "确定",
      "type": "fliggy"
    },
    on: {
      "wxcButtonClicked": _vm.wxcButtonClicked
    }
  })], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e7856bb4", module.exports)
  }
}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(68);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("35bf3edc", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0d340006\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0d340006\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(69);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("478487c2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-39fec007\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./checkOrder.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-39fec007\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./checkOrder.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(70);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("353008a4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js?sourceMap!../../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4e0100bd\",\"scoped\":true,\"hasInlineConfig\":false}!../../../vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../css-loader/index.js?sourceMap!../../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4e0100bd\",\"scoped\":true,\"hasInlineConfig\":false}!../../../vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("46e35376", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6c8aef98\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6c8aef98\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(72);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f57aee04", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js?sourceMap!../../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e2ba1b8\",\"scoped\":true,\"hasInlineConfig\":false}!../../../vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../css-loader/index.js?sourceMap!../../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e2ba1b8\",\"scoped\":true,\"hasInlineConfig\":false}!../../../vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(73);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("285814d3", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8b4ef2d2\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./shop.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8b4ef2d2\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./shop.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(74);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ab09baca", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ad27ba16\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tabBar.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ad27ba16\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tabBar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(75);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("fddc9c40", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js?sourceMap!../../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e0502ae6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../css-loader/index.js?sourceMap!../../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e0502ae6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(76);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("14295a97", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e7856bb4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e7856bb4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 105 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var App = __webpack_require__(52);
App.el = '#root';
new Vue(App);

/***/ })
/******/ ]);
//# sourceMappingURL=index.web.js.map