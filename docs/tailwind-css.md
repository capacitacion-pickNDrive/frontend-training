# Tailwind CSS Guide

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without leaving your HTML/JSX.

## Key Concepts

### 1. Utility-First Philosophy

Instead of writing custom CSS, you compose designs using utility classes:

```tsx
// Traditional CSS approach
<div className="card">
  <h2 className="card-title">Title</h2>
  <p className="card-text">Content</p>
</div>

// Tailwind utility-first approach
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-xl font-bold mb-2">Title</h2>
  <p className="text-gray-600">Content</p>
</div>
```

**Benefits:**
- **No context switching** - Style directly in your component
- **No naming conflicts** - No need to invent class names
- **Easier maintenance** - Styles are colocated with markup
- **Smaller CSS bundle** - Only used utilities are included

### 2. Design Tokens

Tailwind uses a design system with predefined values:

```tsx
// Spacing scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24...
<div className="p-4 m-2 gap-6">  {/* padding: 1rem, margin: 0.5rem, gap: 1.5rem */}

// Color palette with shades 50-950
<div className="bg-blue-500 text-white">     {/* Medium blue background */}
<div className="bg-blue-50 text-blue-900">   {/* Light blue background, dark blue text */}

// Typography scale
<h1 className="text-3xl">     {/* font-size: 1.875rem */}
<h2 className="text-xl">      {/* font-size: 1.25rem */}
<p className="text-sm">       {/* font-size: 0.875rem */}
```

## Core Utility Categories

### 1. Layout & Spacing

```tsx
// Display
<div className="flex">           {/* display: flex */}
<div className="grid">           {/* display: grid */}
<div className="hidden">         {/* display: none */}
<div className="block">          {/* display: block */}

// Flexbox
<div className="flex justify-center items-center">
<div className="flex-col gap-4">
<div className="flex-wrap">

// Grid
<div className="grid grid-cols-3 gap-4">
<div className="col-span-2">
<div className="grid-rows-4">

// Spacing (margin/padding)
<div className="p-4">       {/* padding: 1rem */}
<div className="px-6 py-3"> {/* padding: 0.75rem 1.5rem */}
<div className="m-auto">    {/* margin: auto */}
<div className="mt-8">      {/* margin-top: 2rem */}
```

### 2. Colors

```tsx
// Background colors
<div className="bg-red-500">        {/* Background */}
<div className="bg-gray-100">
<div className="bg-transparent">

// Text colors  
<p className="text-blue-600">       {/* Text color */}
<p className="text-gray-500">

// Border colors
<div className="border border-gray-300">
<div className="border-t border-red-400">

// Using CSS variables (with ShadCN/UI)
<div className="bg-background text-foreground">
<div className="bg-primary text-primary-foreground">
```

### 3. Typography

```tsx
// Font sizes
<h1 className="text-4xl">      {/* 2.25rem */}
<h2 className="text-2xl">      {/* 1.5rem */}
<p className="text-base">      {/* 1rem - default */}
<small className="text-sm">    {/* 0.875rem */}

// Font weights
<p className="font-light">     {/* 300 */}
<p className="font-normal">    {/* 400 */}
<p className="font-semibold">  {/* 600 */}
<p className="font-bold">      {/* 700 */}

// Text alignment & decoration
<p className="text-center">
<p className="text-right">
<p className="underline">
<p className="line-through">

// Line height & letter spacing
<p className="leading-relaxed tracking-wide">
```

### 4. Borders & Shadows

```tsx
// Border radius
<div className="rounded">          {/* 0.25rem */}
<div className="rounded-md">       {/* 0.375rem */}
<div className="rounded-lg">       {/* 0.5rem */}
<div className="rounded-full">     {/* 9999px */}

// Borders
<div className="border">           {/* 1px solid */}
<div className="border-2">         {/* 2px solid */}
<div className="border-dashed">
<div className="border-t-4">       {/* Top border 4px */}

// Shadows
<div className="shadow">           {/* Small shadow */}
<div className="shadow-md">        {/* Medium shadow */}
<div className="shadow-lg">        {/* Large shadow */}
<div className="shadow-none">      {/* No shadow */}
```

## Responsive Design

### 1. Mobile-First Breakpoints

Tailwind uses mobile-first responsive design:

```tsx
<div className="
  w-full          {/* Full width on mobile */}
  sm:w-1/2        {/* Half width on small screens (640px+) */}
  md:w-1/3        {/* Third width on medium screens (768px+) */}
  lg:w-1/4        {/* Quarter width on large screens (1024px+) */}
  xl:w-1/6        {/* Sixth width on extra large screens (1280px+) */}
">
  Responsive content
</div>
```

### 2. Common Responsive Patterns

```tsx
// Responsive text sizes
<h1 className="text-2xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>

// Responsive layouts
<div className="
  grid 
  grid-cols-1      {/* 1 column on mobile */}
  md:grid-cols-2   {/* 2 columns on tablet */}
  lg:grid-cols-3   {/* 3 columns on desktop */}
  gap-4
">

// Hide/show on different screens
<div className="hidden md:block">     {/* Hidden on mobile, visible on tablet+ */}
<div className="md:hidden">           {/* Visible on mobile, hidden on tablet+ */}
```

## Advanced Features

### 1. State Variants

Style different states with pseudo-class variants:

```tsx
// Hover states
<button className="bg-blue-500 hover:bg-blue-600 transition-colors">
  Hover me
</button>

// Focus states
<input className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />

// Active states
<button className="bg-blue-500 active:bg-blue-700">
  Click me
</button>

// Disabled states
<button className="bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled>
  Disabled
</button>

// Group hover (parent hover affects child)
<div className="group hover:bg-gray-100">
  <p className="group-hover:text-blue-600">This changes when parent is hovered</p>
</div>
```

### 2. Dark Mode

Support for dark mode using the `dark:` variant:

```tsx
// Basic dark mode
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">
  Content that adapts to dark mode
</div>

// Complex dark mode styling
<div className="
  bg-white dark:bg-gray-900
  border border-gray-200 dark:border-gray-700
  text-gray-900 dark:text-gray-100
  shadow-sm dark:shadow-gray-800/20
">
  Dark mode card
</div>

// Enable dark mode in your app
// Add class="dark" to html element or use system preference
<html className="dark">
```

### 3. Animations & Transitions

```tsx
// Basic transitions
<button className="transition-all duration-300 ease-in-out hover:scale-105">
  Smooth transition
</button>

// Specific property transitions
<div className="transition-colors duration-200 bg-blue-500 hover:bg-blue-600">
  Color transition
</div>

// Built-in animations
<div className="animate-spin">       {/* Spinning animation */}
<div className="animate-pulse">      {/* Pulsing animation */}
<div className="animate-bounce">     {/* Bouncing animation */}

// Transform utilities
<div className="transform hover:scale-110 hover:rotate-3 transition-transform">
  Transformations on hover
</div>
```

## Component Patterns

### 1. Card Component

```tsx
function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`
      bg-white dark:bg-gray-800
      rounded-lg shadow-md
      border border-gray-200 dark:border-gray-700
      p-6
      ${className}
    `}>
      {children}
    </div>
  )
}

// Usage
<Card className="hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-semibold mb-2">Card Title</h2>
  <p className="text-gray-600 dark:text-gray-300">Card content</p>
</Card>
```

### 2. Button Variants

```tsx
function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = "font-medium rounded transition-colors focus:outline-none focus:ring-2"
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-200",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-200",
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

### 3. Form Styling

```tsx
function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      
      <div className="relative">
        {children}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

// Input styling
<input className="
  w-full px-3 py-2
  border border-gray-300 dark:border-gray-600
  rounded-md shadow-sm
  bg-white dark:bg-gray-700
  text-gray-900 dark:text-gray-100
  placeholder-gray-500 dark:placeholder-gray-400
  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  disabled:bg-gray-100 disabled:cursor-not-allowed
" />
```

## Best Practices

### 1. **Use Consistent Spacing**
```tsx
// Good: Use consistent spacing scale
<div className="space-y-4">         {/* Consistent vertical spacing */}
  <div className="p-4">...</div>
  <div className="p-4">...</div>
</div>

// Good: Use gap for flex/grid layouts
<div className="flex gap-4">
<div className="grid grid-cols-2 gap-6">
```

### 2. **Leverage Design Tokens**
```tsx
// Good: Use design system colors
<div className="bg-gray-50 border border-gray-200 text-gray-900">

// Avoid: Arbitrary values when design tokens exist
<div className="bg-[#f8f9fa] border-[#e9ecef] text-[#212529]">
```

### 3. **Component Composition**
```tsx
// Good: Compose complex components from utilities
<div className="
  max-w-md mx-auto                    // Layout
  bg-white rounded-lg shadow-md       // Appearance
  p-6                                 // Spacing
  border border-gray-200             // Border
">
  Content
</div>

// Good: Extract reusable combinations
const cardClasses = "max-w-md mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-200"
```

### 4. **Responsive Design**
```tsx
// Good: Mobile-first responsive design
<div className="
  w-full           // Full width on mobile
  sm:w-1/2         // Half width on small screens
  lg:w-1/3         // Third width on large screens
  p-4 sm:p-6       // More padding on larger screens
">

// Good: Responsive typography
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
```

## Common Utility Combinations

### 1. **Center Content**
```tsx
// Horizontal centering
<div className="mx-auto max-w-4xl">

// Flexbox centering
<div className="flex items-center justify-center min-h-screen">

// Grid centering
<div className="grid place-items-center min-h-screen">
```

### 2. **Card Layouts**
```tsx
// Basic card
<div className="bg-white rounded-lg shadow border p-6">

// Interactive card
<div className="bg-white rounded-lg shadow border p-6 hover:shadow-md transition-shadow cursor-pointer">

// Card with header
<div className="bg-white rounded-lg shadow border overflow-hidden">
  <div className="bg-gray-50 px-6 py-4 border-b">Header</div>
  <div className="p-6">Content</div>
</div>
```

### 3. **Loading States**
```tsx
// Skeleton loading
<div className="animate-pulse">
  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
</div>

// Loading spinner
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
```

Tailwind CSS provides a comprehensive utility system that enables rapid UI development while maintaining design consistency and responsive behavior.