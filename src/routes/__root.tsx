import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-4 flex gap-4 border-b bg-background">
        <h1 className="text-xl font-semibold text-primary">Frontend Training</h1>
        <div className="flex gap-2 ml-auto">
          <Link
            to="/"
            className="px-3 py-2 rounded hover:bg-accent [&.active]:bg-primary [&.active]:text-primary-foreground"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="px-3 py-2 rounded hover:bg-accent [&.active]:bg-primary [&.active]:text-primary-foreground"
          >
            About
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  ),
})
