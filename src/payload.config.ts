import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { UnderlineFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, SanitizedConfig } from 'payload'
import { fileURLToPath } from 'url'
import Categories from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import Users from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { revalidateRedirects } from './hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { News as NewsType, Page } from 'src/payload-types'
import { s3Storage } from '@payloadcms/storage-s3'
import { CustomDatePickerBlock } from './blocks/Form/DatePicker/config'
import { CustomConsentBlock } from './blocks/Form/Consent/config'
import { CustomMultiCheckboxesBlock } from './blocks/Form/MultiCheckboxes/config'
import { News } from './collections/News'
import { CustomTextField } from './blocks/Form/Text/config'
import { CustomEmailFields } from './blocks/Form/Email/config'
import { CustomTextareaFields } from './blocks/Form/Textarea/config'
import { CustomSelectFields } from './blocks/Form/Select/config'
import { Resources } from './collections/Resources'
import { Videos } from './collections/Videos'
import { Reports } from './collections/Reports'
import ResourcesListing from './collections/ResourcesListing'
import { getSecretValue } from './utilities/secrets'
import { CustomTelFields } from './blocks/Form/Tel/config'
import { BlogCategories } from './collections/BlogCategories'
import { Blog } from './collections/Blogs'
import { BlogNav } from './BlogNav/config'
import { GlobalScriptsAndCss } from './GobalScriptAndCss/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

async function createBuildConfig() {
  const secrets = await getSecretValue()

  const generateTitle: GenerateTitle<NewsType | Page> = ({ doc }) => {
    return doc?.title ? `${doc.title} | Wysa` : 'Wysa'
  }

  const generateURL: GenerateURL<NewsType | Page> = ({ doc }) => {
    return doc?.slug
      ? `${secrets.NEXT_PUBLIC_SERVER_URL!}/${doc.slug}`
      : secrets.NEXT_PUBLIC_SERVER_URL!
  }

  return buildConfig({
    admin: {
      components: {
        beforeLogin: ['@/components/BeforeLogin'],
      },
      importMap: {
        baseDir: path.resolve(dirname),
      },
      user: Users.slug,
      livePreview: {
        breakpoints: [
          {
            label: 'Mobile',
            name: 'mobile',
            width: 375,
            height: 667,
          },
          {
            label: 'Tablet',
            name: 'tablet',
            width: 768,
            height: 1024,
          },
          {
            label: 'Desktop',
            name: 'desktop',
            width: 1440,
            height: 900,
          },
        ],
      },
    },
    // This config helps us configure global or default features that the other editors can inherit
    editor: lexicalEditor({
      features: () => {
        return [
          UnderlineFeature(),
          BoldFeature(),
          ItalicFeature(),
          LinkFeature({
            enabledCollections: ['pages', 'news', 'resources', 'reports'],
            fields: ({ defaultFields }) => {
              const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
                if ('name' in field && field.name === 'url') return false
                return true
              })

              return [
                ...defaultFieldsWithoutUrl,
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    condition: ({ linkType }) => linkType !== 'internal',
                  },
                  label: ({ t }) => t('fields:enterURL'),
                  required: true,
                },
              ]
            },
          }),
        ]
      },
    }),
    db: mongooseAdapter({
      url: secrets.DATABASE_URI || '',
    }),
    collections: [
      Pages,
      Resources,
      News,
      Videos,
      Reports,
      Media,
      Categories,
      Users,
      ResourcesListing,
      BlogCategories,
      Blog,
    ],
    cors: ['http://localhost:3000', process.env.NEXT_PUBLIC_SERVER_URL!],
    csrf: ['http://localhost:3000', process.env.NEXT_PUBLIC_SERVER_URL!],
    globals: [Header, Footer, BlogNav, GlobalScriptsAndCss],
    plugins: [
      redirectsPlugin({
        collections: ['pages', 'resources', 'news', 'videos', 'reports', 'blog'],
        overrides: {
          admin: {
            hidden: ({ user }) => {
              return !user?.roles?.includes('admin')
            },
          },
          // @ts-expect-error
          fields: ({ defaultFields }) => {
            return defaultFields.map((field) => {
              if ('name' in field && field.name === 'from') {
                return {
                  ...field,
                  admin: {
                    description: 'You will need to rebuild the website when changing this field.',
                  },
                }
              }
              return field
            })
          },
          hooks: {
            afterChange: [revalidateRedirects],
          },
        },
      }),
      nestedDocsPlugin({
        collections: ['pages', 'news', 'resources', 'categories', 'videos', 'reports'],
        generateLabel: (_, doc) => doc.title as string,
        generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
      }),
      seoPlugin({
        generateTitle,
        generateURL,
      }),
      formBuilderPlugin({
        fields: {
          text: {
            fields: CustomTextField,
          },
          email: {
            fields: CustomEmailFields,
          },
          textarea: {
            fields: CustomTextareaFields,
          },
          select: {
            fields: CustomSelectFields,
          },
          tel: CustomTelFields,
          payment: false,
          datePicker: CustomDatePickerBlock,
          consent: CustomConsentBlock,
          multiCheckboxes: CustomMultiCheckboxesBlock,
        },
        formOverrides: {
          admin: {
            hidden: ({ user }) => {
              return !user?.roles?.includes('admin')
            },
          },
          fields: ({ defaultFields }) => {
            return defaultFields.map((field) => {
              const fieldCopy = { ...field }
              if ('name' in field && field.name === 'confirmationMessage') {
                fieldCopy['editor'] = lexicalEditor({
                  features: ({ rootFeatures }) => {
                    return [
                      ...rootFeatures,
                      FixedToolbarFeature(),
                      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    ]
                  },
                })
              }
              return fieldCopy
            })
          },
        },
        formSubmissionOverrides: {
          admin: {
            hidden: ({ user }) => {
              return !user?.roles?.includes('admin')
            },
          },
        },
      }),
      s3Storage({
        collections: {
          media: true,
        },
        bucket: secrets.S3_BUCKET!,
        config: {
          credentials: {
            accessKeyId: secrets.S3_ACCESS_KEY_ID!,
            secretAccessKey: secrets.S3_SECRET_ACCESS_KEY!,
          },
          region: secrets.S3_REGION,
        },
      }),
    ],
    secret: secrets.PAYLOAD_SECRET,
    typescript: {
      outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
  })
}

export default (await createBuildConfig()) as SanitizedConfig
