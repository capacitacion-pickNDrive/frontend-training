# ShadCN/UI Guide

ShadCN/UI is a collection of reusable components built using Radix UI and Tailwind CSS. It's not a traditional component library but rather a collection of copy-and-paste components that you own.

## Key Concepts

### 1. Copy-Paste Philosophy

Unlike traditional libraries, ShadCN/UI components are copied directly into your project:
- **You own the code** - No black box dependencies
- **Full customization** - Modify components as needed
- **No version conflicts** - Each component is versioned with your project

### 2. Built on Solid Foundations

- **Radix UI** - Provides accessibility and behavior
- **Tailwind CSS** - Handles styling and theming
- **CVA (Class Variance Authority)** - Manages component variants

## Component Architecture

### Compound Components

Many ShadCN/UI components use the compound component pattern:

```tsx
// Card is composed of multiple sub-components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

**Benefits:**
- **Flexible composition** - Use only the parts you need
- **Clear structure** - Each part has a specific purpose
- **Consistent styling** - Parts work together seamlessly

### Example: Card Component Structure

```tsx
// Each part can be used independently
<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
    <CardDescription>Manage your account settings</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Your profile information...</p>
  </CardContent>
  {/* CardFooter is optional */}
</Card>
```

## Styling and Customization

### 1. Using className Prop

Every ShadCN/UI component accepts a `className` prop for custom styling:

```tsx
// Override default styles
<Button className="bg-green-500 hover:bg-green-600">
  Custom Button
</Button>

// Add additional styles
<Card className="shadow-lg border-2 border-blue-200">
  Enhanced Card
</Card>

// Combine with Tailwind utilities
<CardTitle className="text-2xl font-bold text-purple-600">
  Custom Title
</CardTitle>
```

### 2. Using the `cn()` Utility

ShadCN/UI uses a `cn()` utility function that combines `clsx` and `tailwind-merge`:

```tsx
import { cn } from '@/lib/utils'

// In component implementation
<div className={cn(
  'default-classes',
  'more-defaults',
  className // User's custom classes override defaults
)} />
```

**Why `cn()` is powerful:**
- **Merges classes intelligently** - Tailwind classes override correctly
- **Conditional classes** - Supports conditional styling
- **Conflict resolution** - Later classes override earlier ones

### 3. Component Variants

Many components support variants using CVA (Class Variance Authority):

```tsx
// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outlined</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link Style</Button>

// Size variants
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon Only</Button>
```

### Creating Custom Variants

You can extend component variants by modifying the CVA configuration:

```tsx
// In button.tsx
const buttonVariants = cva(
  "base-classes", // Base styles applied to all variants
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        // Add your custom variant
        success: "bg-green-500 text-white hover:bg-green-600",
      },
      size: {
        default: "h-9 px-4 py-2",
        // Add custom size
        xs: "h-6 px-2 py-1 text-xs",
      }
    }
  }
)
```

## Advanced Customization

### 1. Theming with CSS Variables

ShadCN/UI uses CSS variables for theming:

```css
/* In your CSS file */
:root {
  --primary: 222.2 84% 4.9%;
  --primary-foreground: 210 40% 98%;
  /* Modify these values to change the theme */
}
```

### 2. Component Composition

Create your own compound components:

```tsx
// Custom UserCard component
interface UserCardProps {
  name: string
  email: string
  avatar?: string
  className?: string
}

export function UserCard({ name, email, avatar, className }: UserCardProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          {avatar && <img src={avatar} className="w-10 h-10 rounded-full" />}
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{email}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
```

### 3. Extending Components

Add new props and functionality:

```tsx
// Extended Button with loading state
interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean
}

export function LoadingButton({ loading, children, ...props }: LoadingButtonProps) {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Spinner className="mr-2 h-4 w-4" />}
      {children}
    </Button>
  )
}
```

## Best Practices

### 1. **Maintain the Design System**
```tsx
// Good: Consistent with design system
<Button variant="destructive">Delete Item</Button>

// Avoid: Breaking the design system
<Button className="bg-red-900 text-white">Delete Item</Button>
```

### 2. **Use Semantic Component Names**
```tsx
// Good: Clear purpose
<AlertDialog>
  <AlertDialogTrigger>Delete Account</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
  </AlertDialogContent>
</AlertDialog>

// Good: Custom semantic wrapper
<DeleteConfirmationDialog />
```

### 3. **Leverage Compound Components**
```tsx
// Good: Flexible and clear
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Avoid: Monolithic props
<Card title="Title" content="Content" />
```

## Common Patterns

### 1. **Conditional Rendering with Variants**
```tsx
<Button 
  variant={isPrimary ? "default" : "outline"}
  size={isCompact ? "sm" : "default"}
>
  Dynamic Button
</Button>
```

### 2. **Combining Multiple Components**
```tsx
<Card className="w-full">
  <CardHeader>
    <div className="flex justify-between items-center">
      <CardTitle>Settings</CardTitle>
      <Button variant="ghost" size="icon">
        <SettingsIcon />
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    <form>
      {/* Form inputs */}
    </form>
  </CardContent>
</Card>
```

### 3. **Custom Data Attributes for Testing**
```tsx
<Button 
  data-testid="submit-button"
  className="w-full"
  variant="default"
>
  Submit
</Button>
```

## Installation and Usage

### Adding New Components

```bash
# Install specific components
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card dialog

# Install multiple components
pnpm dlx shadcn@latest add button card dialog alert
```

### Using Components

```tsx
// Import from the ui folder
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Use in your components
export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => console.log('clicked')}>
          Click Me
        </Button>
      </CardContent>
    </Card>
  )
}
```

This approach gives you the flexibility of a design system with the control of owning your components.