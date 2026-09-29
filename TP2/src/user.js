const savedUsers = JSON.parse(localStorage.getItem('users')) || []

const adminExists = savedUsers.some(
  user => user.username === 'admin'
)

if (!adminExists) {
  savedUsers.push({
    username: 'admin',
    role: 'Admin',
    cookies: 0
  })

  localStorage.setItem(
    'users',
    JSON.stringify(savedUsers)
  )
}

export default {
  namespaced: true,
  state: {
    currentUser: null,
    users: JSON.parse(localStorage.getItem('users')) || [],
    challenges: []
  },

  getters: {
    isLoggedIn: state => state.currentUser !== null,
    currentUser: state => state.currentUser,
    leaderboard: state => {
        return [...state.users].sort((a, b) => b.cookies - a.cookies)
    },

    isAdmin: state => {
        return state.currentUser?.role === 'Admin'
    }
  },

  mutations: {
    createUser(state, username) {
      const existingUser = state.users.find(
        user => user.username === username
      )
        if (!existingUser) {
            state.users.push({
            username: username,
            role: username === 'admin' ? 'Admin' : 'Player',
            cookies: 0
            })
        localStorage.setItem('users',
            JSON.stringify(state.users)
        )
      }
    },

    login(state, username) {
        const user = state.users.find(
            user => user.username === username
        )

        if (user) {
            state.currentUser = user
        }
    },

    logout(state) {
        state.currentUser = null
    },

    saveScore(state, cookies) {
        if (!state.currentUser) return
        const user = state.users.find(
            user => user.username === state.currentUser.username
        )

      if (user) {
        user.cookies = cookies
            state.currentUser.cookies = cookies
        }
      localStorage.setItem(
        'users',
        JSON.stringify(state.users)
      )
    },

    resetScore(state, username) {
      const user = state.users.find(
        user => user.username === username
      )

      if (user) {
        user.cookies = 0
      }
      localStorage.setItem(
        'users',
        JSON.stringify(state.users)
      )
    },

    modifyScore(state, { username, score }) {
      const user = state.users.find(
        user => user.username === username
      )

      if (user) {
        user.cookies = Number(score)
      }
      localStorage.setItem(
        'users',
        JSON.stringify(state.users)
      )
    },

    changeRole(state, { username, role }) {
      const user = state.users.find(
        user => user.username === username
      )

      if (user) {
        user.role = role
      }
      localStorage.setItem(
        'users',
        JSON.stringify(state.users)
      )
    },

    challengePlayer(state, opponent) {
      if (!state.currentUser) return
      state.challenges.push({
        challenger: state.currentUser.username,
        opponent: opponent
      })
    }
  }
}