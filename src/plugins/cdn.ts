import { App } from 'vue'

enum CDNLocation {
  CODE_BY
}

const $cdn = (path: string, location = CDNLocation.CODE_BY) => {
  let _path = path.replace(/^\//, '')

  switch (location) {
    case CDNLocation.CODE_BY:
      _path = 'https://smileeyev2.codeby.com/' + path
      break
  }

  return _path
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $cdn: typeof $cdn
  }
}

const plugin = {
  install(app: App) {
    app.config.globalProperties.$cdn = $cdn
    app.provide('$cdn', $cdn)
  }
}

export default plugin

export { CDNLocation }