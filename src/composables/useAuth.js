import { ref } from 'vue'
import { supabase } from '../lib/supabase'

const user = ref(null)

async function init() {
  const { data } = await supabase.auth.getSession()
  user.value = data.session?.user ?? null

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
  })
}

async function signUp(email, password, nickname) {
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (!error && data.user) {
    await supabase.from('profiles').insert({
      user_id: data.user.id,
      nickname,
    })
  }

  return { data, error }
}

async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

async function signOut() {
  await supabase.auth.signOut()
}

export function useAuth() {
  return { user, init, signUp, signIn, signOut }
}