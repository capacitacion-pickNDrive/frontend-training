export interface Tarea {
  id: number
  documentId: string
  titulo: string
  descripcion: string
  completada: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Categoria {
  id: number
  documentId: string
  nombre: string
  tareas?: {
    data: Tarea[]
  }
  // otros campos de categoria si existen
}
