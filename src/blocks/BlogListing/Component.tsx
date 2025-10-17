import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import BlogListing from './(view)/BlogLising'

type Props = {
  options?: {
    searchParams?: { [key: string]: string | string[] | undefined }
  }
}

export const BlogListingBlock: React.FC<Props> = async ({ options }) => {
  const pageNumber = (options?.searchParams?.pageNumber ?? '1') as string

  const blogs = await fetchArticles(pageNumber)

  return (
    <div className="container">
      <BlogListing articles={blogs.docs} />
      <Pagination
        page={Number(pageNumber)}
        totalPages={blogs.totalPages}
        // @ts-ignore
        collection={``}
      />
    </div>
  )
}

const fetchArticles = async (pageNumber: string) => {
  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection: 'blog',
    depth: 1,
    limit: 10,
    sort: '-createdAt',
    page: parseInt(pageNumber, 10) || 1,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })
}
