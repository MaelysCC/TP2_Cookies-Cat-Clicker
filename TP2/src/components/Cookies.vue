<template>

  
  <div class="card cookie-game">

    <h1>CAT Clicker</h1>
    <p class="cookie-counter" >Nombre de chat : {{ store.state.cookies.cookies }}</p>

    <p>
      Deux fois plus chat :{{ store.getters['cookies/doubleCookies'] }}
    </p>

    <button class="cookie-button" @click="addCookie">
      <img
        src="../assets/cat.gif"
        alt="Cookie"
        class="image"
      >
    </button>

    <div class="upgrade">
      <h2>Upgrade</h2>
      <p>Prix : {{ store.state.cookies.upgradeCost }} sacrifices</p>

      <button @click="acheterUpgrade" :disabled="!store.getters['cookies/peutAcheterUpgrade']">
        Acheter +1 chat/seconde
      </button>

    </div>

  
    <div class="upgrade">
      <h2>Multiplicateur</h2>

    <p>
      Multiplicateur actuel : x{{ store.state.cookies.multiplier }}</p>
    <p> Prix : {{ store.state.cookies.multiplierCost }} sacrifices</p>


    <button
      @click="buyMultiplier"
      :disabled="store.state.cookies.cookies < store.state.cookies.multiplierCost"
    >
      Acheter multiplicateur
    </button>
    </div>

  

    <br><br>
    <button @click="saveGame">Save</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

function addCookie() {
  store.commit('cookies/addCookie')
}

function acheterUpgrade() {
  store.commit('cookies/acheterUpgrade')
}

onMounted(() => {
  store.dispatch('cookies/startAutoProduction')
})

function saveGame() {
  store.commit(
    'users/saveScore',
    store.state.cookies.cookies
  )
}

function buyMultiplier() {
  store.commit('cookies/acheterMult')
}
</script>