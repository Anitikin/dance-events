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
  <div>
    <h1>{{ isRegister ? 'Регистрация' : 'Вход' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div v-if="isRegister">
        <label>Никнейм</label><br />
        <input v-model="nickname" type="text" required />
      </div>
      <div>
        <label>Email</label><br />
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label>Пароль</label><br />
        <input v-model="password" type="password" required />
      </div>
      <p v-if="errorMsg" style="color: red">{{ errorMsg }}</p>
      <button type="submit">{{ isRegister ? 'Зарегистрироваться' : 'Войти' }}</button>
    </form>
    <button @click="isRegister = !isRegister">
      {{ isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться' }}
    </button>
  </div>
</template>