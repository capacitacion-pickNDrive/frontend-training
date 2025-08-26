export interface Tarea {
  id: number
  attributes: {
    titulo: string
    completada: boolean // <- Asegúrate de que exista
    // otros campos...
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
