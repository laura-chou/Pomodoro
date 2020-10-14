<template>
    <div :style="style" class="vue-radial-menu-wrapper">
        <div
          :class="['vue-radial-menu-container', shouldOpen && 'open']"
          :style="style"
          @click="handleClick">
          <font-awesome-icon class="text-light" :icon="['fas', 'clock']" v-if="icon == '計時'"></font-awesome-icon>
          <font-awesome-icon class="text-light" :icon="['fas', 'list']" v-if="icon == '待辦'"></font-awesome-icon>
          <font-awesome-icon class="text-light" :icon="['fas', 'cog']" v-if="icon == '設定'"></font-awesome-icon>
        </div>
        <slot v-if="shouldOpen"></slot>
    </div>
</template>

<style>
.vue-radial-menu-wrapper {
position: relative;
user-select: none;
width: 65px !important;
height: 65px !important;
border-radius: 50%;
font-size: 35px;
}

.vue-radial-menu-container {
display: flex;
justify-content: center;
align-items: center;
border-radius: 50%;
transition: all 0.2s ease;
position: absolute;
left:12%;
top:11%;
z-index: 6;
}

.vue-radial-menu-container.open {
transform-origin: center center;
transform: rotateZ(45deg);
}
</style>

<script>
const RadialMenu = {
  name: 'RadialMenu',
  props: {
    angleRestriction: { type: Number, default: 180 },
    size: { type: Number, default: 50 },
    itemSize: { type: Number, default: 36 },
    rotate: { type: Number, default: 0 },
    radius: { type: Number, default: 100 },
    open: { type: Boolean, default: undefined }
  },
  data () {
    const { size } = this
    const manualMode = typeof this.open !== 'undefined'
    return {
      manualMode,
      isOpen: false,
      style: {
        width: size + 'px',
        height: size + 'px'
      }
    }
  },
  computed: {
    shouldOpen () {
      const { open, manualMode, isOpen } = this
      return manualMode ? open : isOpen
    },
    icon () {
      return this.$store.getters.pg
    }
  },
  mounted () {
    document.addEventListener('click', this.closeMenuEvent)
    this.setChildProps()
  },
  beforeUpdate () {
    this.setChildProps()
  },
  beforeDestroy () {
    document.removeEventListener('click', this.closeMenuEvent)
  },
  methods: {
    closeMenuEvent (e) {
      if (this.shouldOpen && !this.$el.contains(e.target)) {
        this.toggleMenu()
      }
    },
    handleClick () {
      this.$emit('click')
      this.toggleMenu()
    },
    toggleMenu () {
      if (this.manualMode) return

      if (this.isOpen) {
        this.isOpen = false
        this.$emit('close')
      } else {
        this.isOpen = true
        this.$emit('open')
      }
    },
    setChildProps () {
      // Manually add prop data to the items
      const items = this.$slots.default.map(s => s.componentOptions.propsData)
      const { size, itemSize, angleRestriction, rotate, radius } = this
      const angle = angleRestriction > 300 || angleRestriction < -300 ? 300 : angleRestriction
      const frags = angle / (items.length - 1 || 1)
      const angles = items.map(
        (item, index) => (Math.PI * (frags * index + rotate)) / 180
      )

      items.forEach((propData, index) => {
        propData.width = itemSize
        propData.height = itemSize
        propData.left = -1 * (size / 2 + Math.cos(angles[index]) * radius - itemSize / 2) // -1 to have the items in the right order
        propData.top = size / 2 - Math.sin(angles[index]) * radius - itemSize / 2
        propData.onClick = this.manualMode ? null : this.toggleMenu // To prevent double emiting click event
      })
    }
  }
}

export default RadialMenu
</script>
