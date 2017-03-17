import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import VueHead from 'vue-head'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    attempt: 12,
    listenEvents: ['scroll']
})

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueHead);

import work from './components/work.vue'
import detail from './components/detail.vue'
import contact from './components/contact.vue'
import about from './components/about.vue'
import job from './components/job.vue'

import mwork from './components/m/work.vue'
import mdetail from './components/m/detail.vue'
import mcontact from './components/m/contact.vue'
import mabout from './components/m/about.vue'
import mjob from './components/m/job.vue'

const router = new VueRouter({
    base: __dirname,
    routes: [
        { path: '/', component: work }, 
        { path: '/work', component: work }, 
        { path: '/interior', component: work }, 
        { path: '/architecture', component: work }, 
        { path: '/visual', component: work }, 
        { path: '/detail/:id', name: 'detail', component: detail }, 
        { path: '/about', component: about }, 
        { path: '/contact', component: contact }, 
        { path: '/job', component: job }, 

        { path: '/m', component: mwork }, 
        { path: '/m/work', component: mwork }, 
        { path: '/m/interior', component: mwork }, 
        { path: '/m/architecture', component: mwork }, 
        { path: '/m/visual', component: mwork }, 
        { path: '/m/all', component: mwork }, 
        { path: '/m/detail/:id', name: 'mdetail', component: mdetail }, 
        { path: '/m/about', component: mabout }, 
        { path: '/m/contact', component: mcontact }, 
        { path: '/m/job', component: mjob }, 

        { path: '*', component: work }
    ]
})

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')
