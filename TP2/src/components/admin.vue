<template>
    <div v-if="store.getters['users/isAdmin']" 
    class="card admin">
    <h2>Administration</h2>

    <div v-for="user in store.state.users.users" :key="user.username" class="admin-user">
      <p>
        {{ user.username }}
        - {{ user.cookies }} cookies
        - {{ user.role }}
      </p>

      <input
        type="number"
        v-model.number="scores[user.username]"
        placeholder="Nouveau score"
      >

      <button @click="modifyScore(user.username)">
        Trafiquage score
      </button>

      <button @click="resetScore(user.username)">
        Reset
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const scores = reactive({})

function modifyScore(username) {
  store.commit('users/modifyScore', {
    username: username,
    score: scores[username]
  })
}

function resetScore(username) {
  store.commit('users/resetScore', username)
}
</script>