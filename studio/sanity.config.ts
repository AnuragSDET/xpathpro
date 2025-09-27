import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'xpath-pro-studio',
  title: 'xPath Pro SDET Course Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'xpath-pro',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Courses')
              .child(S.documentTypeList('course').title('Courses')),
            S.listItem()
              .title('Lessons')
              .child(S.documentTypeList('lesson').title('Lessons')),
            S.listItem()
              .title('Categories')
              .child(S.documentTypeList('category').title('Categories')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['course', 'lesson', 'category'].includes(listItem.getId()!)
            ),
          ])
    }),
    visionTool(),
    codeInput()
  ],

  schema: {
    types: schemaTypes,
  },
})