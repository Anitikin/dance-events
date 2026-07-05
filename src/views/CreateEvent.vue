<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { user } = useAuth()

const title = ref('')
const description = ref('')
const eventDate = ref('')
const location = ref('')
const teacherName = ref('')

const loading = ref(false)
const errorMsg = ref('')

async function handleSubmit() {
  loading.value = true
  errorMsg.value = ''

  const { error } = await supabase.from('events').insert({
    title: title.value,
    description: description.value,
    event_date: eventDate.value,
    location: location.value,
    teacher_name: teacherName.value,
    teacher_id: user.value?.id ?? null,
  })

  loading.value = false

  if (error) {
    errorMsg.value = error.message
    console.error(error)
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="form-page">
    <h1>Создать мастер-класс</h1>

    <form @submit.prevent="handleSubmit">
      <div>
        <label>Название</label>
        <input v-model="title" type="text" required />
      </div>

      <div>
        <label>Описание</label>
        <textarea v-model="description"></textarea>
      </div>

      <div>
        <label>Дата и время</label>
        <input v-model="eventDate" type="datetime-local" required />
      </div>

      <div>
        <label>Место</label>
        <input v-model="location" type="text" />
      </div>

      <div>
        <label>Имя преподавателя</label>
        <input v-model="teacherName" type="text" required />
      </div>

      <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Сохранение...' : 'Создать' }}
      </button>
    </form>
  </div>
</template>