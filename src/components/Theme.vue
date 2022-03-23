<template>
<div id="theme">
  <div class="data-table">
    <b-table class="m-0" :items="items" :fields="fields" @row-clicked="selectTheme">
      <template v-slot:cell(select)="data">
        <input type="checkbox" checked disabled="disabled" v-if="data.item.name == theme">
        <input type="checkbox" disabled="disabled" v-else>
        <label for="box"></label>
      </template>
    </b-table>
  </div>
</div>
</template>
<script>
import '../style/checkbox.stylus'
export default {
  data () {
    return {
      items: [
        {
          name: '春'
        },
        {
          name: '夏'
        },
        {
          name: '秋'
        },
        {
          name: '冬'
        }
      ],
      fields: [
        {
          key: 'select',
          label: '選擇'
        },
        {
          key: 'name',
          label: '主題'
        }
      ]
    }
  },
  computed: {
    theme () {
      return this.$store.getters.themes
    }
  },
  methods: {
    selectTheme (item) {
      this.$store.commit('selectTheme', item.name)
    }
  }
}
</script>
