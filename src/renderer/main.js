import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import {CoolSelectPlugin} from 'vue-cool-select'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faEye,
    faEyeSlash,
    faSignOutAlt,
    faTimes,
    faWindowMaximize,
    faWindowMinimize,
    faWindowRestore
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import vSelect from 'vue-select'

Vue.component('v-select', vSelect);
Vue.use(CoolSelectPlugin);
library.add(faWindowMinimize, faWindowMaximize, faTimes, faWindowRestore, faSignOutAlt, faEye, faEyeSlash);

Vue.component('font-awesome-icon', FontAwesomeIcon);
//Vue.component('vue-dropdown', VueDropdown);
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    store,
    template: '<App/>'
}).$mount('#app');
