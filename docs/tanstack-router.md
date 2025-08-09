# TanStack Router Guide

TanStack Router is a fully type-safe router for React applications. It provides file-based routing with excellent TypeScript integration and developer experience.

## Key Concepts

### 1. Type-Safe Routing

TanStack Router generates types for all your routes automatically:

```tsx
// Navigate with full type safety
import { useNavigate } from '@tanstack/react-router'

const navigate = useNavigate()

// TypeScript knows about all available routes
navigate({ to: '/posts/$postId', params: { postId: '123' } })
navigate({ to: '/about' }) // ✅ Valid route
navigate({ to: '/invalid' }) // ❌ TypeScript error
```

### 2. File-Based Routing

Routes are defined using a file-based system similar to Next.js:

```
src/routes/
├── __root.tsx       # Root layout for all routes
├── index.tsx        # / route
├── about.tsx        # /about route
├── posts/
│   ├── index.tsx    # /posts route
│   └── $postId.tsx  # /posts/123 (dynamic route)
└── routeTree.gen.ts # Auto-generated route tree
```

## Route Definitions

### 1. Root Route (`__root.tsx`)

The root route wraps all other routes and typically contains:
- Navigation
- Global layout
- Common providers

```tsx
// src/routes/__root.tsx
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      {/* Global navigation */}
      <nav className="p-2 flex gap-2 border-b">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/posts" className="[&.active]:font-bold">
          Posts
        </Link>
      </nav>
      
      {/* Render child routes */}
      <Outlet />
      
      {/* Development tools */}
      <TanStackRouterDevtools />
    </>
  ),
})
```

### 2. Index Routes

Index routes handle the default route for a path:

```tsx
// src/routes/index.tsx - Handles "/"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return <div>Welcome to the homepage!</div>
}
```

### 3. Named Routes

Regular routes with specific paths:

```tsx
// src/routes/about.tsx - Handles "/about"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: () => <div>About page</div>,
})
```

### 4. Dynamic Routes

Routes with parameters use `$` prefix:

```tsx
// src/routes/posts/$postId.tsx - Handles "/posts/123"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: PostDetail,
})

function PostDetail() {
  const { postId } = Route.useParams()
  return <div>Post ID: {postId}</div>
}
```

### 5. Nested Routes

Create nested layouts with folder structure:

```tsx
// src/routes/dashboard.tsx - Layout route
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="dashboard">
      <aside>Dashboard Sidebar</aside>
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  )
}

// src/routes/dashboard/index.tsx - /dashboard
// src/routes/dashboard/settings.tsx - /dashboard/settings
```

## Advanced Features

### 1. Route Loaders

Load data before the route renders:

```tsx
// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  // Load data before rendering
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  component: PostDetail,
})

function PostDetail() {
  const { post } = Route.useLoaderData()
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
```

### 2. Route Parameters & Search

Handle URL parameters and search queries:

```tsx
export const Route = createFileRoute('/posts')({
  // Validate search parameters
  validateSearch: (search) => ({
    page: Number(search?.page ?? 1),
    category: search?.category ?? 'all',
  }),
  component: PostsList,
})

function PostsList() {
  const { page, category } = Route.useSearch()
  const navigate = Route.useNavigate()
  
  // Update search params
  const updatePage = (newPage: number) => {
    navigate({ 
      search: (prev) => ({ ...prev, page: newPage })
    })
  }
  
  return (
    <div>
      <p>Page: {page}, Category: {category}</p>
      <button onClick={() => updatePage(page + 1)}>
        Next Page
      </button>
    </div>
  )
}
```

### 3. Route Guards

Protect routes with authentication or authorization:

```tsx
export const Route = createFileRoute('/admin')({
  // Check before loading
  beforeLoad: async ({ context }) => {
    if (!context.user?.isAdmin) {
      throw redirect({ to: '/login' })
    }
  },
  component: AdminDashboard,
})
```

### 4. Error Boundaries

Handle route-level errors:

```tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    if (!post) {
      throw new Error('Post not found')
    }
    return { post }
  },
  errorComponent: ({ error }) => (
    <div>
      <h1>Error loading post</h1>
      <p>{error.message}</p>
    </div>
  ),
  component: PostDetail,
})
```

## Navigation

### 1. Link Component

Type-safe navigation with the Link component:

```tsx
import { Link } from '@tanstack/react-router'

// Basic link
<Link to="/about">About Us</Link>

// Link with parameters
<Link to="/posts/$postId" params={{ postId: '123' }}>
  View Post
</Link>

// Link with search parameters
<Link 
  to="/posts" 
  search={{ category: 'tech', page: 2 }}
>
  Tech Posts
</Link>

// Active link styling
<Link 
  to="/posts" 
  activeProps={{ className: 'font-bold text-blue-600' }}
>
  Posts
</Link>
```

### 2. Programmatic Navigation

Navigate programmatically with hooks:

```tsx
import { useNavigate } from '@tanstack/react-router'

function MyComponent() {
  const navigate = useNavigate()
  
  const handleSubmit = async () => {
    await saveData()
    
    // Navigate to success page
    navigate({ to: '/success' })
    
    // Navigate with parameters
    navigate({ 
      to: '/posts/$postId', 
      params: { postId: '123' } 
    })
    
    // Navigate with search
    navigate({ 
      to: '/posts',
      search: { category: 'news' }
    })
  }
  
  return <button onClick={handleSubmit}>Submit</button>
}
```

### 3. Route Information

Access current route information:

```tsx
import { useLocation, useParams, useSearch } from '@tanstack/react-router'

function RouteInfo() {
  const location = useLocation()
  const params = useParams({ from: '/posts/$postId' })
  const search = useSearch({ from: '/posts' })
  
  return (
    <div>
      <p>Current path: {location.pathname}</p>
      <p>Post ID: {params?.postId}</p>
      <p>Search: {JSON.stringify(search)}</p>
    </div>
  )
}
```

## Router Setup

### 1. Router Configuration

Create and configure the router:

```tsx
// src/router.ts
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export const router = createRouter({ 
  routeTree,
  // Optional configuration
  defaultPreload: 'intent', // Preload on hover
  defaultPreloadStaleTime: 1000 * 60 * 2, // 2 minutes
})

// Register for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

### 2. App Integration

Integrate the router into your app:

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
```

### 3. Route Generation

Generate the route tree automatically:

```bash
# Add to package.json scripts
"scripts": {
  "dev": "vite",
  "build": "tsr generate && tsc -b && vite build"
}

# Generate routes manually
pnpm tsr generate
```

## Best Practices

### 1. **Organize Routes Logically**
```
src/routes/
├── __root.tsx
├── index.tsx           # Home
├── about.tsx           # Static pages
├── posts/              # Feature-based grouping
│   ├── index.tsx
│   └── $postId.tsx
└── dashboard/          # Protected area
    ├── index.tsx
    └── settings.tsx
```

### 2. **Use Loaders for Data Fetching**
```tsx
// Good: Load data in route loader
export const Route = createFileRoute('/posts')({
  loader: async () => {
    const posts = await fetchPosts()
    return { posts }
  },
  component: PostsList,
})

// Avoid: Loading data in component
function PostsList() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts().then(setPosts) // Less optimal
  }, [])
}
```

### 3. **Leverage Type Safety**
```tsx
// Good: Use typed navigation
navigate({ to: '/posts/$postId', params: { postId } })

// Avoid: String-based navigation
navigate('/posts/' + postId)
```

### 4. **Handle Loading States**
```tsx
export const Route = createFileRoute('/posts')({
  loader: async () => {
    const posts = await fetchPosts()
    return { posts }
  },
  pendingComponent: () => <div>Loading posts...</div>,
  component: PostsList,
})
```

## Common Patterns

### 1. **Layout Routes**
```tsx
// Shared layout for multiple routes
export const Route = createFileRoute('/dashboard')({
  component: () => (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
})
```

### 2. **Protected Routes**
```tsx
// Authentication check
export const Route = createFileRoute('/profile')({
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({ to: '/login' })
    }
  },
})
```

### 3. **Search Parameter Management**
```tsx
// Clean search parameter handling
const { search, navigate } = Route.useSearch()

const updateFilters = (newFilters: Filters) => {
  navigate({
    search: (prev) => ({ ...prev, ...newFilters }),
    replace: true, // Don't add to history
  })
}
```

TanStack Router provides a modern, type-safe approach to routing in React applications with excellent developer experience and performance characteristics.