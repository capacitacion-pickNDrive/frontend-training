// src/components/Category/Category.tsx
import type { Categoria } from '@/types/strapi'

interface CategoryProps {
  categoria: Categoria
}

export function Category({ categoria }: CategoryProps) {
  return (
    <div>
      <h2>{categoria.attributes.nombre}</h2>
      {categoria.attributes.tareas.data.map(tarea => (
        <div key={tarea.id}>{tarea.attributes.titulo}</div>
      ))}
    </div>
  )
}
