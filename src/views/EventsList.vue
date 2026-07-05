<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useAuth } from '../composables/useAuth'
import { getGoogleCalendarUrl } from '../utils/calendar'

const { user } = useAuth()
const events = ref([])
const loading = ref(true)
const myEventIds = ref(new Set())

async function loadEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true })

  if (!error) events.value = data
  loading.value = false
}

async function loadMySubscriptions() {
  if (!user.value) return
  const { data } = await supabase
    .from('user_events')
    .select('event_id')
    .eq('user_id', user.value.id)

  myEventIds.value = new Set(data?.map(r => r.event_id))
}

async function addToMy(eventId) {
  const { error } = await supabase.from('user_events').insert({
    user_id: user.value.id,
    event_id: eventId,
  })
  if (!error) myEventIds.value.add(eventId)
}

onMounted(async () => {
  await loadEvents()
  await loadMySubscriptions()
})
</script>

<template>
  <div>
    <h1>Мастер-классы</h1>
    <p v-if="loading" class="muted">Загрузка...</p>
    <p v-else-if="events.length === 0" class="muted">Пока нет мастер-классов</p>
    <ul v-else class="event-list">
      <li v-for="event in events" :key="event.id" class="event-card">
        <h3>{{ event.title }}</h3>
        <div class="event-meta">
          {{ new Date(event.event_date).toLocaleString('ru-RU', { dateStyle: 'medium', timeStyle: 'short' }) }}
          · {{ event.location }} · преподаватель: {{ event.teacher_name }}
        </div>
        <div class="event-actions">
          <button v-if="user && !myEventIds.has(event.id)" @click="addToMy(event.id)">
            Добавить к себе
          </button>
          <span v-else-if="myEventIds.has(event.id)" class="added-label">✓ Добавлено</span>
          <a :href="getGoogleCalendarUrl(event)" target="_blank" class="btn btn-secondary">
            📅 В календарь
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>