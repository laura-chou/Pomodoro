<template>
    <Transition name="radial-vue-radial-menu-item">
        <div
            :style="style"
            class="vue-radial-menu-item"
            @click="handleClick">
            <slot></slot>
        </div>
    </Transition>
</template>

<style>
.vue-radial-menu-item {
position: absolute;
border-radius: 50%;
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
transition: all 0.2s ease;
z-index: 5;
font-size: 17px;
font-weight: bold;
width: 60px !important;
height: 60px !important;
}
.radial-vue-radial-menu-item-enter,
.radial-vue-radial-menu-item-leave-to {
top: 50% !important;
left: 50% !important;
transform: translate(-50%, -50%);
opacity: 0;
}
</style>

<script>
const RadialMenuItem = {
  name: 'RadialMenuItem',
  props: ['top', 'left', 'height', 'width', 'onClick'],
  data () {
    const { top, left, height, width } = this
    return {
      style: {
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px'
      }
    }
  },
  methods: {
    handleClick (e) {
      this.onClick && this.onClick(e)
      this.$emit('click', e)
    }
  }
}

export default RadialMenuItem
</script>
