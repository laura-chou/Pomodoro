import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './style/spring.css'
import './style/summer.css'
import './style/autumn.css'
import './style/winter.css'
import './style/snow.css'
import './style/settings.css'
import './style/home.css'
import './style/list.css'
import './style/clock.css'
import './style/alarm.css'
import './style/theme.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit, faTrashAlt, faUndoAlt, faSave, faClock, faList, faCog, faEraser, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import draggable from 'vuedraggable'

import RadialMenu from './components/RadialMenu.vue'
import RadialMenuItem from './components/RadialMenuItem.vue'

import Clock from './components/Clock.vue'
import Theme from './components/Theme.vue'
import Alarm from './components/Alarm.vue'

import Spring from './components/Spring.vue'
import Summer from './components/Summer.vue'
import Autumn from './components/Autumn.vue'
import Winter from './components/Winter.vue'

import VueAnalytics from 'vue-analytics'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

library.add(faEdit, faTrashAlt, faUndoAlt, faSave, faClock, faList, faCog, faEraser, faPlus, faMinus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('draggable', draggable)

Vue.component('radial-menu', RadialMenu)
Vue.component('radial-menu-item', RadialMenuItem)

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

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
