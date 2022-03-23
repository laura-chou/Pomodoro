<template>
  <div id="app">
    <PushRotate>
      <router-link to="/" class="d-flex align-items-center">
        <font-awesome-icon :icon="['fas','clock']"></font-awesome-icon>
        <span>計時</span>
      </router-link>
      <router-link to="/list" class="d-flex align-items-center">
        <font-awesome-icon :icon="['fas','list-alt']"></font-awesome-icon>
        <span>代辦清單</span>
      </router-link>
      <router-link to="/settings" class="d-flex align-items-center">
        <font-awesome-icon :icon="['fas','cog']"></font-awesome-icon>
        <span>設定</span>
      </router-link>
    </PushRotate>
    <main id="page-wrap">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </main>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
