import { Plugin } from 'vite'
import shell from 'shelljs'

export default () => {
  const content: Plugin = {
    name: 'vite:graphql-generator',
    async handleHotUpdate(ctx) {
      if (
        /src\/apollo\/(queries|mutations)\/(?!(__generated__))/.test(ctx.file)
      ) {
        // Thay đổi file trong graphql
        await shell.exec('npm run apollo:codegen')
      }
    }
  }

  return content
}
