<template>
  <canvas
    type="2d"
    class="f2-canvas"
    id="canvas"
    canvasId="canvas"
    canvas-id="canvas"
    @touchStart="touchStart"
    @touchMove="touchMove"
    @touchEnd="touchEnd"
  />
</template>

<script>
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro'
import { Canvas } from '@antv/f2'

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
    init: Function,
  },
  mounted() {
    eventCenter.once(getCurrentInstance().router.onReady, () => {
      this.initChart()
    })
  },
  beforeUnmount() {
    const { canvas } = this
    if (!canvas) return
    canvas.destroy()
  },
  methods: {
    initChart() {
      Taro
        .createSelectorQuery()
        .select('#canvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          const { node, width, height } = res[0]
          const context = node.getContext('2d')
          const pixelRatio = Taro.getSystemInfoSync().pixelRatio
          // 高清设置
          node.width = width * pixelRatio
          node.height = height * pixelRatio
          const children = this.init()
          const canvas = new Canvas({
            pixelRatio,
            width,
            height,
            context,
            children,
          })
          canvas.render()
          this.canvas = canvas
          this.canvasEl = canvas.canvas.get('el')
        })
    },
    touchStart(e) {
      const canvasEl = this.canvasEl
      if (!canvasEl) {
        return
      }
      canvasEl.dispatchEvent('touchstart', wrapEvent(e))
    },
    touchMove(e) {
      const canvasEl = this.canvasEl
      if (!canvasEl) {
        return
      }
      canvasEl.dispatchEvent('touchmove', wrapEvent(e))
    },
    touchEnd(e) {
      const canvasEl = this.canvasEl
      if (!canvasEl) {
        return
      }
      canvasEl.dispatchEvent('touchend', wrapEvent(e))
    },
  },
}
</script>

<style>
.f2-canvas {
  width: 100%;
  height: 100%;
}
</style>