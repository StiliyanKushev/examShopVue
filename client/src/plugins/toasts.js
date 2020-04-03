import Vue from 'vue';
import VueToastify from "vue-toastify";

Vue.use(VueToastify, {
    status: {
        title: " ",
        body: " ",
        canPause: true,
        canTimeout: true,
        duration: 2400
    }
});