<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useAuth } from '../composables/useAuth'

const { user } = useAuth()
const myEvents = ref([])
const loading = ref(true)

async function loadMyEvents() {
  if (!user.value) {
    loading.value = false
    return
  }

  const { data, error } = await supabase
    .from('user_events')
    .select('event_id, events(*)')
    .eq('user_id', user.value.id)

  if (error) {
    console.error(error)
  } else {
    myEvents.value = data.map(row => row.events).filter(Boolean)
  }
  loading.value = false
}

async function removeFromMy(eventId) {
  const { error } = await supabase
    .from('user_events')
    .delete()
    .eq('user_id', user.value.id)
    .eq('event_id', eventId)

  if (!error) {
    myEvents.value = myEvents.value.filter(e => e.id !== eventId)
  }
}

onMounted(() => {
  loadMyEvents()
})
</script>

<template>
  <div>
    <h1>Личный кабинет</h1>

    <div v-if="!user">
      <p>Войдите, чтобы увидеть свои мастер-классы.</p>
    </div>
    <div v-else>
      <h2>Мои мастер-классы</h2>
      <p v-if="loading">Загрузка...</p>
      <p v-else-if="myEvents.length === 0">Вы пока ничего не добавили</p>
      <ul v-else>
        <li v-for="event in myEvents" :key="event.id">
          <strong>{{ event.title }}</strong> — {{ event.event_date }}
          <br />{{ event.location }}, преподаватель: {{ event.teacher_name }}
          <br />
          <button @click="removeFromMy(event.id)">Убрать</button>
        </li>
      </ul>
    </div>
  </div>
</template>