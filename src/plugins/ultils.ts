import { App } from 'vue'

//CDN
enum CDNLocation {
  CODE_BY
}

const $cdn = (path: string, location = CDNLocation.CODE_BY) => {
  if (!path) {
    return ''
  }

  if (/^http/.test(path)) {
    return path
  }

  let _path = path.replace(/^\//, '')

  switch (location) {
    case CDNLocation.CODE_BY:
      _path = 'https://smileeyev2.codeby.com/' + path
      break
  }

  return _path
}

const $moneyFormat = (money: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(money)
}

// Link Builder

// Cutsom type
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $cdn: typeof $cdn
    $moneyFormat: typeof $moneyFormat
  }
}

// Install Function
const plugin = {
  install(app: App) {
    app.config.globalProperties.$cdn = $cdn
    app.provide('$cdn', $cdn)
    app.config.globalProperties.$moneyFormat = $moneyFormat
    app.provide('$moneyFormat', $moneyFormat)
  }
}

export default plugin

export { CDNLocation }
