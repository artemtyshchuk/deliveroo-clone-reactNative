import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import schemas from './schemaTypes/index'

export default defineConfig({
  name: 'deliveroo-clone',
  title: 'deliveroo-clone',

  projectId: 'r0p0271y',
  dataset: 'dataset-sanity',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemas,
  },
})
