interface ImportMetaEnv {
    readonly VITE_SMILE_EYE_SERVER: string
    readonly VITE_SMILE_EYE_GRAPHQL: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
