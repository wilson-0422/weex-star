import qs from 'qs'
const storage = weex.requireModule('storage')
var stream = weex.requireModule('stream')
var modal = weex.requireModule('modal')

const _URL_API = 'https://api.udian.me/'
const _token = 'c92114bcc9e4454f1d2b7399dc9d62a9';
const _time = 1480576266;

function postAjax(_url, _postData, successBack, errorBack) {

    let header = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    _postData.authToken = storageGet('udotAuthToken') ? storageGet('udotAuthToken') : ''

    _postData.time = _time

    _postData.token = _token

    let shop = storageGet('seller') ? storageGet('seller') : ''

    console.log(shop)

    _postData.shop_id = shop ? shop._id : 0

    stream.fetch({
        method: 'POST',
        headers: header,
        url: _URL_API + _url,
        body: qs.stringify(_postData)
    },function ({data}) {
        data = JSON.parse(data)
        if(data.status == 1){
            successBack(data)
        }else if(errorBack){
            errorBack(data)
        }else{
            modal.toast({
                message: data.msg,
                duration: 1
            })
        }
    })
}

function storageGet(name, callback) {
    storage.getItem(name, event => {
        if(event.result == "success"){
            callback(event.data)
        }else{
            callback(null)
        }
    })
}

function storageSet(name, object) {
    object = JSON.stringify(object)
    let getData = storage.setItem(name, object)
}
export default {
    postAjax: postAjax,
    storageGet: storageGet,
    storageSet: storageSet,
}