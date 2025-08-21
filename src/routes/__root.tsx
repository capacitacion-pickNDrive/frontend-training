import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 border-b bg-background">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>{' '}
        <Link to="/playground" className="[&.active]:font-bold">
          Playground
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})
