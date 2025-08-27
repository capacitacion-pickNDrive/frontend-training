import { useRegister } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function RegisterPage() {
  const { mutate: register, isPending, isError } = useRegister()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Registro</h1>
      <Input
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="mb-2"
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="mb-2"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="mb-4"
      />
      {isError && <p className="text-red-500 text-sm mb-2">Error al registrar</p>}
      <Button
        onClick={() => register({ username, email, password })}
        disabled={isPending}
        className="w-full"
      >
        {isPending ? 'Cargando...' : 'Registrarse'}
      </Button>
    </div>
  )
}
