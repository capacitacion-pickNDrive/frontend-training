// src/pages/TareasPage.tsx
import { useState } from 'react'
import { ListaTareas } from '@/components/ui/ListaTareas'
import { FormularioTarea } from '@/components/ui/FormularioTarea'
import fondoCalendarion from '@/clendario-reflejos-de-luz.jpg'

export const TareasPage = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        backgroundImage: `url(${fondoCalendarion})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <main className="p-6 max-w-xl w-full bg-white/80 rounded shadow mt-6">
        <h1 className="text-2xl font-mono mb-4 text-center">📋 Lista de Tareas</h1>

        <div className="text-center mb-4">
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            {mostrarFormulario ? 'Cerrar formulario' : 'Nueva Tarea'}
          </button>
        </div>

        {mostrarFormulario && <FormularioTarea />}

        <ListaTareas />

        <div className="mt-4 text-center"></div>
      </main>
    </div>
  )
}
