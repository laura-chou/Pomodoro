import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './style/home.stylus'
import './style/list.stylus'
import './style/settings.stylus'
import './style/clock.stylus'
import './style/theme.stylus'
import './style/alarm.stylus'
import './style/spring.stylus'
import './style/summer.stylus'
import './style/autumn.stylus'
import './style/winter.stylus'
import 'sweetalert2/dist/sweetalert2.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit, faTrashAlt, faUndoAlt, faSave, faClock, faCog, faEraser, faPlus, faMinus, faListAlt, faPlay, faStop, faReply, faStepForward, faBars, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import { PushRotate } from 'vue-burger-menu'
import draggable from 'vuedraggable'

import Clock from './components/Clock.vue'
import Theme from './components/Theme.vue'
import Alarm from './components/Alarm.vue'

import Spring from './components/Spring.vue'
import Summer from './components/Summer.vue'
import Autumn from './components/Autumn.vue'
import Winter from './components/Winter.vue'

import VueAnalytics from 'vue-analytics'
import VueSweetalert2 from 'vue-sweetalert2'
import XParticles from 'x-particles'

library.add(faEdit, faTrashAlt, faUndoAlt, faSave, faClock, faCog, faEraser, faPlus, faMinus, faListAlt, faPlay, faStop, faReply, faStepForward, faBars, faFlagCheckered)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('PushRotate', PushRotate)

Vue.component('draggable', draggable)

Vue.component('clock', Clock)
Vue.component('theme', Theme)
Vue.component('alarm', Alarm)

Vue.component('spring', Spring)
Vue.component('summer', Summer)
Vue.component('autumn', Autumn)
Vue.component('winter', Winter)
Vue.use(VueAnalytics, {
  id: 'UA-168228282-1'
})
Vue.use(VueSweetalert2)
Vue.use(XParticles)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
