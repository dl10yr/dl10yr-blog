import React from 'react'

export const ArticleCard: React.FC = () => {
  return (
    <a className="mb-2 px-4 py-2 flex shadow hover:bg-gray-600 br rounded-lg">
      <div className="mr-2">画像</div>
      <div className="">
        <div className="font-semibold">タイトルタイトル退路つ</div>
        <div className="font-light">2020/12/12 zenn</div>
      </div>
    </a>
  )
}
