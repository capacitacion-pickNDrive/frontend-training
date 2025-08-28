import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useTasks, useCreateTask, useDeleteTask, useUpdateTask } from '@/hooks/useTasks'
import { useCategories } from '@/hooks/useCategories'

export const TasksPage = () => {
  const {
    data: tasks,
    isLoading: tasksLoading,
    error: tasksError,
    refetch: taskRefetch,
  } = useTasks()
  const { data: categ } = useCategories()
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()
  const deleteTask = useDeleteTask()

  const [newTitle, setInputValue] = useState('')
  const [newDescription, setTextareaValue] = useState('')
  const [newCategory, setSelectValue] = useState('')

  const handleCreate = () => {
    if (newTitle == '' || newDescription == '' || newCategory == '') return
    createTask.mutate({
      title: newTitle,
      description: newDescription,
      completed: false,
      category: parseInt(newCategory),
    })
    setInputValue('')
    setTextareaValue('')
    setSelectValue('')
  }

  const completeTask = (documentId: string, completed: boolean) => {
    updateTask.mutate({
      documentId: documentId,
      completed: completed,
    })
  }

  const confirmDelete = (documentId: string) => {
    const confirmDelete = window.confirm('Do you really want to delete this task?')
    if (confirmDelete) {
      deleteTask.mutate(documentId)
      console.log('Deleted task')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Tasks</h1>
        <p className="text-muted-foreground">Displaying {tasks?.length || 0} Tasks</p>
        <p className="text-muted-foreground"></p>
        {/*
        <Button>
          New Task
        </Button>
        */}
      </div>

      {/* Loading handling */}
      {tasksLoading && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="text-lg text-muted-foreground">Loading tasks...</div>
            </div>
          </div>
        </div>
      )}

      {/* Error handling */}
      {tasksError && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
            <div className="text-center space-y-2">
              <div className="size-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">⚠️</span>
              </div>
              <h2 className="text-xl font-semibold text-foreground">Error Loading Tasks</h2>
              <p className="text-muted-foreground max-w-md">{tasksError.message}</p>
            </div>
            <Button
              onClick={() => taskRefetch()}
              variant="default"
              className="bg-primary hover:bg-primary/90"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* Task list */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks?.map(task => (
          <Card
            key={task.documentId}
            className="transition-shadow hover:shadow-md hover:border-primary/50"
          >
            <CardHeader>
              <CardTitle className="line-clamp-2">{task.title}</CardTitle>
              <CardDescription>
                <Badge variant="outline">
                  {<span style={{ color: task.category.color }}>{task.category.name}</span>}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">{task.description}</p>
              <br />
              <div className="flex gap-2 flex-wrap">
                {task.completed ? (
                  <Button onClick={() => completeTask(task.documentId, false)}>Completed</Button>
                ) : (
                  <Button variant="outline" onClick={() => completeTask(task.documentId, true)}>
                    Pending
                  </Button>
                )}

                <Button variant="destructive" onClick={() => confirmDelete(task.documentId)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* New Task */}
        <Card className="transition-shadow hover:shadow-md hover:border-primary/50">
          <CardHeader>
            <CardTitle className="line-clamp-2">
              {
                <Input
                  placeholder="Title"
                  value={newTitle}
                  onChange={e => setInputValue(e.target.value)}
                />
              }
            </CardTitle>
            <CardDescription>
              <Select value={newCategory} onValueChange={setSelectValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categ?.map(category => (
                    <SelectItem value={category.id.toString()}>
                      {<span style={{ color: category.color }}>{category.name}</span>}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {
                  <Textarea
                    placeholder="Description"
                    value={newDescription}
                    onChange={e => setTextareaValue(e.target.value)}
                  />
                }
              </p>

              <Button onClick={() => handleCreate()}>Create Task</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {tasks && tasks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No Tasks found</p>
        </div>
      )}
    </div>
  )
}
