import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-secondary rounded-full"></span>
          Learn More
        </div>
        <h1 className="text-4xl md:text-5xl font-mono tracking-tight mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          About Frontend Training
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn about this project and the technologies used.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>Frontend Training Application</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              This is a training project designed to demonstrate modern React development practices.
              The main goal is to consume data from an API and display it on screen, applying best
              practices and organizing the code in a maintainable way.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technologies Used</CardTitle>
            <CardDescription>Modern frontend stack</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-medium text-sm">React 19</h4>
              <p className="text-sm text-muted-foreground">
                UI library for building user interfaces
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm">TypeScript</h4>
              <p className="text-sm text-muted-foreground">Type-safe JavaScript development</p>
            </div>
            <div>
              <h4 className="font-medium text-sm">Vite</h4>
              <p className="text-sm text-muted-foreground">
                Fast build tool and development server
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm">Tailwind CSS v4</h4>
              <p className="text-sm text-muted-foreground">Utility-first CSS framework</p>
            </div>
            <div>
              <h4 className="font-medium text-sm">TanStack Query</h4>
              <p className="text-sm text-muted-foreground">Powerful data fetching and caching</p>
            </div>
            <div>
              <h4 className="font-medium text-sm">TanStack Router</h4>
              <p className="text-sm text-muted-foreground">Type-safe routing solution</p>
            </div>
            <div>
              <h4 className="font-medium text-sm">Axios</h4>
              <p className="text-sm text-muted-foreground">HTTP client for API requests</p>
            </div>
            <div>
              <h4 className="font-medium text-sm">ShadCN/UI</h4>
              <p className="text-sm text-muted-foreground">
                Beautiful and accessible UI components
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>What this application demonstrates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="text-sm space-y-1">
              <li>• API data fetching with error and loading states</li>
              <li>• Type-safe routing with TanStack Router</li>
              <li>• Responsive design with Tailwind CSS</li>
              <li>• Modern React patterns and best practices</li>
              <li>• Component-based architecture</li>
              <li>• Data caching and state management</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
