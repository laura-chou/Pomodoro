<template>
<div id="alarm">
    <b-table class="m-0" :items="items" :fields="fields" @row-clicked="selectAlarm">
    <template v-slot:cell(select)="data">
        <input type="checkbox" checked disabled="disabled" v-if="data.item.file == alarm">
        <input type="checkbox" disabled="disabled" v-else>
        <label for="box"></label>
    </template>
    <template v-slot:cell(preview)="data">
        <audio controls :src="'./alarms/' + data.item.file"></audio>
    </template>
    </b-table>
</div>
</template>

<script>
import '../style/checkbox.stylus'
export default {
  data () {
    return {
      items: [
        {
          name: '叮叮',
          file: 'Bell.mp3'
        },
        {
          name: '鼓掌',
          file: 'Applause.mp3'
        },
        {
          name: '貓',
          file: 'Cat.mp3'
        },
        {
          name: '雞',
          file: 'Chicken.mp3'
        },
        {
          name: '牛',
          file: 'Cow.mp3'
        },
        {
          name: '狗',
          file: 'Dog.mp3'
        },
        {
          name: '馬',
          file: 'Horse.mp3'
        },
        {
          name: '羊',
          file: 'Sheep.mp3'
        },
        {
          name: '狼',
          file: 'Wolf.mp3'
        },
        {
          name: '電話',
          file: 'Phone.mp3'
        },
        {
          name: '尖叫',
          file: 'Scream.mp3'
        },
        {
          name: '結帳',
          file: 'Shop.mp3'
        },
        {
          name: '阿達一族',
          file: 'The_Addams_Family.mp3'
        }
      ],
      fields: [
        {
          key: 'select',
          label: '選擇'
        },
        {
          key: 'name',
          label: '名稱'
        },
        {
          key: 'preview',
          label: '預覽'
        }
      ]
    }
  },
  computed: {
    alarm () {
      return this.$store.getters.alarms
    }
  },
  methods: {
    selectAlarm (item) {
      this.$store.commit('selectAlarm', item.file)
    }
  }
}
</script>
