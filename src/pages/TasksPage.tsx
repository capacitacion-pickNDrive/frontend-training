import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button'
import { useTasks } from '@/hooks/useTasks';
import { useCategories } from '@/hooks/useCategories';

export const TasksPage = () => {
    
  const { data: tasks, tasksLoading, tasksError, taskRefetch } = useTasks()
  const { data: categ, categLoading, categError, categRefetch } = useCategories()

    if (tasksLoading || categLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="text-lg text-muted-foreground">Loading Tasks...</div>
          </div>
        </div>
      </div>
    )
  }

  if (tasksError || categError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
          <div className="text-center space-y-2">
            <div className="size-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Error Loading Tasks</h2>
            <p className="text-muted-foreground max-w-md">{error.message}</p>
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
    )
    }

    return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Tasks</h1>
        <p className="text-muted-foreground">
          Displaying {tasks?.length || 0} Tasks
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks?.map(task => (
          <Card key={task.id} className="transition-shadow hover:shadow-md hover:border-primary/50">
            <CardHeader>
              <CardTitle className="line-clamp-2">{task.title}</CardTitle>
              <CardDescription>
              <p className="text-sm text-muted-foreground line-clamp-3">{task.description}</p>
              <div>ID: {task.id}</div>
              <div>Category: {<span style={{ color: task.category.color }}>{task.category.name}</span>}</div>
              <div>{task.completed ? <span>Completed</span> : <span>Pending</span>}</div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              
            </CardContent>
          </Card>
        ))}
      </div>

      {tasks && tasks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No Tasks found</p>
        </div>
      )}
    </div>
  )
};