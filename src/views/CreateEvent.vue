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