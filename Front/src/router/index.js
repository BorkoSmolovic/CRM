import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import axios from 'axios'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.MODE === 'ssr'
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {

    //router checks for logged user on every page except login 
    //check is provided by the server
    //if user isnt authenticated router wont grant requests
    //if user is authenticated router will work normally

      axios
        .get("/api/checkAuth")
        .then((response) => {
          //korisnik je ulogovan moze dalje
          if (to.name === 'Login') {
            Router.push('/Dashboard')
          }else{
            next()
          }
        }).catch(error => {
          //korisnik nije ulogovan, redirekt na login stranu
          if (to.name !== 'Login') {
            Router.push('/Login')
          }else{
            next()
          }
        })
 
        

  })


  return Router
})
