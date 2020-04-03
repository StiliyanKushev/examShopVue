import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);
Vue.$cookies.config('7d');
Vue.use(VueRouter);

import HomeView from '../components/views/Home';
import LoginView from '../components/views/Login';
import RegisterView from '../components/views/Register';
import ShopView from '../components/views/Shop';
import SellView from '../components/views/Sell';

let authGuard = (to, from, next) => {
    let token = Vue.$cookies.get('token');
    if(token){
        next();
    }
    else{
        next('/login');
    }
}

let routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
    { path: '/shop', component: ShopView },
    { path: '/sell', component: SellView, beforeEnter: authGuard },
];

const router = new VueRouter({
    routes,
    mode:"history"
})

export default router;