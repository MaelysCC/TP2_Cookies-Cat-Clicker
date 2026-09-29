<template>
  <div class="card leaderboard">
    <h2>Classement</h2>

    <ol>
      <li v-for="user in store.getters['users/leaderboard']" :key="user.username">
        {{ user.username }}
        - {{ user.cookies }} chats

        <button
          v-if="
            store.getters['users/currentUser'] &&
            user.username !== store.getters['users/currentUser'].username
          "
          @click="challenge(user.username)"
        >
          Challenger
        </button>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

function challenge(username) {
  store.commit('users/challengePlayer', username)

  alert('Challenge envoyé à ' + username)
}
</script>