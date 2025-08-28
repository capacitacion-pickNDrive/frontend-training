export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface Task {
  documentId: string
  title: string
  description: string
  completed: boolean
  category: Category
}

export interface TaskCreation {
  title: string
  description: string
  completed: boolean
  category: number
}

export interface TaskUpdate {
  documentId: string
  completed: boolean
}

export interface Category {
  id: number
  documentId: string
  name: string
  color: string
}
