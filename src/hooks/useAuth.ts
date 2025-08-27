import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login, register } from '@/services/auth'

export function useLogin() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ identifier, password }: { identifier: string; password: string }) =>
      login(identifier, password),
    onSuccess: ({ jwt, user }) => {
      localStorage.setItem('token', jwt)
      qc.setQueryData(['me'], user)
    },
  })
}

export function useRegister() {
  const qc = useQueryClient()
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
    },
  })
}
