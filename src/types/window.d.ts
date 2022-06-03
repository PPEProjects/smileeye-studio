import {App} from "vue";

declare global {
    interface Window {
        $vue: App<Element>
    }
}
