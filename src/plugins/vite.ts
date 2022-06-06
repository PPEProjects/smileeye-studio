import { Plugin } from 'vite'
import shell from 'shelljs'

export default () => {
  const content: Plugin = {
    name: 'vite:graphql-generator',
    async handleHotUpdate(ctx) {
      const list = [
        {
          regex:
            /src\/apollo\/smileeye\/(queries|mutations)\/(?!(__generated__))/,
          command: 'npm run apollo:codegen'
        },
        {
          regex:
            /src\/apollo\/notify\/(queries|mutations|subscriptions)\/(?!(__generated__))/,
          command: 'npm run apollo:codegen:notify'
        }
      ]

      for (const useCase of list) {
        if (useCase.regex.test(ctx.file)) {
          await shell.exec(useCase.command)
          break
        }
      }
    }
  }

  return content
}
