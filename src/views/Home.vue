<template>
  <div id="home" :style="{background: bgColor}">
    <div class="spring" v-if="theme == '春'"><spring></spring></div>
    <div class="summer" v-else-if="theme == '夏'"><summer></summer></div>
    <div class="autumn" v-else-if="theme == '秋'"><autumn></autumn></div>
    <div class="winter" v-else-if="theme == '冬'"><winter></winter></div>
    <div class="text">
      <div class="text1">
        <div class="t1">
          <p class="m-0">{{ currentText }}</p>
        </div>
      </div>
      <div class="useless"></div>
      <div class="text2">
        <div class="t1 t2">
          <p class="m-0">{{ timetext }}</p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <img v-if="status != 1" @click="start" src="../assets/Play.png">
        <img v-if="status == 1" @click="pause" src="../assets/Pause.png">
        <img v-if="current.length > 0 || todos.length > 0" @click="finish(true)" src="../assets/Forward.png">
        <img v-if="status == 1" @click="reload" src="../assets/Reload.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 0 停止
      // 1 播放
      // 2 暫停
      status: 0,
      // clearInterval會把setInterval的變數清掉，所以一開始先設定一個變數等於0
      timer: 0
    }
  },
  computed: {
    currentText () {
      return this.current.length > 0 ? this.current : this.todos.length > 0 ? '點擊開始' : '沒有資料'
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
    current () {
      return this.$store.getters.current
    },
    todos () {
      return this.$store.getters.todos
    },
    theme () {
      return this.$store.getters.themes
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
    }
  },
  methods: {
    start () {
      if (this.status === 2) {
        // 暫停後繼續
        this.status = 1
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= 0) {
            this.finish(false)
          }
        }, 1000)
      } else {
        // 開始新倒數
        if (this.todos.length > 0) {
          if (this.$store.getters.isBreak) {
            this.$swal(
              {
                title: '休息時間',
                text: '',
                imageUrl: 'https://image.flaticon.com/icons/svg/2972/2972545.svg',
                imageWidth: 120,
                imageHeight: 120,
                allowOutsideClick: false
              }
            ).then((result) => {
              this.$store.commit('start')
              this.status = 1
              this.timer = setInterval(() => {
                this.$store.commit('countdown')
                if (this.timeleft <= 0) {
                  this.finish(false)
                }
              }, 1000)
            })
          } else {
            this.$store.commit('start')
            this.status = 1
            this.timer = setInterval(() => {
              this.$store.commit('countdown')
              if (this.timeleft <= 0) {
                this.finish(false)
              }
            }, 1000)
          }
        } else {
          this.$swal(
            {
              icon: 'warning',
              title: '沒有待辦事項',
              text: '',
              allowOutsideClick: false
            }
          )
        }
      }
    },
    finish (skip) {
      clearInterval(this.timer)
      this.status = 0
      this.$store.commit('finish')
      const audio = new Audio()
      audio.src = './alarms/' + this.alarm
      audio.play()
      if (this.todos.length > 0) {
        if (this.$store.getters.isBreak) {
          this.start()
        } else {
          this.$swal(
            {
              title: '休息時間結束',
              text: this.todos.length === 1 ? '最後 1 項' : '還有 ' + this.todos.length + ' 項',
              imageUrl: 'https://image.flaticon.com/icons/png/512/2942/2942841.png',
              imageWidth: 120,
              imageHeight: 120,
              allowOutsideClick: false
            }
          ).then((result) => {
            this.start()
          })
        }
      } else {
        this.$swal(
          {
            title: '恭喜完成!!!',
            text: '',
            imageUrl: 'https://image.flaticon.com/icons/svg/495/495535.svg',
            imageWidth: 120,
            imageHeight: 120,
            allowOutsideClick: false
          }
        )
      }
    },
    pause () {
      clearInterval(this.timer)
      this.status = 2
    },
    reload () {
      this.status = 2
      clearInterval(this.timer)
      this.$store.commit('reload')
    }
  }
}
</script>
