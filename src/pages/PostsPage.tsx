import { usePosts } from '@/hooks/usePosts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const PostsPage = () => {
  const { data: posts, isLoading, error, refetch } = usePosts()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="text-lg text-muted-foreground">Loading posts...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
          <div className="text-center space-y-2">
            <div className="size-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Error Loading Posts</h2>
            <p className="text-muted-foreground max-w-md">{error.message}</p>
          </div>
          <Button
            onClick={() => refetch()}
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
        <h1 className="text-3xl font-bold tracking-tight text-primary">Posts</h1>
        <p className="text-muted-foreground">
          Displaying {posts?.length || 0} posts from the JSONPlaceholder API
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map(post => (
          <Card key={post.id} className="transition-shadow hover:shadow-md hover:border-primary/50">
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription>
                Post #{post.id} • User {post.userId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">{post.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts && posts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No posts found</p>
        </div>
      )}
    </div>
  )
}
