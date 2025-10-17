import type { ClientUser, GlobalConfig } from 'payload'
import { revalidateGlobarScriptAndCss } from './hooks/revalidateGlobalScriptAndCss'

export const GlobalScriptsAndCss: GlobalConfig = {
  slug: 'globalscriptsandcss',
  label: 'Scripts',
  admin: {
    hidden: ({ user }) => {
      return !user?.roles?.includes('admin')
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'customCSS',
      label: ' Custom CSS',
      type: 'textarea',
      admin: {
        description: 'Enter full <style> tag with custom CSS to apply Global level.',
        placeholder: '<style>\n  body {\n    background: #f0f0f0;\n  }\n</style>',
        rows: 10,
      },
    },
    {
      name: 'customScripts',
      label: 'Scripts',
      type: 'textarea',
      admin: {
        description: 'Enter <script> tags to be injected into the Global',
        placeholder: `<script async src="https://example.com/script.js" data-custom="true"></script>\n<script>\n  console.log("Inline script loaded");\n</script>`,
        rows: 10,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateGlobarScriptAndCss],
  },
}
