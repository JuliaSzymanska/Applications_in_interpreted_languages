/*jshint esversion: 6 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


// Vue.config.productionTip = false;

// new Vue({
//   render: h => h(App),
// }).$mount('#app');

createApp(App).use(router).mount('#app');
export default router;