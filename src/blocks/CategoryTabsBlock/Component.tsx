'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/utilities/cn'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Category } from '@/payload-types'

export const CategoryTabsBlock: React.FC<{
  categoriesFilters: {
    Category: Category
    displayName?: string
    navigationType: 'page' | 'param'
  }[]
}> = (props) => {
  const { categoriesFilters } = props

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const activeCategory = searchParams.get('category') ?? ''
  return (
    <div className="container mx-auto my-14">
      <div className="flex justify-between items-center w-full">
        <h3 className="text-primary text-3xl font-mono">All resources</h3>
        <div className="flex items-center gap-3">
          {categoriesFilters.map(({ Category, displayName, navigationType }, index) => {
            return (
              <div key={Category.id}>
                {navigationType === 'page' ? (
                  <Link
                    className={'font-bold text-sm rounded-xl p-2'}
                    href={`${pathname}/${Category.title.toLowerCase()}`}
                  >
                    {displayName ?? Category.title}
                  </Link>
                ) : (
                  <Button
                    variant={'ghost'}
                    className={cn(
                      'font-bold text-sm rounded-xl',
                      Category &&
                        activeCategory === Category.title &&
                        'bg-secondary-foreground text-secondary',
                      activeCategory === '' &&
                        index === 0 &&
                        'bg-secondary-foreground text-secondary',
                    )}
                    onClick={() => {
                      router.push(
                        Category ? `${pathname}?category=${Category.title}` : `${pathname}`,
                      )
                    }}
                  >
                    {displayName ?? Category.title}
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
