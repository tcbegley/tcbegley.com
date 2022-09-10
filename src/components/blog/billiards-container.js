import { useState, useEffect, useRef } from 'react'

import BilliardsVisualisation from './billiards-visualisation'
import * as styles from './billiards-container.module.css'

let vis

export default function BilliardsContainer() {
  const [data, setData] = useState(null)
  const [width, setWidth] = useState(600)
  const [height, setHeight] = useState(330)
  const refElement = useRef(null)

  const initVis = () => {
    const d3Props = {
      width,
      height,
      setData,
    }
    vis = new BilliardsVisualisation(refElement.current, d3Props)
  }

  function handleResizeEvent() {
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(function () {
        let newWidth =
          (refElement.current && refElement.current.offsetWidth) || 400
        newWidth = Math.min(newWidth, 550)
        setWidth(newWidth)
        setHeight(newWidth * 0.55)
      }, 300)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }

  useEffect(handleResizeEvent, [])
  useEffect(initVis, [width, height])
  useEffect(() => {
    vis && vis.resize(width, height)
  }, [width, height])

  const formatDataString = (data) => {
    if (!data?.white) {
      return "Click 'Add white ball' to start"
    } else if (!data?.reds) {
      return `White ball location: ${data.white.toFixed(2)}`
    } else {
      return `White ball location: ${data.white.toFixed(
        2,
      )}, Red balls to left: ${data.reds
        .map((r) => r < data.white)
        .reduce((a, b) => a + b, 0)}`
    }
  }

  return (
    <div className="react-world">
      <div ref={refElement} className={styles.canvasContainer} />
      <div className={styles.data}>{formatDataString(data)}</div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => {
            if (vis) {
              vis.addWhiteBall()
            }
          }}
        >
          Add white ball
        </button>
        <button
          className={styles.button}
          onClick={() => {
            if (vis && data?.white) {
              vis.addRedBalls()
            }
          }}
          disabled={!data?.white}
        >
          Add red balls
        </button>
      </div>
    </div>
  )
}
