<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { signIn, signUp } = useAuth()

const email = ref('')
const password = ref('')
const nickname = ref('')
const errorMsg = ref('')
const isRegister = ref(false)

async function handleSubmit() {
  errorMsg.value = ''

  const { error } = isRegister.value
    ? await signUp(email.value, password.value, nickname.value)
    : await signIn(email.value, password.value)

  if (error) {
    errorMsg.value = error.message
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="form-page">
    <h1>{{ isRegister ? 'Регистрация' : 'Вход' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div v-if="isRegister">
        <label>Никнейм</label>
        <input v-model="nickname" type="text" required />
      </div>
      <div>
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label>Пароль</label>
        <input v-model="password" type="password" required />
      </div>
      <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>
      <button type="submit">{{ isRegister ? 'Зарегистрироваться' : 'Войти' }}</button>
    </form>
    <button class="btn-secondary" @click="isRegister = !isRegister" style="margin-top: 16px;">
      {{ isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться' }}
    </button>
  </div>
</template>