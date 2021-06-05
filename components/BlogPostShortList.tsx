import React from 'react'
import { BlogPostLink } from '@/components/BlogPostLink'

export const BlogPostShortList: React.FC = () => {
  return (
    <div className="border-t border-gray-500 py-1 my-1">
      <BlogPostLink
        date="20201212"
        title="nextjsを用いた自動化"
        link="https://zenn.dev/dl10yr/articles/0e31819e983a28"
        service="zenn"
      />
    </div>
  )
}
