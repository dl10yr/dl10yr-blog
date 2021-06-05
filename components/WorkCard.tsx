import React from 'react'

export const WorkCard: React.FC = () => {
  return (
    <a className="m-3 px-4 py-2 shadow bg-gray-600 rounded-lg w-32">
      <div className="mr-2">画像</div>
      <div className="">
        <div className="font-semibold">タイトルタイトル退路つ</div>
        <div className="font-light">2020/12/12 zenn</div>
      </div>
    </a>
  )
}
