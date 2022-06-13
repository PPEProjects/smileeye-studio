// typings.d.ts or router.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
    disableBack?: boolean
    title?: string
    collapse?: boolean
  }
}
