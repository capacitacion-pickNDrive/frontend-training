import type { Categoria } from '@/types/strapi'

interface CategoryProps {
  categoria: Categoria
}

export function Category({ categoria }: CategoryProps) {
  return (
    <div>
      <h2>{categoria.nombre}</h2>
      {categoria.tareas?.data?.map(tarea => (
        <div key={tarea.documentId}>{tarea.titulo}</div>
      ))}
    </div>
  )
}
