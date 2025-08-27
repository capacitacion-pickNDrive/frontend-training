import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { login, register } from '@/services/api'

export function useLogin() {
  const qc = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: ({ identifier, password }: { identifier: string; password: string }) =>
      login(identifier, password),
    onSuccess: ({ jwt, user }) => {
      // Guardar token y datos del usuario
      localStorage.setItem('token', jwt)
      qc.setQueryData(['me'], user)

      console.log('✅ Login data saved successfully')

      // 🚀 Navegar a /tareas
      router.navigate({ to: '/tareas' })
    },
    onError: (error: any) => {
      console.error('💥 useLogin onError:', {
        name: error.name,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      })
    },
  })
}

export function useRegister() {
  const qc = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: ({
      username,
      email,
      password,
    }: {
      username: string
      email: string
      password: string
    }) => register(username, email, password),
    onSuccess: ({ jwt, user }) => {
      localStorage.setItem('token', jwt)
      qc.setQueryData(['me'], user)

      console.log('✅ Register data saved successfully')

      // 🚀 Navegar también a /tareas
      router.navigate({ to: '/tareas' })
    },
    onError: (error: any) => {
      console.error('💥 useRegister onError:', error)
    },
  })
}
