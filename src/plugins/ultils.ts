import { App, defineAsyncComponent } from 'vue'

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

// Link Builder

// Cutsom type
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $cdn: typeof $cdn
  }
}

// Install Function
const plugin = {
  install(app: App) {
    app.config.globalProperties.$cdn = $cdn
    app.provide('$cdn', $cdn)

    // Global component
    app.component(
      'TeleportView',
      defineAsyncComponent(() => import('@components/layout/TeleportView.vue'))
    )
    app.component(
      'ModalBase',
      defineAsyncComponent(() => import('@components/modal/ModalBase.vue'))
    )
    app.component(
      'TabsAnimation',
      defineAsyncComponent(
        () => import('@components/includes/TabsAnimation.vue')
      )
    )
  }
}

export default plugin

export { CDNLocation }
