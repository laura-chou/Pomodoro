<template>
    <div id="list" :style="{background: bgColor}">
      <div class="title">
        <font-awesome-icon :icon="['fas','list-alt']"></font-awesome-icon>
      </div>
      <div class="input-group">
        <b-form-input v-model="newtodo" :maxlength="max" v-on:keyup.enter="addTodo" style="border-right:none" placeholder="新增項目" autocomplete="off"></b-form-input>
        <div class="input-group-append">
          <button class="input-group-text bg-white" @click="clearTodo">
            <font-awesome-icon class="icon-size" :icon="['fas','eraser']"></font-awesome-icon>
          </button>
        </div>
      </div>
      <div class="data-table">
        <b-table-simple class="m-0">
          <b-thead>
            <b-tr>
              <b-th variant="honeydew"></b-th>
              <b-th variant="honeydew">待辦事項</b-th>
              <b-th variant="honeydew">編輯</b-th>
            </b-tr>
          </b-thead>
          <draggable v-model="todos" tag="tbody" v-bind="dragOption" handle=".handle">
            <b-tr v-if="todos.length == 0">
              <b-td colspan="3"><h3>無事一身輕</h3></b-td>
            </b-tr>
            <b-tr v-else v-for="(todo, index) in todos" :key="index">
              <b-td>
                <font-awesome-icon class="icon-size handle" :icon="['fas','bars']"></font-awesome-icon>
              </b-td>
              <b-td style="width: 60%; padding-left: 0; padding-right: 0;">
                <div class="input-group" v-if="todo.edit">
                  <b-form-input v-model="todo.model" :maxlength="max" style="border-right:none; margin-left:12px"></b-form-input>
                  <div class="input-group-append">
                    <button class="input-group-text bg-white" @click="clearTodo(index)">
                      <font-awesome-icon class="icon-size" :icon="['fas','eraser']"></font-awesome-icon>
                    </button>
                  </div>
                </div>
                <span v-else>{{ todo.name }}</span>
              </b-td>
              <b-td style="width: 40%; padding-left: 0; padding-right: 0;">
                <b-btn variant="link" class="text-primary" v-if="!todo.edit" @click="editTodo(index)">
                  <font-awesome-icon class="icon-size" :icon="['fas','edit']"></font-awesome-icon>
                </b-btn>
                <b-btn variant="link" class="text-danger" v-if="!todo.edit" @click="delTodo(index)">
                  <font-awesome-icon class="icon-size" :icon="['fas','trash-alt']"></font-awesome-icon>
                </b-btn>
                <b-btn variant="link" class="text-primary" v-if="todo.edit" @click="cancelTodo(index)">
                  <font-awesome-icon class="icon-size" :icon="['fas','undo-alt']"></font-awesome-icon>
                </b-btn>
                <b-btn variant="link" class="text-success" v-if="todo.edit" @click="saveTodo(index)">
                  <font-awesome-icon class="icon-size" :icon="['fas','save']"></font-awesome-icon>
                </b-btn>
              </b-td>
            </b-tr>
          </draggable>
        </b-table-simple>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      newtodo: '',
      max: 15,
      dragOption: {
        animation: 200
      }
    }
  },
  methods: {
    addTodo () {
      if (this.newtodo !== '') {
        this.$store.commit('addTodo', this.newtodo)
        this.newtodo = ''
      } else {
        this.$swal(
          {
            icon: 'error',
            title: '請輸入文字',
            text: '',
            allowOutsideClick: false,
            confirmButtonText: '確定'
          }
        )
      }
    },
    delTodo (index) {
      this.$store.commit('delTodo', index)
    },
    editTodo (index) {
      this.$store.commit('editTodo', index)
    },
    cancelTodo (index) {
      this.$store.commit('cancelTodo', index)
    },
    saveTodo (index) {
      if (this.todos[index].model !== '') {
        this.$store.commit('saveTodo', index)
      } else {
        this.$swal(
          {
            icon: 'error',
            title: '請輸入文字',
            text: '',
            allowOutsideClick: false,
            confirmButtonText: '確定'
          }
        )
      }
    },
    clearTodo (index) {
      if (isNaN(index)) {
        this.newtodo = ''
      } else {
        this.$store.commit('clearTodo', index)
      }
    }
  },
  // computed 預設是只能讀取不能寫入
  computed: {
    todos: {
      // 讀取
      get () {
        return this.$store.getters.todos
      },
      // 寫入
      set (value) {
        return this.$store.commit('dragTodo', value)
      }
    },
    theme () {
      return this.$store.getters.themes
    },
    bgColor () {
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
    }
  }
}
</script>
