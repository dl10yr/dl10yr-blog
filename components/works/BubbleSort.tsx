import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const BubbleSort: React.FC = () => {
  const el = useRef(null)

  const drawChart = () => {
    const svg = d3.select(el.current).attr('width', 300)
    const wrapper = svg
      .append('g')
      .attr('class', 'wrapper')
      .style('width', 300)
      .style('height', 300)

    wrapper
      .append('rect')
      .attr('x', 10)
      .attr('y', 10)
      .attr('width', 100)
      .attr('height', 100)
      .attr('fill', '#3da4ab') // 長方形の中の色
  }
  useEffect(() => {
    drawChart()
  }, [])
  return (
    <div className="m-1">
      <svg ref={el} />
    </div>
  )
}

export default BubbleSort
