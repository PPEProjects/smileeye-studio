import { Plugin } from 'vite'
import shell from 'shelljs'

export default () => {
  const content: Plugin = {
    name: 'vite:graphql-generator',
    async handleHotUpdate(ctx) {
      if (/src\/apollo\/(queries|mutations)/.test(ctx.file)) {
        // Thay đổi file trong graphql
        try {
          await shell.exec('npm run apollo:codegen')
        } catch (e) {
          console.log('Graphql schema missing')
        }
      }
    }
  }

  return content
}
