import Vue from 'vue';
import EventBus from '../EventBus';

function saveUser(token,username,roles){
    Vue.$cookies.set('token',token);
    Vue.$cookies.set('username',username);
    Vue.$cookies.set('roles',JSON.stringify(roles));
    EventBus.$emit('login',username);
}

function logout(){
    Vue.$cookies.remove('token');
    Vue.$cookies.remove('username');
    Vue.$cookies.remove('roles');
    EventBus.$emit('logout');
}

export default {
    saveUser,
    logout
}