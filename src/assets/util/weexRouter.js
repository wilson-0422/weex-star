import { pageRouter } from '../../pageRouter'
var event = weex.requireModule('event')

function push(url) {

    url = getURL(url);

    const navigator = weex.requireModule('navigator');

    let platform = getOs();

    if (platform == 'web') {
        url = '?page=./dist' + url;
    }

    if (navigator) {
        navigator.push({
            'url': url,
            'animated': 'true'
        }, function () {
            console.log('skip complete')
        });
    }
}
function getURL(url) {

  let platform = getOs();

  let bundleUrl =  weex.config.bundleUrl;

  let mainUrl = pageRouter(url).split('src')[1]

  mainUrl = mainUrl.split('.')[0]

  let full_url = '';

  if (bundleUrl.lastIndexOf('file://') != -1){

      if (platform == 'ios') {

        bundleUrl = bundleUrl.substr(0,bundleUrl.lastIndexOf('bundlejs'));

        full_url = bundleUrl + 'bundlejs' + mainUrl + '.js';

      } else if (platform == 'android') {

        bundleUrl = bundleUrl.substr(0,bundleUrl.lastIndexOf('dist'));

        full_url = bundleUrl + 'dist' + mainUrl + '.js';

      } else {

      }

  } else {

      if (platform == 'web') {

        full_url = mainUrl + '.js';

      } else {

        bundleUrl = bundleUrl.substr(0,bundleUrl.lastIndexOf('dist'));

        full_url = bundleUrl + 'dist' + mainUrl + '.js';
      }
  }

  return full_url;
}

function getOs() {

  let platform = weex.config.env ? weex.config.env.platform : weex.config.platform;

  return platform.toLowerCase();

}
export default {
    push: push,
    getURL: getURL,
    getOs: getOs
}
