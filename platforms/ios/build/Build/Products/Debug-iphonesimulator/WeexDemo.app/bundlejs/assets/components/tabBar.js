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
/******/ 	return __webpack_require__(__webpack_require__.s = 92);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pageRouter = __webpack_require__(57);

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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(29);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _qs = __webpack_require__(58);

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                                * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
                                                                                                                                                                                                                                                                                * Created by Tw93 on 17/11/01
                                                                                                                                                                                                                                                                                */

var _urlParse = __webpack_require__(62);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(66);

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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(42)
)

/* script */
__vue_exports__ = __webpack_require__(36)

/* template */
var __vue_template__ = __webpack_require__(48)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/src/assets/views/tabItems/checkOrder.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-6c850770"
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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(41)
)

/* script */
__vue_exports__ = __webpack_require__(37)

/* template */
var __vue_template__ = __webpack_require__(47)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/src/assets/views/tabItems/order.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-30fe41c8"
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(45)
)

/* script */
__vue_exports__ = __webpack_require__(38)

/* template */
var __vue_template__ = __webpack_require__(52)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/src/assets/views/tabItems/shop.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-3de5c798"
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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(20)
)

/* script */
__vue_exports__ = __webpack_require__(16)

/* template */
var __vue_template__ = __webpack_require__(26)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/src/assets/views/tabItems/user.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-429865ed"
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


/***/ }),
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wxcMinibar = __webpack_require__(1);

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
/* 17 */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports) {

module.exports = {
  "iconfont": {
    "fontFamily": "iconfont"
  },
  "container": {
    "flex": 1,
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "height": 88
  },
  "top-line": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "height": 2
  },
  "tab-icon": {
    "marginTop": 5,
    "width": 40,
    "height": 40
  },
  "tab-text": {
    "marginTop": 5,
    "textAlign": "center",
    "fontSize": 20
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 21 */
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
/* 22 */
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
/* 23 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  })
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 24 */
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
/* 25 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["container"],
    style: {
      backgroundColor: _vm.backgroundColor
    },
    on: {
      "click": _vm.onclickitem
    }
  }, [_c('image', {
    staticClass: ["top-line"],
    attrs: {
      "src": "http://gtms03.alicdn.com/tps/i3/TB1mdsiMpXXXXXpXXXXNw4JIXXX-640-4.png"
    }
  }), _c('image', {
    staticClass: ["tab-icon"],
    attrs: {
      "src": _vm.icon
    }
  }), _c('text', {
    staticClass: ["tab-text"],
    style: {
      color: _vm.titleColor
    }
  }, [_vm._v(_vm._s(_vm.title))])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["hello"]
  }, [_c('wxc-minibar', {
    attrs: {
      "title": _vm.msg,
      "backgroundColor": "#009ff0",
      "textColor": "#FFFFFF",
      "leftButton": "",
      "rightText": "更多"
    },
    on: {
      "wxcMinibarLeftButtonClicked": _vm.minibarLeftButtonClick,
      "wxcMinibarRightButtonClicked": _vm.minibarRightButtonClick
    }
  }), _c('h1', [_vm._v(_vm._s(_vm.msg))])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 27 */
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
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(31)
)

/* script */
__vue_exports__ = __webpack_require__(30)

/* template */
var __vue_template__ = __webpack_require__(32)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/node_modules/weex-ui/packages/wxc-minibar/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-a4c42254"
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


/***/ }),
/* 30 */
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
/* 31 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-minibar": {
    "width": 750,
    "height": 90,
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "backgroundColor": "#009ff0"
  },
  "left": {
    "width": 90
  },
  "middle-title": {
    "fontSize": 30,
    "color": "#ffffff",
    "height": 36,
    "lineHeight": 34
  },
  "right": {
    "width": 80
  },
  "left-button": {
    "width": 21,
    "height": 36,
    "marginLeft": 40
  },
  "right-button": {
    "width": 32,
    "height": 32,
    "marginRight": 16
  },
  "right-text": {
    "width": 80,
    "marginRight": 20,
    "fontSize": 28,
    "textAlign": "left",
    "color": "#ffffff"
  }
}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: ["wxc-minibar"],
    style: {
      backgroundColor: _vm.backgroundColor
    }
  }, [_c('div', {
    staticClass: ["left"],
    attrs: {
      "ariaLabel": "返回",
      "accessible": true
    },
    on: {
      "click": _vm.leftButtonClicked
    }
  }, [_c('image', {
    staticClass: ["left-button"],
    attrs: {
      "src": _vm.leftButton
    }
  })]), _c('text', {
    staticClass: ["middle-title"],
    style: {
      color: _vm.textColor
    }
  }, [_vm._v(_vm._s(_vm.title))]), _c('div', {
    staticClass: ["right"],
    on: {
      "click": _vm.rightButtonClicked
    }
  }, [(_vm.rightText) ? _c('text', {
    staticClass: ["right-text"],
    style: {
      color: _vm.textColor
    }
  }, [_vm._v(_vm._s(_vm.rightText))]) : _vm._e(), (_vm.rightButton) ? _c('image', {
    staticClass: ["right-button"],
    attrs: {
      "src": _vm.rightButton,
      "ariaHidden": true
    }
  }) : _vm._e()])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wxcMinibar = __webpack_require__(1);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

var _weexRouter = __webpack_require__(0);

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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _order = __webpack_require__(8);

var _order2 = _interopRequireDefault(_order);

var _checkOrder = __webpack_require__(7);

var _checkOrder2 = _interopRequireDefault(_checkOrder);

var _shop = __webpack_require__(9);

var _shop2 = _interopRequireDefault(_shop);

var _user = __webpack_require__(10);

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
        tabitem: __webpack_require__(73),
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wxcResult = __webpack_require__(55);

var _wxcResult2 = _interopRequireDefault(_wxcResult);

var _wxcButton = __webpack_require__(53);

var _wxcButton2 = _interopRequireDefault(_wxcButton);

var _wxcCell = __webpack_require__(4);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _weexRouter = __webpack_require__(0);

var _weexRouter2 = _interopRequireDefault(_weexRouter);

var _http = __webpack_require__(2);

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _weexRouter = __webpack_require__(0);

var _weexRouter2 = _interopRequireDefault(_weexRouter);

var _searchBar = __webpack_require__(70);

var _searchBar2 = _interopRequireDefault(_searchBar);

var _tabTop = __webpack_require__(72);

var _tabTop2 = _interopRequireDefault(_tabTop);

var _orderItem = __webpack_require__(69);

var _orderItem2 = _interopRequireDefault(_orderItem);

var _http = __webpack_require__(2);

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wxcCell = __webpack_require__(4);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _wxcMinibar = __webpack_require__(1);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

var _navBar = __webpack_require__(68);

var _navBar2 = _interopRequireDefault(_navBar);

var _weexRouter = __webpack_require__(0);

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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wxcMinibar = __webpack_require__(1);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

var _weexRouter = __webpack_require__(0);

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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _weexRouter = __webpack_require__(0);

var _weexRouter2 = _interopRequireDefault(_weexRouter);

var _http = __webpack_require__(2);

var _http2 = _interopRequireDefault(_http);

var _tabBar = __webpack_require__(71);

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
/* 40 */
/***/ (function(module, exports) {

module.exports = {
  "iconfont": {
    "fontFamily": "iconfont"
  },
  "img_src": {
    "width": 750,
    "height": 750
  },
  "wxc-demo": {
    "position": "absolute",
    "top": 0,
    "right": 0,
    "left": 0,
    "bottom": 0,
    "backgroundColor": "#ffffff"
  },
  "button-list": {
    "paddingLeft": 24
  },
  "button-text": {
    "marginTop": 40,
    "marginLeft": 8,
    "marginBottom": 16
  },
  "scroller": {
    "flex": 1
  },
  "demo": {
    "alignItems": "center",
    "marginTop": 40,
    "marginBottom": 40
  },
  "input": {
    "width": 500,
    "textAlign": "right",
    "fontSize": 28
  }
}

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "backgroundColor": "#f6f6f6"
  },
  "header": {
    "flexDirection": "row",
    "WebkitBoxOrient": "horizontal",
    "WebkitBoxDirection": "normal",
    "color": "#ffffff",
    "width": 750,
    "justifyContent": "space-between",
    "alignItems": "center",
    "backgroundColor": "#fc345c",
    "paddingTop": 0,
    "WebkitBoxPack": "justify",
    "WebkitBoxAlign": "center",
    "paddingLeft": 40,
    "paddingRight": 20,
    "fontSize": 28
  },
  "down-la": {
    "position": "absolute",
    "top": 50,
    "transform": "translateY(-50%)",
    "right": -30
  },
  "shop-title": {
    "flexDirection": "row",
    "position": "relative"
  },
  "header-left": {
    "color": "#ffffff"
  },
  "header-right": {
    "color": "#ffffff"
  },
  "home-menu": {
    "flexDirection": "row",
    "WebkitBoxOrient": "horizontal",
    "WebkitBoxDirection": "normal",
    "height": 300,
    "color": "#ffffff",
    "width": 750
  },
  "home-menu-item": {
    "flex": 1,
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#FC345C",
    "WebkitBoxOrient": "vertical",
    "WebkitBoxDirection": "normal",
    "WebkitBoxAlign": "center",
    "WebkitBoxPack": "center",
    "WebkitBoxFlex": 1,
    "height": 300,
    "position": "relative"
  },
  "home-menu-item_img": {
    "marginTop": 10,
    "height": 60,
    "width": 60
  },
  "home-menu-item_title": {
    "marginTop": 10,
    "color": "#ffffff",
    "ontFamily": "PingFangSC-Regular",
    "fontSize": 24
  },
  "home-menu-item_blef": {
    "position": "absolute",
    "right": 54,
    "top": 96,
    "textAlign": "center",
    "backgroundColor": "#f8f800",
    "color": "#FC345C",
    "borderRadius": 100,
    "fontSize": 20
  },
  "home-bill": {
    "flexDirection": "row",
    "WebkitBoxOrient": "horizontal",
    "WebkitBoxDirection": "normal",
    "height": 200,
    "color": "#ffffff",
    "backgroundColor": "#ffffff",
    "width": 750
  },
  "home-bill-item": {
    "flex": 1,
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "WebkitBoxOrient": "vertical",
    "WebkitBoxDirection": "normal",
    "WebkitBoxAlign": "center",
    "WebkitBoxPack": "center",
    "WebkitBoxFlex": 1,
    "marginTop": 30,
    "marginBottom": 30
  },
  "home-bill-item_title": {
    "color": "#333333",
    "fontFamily": "PingFangSC-Medium",
    "fontSize": 40
  },
  "home-bill-item_brief": {
    "color": "#4a4a4a",
    "ontFamily": "PingFangSC-Regular",
    "fontSize": 26
  },
  "list-top": {
    "marginTop": 20
  },
  "border-right": {
    "borderRightWidth": 2,
    "borderRightColor": "#F6F6F6"
  },
  "list-img": {
    "width": 36,
    "height": 36,
    "marginRight": 10
  }
}

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = {
  "searchBox": {
    "backgroundColor": "#FC345C"
  }
}

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "width": 750,
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "backgroundColor": "#f6f6f6"
  },
  "content": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "marginBottom": 88
  },
  "tabbar": {
    "flexDirection": "row",
    "position": "fixed",
    "bottom": 0,
    "left": 0,
    "right": 0,
    "height": 88
  }
}

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = {
  "iconfont": {
    "fontFamily": "iconfont"
  },
  "wrapper": {
    "backgroundColor": "#ffffff",
    "alignItems": "center",
    "paddingTop": 112
  },
  "red": {
    "color": "#FC345C"
  },
  "wxc-dom": {
    "marginTop": 30
  },
  "login-test": {
    "color": "#FC345C"
  },
  "button-text": {
    "marginTop": 40,
    "marginLeft": 8,
    "marginBottom": 16
  },
  "input": {
    "width": 560,
    "height": 80,
    "lineHeight": 80,
    "textAlign": "left",
    "marginLeft": 30
  },
  "input2": {
    "width": 360,
    "height": 80,
    "lineHeight": 80,
    "textAlign": "left",
    "marginLeft": 30
  },
  "btn_send": {
    "width": 200,
    "height": 80,
    "lineHeight": 80,
    "textAlign": "center",
    "borderWidth": 1,
    "borderStyle": "solid",
    "borderColor": "#FC345C",
    "borderRadius": 6,
    "color": "#FC345C"
  },
  "btn_send_after": {
    "borderWidth": 1,
    "borderColor": "#cccccc",
    "borderStyle": "solid",
    "color": "#cccccc",
    "width": 200,
    "height": 80,
    "lineHeight": 80,
    "textAlign": "center",
    "borderRadius": 6
  },
  "btn_input": {
    "marginTop": 30
  }
}

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      flexDirection: "column"
    }
  }, [_c('tab-bar', {
    attrs: {
      "tabItems": _vm.tabItems
    },
    on: {
      "tabBarOnClick": _vm.tabBarOnClick
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('udot-nav-bar', {
    attrs: {
      "title": "24h便利店",
      "backgroundColor": "#fc345c",
      "textColor": "#FFFFFF",
      "useDefaultReturn": _vm.useDefaultReturn,
      "rightText": "设置",
      "leftButton": ""
    },
    on: {
      "wxcMinibarLeftButtonClicked": _vm.minibarLeftButtonClick,
      "wxcMinibarRightButtonClicked": _vm.minibarRightButtonClick
    }
  }), _vm._m(0), _c('wxc-cell', {
    staticClass: ["list-top"],
    attrs: {
      "hasArrow": true
    },
    on: {
      "wxcCellClicked": _vm.wxcCellClicked
    }
  }, [_c('image', {
    staticClass: ["list-img"],
    attrs: {
      "src": "http://ozfrvjgew.bkt.clouddn.com/bing.png"
    },
    slot: "label"
  }), _c('text', {
    slot: "title"
  }, [_vm._v("经营数据统计")])]), _vm._m(1), _c('wxc-cell', {
    staticClass: ["list-top"],
    attrs: {
      "hasArrow": true
    },
    on: {
      "wxcCellClicked": _vm.wxcCellClicked
    }
  }, [_c('image', {
    staticClass: ["list-img"],
    attrs: {
      "src": "http://ozfrvjgew.bkt.clouddn.com/bill_detail.png"
    },
    slot: "label"
  }), _c('text', {
    slot: "title"
  }, [_vm._v("账单明细")])]), _c('wxc-cell', {
    attrs: {
      "hasArrow": true,
      "hasBottomBorder": false
    },
    on: {
      "wxcCellClicked": _vm.wxcCellClicked
    }
  }, [_c('image', {
    staticClass: ["list-img"],
    attrs: {
      "src": "http://ozfrvjgew.bkt.clouddn.com/shop_set.png"
    },
    slot: "label"
  }), _c('text', {
    slot: "title"
  }, [_vm._v("店铺管理")])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["home-menu"]
  }, [_c('div', {
    staticClass: ["home-menu-item"]
  }, [_c('image', {
    staticClass: ["home-menu-item_img"],
    attrs: {
      "src": "http://ozfrvjgew.bkt.clouddn.com/order.png"
    }
  }), _c('text', {
    staticClass: ["home-menu-item_title"]
  }, [_vm._v("待接单")]), _c('text', {
    staticClass: ["home-menu-item_blef"],
    staticStyle: {
      top: "90px",
      right: "34px",
      paddingLeft: "3px",
      paddingRight: "3px"
    }
  }, [_vm._v("123")])]), _c('div', {
    staticClass: ["home-menu-item"]
  }, [_c('image', {
    staticClass: ["home-menu-item_img"],
    attrs: {
      "src": "http://ozfrvjgew.bkt.clouddn.com/send.png"
    }
  }), _c('text', {
    staticClass: ["home-menu-item_title"]
  }, [_vm._v("待发货")]), _c('text', {
    staticClass: ["home-menu-item_blef"],
    staticStyle: {
      width: "18px",
      height: "18px"
    }
  })]), _c('div', {
    staticClass: ["home-menu-item"]
  }, [_c('image', {
    staticClass: ["home-menu-item_img"],
    attrs: {
      "src": "http://ozfrvjgew.bkt.clouddn.com/delivery.png"
    }
  }), _c('text', {
    staticClass: ["home-menu-item_title"]
  }, [_vm._v("待送达")]), _c('text', {
    staticClass: ["home-menu-item_blef"],
    staticStyle: {
      width: "18px",
      height: "18px"
    }
  })]), _c('div', {
    staticClass: ["home-menu-item"]
  }, [_c('image', {
    staticClass: ["home-menu-item_img"],
    attrs: {
      "src": "http://ozfrvjgew.bkt.clouddn.com/server.png"
    }
  }), _c('text', {
    staticClass: ["home-menu-item_title"]
  }, [_vm._v("售后")]), _c('text', {
    staticClass: ["home-menu-item_blef"],
    staticStyle: {
      width: "18px",
      height: "18px"
    }
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["home-bill"]
  }, [_c('div', {
    staticClass: ["home-bill-item", "border-right"]
  }, [_c('text', {
    staticClass: ["home-bill-item_title"]
  }, [_vm._v("278.00")]), _c('text', {
    staticClass: ["home-bill-item_brief"]
  }, [_vm._v("今日营业额(元)")])]), _c('div', {
    staticClass: ["home-bill-item", "border-right"]
  }, [_c('text', {
    staticClass: ["home-bill-item_title"]
  }, [_vm._v("126")]), _c('text', {
    staticClass: ["home-bill-item_brief"]
  }, [_vm._v("今日订单")])]), _c('div', {
    staticClass: ["home-bill-item"]
  }, [_c('text', {
    staticClass: ["home-bill-item_title"]
  }, [_vm._v("40.00")]), _c('text', {
    staticClass: ["home-bill-item_brief"]
  }, [_vm._v("客单价(元)")])])])
}]}
module.exports.render._withStripped = true

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('udot-search-bar', {
    ref: "wxc-searchbar",
    style: {
      height: _vm.height,
      paddingTop: _vm.top
    },
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
  }), _c('udot-tabtop', {
    attrs: {
      "itemList": _vm.itemList
    },
    on: {
      "tabTopItemOnClick": _vm.tabTopItemOnClick
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_vm._l((_vm.tabItems), function(item, i) {
    return (!_vm.is_web) ? _c('embed', {
      key: i,
      staticClass: ["content"],
      style: {
        visibility: item.visibility
      },
      attrs: {
        "src": item.src,
        "type": "weex"
      }
    }) : _vm._e()
  }), _c('div', {
    staticClass: ["tabbar"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, _vm._l((_vm.tabItems), function(item) {
    return _c('tabitem', {
      key: item.index,
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
  })), (_vm.is_web) ? _c('div', {
    staticStyle: {
      backgroundColor: "#f6f6f6"
    }
  }, [(_vm.selectedIndex == 0) ? _c('order') : _vm._e(), (_vm.selectedIndex == 1) ? _c('check-order') : _vm._e(), (_vm.selectedIndex == 2) ? _c('shop') : _vm._e(), (_vm.selectedIndex == 3) ? _c('user') : _vm._e()], 1) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"],
    staticStyle: {
      backgroundColor: "#ffffff"
    }
  }, [_c('image', {
    staticStyle: {
      width: "162px",
      height: "162px"
    },
    attrs: {
      "src": "http://cdn.udian.me/logo.png"
    }
  }), _c('wxc-cell', {
    staticClass: ["wxc-dom"],
    attrs: {
      "hasTopBorder": false
    }
  }, [_c('image', {
    staticStyle: {
      width: "32px",
      height: "32px"
    },
    attrs: {
      "src": "http://cdn.udian.me/mobile.png"
    },
    slot: "title"
  }), _c('input', {
    staticClass: ["input2"],
    attrs: {
      "placeholder": "请输入标题",
      "value": _vm.mobile,
      "type": "tel",
      "maxlength": "11"
    },
    on: {
      "input": function($event) {
        _vm.mobile = $event.value
      }
    }
  }), _c('text', {
    class: [_vm.is_send ? 'btn_send_after' : 'btn_send'],
    on: {
      "click": _vm.send_msg
    }
  }, [_vm._v(_vm._s(_vm.sendContent) + _vm._s(_vm.is_send ? '(' + _vm.second + ')' : ''))])]), _c('wxc-cell', {
    attrs: {
      "hasTopBorder": false
    }
  }, [_c('image', {
    staticStyle: {
      width: "32px",
      height: "32px"
    },
    attrs: {
      "src": "http://cdn.udian.me/code.png"
    },
    slot: "title"
  }), _c('input', {
    staticClass: ["input"],
    attrs: {
      "placeholder": "请输入密码",
      "type": "password",
      "maxlength": "4",
      "value": (_vm.password)
    },
    on: {
      "input": function($event) {
        _vm.password = $event.target.attr.value
      }
    }
  })]), _c('div', {
    staticClass: ["button-list"]
  }, [_c('wxc-button', {
    staticClass: ["btn_input"],
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

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wxc-minibar', {
    style: {
      height: _vm.height,
      paddingTop: _vm.top
    },
    attrs: {
      "title": _vm.title,
      "backgroundColor": _vm.backgroundColor,
      "textColor": _vm.textColor,
      "rightText": _vm.rightText,
      "rightButton": _vm.rightButton,
      "leftButton": _vm.leftButton,
      "useDefaultReturn": _vm.useDefaultReturn,
      "show": _vm.show
    },
    on: {
      "wxcMinibarLeftButtonClicked": _vm.minibarLeftButtonClick,
      "wxcMinibarRightButtonClicked": _vm.minibarRightButtonClick
    }
  }, [_c('text', {
    slot: "title"
  }, [_c('image', {
    attrs: {
      "src": "https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png"
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["hello"]
  }, [_c('wxc-minibar', {
    attrs: {
      "title": _vm.msg,
      "backgroundColor": "#009ff0",
      "textColor": "#FFFFFF",
      "leftButton": "",
      "rightText": "更多"
    },
    on: {
      "wxcMinibarLeftButtonClicked": _vm.minibarLeftButtonClick,
      "wxcMinibarRightButtonClicked": _vm.minibarRightButtonClick
    }
  }), _c('h1', {
    on: {
      "click": _vm.gopage
    }
  }, [_vm._v(_vm._s(_vm.msg))])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(65);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 54 */
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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(67);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _login = __webpack_require__(74);

var _login2 = _interopRequireDefault(_login);

var _index = __webpack_require__(76);

var _index2 = _interopRequireDefault(_index);

var _my = __webpack_require__(75);

var _my2 = _interopRequireDefault(_my);

var _order = __webpack_require__(8);

var _order2 = _interopRequireDefault(_order);

var _checkOrder = __webpack_require__(7);

var _checkOrder2 = _interopRequireDefault(_checkOrder);

var _shop = __webpack_require__(9);

var _shop2 = _interopRequireDefault(_shop);

var _user = __webpack_require__(10);

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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(60);
var parse = __webpack_require__(59);
var formats = __webpack_require__(5);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);
var formats = __webpack_require__(5);

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
/* 61 */
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var required = __webpack_require__(61)
  , qs = __webpack_require__(63)
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(64)))

/***/ }),
/* 63 */
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
/* 64 */
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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(81)
)

/* script */
__vue_exports__ = __webpack_require__(77)

/* template */
var __vue_template__ = __webpack_require__(84)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/node_modules/weex-ui/packages/wxc-button/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-6925ece4"
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


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(82)
)

/* script */
__vue_exports__ = __webpack_require__(78)

/* template */
var __vue_template__ = __webpack_require__(85)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/node_modules/weex-ui/packages/wxc-cell/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-26a3ebfe"
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


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(80)
)

/* script */
__vue_exports__ = __webpack_require__(79)

/* template */
var __vue_template__ = __webpack_require__(83)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/node_modules/weex-ui/packages/wxc-result/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-8c7e7e8e"
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


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(33)

/* template */
var __vue_template__ = __webpack_require__(51)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/src/assets/components/navBar.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
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


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(17)
)

/* script */
__vue_exports__ = __webpack_require__(11)

/* template */
var __vue_template__ = __webpack_require__(23)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/src/assets/components/orderItem.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-73eebd8e"
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


/***/ }),
/* 70 */
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


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(43)
)

/* script */
__vue_exports__ = __webpack_require__(34)

/* template */
var __vue_template__ = __webpack_require__(49)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/src/assets/components/tabBar.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4da7b036"
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


/***/ }),
/* 72 */
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


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(19)
)

/* script */
__vue_exports__ = __webpack_require__(14)

/* template */
var __vue_template__ = __webpack_require__(25)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/src/assets/components/tabitem.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-14daa660"
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


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(44)
)

/* script */
__vue_exports__ = __webpack_require__(35)

/* template */
var __vue_template__ = __webpack_require__(50)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/src/assets/views/login.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-32781c27"
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


/***/ }),
/* 75 */
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


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(40)
)

/* script */
__vue_exports__ = __webpack_require__(39)

/* template */
var __vue_template__ = __webpack_require__(46)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/src/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1a7deff7"
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


/***/ }),
/* 77 */
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

var _type = __webpack_require__(54);

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
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(3);

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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = __webpack_require__(56);

var _type2 = _interopRequireDefault(_type);

var _utils = __webpack_require__(3);

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
/* 80 */
/***/ (function(module, exports) {

module.exports = {
  "wrap": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0
  },
  "wxc-result": {
    "width": 750,
    "flex": 1,
    "alignItems": "center",
    "backgroundColor": "#f2f3f4"
  },
  "result-image": {
    "width": 320,
    "height": 320
  },
  "result-content": {
    "marginTop": 36,
    "alignItems": "center"
  },
  "content-text": {
    "fontSize": 30,
    "color": "#A5A5A5",
    "height": 42,
    "lineHeight": 42,
    "textAlign": "center"
  },
  "content-desc": {
    "marginTop": 10
  },
  "result-button": {
    "marginTop": 60,
    "borderWidth": 1,
    "borderColor": "#979797",
    "backgroundColor": "#FFFFFF",
    "borderRadius": 6,
    "width": 240,
    "height": 72,
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "button-text": {
    "color": "#666666",
    "fontSize": 30
  }
}

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-btn": {
    "width": 702,
    "height": 88,
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": 12
  },
  "btn-text": {
    "textOverflow": "ellipsis",
    "lines": 1,
    "fontSize": 36,
    "color": "#FFFFFF"
  }
}

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-cell": {
    "height": 100,
    "position": "relative",
    "flexDirection": "row",
    "alignItems": "center",
    "paddingLeft": 24,
    "paddingRight": 24,
    "backgroundColor": "#ffffff"
  },
  "cell-margin": {
    "marginBottom": 24
  },
  "cell-title": {
    "flex": 1
  },
  "cell-indent": {
    "paddingBottom": 30,
    "paddingTop": 30
  },
  "has-desc": {
    "paddingBottom": 18,
    "paddingTop": 18
  },
  "cell-top-border": {
    "borderTopColor": "#e2e2e2",
    "borderTopWidth": 1
  },
  "cell-bottom-border": {
    "borderBottomColor": "#e2e2e2",
    "borderBottomWidth": 1
  },
  "cell-label-text": {
    "fontSize": 30,
    "color": "#666666",
    "width": 188,
    "marginRight": 10
  },
  "cell-arrow-icon": {
    "width": 22,
    "height": 22
  },
  "cell-content": {
    "color": "#333333",
    "fontSize": 30,
    "lineHeight": 40
  },
  "cell-desc-text": {
    "color": "#999999",
    "fontSize": 24,
    "lineHeight": 30,
    "marginTop": 4
  }
}

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: ["wrap"],
    style: _vm.wrapStyle
  }, [_c('div', {
    staticClass: ["wxc-result"],
    style: {
      paddingTop: _vm.setPaddingTop
    }
  }, [_c('image', {
    staticClass: ["result-image"],
    attrs: {
      "ariaHidden": true,
      "src": _vm.resultType.pic
    }
  }), (_vm.resultType.content) ? _c('div', {
    staticClass: ["result-content"]
  }, [_c('text', {
    staticClass: ["content-text"]
  }, [_vm._v(_vm._s(_vm.resultType.content))]), (_vm.resultType.desc) ? _c('text', {
    staticClass: ["content-text", "content-desc"]
  }, [_vm._v(_vm._s(_vm.resultType.desc))]) : _vm._e()]) : _vm._e(), (_vm.resultType.button) ? _c('div', {
    staticClass: ["result-button"],
    on: {
      "touchend": _vm.handleTouchEnd,
      "click": _vm.onClick
    }
  }, [_c('text', {
    staticClass: ["button-text"]
  }, [_vm._v(_vm._s(_vm.resultType.button))])]) : _vm._e()])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-btn"],
    style: _vm.mrBtnStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": _vm.text
    },
    on: {
      "click": _vm.onClicked
    }
  }, [_c('text', {
    staticClass: ["btn-text"],
    style: _vm.mrTextStyle
  }, [_vm._v(_vm._s(_vm.text))])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['wxc-cell', _vm.hasTopBorder && 'cell-top-border', _vm.hasBottomBorder && 'cell-bottom-border', _vm.hasMargin && 'cell-margin', _vm.hasVerticalIndent && 'cell-indent', _vm.desc && 'has-desc'],
    style: _vm.cellStyle,
    attrs: {
      "accessible": _vm.autoAccessible,
      "ariaLabel": (_vm.label + "," + _vm.title + "," + _vm.desc)
    },
    on: {
      "click": _vm.cellClicked
    }
  }, [_vm._t("label", [(_vm.label) ? _c('div', [_c('text', {
    staticClass: ["cell-label-text"]
  }, [_vm._v(_vm._s(_vm.label))])]) : _vm._e()]), _c('div', {
    staticClass: ["cell-title"]
  }, [_vm._t("title", [_c('text', {
    staticClass: ["cell-content"]
  }, [_vm._v(_vm._s(_vm.title))]), (_vm.desc) ? _c('text', {
    staticClass: ["cell-desc-text"]
  }, [_vm._v(_vm._s(_vm.desc))]) : _vm._e()])], 2), _vm._t("value"), _vm._t("default"), (_vm.hasArrow) ? _c('image', {
    staticClass: ["cell-arrow-icon"],
    attrs: {
      "src": _vm.arrowIcon,
      "ariaHidden": true
    }
  }) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(43)
)

/* script */
__vue_exports__ = __webpack_require__(34)

/* template */
var __vue_template__ = __webpack_require__(49)
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
__vue_options__.__file = "/Users/wilson/weex/weex-star/src/assets/components/tabBar.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4da7b036"
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
/******/ ]);