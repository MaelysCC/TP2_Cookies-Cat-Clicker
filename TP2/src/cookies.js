export default {
  namespaced: true,

  state: {
    cookies: 0,
    autoProduction: 0,
    upgradeCost: 10,

    multiplier: 1,
    multiplierCost: 20
  },

  getters: {
    doubleCookies: state => state.cookies * 2,
    cookiesParSeconde: state => state.autoProduction,
    peutAcheterUpgrade: state => state.cookies >= state.upgradeCost,
    peutAcheterMult: state => state.cookies >= state.multiplierCost
  },

  mutations: {
    addCookie(state) {
      state.cookies += state.multiplier
    },

    addCookiesAuto(state) {
      state.cookies += state.autoProduction * state.multiplier
    },

    acheterUpgrade(state) {
      if (state.cookies >= state.upgradeCost) {
        state.cookies -= state.upgradeCost
        state.autoProduction++
        state.upgradeCost += 10
      }
    },
    acheterMult(state) {
      if (state.cookies >= state.multiplierCost) {
        state.cookies -= state.multiplierCost
        state.multiplier++
        state.multiplierCost += 50
      }
    },
    loadCookies(state, amount) {
      state.cookies = amount
    },

    resetGame(state) {
      state.cookies = 0
      state.autoProduction = 0
      state.upgradeCost = 10
      state.multiplier = 1
      state.multiplierCost = 50
    }
  },

  actions: {
    startAutoProduction({ commit }) {
      setInterval(() => {
        commit('addCookiesAuto')
      }, 1000)
    }
  }
}