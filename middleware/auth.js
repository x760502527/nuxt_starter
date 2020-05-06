const cookieparser = require('cookieparser')
export default function ({route,store, redirect,req}) {
    /*这里使用nuxtServerInit 方法更好*/

    // let cookie = {}
    // if (req && req.headers && req.headers.cookie) {
    //     cookie = req['headers']['cookie']
    //     cookie = cookieparser.parse(cookie)
    // }
    // if(cookie){
    //     let token = cookie['token']/*cookie.get('user')*/
    //     if (token) {
    //         store.commit('token', token)
    //     }
    // }
    const routePath = route.path
    const extraPath = ['/login']
    if ((!store.state.token) && extraPath.indexOf(routePath) === -1) {
        // 跳转到登录页面
        return redirect('/login')
    }
}
