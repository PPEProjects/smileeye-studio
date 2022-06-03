import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import {App} from "vue"

const plugin = {
    install(app: App) {
        app.component('VueCropper', VueCropper)
    }
}

export default plugin
