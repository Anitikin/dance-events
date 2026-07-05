<script setup>
import { onMounted } from 'vue'
import { useAuth } from './composables/useAuth'

const { user, init, signOut } = useAuth()

onMounted(() => {
  init()
})
</script>

<template>
  <nav>
    <router-link to="/">Мастер-классы</router-link>
    <router-link to="/profile">Личный кабинет</router-link>
    <router-link to="/create">Создать</router-link>
    <span class="spacer"></span>
    <span v-if="user" class="muted">
      {{ user.email }} — <button @click="signOut">Выйти</button>
    </span>
    <router-link v-else to="/login" class="btn">Войти</router-link>
  </nav>
  <router-view />
</template>