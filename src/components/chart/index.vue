<template>
  <canvas
    id="canvas"
    canvas-id="canvas"
    class="f2-canvas"
    type="2d"
  />
</template>

<script>
import Taro from '@tarojs/taro'

function wrapEvent(e) {
  if (!e) return
  if (!e.preventDefault) {
    e.preventDefault = function () {
    }
  }
  return e
}

export default {
  name: 'F2Canvas',
  props: {
    id: String,
    init: Function
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const query = Taro.createSelectorQuery()
      query
        .select('#canvas')
        .boundingClientRect()
        .exec((res) => {
          console.log(res)
          const { node } = res[0]
          const context = Canvas.getContext('2d')

          this.chart = this.init({
            context: context,
            width: this.width,
            height: this.height,
            pixelRatio: Taro.getSystemInfoSync().pixelRatio
          })
        })
    },
    touchStart(e) {
      if (!this.canvasEl) {
        return
      }
      this.canvasEl.dispatchEvent('touchstart', wrapEvent(e))
    },
    touchMove(e) {
      if (!this.canvasEl) {
        return
      }
      this.canvasEl.dispatchEvent('touchMove', wrapEvent(e))
    },
    touchEnd(e) {
      if (!this.canvasEl) {
        return
      }
      this.canvasEl.dispatchEvent('touchEnd', wrapEvent(e))
    }
  },
}
</script>

<style>
.f2-canvas {
  width: 100%;
  height: 100%;
}
</style>