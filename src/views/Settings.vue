<template>
  <div class="tabs">
    <input type="radio" id="tab1" name="tab-control" checked>
    <input type="radio" id="tab2" name="tab-control">
    <input type="radio" id="tab3" name="tab-control">
    <ul :style="{background: ulColor}">
      <li title="時間"><label for="tab1" role="button"><img src="../assets/clock.png" width="7%"><br><p class="m-0">時間</p></label></li>
      <li title="主題"><label for="tab2" role="button"><img src="../assets/paint.png" width="7%"><br><p class="m-0">主題</p></label></li>
      <li title="鈴聲"><label for="tab3" role="button"><img src="../assets/music.png" width="7%"><br><p class="m-0">鈴聲</p></label></li>
    </ul>
    <div class="content" :style="{background: sectionColor}">
      <section :style="{background: sectionColor}">
        <clock></clock>
      </section>
      <section :style="{background: sectionColor}">
        <theme></theme>
      </section>
      <section :style="{background: sectionColor}">
        <alarm></alarm>
      </section>
    </div>
  </div>
</template>
<script>

export default {
  computed: {
    ulColor () {
      if (this.theme === '春') {
        return 'linear-gradient(to top, #89f7fe 0%, #66a6ff 100%)'
      } else if (this.theme === '夏') {
        return 'linear-gradient(to top, #00c6fb 0%, #005bea 100%)'
      } else if (this.theme === '秋') {
        return 'linear-gradient(to top, rgb(249, 212, 35) 0%, rgb(255, 78, 80) 100%)'
      } else if (this.theme === '冬') {
        return 'linear-gradient(to bottom, #a1c4fd 0%, #c2e9fb 100%)'
      }
      return 'white'
    },
    theme () {
      return this.$store.getters.themes
    },
    sectionColor () {
      if (this.theme === '春') {
        return 'linear-gradient(to bottom, #89f7fe 0%, #66a6ff 100%)'
      } else if (this.theme === '夏') {
        return 'linear-gradient(to bottom, #00c6fb 0%, #005bea 100%)'
      } else if (this.theme === '秋') {
        return 'linear-gradient(to bottom, rgb(249, 212, 35) 0%, rgb(255, 78, 80) 100%)'
      } else if (this.theme === '冬') {
        return 'linear-gradient(to top, #a1c4fd 0%, #c2e9fb 100%)'
      }
      return 'white'
    }
  }
}
</script>
