<template>
  <div id="clock">
    <div class="data-table">
      <table class="table">
        <tr>
          <td class="border-0">
            <h3 class="m-0">工作</h3>
          </td>
          <td class="border-0">
            <div class="d-flex justify-content-around align-items-center">
              <b-button v-b-tooltip.hover.bottom squared size="md" variant="danger" @click="workTime('minus')">
                <font-awesome-icon class="icon-size" :icon="['fas','minus']"></font-awesome-icon>
              </b-button>
              <div class="d-flex justify-content-center align-items-center">
                <h3 class="m-0 mr-2">{{ worktime }}&emsp;</h3>
                <h4 class="m-0">分鐘</h4>
              </div>
              <b-button v-b-tooltip.hover.bottom squared size="md" variant="primary" @click="workTime('add')">
                <font-awesome-icon class="icon-size" :icon="['fas','plus']"></font-awesome-icon>
              </b-button>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <h3 class="m-0">休息</h3>
          </td>
          <td>
            <div class="d-flex justify-content-around align-items-center">
              <b-button v-b-tooltip.hover.bottom squared size="md" variant="danger" @click="breakTime('minus')">
                <font-awesome-icon class="icon-size" :icon="['fas','minus']"></font-awesome-icon>
              </b-button>
              <div class="d-flex justify-content-center align-items-center">
                <h3 class="m-0 mr-2">{{ breaktime }}</h3>
                <h4 class="m-0">分鐘</h4>
              </div>
              <b-button v-b-tooltip.hover.bottom squared size="md" variant="primary" @click="breakTime('add')">
                <font-awesome-icon class="icon-size" :icon="['fas','plus']"></font-awesome-icon>
              </b-button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      worktime: 25,
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
