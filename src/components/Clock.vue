<template>
    <div id="clock">
        <table width="100%">
            <tr>
                <td height="20px"></td>
            </tr>
            <tr>
                <td>開始時間</td>
            </tr>
            <tr>
                <td height="20px"></td>
            </tr>
            <tr>
                <td class="td">
                    <div>
                        <button @click="workTime('minus')">
                            <font-awesome-icon class="icon-size" :icon="['fas','minus']"></font-awesome-icon>
                        </button>
                    </div>
                    <div class="circle" :style="{background: circleColor}">{{ worktime }}<br>分鐘</div>
                    <div>
                        <button @click="workTime('add')">
                            <font-awesome-icon class="icon-size" :icon="['fas','plus']"></font-awesome-icon>
                        </button>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                  <img src="../assets/line.png" width="70%" height="10%">
                </td>
            </tr>
            <tr>
                <td>休息時間</td>
            </tr>
            <tr>
                <td height="20px"></td>
            </tr>
            <tr>
                <td class="td">
                    <div>
                        <button @click="breakTime('minus')">
                            <font-awesome-icon class="icon-size" :icon="['fas','minus']"></font-awesome-icon>
                        </button>
                    </div>
                    <div class="circle" :style="{background: circleColor}">{{ breaktime }}<br>分鐘</div>
                    <div>
                        <button @click="breakTime('add')">
                            <font-awesome-icon class="icon-size" :icon="['fas','plus']"></font-awesome-icon>
                        </button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
  data () {
    return {
      worktime: 30,
      breaktime: 10
    }
  },
  computed: {
    theme () {
      return this.$store.getters.themes
    },
    circleColor () {
      if (this.theme === '春') {
        return '#B7FF4A'
      } else if (this.theme === '夏') {
        return '#CD853F'
      } else if (this.theme === '秋') {
        return '#FFFF6F'
      } else if (this.theme === '冬') {
        return '#FCFCFC'
      }
      return 'white'
    }
  },
  methods: {
    workTime (calcu) {
      if (calcu === 'add') {
        if (this.worktime < 60) {
          this.worktime++
        }
      } else {
        if (this.worktime > 1) {
          this.worktime--
        }
      }
      this.$store.commit('workTime', this.worktime * 60)
    },
    breakTime (calcu) {
      if (calcu === 'add') {
        if (this.breaktime < 60) {
          this.breaktime++
        }
      } else {
        if (this.breaktime > 1) {
          this.breaktime--
        }
      }
      this.$store.commit('breakTime', this.breaktime * 60)
    }
  }
}
</script>
