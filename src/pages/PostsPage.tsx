import { usePosts } from '@/hooks/usePosts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const PostsPage = () => {
  const { data: posts, isLoading, error, refetch } = usePosts()

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-lg text-muted-foreground">Loading posts...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
          <div className="text-lg text-destructive">Error loading posts: {error.message}</div>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
        <p className="text-muted-foreground">
          Displaying {posts?.length || 0} posts from the JSONPlaceholder API
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map(post => (
          <Card key={post.id} className="transition-shadow hover:shadow-md">
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
