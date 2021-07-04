import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import clone from 'clone'
import { Button } from '@/components/Button'

const BubbleSort: React.FC = () => {
  const el = useRef(null)
  const parentEl = useRef(null)
  const [randomArray, setRandomArray] = useState([])
  const [randomHeight, setRandomHeight] = useState([])
  const [clientHeight, setClientHeight] = useState(0)
  const [clientWidth, setClientWidth] = useState(0)

  const arrayLength = 10

  const xScale = d3.scaleLinear().domain([0, arrayLength]).range([0, clientWidth])
  const yScale = d3.scaleLinear().domain([0, 100]).range([clientHeight, 0])

  const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec))

  const startBubbleSort = async () => {
    const randomArrayClone = clone(randomHeight)
    let count = 0
    let swapped

    for (let i = randomArrayClone.length; i > 0; i--) {
      swapped = 0
      for (let j = 1; j < i; j++) {
        const a = randomArrayClone[j - 1]
        const b = randomArrayClone[j]
        if (a > b) {
          const aRect = d3.select(`.rect${j - 1}`)
          const bRect = d3.select(`.rect${j}`)

          const aRectX = aRect.attr('x')
          const bRectX = bRect.attr('x')
          aRect.transition().duration(100).attr('x', bRectX).attr('class', `rect${j}`)
          bRect
            .transition()
            .duration(100)
            .attr('x', aRectX)
            .attr('class', `rect${j - 1}`)

          await sleep(300)
          randomArrayClone[j] = a
          randomArrayClone[j - 1] = b
          swapped = j
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        count++
      }
      if (!swapped) {
        break
      } else {
        i = swapped + 1
      }
    }
    setRandomHeight(randomArrayClone)
  }

  const getRandomArray = (arrayLength) => {
    return [...Array(arrayLength)].map(() => {
      return Math.random() * 100
    })
  }

  const drawChart = async () => {
    const svg = d3.select(el.current).attr('width', 300).attr('height', 300)
    setClientWidth(el.current.clientWidth ? el.current.clientWidth : 300)
    setClientHeight(el.current.clientHeight ? el.current.clientHeight : 300)
    const wrapper = svg
      .append('g')
      .attr('class', 'wrapper')
      .style('width', 300)
      .style('height', 300)

    const randomHeightClone = []

    randomArray.forEach((height, i) => {
      wrapper
        .append('rect')
        .attr('class', `rect${i}`)
        .attr('x', xScale(i))
        .attr('y', yScale(height))
        .attr('width', 10)
        .attr('height', clientHeight - yScale(height))
        .attr('fill', '#3da4ab') // 長方形の中の色
      randomHeightClone.push(clientHeight - yScale(height))
    })
    setRandomHeight(randomHeightClone)
  }
  useEffect(() => {
    setRandomArray(getRandomArray(arrayLength))
  }, [])

  useEffect(() => {
    drawChart()
  }, [randomArray.length])

  return (
    <div className="m-1" ref={parentEl}>
      <svg ref={el} />
      <div className="my-3">
        <Button label="Start" primary={true} onClick={() => startBubbleSort()} />
      </div>
    </div>
  )
}

export default BubbleSort
