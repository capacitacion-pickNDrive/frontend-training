export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  category: Category
}

export interface Category {
  id: number
  name: string
  color: string
}