<template>
  <div id="app">
    <div class="app" :style="{background: menuColor}">
      <radial-menu class="radial-menu"
        :itemSize="50"
        :radius="100"
        :angle-restriction="180">
        <radial-menu-item
          v-for="(item, index) of nowpages"
          :key="index"
          style='background-color: #484891; color:#fff;'
          @click="changePage(item)">
          <span>{{item.page}}</span>
        </radial-menu-item>
      </radial-menu>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pages: [
        {
          page: '計時',
          path: '#/'
        },
        {
          page: '待辦',
          path: '#/list'
        },
        {
          page: '設定',
          path: '#/settings'
        }
      ],
      nowpage: '計時'
    }
  },
  computed: {
    nowpages () {
      const arr = []
      for (const i of this.pages) {
        if (i.page !== this.nowpage) {
          arr.push({
            page: i.page,
            path: i.path
          })
        }
      }
      return arr
    },
    menuColor () {
      if (this.theme === '春') {
        return 'linear-gradient(45deg, #d4fc79 0%, #96e6a1 100%)'
      } else if (this.theme === '夏') {
        return 'linear-gradient(45deg, #CD853F 0%, #CD853F 100%)'
      } else if (this.theme === '秋') {
        return 'linear-gradient(45deg, #f6d365 0%, #fda085 100%)'
      } else if (this.theme === '冬') {
        return 'linear-gradient(45deg, #dfe9f3 0%, white 100%)'
      }
      return 'white'
    },
    theme () {
      return this.$store.getters.themes
    },
    radialColor () {
      if (this.theme === '春') {
        return 'background-color: #228B22; color:#fff;'
      } else if (this.theme === '夏') {
        return 'background-color: #CC0000; color:#fff;'
      } else if (this.theme === '秋') {
        return 'background-color: #FFDC35; color:#fff;'
      } else if (this.theme === '冬') {
        return 'background-color: #0047AB; color:#fff;'
      }
      return 'background-color: #484891; color:#fff;'
    }
  },
  methods: {
    changePage (item) {
      window.location.href = item.path
      this.nowpage = item.page
      this.$store.commit('nowpage', this.nowpage)
    }
  }
}
</script>
<style lang="stylus">
body,html
  height 100%
  font-family "SimSun", Arial, serif;
#app
  height 100vh
.app
  display flex
  justify-content center
.radial-menu
  margin 3%
  background-color #484891
  width 100%
</style>
