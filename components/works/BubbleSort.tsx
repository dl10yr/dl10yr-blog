import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const BubbleSort: React.FC = () => {
  const el = useRef(null)
  const parentEl = useRef(null)
  const [randomArray, setRandomArray] = useState([])

  const startBubbleSort = () => {
    // eslint-disable-next-line no-console
    console.log('start')
  }

  const getRandomArray = (arrayLength) => {
    return [...Array(arrayLength)].map(() => {
      return Math.random() * 100
    })
  }

  const drawChart = async () => {
    const svg = d3.select(el.current).attr('width', 300).attr('height', 300)
    const wrapper = svg
      .append('g')
      .attr('class', 'wrapper')
      .style('width', 300)
      .style('height', 300)

    const arrayLength = 300

    const clientHeight = el.current.clientHeight ? el.current.clientHeight : 300
    const clientWidth = el.current.clientWidth ? el.current.clientWidth : 300

    const xScale = d3.scaleLinear().domain([0, arrayLength]).range([0, clientWidth])
    const yScale = d3.scaleLinear().domain([0, 100]).range([clientHeight, 0])

    randomArray.forEach((height, i) => {
      wrapper
        .append('rect')
        .attr('class', `class-${i}`)
        .attr('x', xScale(i))
        .attr('y', yScale(height))
        .attr('width', 1)
        .attr('height', clientHeight - yScale(height))
        .attr('fill', '#3da4ab') // 長方形の中の色
    })
  }
  useEffect(() => {
    setRandomArray(getRandomArray(300))
  }, [])

  useEffect(() => {
    drawChart()
  }, [randomArray])

  return (
    <div className="m-1" ref={parentEl}>
      <svg ref={el} />
      <button onClick={() => startBubbleSort()}>バブルソート</button>
    </div>
  )
}

export default BubbleSort
