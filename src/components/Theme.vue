<template>
<div id="theme">
    <b-table class="table m-0" :items="items" :fields="fields" @row-clicked="selectTheme">
    <template v-slot:cell(select)="data">
        <input type="checkbox" id="box" checked disabled="disabled" v-if="data.item.name == theme">
        <input type="checkbox" id="box" disabled="disabled" v-else>
        <label for="box"></label>
    </template>
    </b-table>
</div>
</template>
<script>
import '../style/checkbox.css'
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
      ],
      cc: 'red'
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
