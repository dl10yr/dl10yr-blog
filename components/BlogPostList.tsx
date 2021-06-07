import React from 'react'
import { BlogPostLink } from '@/components/BlogPostLink'

export interface BlogPostListInterface {
  postsList: any
}
const BlogPostList: React.FC<BlogPostListInterface> = ({ postsList }) => {
  return (
    <div className="border-t border-gray-500 py-1 my-1">
      {postsList.map((post) => {
        return <BlogPostLink key={post.slug} date={post.date} title={post.title} slug={post.slug} />
      })}
    </div>
  )
}

export default BlogPostList
