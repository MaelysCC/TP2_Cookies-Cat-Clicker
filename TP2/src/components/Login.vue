<template>
  <div class="card login">
    <h2>Connexion</h2>

    <input
      v-model="username"
      placeholder="Nom d'utilisateur"
    >

    <button @click="createAccount">
      Créer un compte
    </button>

    <button @click="login">
      Connexion
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const username = ref('')

function createAccount() {
  store.commit('users/createUser', username.value)
}

function login() {
  store.commit('users/login', username.value)

  const user = store.getters['users/currentUser']

  console.log('Utilisateur connecté :', user)

  if (user) {
    store.commit(
      'cookies/loadCookies',
      user.cookies
    )
  }
}
</script>