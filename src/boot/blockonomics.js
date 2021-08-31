import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

// for all requests
// axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.QENV.BLOCKONOMICS_API_KEY}`
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

const blockonomics = axios.create({
  baseURL: 'https://www.blockonomics.co',
  crossdomain: true,
  crossDomain: true,
  headers: {
    common: {
      'Authorization': `Bearer ${process.env.QENV.BLOCKONOMICS_API_KEY}`,
      'Access-Control-Allow-Origin': 'https://www.blockonomics.co',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type': 'application/json',
    }
   },
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$blockonomics = blockonomics
  // ^ ^ ^ this will allow you to use this.$blockonomics (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { blockonomics }
