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
}

export interface TaskResponse {
  tasks: Task[]
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}