import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import HomeView from '../components/views/Home';
import LoginView from '../components/views/Login';
import RegisterView from '../components/views/Register';
import ShopView from '../components/views/Shop';
import SellView from '../components/views/Sell';

let routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
    { path: '/shop', component: ShopView },
    { path: '/sell', component: SellView },
];

const router = new VueRouter({
    routes,
    mode:"history"
})

export default router;