import { createStore } from 'vuex'
import cookies from './cookies'
import users from './user'

export default createStore({
  modules: {
    cookies,
    users
  }
})