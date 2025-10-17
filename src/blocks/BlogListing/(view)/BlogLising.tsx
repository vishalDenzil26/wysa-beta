import React from 'react'
import { cn } from '@/utilities/cn'
import { BlogCard } from './BlogCard'
import type { Blog } from '@/payload-types'
import { BlogCategory } from '@/payload-types'

type Props = {
  articles: Blog[]
}

export default function BlogListing({ articles }: Props) {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-16 max-w-6xl mx-auto py-10')}>
      {articles.map((article) => {
        return (
          <div key={article.title} className="w-full">
            <BlogCard
              media={article.thumbNail}
              title={article.title}
              category={article.category as BlogCategory[]}
              duration={article.duration}
              path={`/blogs/${article.category[0]['slug']}/${article.slug}`}
            />
          </div>
        )
      })}
    </div>
  )
}
