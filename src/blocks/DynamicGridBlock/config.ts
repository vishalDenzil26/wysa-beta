import type { Block, Field } from 'payload'
import { MediaBlock } from '../MediaBlock/config'
import { CallToAction } from '../CallToAction/config'
import { DynamicContentBlock } from '../Content/dynamic/config'
import { FeedbackBlock } from '../FeedbackBlock/config'
import { GutterField } from '@/fields/gutter'
import { RatingBlock } from '../RatingBlock/config'
import { VideoBlock } from '../VideoBlock/config'

const GridItemField: Field[] = [
  {
    label: 'Grid item group',
    type: 'group',
    name: 'gridItemGroup',
    fields: [
      {
        type: 'tabs',
        tabs: [
          {
            label: 'Grid item blocks',
            fields: [
              {
                name: 'gridItemBlock',
                type: 'blocks',
                blocks: [
                  MediaBlock,
                  CallToAction,
                  DynamicContentBlock,
                  FeedbackBlock,
                  RatingBlock,
                  VideoBlock,
                ],
                label: 'Grid item block',
              },
            ],
          },
          {
            label: 'Grid item settings',
            fields: [
              {
                name: 'customClassNames',
                type: 'text',
                admin: {
                  description: 'Use space to separate class names',
                },
              },
            ],
          },
        ],
      },
    ],
  },
]

const gridLayout: Field = {
  name: 'gridLayout',
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'columns',
          type: 'number',
          label: 'Number of grid columns',
          defaultValue: 0,
        },
        {
          name: 'rows',
          type: 'number',
          label: 'Number of grid rows',
          defaultValue: 0,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'columnsGap',
          type: 'select',
          label: 'Grid columns gap',
          options: [
            {
              label: '0',
              value: 'gap-x-0',
            },
            {
              label: '2',
              value: 'gap-x-2',
            },
            {
              label: '4',
              value: 'gap-x-4',
            },
            {
              label: '6',
              value: 'gap-x-6',
            },
            {
              label: '10',
              value: 'gap-x-10',
            },
            {
              label: '12',
              value: 'gap-x-12',
            },
            {
              label: '14',
              value: 'gap-x-14',
            },
            {
              label: '16',
              value: 'gap-x-16',
            },
            {
              label: '20',
              value: 'gap-x-20',
            },
            {
              label: '24',
              value: 'gap-x-24',
            },
          ],
          defaultValue: 'gap-x-0',
        },
        {
          name: 'rowsGap',
          type: 'select',
          label: 'Grid rows gap',
          options: [
            {
              label: '0',
              value: 'gap-y-0',
            },
            {
              label: '2',
              value: 'gap-y-2',
            },
            {
              label: '4',
              value: 'gap-y-4',
            },
            {
              label: '6',
              value: 'gap-y-6',
            },
            {
              label: '10',
              value: 'gap-y-10',
            },
            {
              label: '12',
              value: 'gap-y-12',
            },
            {
              label: '14',
              value: 'gap-y-14',
            },
            {
              label: '16',
              value: 'gap-y-16',
            },
            {
              label: '20',
              value: 'gap-y-20',
            },
            {
              label: '24',
              value: 'gap-y-24',
            },
          ],
          defaultValue: 'gap-y-0',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'grid-padding-y',
          type: 'select',
          label: 'Vertical grid padding',
          options: [
            {
              label: '0',
              value: 'py-0',
            },
            {
              label: '6',
              value: 'py-6',
            },
            {
              label: '10',
              value: 'py-10',
            },
            {
              label: '12',
              value: 'py-12',
            },
            {
              label: '14',
              value: 'py-14',
            },
            {
              label: '16',
              value: 'py-16',
            },
            {
              label: '20',
              value: 'py-20',
            },
            {
              label: '24',
              value: 'py-24',
            },
          ],
          defaultValue: 'py-0',
        },
        {
          name: 'grid-padding-x',
          type: 'select',
          label: 'Horizontal grid padding',
          options: [
            {
              label: '0',
              value: 'px-0',
            },
            {
              label: '6',
              value: 'px-6',
            },
            {
              label: '10',
              value: 'px-10',
            },
            {
              label: '12',
              value: 'px-12',
            },
            {
              label: '14',
              value: 'px-14',
            },
            {
              label: '16',
              value: 'px-16',
            },
            {
              label: '20',
              value: 'px-20',
            },
            {
              label: '24',
              value: 'px-24',
            },
          ],
          defaultValue: 'px-0',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'alignItems',
          type: 'select',
          label: 'Align Items',
          defaultValue: '',
          options: [
            {
              label: 'None',
              value: '',
            },
            {
              label: 'Items start',
              value: 'items-start',
            },
            {
              label: 'Items center',
              value: 'items-center',
            },
            {
              label: 'Items end',
              value: 'items-end',
            },
          ],
        },
        {
          name: 'justifyContent',
          type: 'select',
          label: 'Justify content',
          defaultValue: '',
          options: [
            {
              label: 'None',
              value: '',
            },
            {
              label: 'Justify between',
              value: 'justify-between',
            },
            {
              label: 'Justify around',
              value: 'justify-around',
            },
            {
              label: 'Justify center',
              value: 'justify-center',
            },
            {
              label: 'Justify evenly',
              value: 'justify-evenly',
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'background',
          label: 'Background color',
          type: 'select',
          defaultValue: 'bg-none',
          admin: {
            width: '50%',
          },
          options: [
            {
              label: 'Primary',
              value: 'bg-primary-foreground',
            },
            {
              label: 'Secondary',
              value: 'bg-secondary-foreground',
            },
            {
              label: 'Muted',
              value: 'bg-muted',
            },
            {
              label: 'None',
              value: 'bg-none',
            },
          ],
        },
        {
          name: 'position',
          type: 'select',
          label: 'Grid size',
          defaultValue: 'default',
          options: [
            {
              label: 'Default',
              value: 'default',
            },
            {
              label: 'Expand',
              value: 'expand',
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rounded',
          label: 'Border radius',
          type: 'select',
          defaultValue: 'rounded-2xl',
          options: [
            {
              label: 'Default',
              value: 'rounded-2xl',
            },
            {
              label: 'None',
              value: 'none',
            },
          ],
        },
      ],
    },
    {
      name: 'customClassNames',
      type: 'text',
      admin: {
        description: 'Use space to separate class names',
      },
    },
    ...GutterField,
  ],
}
export const DynamicGridBlock: Block = {
  slug: 'dynamicGridBlock',
  interfaceName: 'DynamicGridBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          fields: [gridLayout],
          label: 'Layout settings',
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'gridItems',
              type: 'array',
              label: 'Grid items',
              fields: GridItemField,
            },
          ],
        },
      ],
    },
  ],
}
