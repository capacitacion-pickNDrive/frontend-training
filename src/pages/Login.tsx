import { useLogin } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import checkbox from '@/checkbox.png'

export default function LoginPage() {
  const { mutate: login, isPending, isError } = useLogin()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <Input
        placeholder="Email"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
        className="mb-2"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="mb-4"
      />
      {isError && <p className="text-red-500 text-sm mb-2">Credenciales inválidas</p>}
      <Button
        onClick={() => login({ identifier, password })}
        disabled={isPending}
        className="w-full"
      >
        {isPending ? 'Cargando...' : 'Login'}
      </Button>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={checkbox} styles={{ width: '200px' }} />
      </div>
    </div>
  )
}
