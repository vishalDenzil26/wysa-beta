import React from 'react'
import type { FAQBlock as FAQBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & FAQBlockType

export const FAQBlock: React.FC<Props> = ({ className, faqsContent, faqsFilter }) => {
  return (
    <div className={cn('container mx-auto w-full max-w-4xl mb-20', className)}>
      <Tabs
        defaultValue={
          faqsFilter && faqsFilter.faqCategories && faqsFilter.faqCategories[0].Category?.['id']
        }
      >
        <div className="flex justify-center lg:justify-end w-full px-10 lg:px-0">
          <TabsList className="gap-x-2 lg:gap-x-4">
            {faqsFilter?.faqCategories?.map(({ Category, id, displayName }) => {
              return (
                <TabsTrigger key={id} value={Category?.['id']}>
                  {displayName ? displayName : Category?.['title']}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
        <div className={'mt-8'}>
          {faqsFilter?.faqCategories?.map(({ Category, id }, loopIndex) => {
            let items =
              faqsContent?.faqItems?.filter((item) => item.category?.['id'] === Category?.['id']) ??
              []
            if (Category?.['title'] === 'FAQ') {
              items = faqsContent?.faqItems ?? []
            }

            return (
              <TabsContent key={id} value={Category?.['id']}>
                <Accordion type="single" collapsible>
                  {items.map(({ question, answer }, index) => {
                    return (
                      <AccordionItem
                        key={index}
                        value={index.toString()}
                        className="bg-primary-foreground px-10 py-2.5 mb-3 rounded-[18px]"
                      >
                        <AccordionTrigger className="text-primary">
                          <h3 className="text-lg font-semibold max-w-2xl text-left">{question}</h3>
                        </AccordionTrigger>
                        <AccordionContent>
                          <RichText data={answer!} enableGutter={false} />
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </TabsContent>
            )
          })}
        </div>
      </Tabs>
    </div>
  )
}
