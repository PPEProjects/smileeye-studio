import {inject, ref} from "vue";
import {AnimeInstance} from "#types/anime";

export const useModal = () => {
    // @ts-ignore
    const anime = inject<AnimeInstance>('anime')!

    const open = ref<boolean>(false)
    const body = ref(null)
    const closeButton = ref(null)

    const data = ref(null)

    const dispose = () => {
        open.value = false
    }

    const init = () => {
        open.value = true
        anime({
            targets: body.value,
            scale: [0.9, 1],
            opacity: [0, 1],
            duration: 1500
        })

        anime({
            targets: closeButton.value,
            scale: [0, 1],
            opacity: [0, 1],
            delay: 500,
            duration: 1500
        })
    }

    return {
        open,
        closeButton,
        body,
        data,
        dispose,
        init
    }
}
