import * as d3 from 'd3'

import styles from './billiards-visualisation.module.css'

class BilliardsVisualisation {
  props
  canvas
  ctx
  time

  constructor(containerEl, props) {
    this.props = props
    this.canvas = d3.select(`.${styles.canvas}`).node()
      ? d3.select(`.${styles.canvas}`)
      : d3
          .select(containerEl)
          .append('canvas')
          .attr('class', styles.canvas)
          .attr('width', props.width)
          .attr('height', props.height)
    this.ctx = this.canvas.node().getContext('2d')
    this.white = null

    console.log(styles.canvas)

    this.setWhite = this.setWhite.bind(this)
    this.drawWhiteLine = this.drawWhiteLine.bind(this)
  }

  drawWhiteLine() {
    const { ctx, props, white } = this
    if (white !== null) {
      ctx.beginPath()
      ctx.moveTo(white.x, 0)
      ctx.lineTo(white.x, props.height)
      ctx.strokeStyle = 'white'
      ctx.stroke()
    }
  }

  setWhite(state) {
    this.white = state
  }

  addWhiteBall() {
    const { ctx, props, setWhite, drawWhiteLine } = this
    setWhite(null)

    let white = {
      x: 10 + Math.random() * (this.props.width - 20),
      y: 10 + Math.random() * (this.props.height - 20),
      r: 10,
      vx: Math.random() * 5 + 5,
      vy: Math.random() * 5 + 5,
    }

    requestAnimationFrame(tick)
    const endTime = Date.now() + 4000
    function tick() {
      ctx.clearRect(0, 0, props.width, props.height)
      ctx.fillStyle = 'white'
      ctx.beginPath()
      ctx.arc(white.x, white.y, white.r, 0, 2 * Math.PI)
      ctx.fill()

      if (
        (white.x - white.r <= 0 && white.vx < 0) ||
        (white.x + white.r >= props.width && white.vx > 0)
      ) {
        white.vx = -white.vx
      }
      if (
        (white.y - white.r <= 0 && white.vy < 0) ||
        (white.y + white.r >= props.height && white.vy > 0)
      ) {
        white.vy = -white.vy
      }

      const now = Date.now()
      white.x = white.x + (white.vx * (endTime - now)) / 4000
      white.y = white.y + (white.vy * (endTime - now)) / 4000
      if (now < endTime) {
        requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, props.width, props.height)
        setWhite({ x: white.x })
        drawWhiteLine()
        props.setData({ white: white.x / props.width })
      }
    }
  }

  addRedBalls() {
    let reds = []

    for (let i = 0; i < 5; i++) {
      reds.push({
        x: 10 + Math.random() * (this.props.width - 20),
        y: 10 + Math.random() * (this.props.height - 20),
        r: 10,
        vx: Math.random() * 5 + 5,
        vy: Math.random() * 5 + 5,
      })
    }

    requestAnimationFrame(tick)
    const { ctx, props, white, drawWhiteLine } = this
    const endTime = Date.now() + 4000
    function tick() {
      ctx.clearRect(0, 0, props.width, props.height)
      drawWhiteLine()
      ctx.fillStyle = '#ff2c28'

      const now = Date.now()

      reds.forEach((r) => {
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.r, 0, 2 * Math.PI)
        ctx.fill()

        if (
          (r.x - r.r <= 0 && r.vx < 0) ||
          (r.x + r.r >= props.width && r.vx > 0)
        ) {
          r.vx = -r.vx
        }
        if (
          (r.y - r.r <= 0 && r.vy < 0) ||
          (r.y + r.r >= props.height && r.vy > 0)
        ) {
          r.vy = -r.vy
        }
        r.x = r.x + (r.vx * (endTime - now)) / 4000
        r.y = r.y + (r.vy * (endTime - now)) / 4000
      })

      if (now < endTime) {
        requestAnimationFrame(tick)
      } else {
        props.setData({
          reds: reds.map((r) => r.x / props.width),
          white: white.x / props.width,
        })
      }
    }
  }

  resize = (width, height) => {
    this.canvas.attr('width', width).attr('height', height)
  }
}

export default BilliardsVisualisation
