<template>
  <div id="home" :style="{background: bgColor}">
    <div class="title">
      <font-awesome-icon :icon="['fas','clock']"></font-awesome-icon>
    </div>
    <div class="theme">
      <spring v-if="theme == '春'"></spring>
      <summer v-else-if="theme == '夏'"></summer>
      <autumn v-else-if="theme == '秋'"></autumn>
      <winter v-else-if="theme == '冬'"></winter>
      <Snowf
          :style="{visibility: snow}"
          :amount="50"
          :size="5"
          :speed="0.5"
          :wind="0"
          :opacity="1"
          :swing="0"
          :image="null"
          :zIndex="99"
          :resize="true"
          color="#fff"
        />
        <x-particles
          id="particles"
          class="particles-background"
          :style="{visibility: maple}"
          :config="config"></x-particles>
    </div>
    <div class="content">
      <div><h1>{{ timetext }}</h1></div>
      <div><h2>{{ currentText }}</h2></div>
      <div>
        <b-button v-b-tooltip.hover.bottom squared :variant=btnColor[0] title="暫停" v-if="situation == 1" @click="Pause">
          <font-awesome-icon :icon="['fas','stop']"></font-awesome-icon>
        </b-button>
        <b-button v-b-tooltip.hover.bottom squared :variant=btnColor[1] title="開始" v-if="situation != 1" @click="Start">
          <font-awesome-icon :icon="['fas','play']"></font-awesome-icon>
        </b-button>
        <b-button v-b-tooltip.hover.bottom squared class="ml-3" :variant=btnColor[2] title="重複" v-if="situation == 1" @click="Reload">
          <font-awesome-icon :icon="['fas','reply']"></font-awesome-icon>
        </b-button>
        <b-button v-b-tooltip.hover.bottom squared class="ml-3" :variant=btnColor[3] title="下一個" v-if="todos.length > 1" @click="Next">
          <font-awesome-icon :icon="['fas','step-forward']"></font-awesome-icon>
        </b-button>
        <b-button v-b-tooltip.hover.bottom squared class="ml-3" :variant=btnColor[3] title="結束" v-if="todos.length == 1" @click="Next">
          <font-awesome-icon :icon="['fas','flag-checkered']"></font-awesome-icon>
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
import Snowf from 'vue-snowf'
import defConfig from '../particlesjs-autumn.js'
export default {
  components: {
    Snowf
  },
  data () {
    return {
      // 0 停止
      // 1 播放
      // 2 暫停
      situation: 0,
      // clearInterval會把setInterval的變數清掉，所以一開始先設定一個變數等於0
      timer: 0,
      config: defConfig
    }
  },
  computed: {
    currentText () {
      let text = ''
      if (this.todos.length === 0) {
        text = '沒有資料'
      } else {
        text = this.todos[0].name
      }
      if (this.$store.getters.isBreak) {
        text = '休息時間'
      }
      return text
    },
    timetext () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      if (s < 10) {
        return `${m} : 0${s}`
      } else {
        return `${m} : ${s}`
      }
    },
    alarm () {
      return this.$store.getters.alarms
    },
    timeleft () {
      return this.$store.getters.timeleft
    },
    todos () {
      return this.$store.getters.todos
    },
    theme () {
      return this.$store.getters.themes
    },
    snow () {
      if (this.theme === '冬') {
        return 'visible'
      }
      return 'hidden'
    },
    maple () {
      if (this.theme === '秋') {
        return 'visible'
      }
      return 'hidden'
    },
    bgColor () {
      if (this.theme === '春') {
        return 'linear-gradient(to top, #89f7fe 0%, #66a6ff 100%)'
      } else if (this.theme === '夏') {
        return 'linear-gradient(to bottom, #00c6fb 0%, #005bea 100%)'
      } else if (this.theme === '秋') {
        return 'linear-gradient(to bottom,rgba(249, 212, 35, 0.7) 0%, rgba(255, 78, 80, 0.7) 100%)'
      } else if (this.theme === '冬') {
        return 'linear-gradient(to top, #a1c4fd 0%, #c2e9fb 100%)'
      }
      return 'white'
    },
    btnColor () {
      if (this.theme === '夏') {
        return ['summer1', 'summer2', 'summer3', 'summer4']
      } else if (this.theme === '秋') {
        return ['autumn1', 'autumn2', 'autumn3', 'autumn4']
      }
      return ['red', 'blue', 'success', 'orange']
    }
  },
  methods: {
    Start () {
      if (this.situation === 2) {
        // 暫停後繼續
        this.situation = 1
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= 0) {
            this.Finish()
          }
        }, 1000)
      } else {
        // 開始新倒數
        if (this.todos.length > 0) {
          if (!this.$store.getters.isBreak) {
            this.situation = 1
            this.timer = setInterval(() => {
              this.$store.commit('countdown')
              if (this.timeleft <= 0) {
                this.Finish()
              }
            }, 1000)
          }
        } else {
          this.$swal(
            {
              icon: 'warning',
              title: '沒有待辦事項',
              text: '',
              allowOutsideClick: false,
              confirmButtonText: '確定'
            }
          )
        }
      }
    },
    Finish () {
      clearInterval(this.timer)
      this.situation = 0
      this.$store.commit('finish')
      const audio = new Audio()
      audio.src = './alarms/' + this.alarm
      audio.play()
      if (this.todos.length > 0) {
        if (this.$store.getters.isBreak) {
          this.$swal(
            {
              title: '休息時間',
              text: '',
              imageUrl: './img/coffee-break.png',
              imageWidth: 120,
              imageHeight: 120,
              allowOutsideClick: false,
              confirmButtonText: '確定'
            }
          ).then((result) => {
            this.situation = 1
            this.timer = setInterval(() => {
              this.$store.commit('countdown')
              if (this.timeleft <= 0) {
                this.Finish()
              }
            }, 1000)
          })
        } else {
          this.$swal(
            {
              title: '休息時間結束',
              text: this.todos.length === 1 ? '最後 1 項' : '還有 ' + this.todos.length + ' 項',
              imageUrl: './img/fast-time.png',
              imageWidth: 120,
              imageHeight: 120,
              allowOutsideClick: false,
              confirmButtonText: '確定'
            }
          ).then((result) => {
            this.situation = 1
            this.timer = setInterval(() => {
              this.$store.commit('countdown')
              if (this.timeleft <= 0) {
                this.Finish()
              }
            }, 1000)
          })
        }
      } else {
        this.$swal(
          {
            title: '恭喜完成!!!',
            text: '',
            imageUrl: './img/finish.png',
            imageWidth: 120,
            imageHeight: 120,
            allowOutsideClick: false,
            confirmButtonText: '確定'
          }
        )
      }
    },
    Pause () {
      clearInterval(this.timer)
      this.situation = 2
    },
    Reload () {
      this.situation = 2
      clearInterval(this.timer)
      this.$store.commit('reload')
    },
    Next () {
      this.situation = 0
      clearInterval(this.timer)
      this.$store.commit('next')
    }
  }
}
</script>
