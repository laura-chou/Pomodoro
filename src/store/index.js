import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import dotenv from 'dotenv'

dotenv.config()

Vue.use(Vuex)
let timeleft = parseInt(process.env.VUE_APP_TIMELEFT)
let timeleftBreak = parseInt(process.env.VUE_APP_TIMELEFT_BREAK)
export default new Vuex.Store({
  state: {
    // 代辦事項
    todos: [],
    // 剩餘時間
    timeleft: timeleft,
    // 休息時間
    timeleftBreak: timeleftBreak,
    // 鈴聲
    alarm: 'Bell.mp3',
    // 目前進行的事項
    current: '',
    // 是否休息中
    isBreak: false,
    // 目前頁面
    npg: '計時',
    // 主題
    theme: '春'
  },
  getters: {
    alarms (state) {
      return state.alarm
    },
    todos (state) {
      return state.todos
    },
    timeleft (state) {
      return state.timeleft
    },
    tiembreak (state) {
      return state.timeleftBreak
    },
    current (state) {
      return state.current
    },
    isBreak (state) {
      return state.isBreak
    },
    pg (state) {
      return state.npg
    },
    themes (state) {
      return state.theme
    }
  },
  mutations: {
    selectAlarm (state, data) {
      state.alarm = data
    },
    addTodo (state, data) {
      state.todos.push({ name: data, edit: false, model: data })
    },
    dragTodo (state, data) {
      state.todos = data
    },
    delTodo (state, data) {
      state.todos.splice(data, 1)
    },
    editTodo (state, data) {
      state.todos[data].edit = !state.todos[data].edit
    },
    cancelTodo (state, data) {
      state.todos[data].edit = false
      state.todos[data].model = state.todos[data].name
    },
    saveTodo (state, data) {
      state.todos[data].edit = false
      state.todos[data].name = state.todos[data].model
    },
    clearTodo (state, data) {
      state.todos[data].model = ''
    },
    start (state) {
      if (state.isBreak) {
        state.current = '休息時間'
      } else {
        if (state.todos.length > 0) {
          state.current = state.todos[0].name
          // state.todos.splice(0, 1)
        } else {
          state.current = '沒有資料'
        }
      }
    },
    countdown (state) {
      state.timeleft--
    },
    finish (state) {
      if (!state.isBreak) state.todos.splice(0, 1)
      if (state.todos.length > 0) state.isBreak = !state.isBreak
      state.current = ''
      state.timeleft = state.isBreak ? timeleftBreak : timeleft
    },
    next (state) {
      state.todos.splice(0, 1)
      state.current = ''
      state.timeleft = timeleft
      state.isBreak = false
    },
    nowpage (state, data) {
      state.npg = data
    },
    reload (state) {
      state.timeleft = timeleft
    },
    selectTheme (state, data) {
      state.theme = data
    },
    workTime (state, data) {
      state.timeleft = data
      timeleft = data
    },
    breakTime (state, data) {
      state.timeleftBreak = data
      timeleftBreak = data
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
