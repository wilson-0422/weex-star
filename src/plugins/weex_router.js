export default {
  install:(Vue, {router,weex})=>{
    
    let platform = weex.config.env ? weex.config.env.platform : weex.config.platform;
    if (platform.toLowerCase() == 'web'){
      Object.defineProperty(Vue.prototype, "$weexRouter",  {
        value: {
          push(url){
            router.push(url);
          },
          configurable: false
        }
      });
    }else{
  
      const navigator = weex.requireModule('navigator');
  
      let bundleUrl = weex.config.bundleUrl;
  
      bundleUrl = bundleUrl.substr(0,bundleUrl.lastIndexOf('/'));
      Object.defineProperty(Vue.prototype, "$weexRouter", {
        value: {
          push(url){
            if (navigator) {
          
              console.log(bundleUrl + '/assets/views' + url + '.js');
              navigator.push({
                'url': bundleUrl + '/assets/views' + url + '.js',
                'animated': 'true'
              }, function () {
                console.log('skip complete')
              });
            }
          },
          // back(){
          //   if (navigator) {
          //     navigator.pop();
          //   }
          // }
            getUrl(url){
                return bundleUrl + '/assets/views' + url + '.js'
            }
        },
        configurable: false
      });
      
    }
    
    
  }
}
