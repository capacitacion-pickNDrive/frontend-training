import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="p-4 flex gap-4 border-b bg-background">
        <h1 className="text-xl font-semibold text-primary italic">Organizador Diario</h1>
        <nav className="flex gap-2 ml-auto">
          <Link
            to="/"
            className="px-3 py-2 rounded hover:bg-accent [&.active]:bg-green-500 [&.active]:text-primary-foreground"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="px-3 py-2 rounded hover:bg-accent [&.active]:bg-blue-500 [&.active]:text-primary-foreground"
          >
            About
          </Link>
          <Link
            to="/tareas"
            className="px-3 py-2 rounded hover:bg-accent [&.active]:bg-purple-500 [&.active]:text-primary-foreground"
          >
            Tareas
          </Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </>
  ),
})
