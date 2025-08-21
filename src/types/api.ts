export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface TaskAttrs {
  titulo: string
  descripcion: string
  completada: boolean
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
}

export interface Task extends TaskAttrs {
  id: number
}

export type StrapiItem<T> = {
  id: number
  attributes: T
}

export interface StrapiListResponse<T> {
  data: StrapiItem<T>[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiSingleResponse<T> {
  data: StrapiItem<T>
  meta: object
}
