import ViewLogin from './assets/views/login.vue'
import ViewIndex from './index.vue'
import ViewMy from './assets/views/my.vue'
import ViewIndexOrder from './assets/views/tabItems/order.vue'
import ViewIndexCheckOrder from './assets/views/tabItems/checkOrder.vue'
import ViewIndexShop from './assets/views/tabItems/shop.vue'
import ViewIndexUser from './assets/views/tabItems/user.vue'
// import ViewGoodsList from './assets/views/goods/goodsList.vue'

const router = [
    {
        path: '/index',
        component: ViewIndex
    },
    {
        path: '/login',
        component: ViewLogin
    },
    {
        path: '/index/order',
        component: ViewIndexOrder
    },
    {
        path: '/index/checkOrder',
        component: ViewIndexCheckOrder
    },
    {
        path: '/index/shop',
        component: ViewIndexShop
    },
    {
        path: '/index/user',
        component: ViewIndexUser
    },
    {
        path: '/my',
        component: ViewMy
    },
]

exports.pageRouter = function (url) {

    let base = router.find(function (obj) {
        return obj.path == url
    })

    return base.component.__file
}