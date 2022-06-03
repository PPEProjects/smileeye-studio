import {ref} from "vue";

export type BaseButtonCallback = () => Promise<void>;

export const useButton = (callback: BaseButtonCallback) => {
    const isLoading = ref<boolean>(false)

    const onClick = async () => {
        isLoading.value = true
        await callback()
        isLoading.value = false
    }

    return {
        isLoading,
        onClick
    }
}
