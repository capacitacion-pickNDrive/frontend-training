export interface Tarea {
  id: number
  attributes: {
    titulo: string
    // otros campos de tarea si existen
  }
}

export interface Categoria {
  id: number
  attributes: {
    nombre: string
    tareas: {
      data: Tarea[]
    }
    // otros campos de categoria si existen
  }
}