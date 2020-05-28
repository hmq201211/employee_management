import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import 'ant-design-vue/dist/antd.css';
import AntDesign from "ant-design-vue";
import router from "./router/router"
import Axios from "axios";
import qs from "querystring";

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(AntDesign);
Axios.defaults.withCredentials = true;
Axios.defaults.baseURL = "http://127.0.0.1:8081/"
Vue.prototype.$axios = Axios;
Vue.prototype.$qs = qs;
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
