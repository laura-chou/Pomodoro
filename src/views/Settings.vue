<template>
  <div id="setting" :style="{background: ulColor}">
    <div class="title">
      <font-awesome-icon :icon="['fas','cog']"></font-awesome-icon>
    </div>
    <div>
      <b-tabs justified>
        <b-tab active>
          <template #title>
            <img src="../assets/clock.png">
            <h3 class="m-0">時間</h3>
          </template>
          <clock></clock>
        </b-tab>
        <b-tab>
          <template #title>
            <img src="../assets/paint.png">
            <h3 class="m-0">主題</h3>
          </template>
          <theme></theme>
        </b-tab>
        <b-tab>
          <template #title>
            <img src="../assets/music.png">
            <h3 class="m-0">鈴聲</h3>
          </template>
          <alarm></alarm>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>

export default {
  computed: {
    ulColor () {
      let bgcolor = ''
      if (this.theme === '春') {
        bgcolor = 'linear-gradient(to top, #89f7fe 0%, #66a6ff 100%)'
      } else if (this.theme === '夏') {
        bgcolor = 'linear-gradient(to top, #00c6fb 0%, #005bea 100%)'
      } else if (this.theme === '秋') {
        bgcolor = 'linear-gradient(to top, rgb(249, 212, 35) 0%, rgb(255, 78, 80) 100%)'
      } else if (this.theme === '冬') {
        bgcolor = 'linear-gradient(to bottom, #a1c4fd 0%, #c2e9fb 100%)'
      }
      return bgcolor
    },
    theme () {
      return this.$store.getters.themes
    }
  }
}
</script>
