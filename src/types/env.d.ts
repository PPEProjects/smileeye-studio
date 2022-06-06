interface ImportMetaEnv {
  readonly VITE_SMILE_EYE_SERVER: string
  readonly VITE_SMILE_EYE_GRAPHQL: string

  readonly VITE_NOTIFY_GRAPHQL: string
  readonly VITE_NOTIFY_SUBSCRIPTION: string
  readonly VITE_NOTIFY_API_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
