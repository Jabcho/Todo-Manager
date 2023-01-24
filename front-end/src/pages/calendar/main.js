import { createApp } from 'vue'
import Calendar from './CalendarPage.vue'
import store from '@/store/index'

createApp(Calendar).use(store).mount('#app')
/*
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import { apply } from 'core-js/fn/reflect'



const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(Calendar)

app.use(store)
app.use(vuetify)
app.mount('#app')*/