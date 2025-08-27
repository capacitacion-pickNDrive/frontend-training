import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router' // Para TanStack Router
// O si usas React Router: import { useNavigate } from 'react-router-dom'
import { login, register } from '@/services/api'

export function useLogin() {
  const qc = useQueryClient()
  const router = useRouter() // Para TanStack Router
  // O si usas React Router: const navigate = useNavigate()

  return useMutation({
    mutationFn: ({ identifier, password }: { identifier: string; password: string }) => {
      console.log('🚀 useLogin mutation called with:', {
        identifier,
        passwordLength: password.length,
      })
      return login(identifier, password)
    },
    onSuccess: ({ jwt, user }) => {
      console.log('🎉 useLogin onSuccess:', {
        jwt: jwt ? 'received' : 'missing',
        user: user ? user.email || user.username : 'missing',
      })

      // Guardar token
      localStorage.setItem('token', jwt)
      qc.setQueryData(['me'], user)

      // AGREGAR NAVEGACIÓN
      // Para TanStack Router:
      router.navigate({ to: '/tareas' }) // o la ruta que corresponda

      // Para React Router:
      // navigate('/tasks') // o la ruta que corresponda

      console.log('🔄 Redirecting to tasks...')
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
  const router = useRouter() // Para TanStack Router
  // O si usas React Router: const navigate = useNavigate()

  return useMutation({
    mutationFn: ({
      username,
      email,
      password,
    }: {
      username: string
      email: string
      password: string
    }) => {
      console.log('🚀 useRegister mutation called with:', {
        username,
        email,
        passwordLength: password.length,
      })
      return register(username, email, password)
    },
    onSuccess: ({ jwt, user }) => {
      console.log('🎉 useRegister onSuccess:', {
        jwt: jwt ? 'received' : 'missing',
        user: user ? user.email || user.username : 'missing',
      })

      // Guardar token
      localStorage.setItem('token', jwt)
      qc.setQueryData(['me'], user)

      // AGREGAR NAVEGACIÓN
      // Para TanStack Router:
      router.navigate({ to: '/tasks' }) // o la ruta que corresponda

      // Para React Router:
      // navigate('/tasks') // o la ruta que corresponda

      console.log('🔄 Redirecting to tasks...')
    },
    onError: (error: any) => {
      console.error('💥 useRegister onError:', {
        name: error.name,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      })
    },
  })
}
