import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const i18n = createI18n({
  locale: 'en-us',
  messages
})

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
  app.use(VueSweetalert2)
})

export { i18n }
