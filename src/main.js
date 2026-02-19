import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import Toast, { useToast } from "vue-toastification";
import 'vue-toastification/dist/index.css'

import router from '@/router/index.js'
import '@/assets/main.css'
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)
const pinia = createPinia()


const toastOptions = { 
    position: "top-center",
    timeout: 3000,
    closeOnClick:true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    containerClassName: "my-toast-container",
    zIndex:99999999,
}

app.use(pinia)
app.use(VueApexCharts)
app.use(router)

app.use(Toast, toastOptions)
app.mount('#app')

