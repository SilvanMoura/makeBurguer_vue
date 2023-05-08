import Cookies from "js-cookie";

export default {
    beforeAuth(to, from, next) {
        const token = Cookies.get("_myapp_token");

        !token ? next('/login') : next() ;
    },
    afterAuth(to, from, next) {
        const token = Cookies.get("_myapp_token");

        token ? next('/') : next() ;
    }
}