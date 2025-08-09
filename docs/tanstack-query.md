# TanStack Query Guide

TanStack Query (formerly React Query) is a powerful data fetching and caching library for React applications. It simplifies server state management and provides excellent developer experience.

## Key Concepts

### 1. Server State vs Client State

TanStack Query focuses on **server state**, which is different from local component state:

- **Server State** - Data fetched from APIs, cached, and synchronized
- **Client State** - Local component state, form inputs, UI state

### 2. Query Keys

Query keys uniquely identify and cache your data:

```tsx
// Simple string key
useQuery({ queryKey: ['posts'], queryFn: fetchPosts })

// Array key with parameters
useQuery({ 
  queryKey: ['posts', postId], 
  queryFn: () => fetchPost(postId) 
})

// Complex key with filters
useQuery({ 
  queryKey: ['posts', { category: 'tech', page: 1 }],
  queryFn: () => fetchPosts({ category: 'tech', page: 1 })
})
```

**Key Rules:**
- Keys should be **unique** for different data
- Keys should be **deterministic** for the same data
- Use **arrays** for hierarchical keys
- Include **all dependencies** in the key

### 3. Query Functions

Query functions perform the actual data fetching:

```tsx
// Simple query function
const fetchPosts = async () => {
  const response = await fetch('/api/posts')
  if (!response.ok) throw new Error('Failed to fetch posts')
  return response.json()
}

// Query function with parameters
const fetchPost = async (postId: string) => {
  const response = await fetch(`/api/posts/${postId}`)
  if (!response.ok) throw new Error('Post not found')
  return response.json()
}
```

## Basic Usage

### 1. Simple Data Fetching

```tsx
import { useQuery } from '@tanstack/react-query'

function PostsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {data?.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

### 2. Query with Parameters

```tsx
function PostDetail({ postId }: { postId: string }) {
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => fetchPost(postId),
    enabled: !!postId, // Only run if postId exists
  })

  if (isLoading) return <div>Loading post...</div>
  if (error) return <div>Error loading post</div>
  if (!post) return <div>Post not found</div>

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

### 3. Custom Hook Pattern

Create reusable custom hooks for your API calls:

```tsx
// Custom hooks in src/hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query'
import { apiService } from '@/services/api'

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: apiService.getPosts,
  })
}

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => apiService.getPost(id),
    enabled: !!id,
  })
}

// Usage in components
function PostsList() {
  const { data: posts, isLoading, error } = usePosts()
  // Component logic...
}
```

## Query States and Data

### 1. Query States

TanStack Query provides several state indicators:

```tsx
function MyComponent() {
  const { 
    data,           // The data returned from query
    isLoading,      // First load (no cached data)
    isFetching,     // Any fetch (including background refetch)
    isError,        // Query resulted in error
    error,          // Error object if isError is true
    isSuccess,      // Query succeeded
    isStale,        // Data is considered stale
    refetch,        // Function to manually refetch
    remove,         // Function to remove query from cache
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  // Different loading states
  if (isLoading) return <div>Loading for first time...</div>
  if (isFetching && !isLoading) return <div>Updating...</div>
  if (isError) return <div>Error: {error.message}</div>

  return <div>{/* Render data */}</div>
}
```

### 2. Background Updates

Queries automatically refetch in certain situations:

```tsx
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  // Default behaviors (can be customized):
  refetchOnWindowFocus: true,    // Refetch when window regains focus
  refetchOnReconnect: true,      // Refetch when network reconnects
  refetchOnMount: true,          // Refetch when component mounts
})
```

## Mutations

Mutations handle data modifications (POST, PUT, DELETE):

### 1. Basic Mutation

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

function CreatePost() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newPost: CreatePostData) => {
      return fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      }).then(res => res.json())
    },
    onSuccess: () => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleSubmit = (formData: CreatePostData) => {
    mutation.mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      {mutation.isPending && <p>Creating post...</p>}
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Post created successfully!</p>}
      {/* Form fields */}
    </form>
  )
}
```

### 2. Optimistic Updates

Update the UI immediately while the request is in progress:

```tsx
const updatePostMutation = useMutation({
  mutationFn: updatePost,
  onMutate: async (newPost) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['posts', newPost.id] })

    // Snapshot previous value
    const previousPost = queryClient.getQueryData(['posts', newPost.id])

    // Optimistically update
    queryClient.setQueryData(['posts', newPost.id], newPost)

    return { previousPost }
  },
  onError: (err, newPost, context) => {
    // Rollback on error
    queryClient.setQueryData(
      ['posts', newPost.id], 
      context?.previousPost
    )
  },
  onSettled: (newPost) => {
    // Refetch to ensure consistency
    queryClient.invalidateQueries({ queryKey: ['posts', newPost?.id] })
  },
})
```

## Advanced Features

### 1. Dependent Queries

Chain queries where one depends on another:

```tsx
function UserProfile({ userId }: { userId: string }) {
  // First query: get user
  const { data: user } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
  })

  // Second query: get user's posts (depends on first query)
  const { data: posts } = useQuery({
    queryKey: ['posts', 'user', userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!user, // Only run if user data exists
  })

  return (
    <div>
      <h1>{user?.name}</h1>
      <div>{posts?.map(post => <div key={post.id}>{post.title}</div>)}</div>
    </div>
  )
}
```

### 2. Parallel Queries

Run multiple queries simultaneously:

```tsx
function Dashboard() {
  // Method 1: Multiple useQuery hooks
  const postsQuery = useQuery({ queryKey: ['posts'], queryFn: fetchPosts })
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const statsQuery = useQuery({ queryKey: ['stats'], queryFn: fetchStats })

  // Method 2: useQueries for dynamic lists
  const results = useQueries({
    queries: [
      { queryKey: ['posts'], queryFn: fetchPosts },
      { queryKey: ['users'], queryFn: fetchUsers },
      { queryKey: ['stats'], queryFn: fetchStats },
    ]
  })

  const [postsResult, usersResult, statsResult] = results

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Render data from all queries */}
    </div>
  )
}
```

### 3. Infinite Queries

Handle paginated data:

```tsx
import { useInfiniteQuery } from '@tanstack/react-query'

function InfinitePostsList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    initialPageParam: 0,
  })

  return (
    <div>
      {data?.pages.map((group, i) => (
        <div key={i}>
          {group.posts.map(post => (
            <div key={post.id}>{post.title}</div>
          ))}
        </div>
      ))}
      
      <button 
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
      </button>
    </div>
  )
}
```

## Query Configuration

### 1. Global Configuration

Set defaults for all queries:

```tsx
// In your main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,                    // Retry failed requests 3 times
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false, // Don't refetch on window focus
    },
    mutations: {
      retry: 1,                    // Retry failed mutations once
    },
  },
})
```

### 2. Per-Query Configuration

Override defaults for specific queries:

```tsx
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  retry: 5,                    // Override global retry
  retryDelay: 2000,           // Fixed delay
  refetchInterval: 30000,     // Refetch every 30 seconds
  refetchOnMount: false,      // Don't refetch on mount
})
```

## Error Handling

### 1. Query Error Boundaries

Handle errors at the component level:

```tsx
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PostsList />
    </ErrorBoundary>
  )
}
```

### 2. Query-Level Error Handling

```tsx
const { data, error, isError } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  throwOnError: false, // Handle errors in component instead of throwing
  retry: (failureCount, error) => {
    // Custom retry logic
    if (error.status === 404) return false // Don't retry 404s
    return failureCount < 3
  },
})

if (isError) {
  if (error.status === 404) {
    return <div>Posts not found</div>
  }
  return <div>Error loading posts: {error.message}</div>
}
```

## Best Practices

### 1. **Use Descriptive Query Keys**
```tsx
// Good: Descriptive and hierarchical
['posts', 'list', { category: 'tech', status: 'published' }]
['posts', 'detail', postId]
['users', userId, 'profile']

// Avoid: Generic or unclear keys
['data']
['posts123']
```

### 2. **Create Custom Hooks**
```tsx
// Good: Reusable custom hooks
export const usePosts = (filters?: PostFilters) => {
  return useQuery({
    queryKey: ['posts', 'list', filters],
    queryFn: () => fetchPosts(filters),
  })
}

// Usage
const { data: posts } = usePosts({ category: 'tech' })
```

### 3. **Handle Loading and Error States**
```tsx
// Good: Comprehensive state handling
function PostsList() {
  const { data: posts, isLoading, error, refetch } = usePosts()

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} onRetry={refetch} />
  if (!posts?.length) return <EmptyState />

  return <PostGrid posts={posts} />
}
```

### 4. **Use Mutations for Data Changes**
```tsx
// Good: Proper mutation with cache updates
const deletePostMutation = useMutation({
  mutationFn: deletePost,
  onSuccess: (_, deletedPostId) => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
    // Or remove specific item from cache
    queryClient.removeQueries({ queryKey: ['posts', deletedPostId] })
  },
})
```

TanStack Query provides a robust foundation for managing server state in React applications with excellent caching, synchronization, and developer experience.