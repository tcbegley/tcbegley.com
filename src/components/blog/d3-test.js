import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

function drawChart(svgRef) {
  const data = [12, 5, 6, 6, 9, 10]
  const h = 120
  const w = 250
  const svg = d3.select(svgRef.current)

  svg
    .attr('width', w)
    .attr('height', h)
    .style('margin-top', 50)
    .style('margin-left', 50)

  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * 40)
    .attr('y', (d, i) => h - 10 * d)
    .attr('width', 20)
    .attr('height', (d, i) => d * 10)
    .attr('fill', 'steelblue')
}

export default function D3Test() {
  const svg = useRef(null)

  useEffect(() => {
    drawChart(svg)
  }, [svg])

  return (
    <div id="chart">
      <svg ref={svg} />
    </div>
  )
}
