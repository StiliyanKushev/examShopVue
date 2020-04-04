import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);
Vue.use(VueRouter);
Vue.$cookies.config('7d');

import HomeView from '../components/views/Home';
import LoginView from '../components/views/Login';
import RegisterView from '../components/views/Register';
import ShopView from '../components/views/Shop';
import SellView from '../components/views/Sell';
import EditView from '../components/views/Edit';

let authGuard = (to, from, next) => {
    let token = Vue.$cookies.get('token');
    if(token){
        next();
    }
    else{
        next('/login');
    }
}

let guestGuard = (to, from, next) => {
    let token = Vue.$cookies.get('token');
    if(token){
        next('/');
    }
    else{
        next();
    }
}

let routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView, beforeEnter: guestGuard },
    { path: '/register', component: RegisterView, beforeEnter: guestGuard },
    { path: '/shop', component: ShopView },
    { path: '/sell', component: SellView, beforeEnter: authGuard },
    { path: '/edit/:id', component: EditView, beforeEnter: authGuard },
];

const router = new VueRouter({
    routes,
    mode:"history"
})

export default router;