import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const DynamicBubbleSortComponent = dynamic(() => import('@/components/works/BubbleSort'))

const SortAlgorithm: NextPage = () => {
  return (
    <div className="min-h-screen p-2.5">
      <Head>
        <title>dl10yr</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-wrap">
        <div className="w-full lg:w-2/3">
          <div className="p-3">
            <h2 className="text-xl font-bold text-cdred">ソートアルゴリズム</h2>
            <div className="m-3">
              <h2>バブルソート</h2>
              <DynamicBubbleSortComponent />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 pt-12 px-5">Other works</div>
      </main>
    </div>
  )
}
export default SortAlgorithm
