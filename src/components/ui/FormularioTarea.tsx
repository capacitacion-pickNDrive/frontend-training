import { useState } from 'react'
import { useCrearTarea } from '@/hooks/useTareas'

export function FormularioTarea() {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [completada, setCompletada] = useState(false)
  const [deadline, setDeadline] = useState('')
  const [categoriaId, setCategoriaId] = useState(null)

  const { mutate: crearTarea, isPending } = useCrearTarea()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    crearTarea({
      titulo,
      descripcion,
      completada,
      deadline,
      categoria: categoriaId ? { connect: [categoriaId] } : undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-mono">Crear nueva tarea</h2>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        className="border p-2 w-full"
        required
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        className="border p-2 w-full"
        required
      />

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setCompletada(false)}
          className={`px-4 py-2 rounded ${!completada ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          FALSE
        </button>
        <button
          type="button"
          onClick={() => setCompletada(true)}
          className={`px-4 py-2 rounded ${completada ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          TRUE
        </button>
      </div>

      <input
        type="date"
        value={deadline}
        onChange={e => setDeadline(e.target.value)}
        className="border p-2 w-full"
      />

      <select onChange={e => setCategoriaId(Number(e.target.value))} className="border p-2 w-full">
        <option value="">Seleccionar categoría</option>
        <option value={1}>Para la semana...</option>
        {/* Podés mapear categorías dinámicamente si usás useCategorias */}
      </select>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={isPending}
      >
        {isPending ? 'Guardando...' : 'Guardar tarea'}
      </button>
    </form>
  )
}
