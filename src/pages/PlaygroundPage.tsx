import { useState } from 'react'
import { Star, Heart, Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'

export default function PlaygroundPage() {
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [checked, setChecked] = useState(false)
  const [progress, setProgress] = useState(50)

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Components Playground</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Buttons</h2>
          <div className="flex gap-2 flex-wrap">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">Input</h2>
          <div className="space-y-2 max-w-sm">
            <Input
              placeholder="Default input"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <Input type="email" placeholder="Email input" />
            <Input type="password" placeholder="Password input" />
            <Input disabled placeholder="Disabled input" />
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">Textarea</h2>
          <div className="max-w-sm">
            <Textarea
              placeholder="Enter your message..."
              value={textareaValue}
              onChange={e => setTextareaValue(e.target.value)}
            />
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">Select</h2>
          <div className="max-w-sm">
            <Select value={selectValue} onValueChange={setSelectValue}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
                <SelectItem value="option4">Option 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">Checkbox</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={checked}
                onCheckedChange={checked => setChecked(!!checked)}
              />
              <label htmlFor="terms" className="text-sm">
                Accept terms and conditions
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="newsletter" />
              <label htmlFor="newsletter" className="text-sm">
                Subscribe to newsletter
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled" disabled />
              <label htmlFor="disabled" className="text-sm text-muted-foreground">
                Disabled checkbox
              </label>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">Progress</h2>
          <div className="space-y-4 max-w-sm">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                -10%
              </Button>
              <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                +10%
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">Badges</h2>
          <div className="flex gap-2 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge>
              <Star className="h-3 w-3 mr-1" />
              With Icon
            </Badge>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This is a simple card with just content.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Card with Icon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>This card has an icon in the title.</p>
                <div className="mt-4">
                  <Button size="sm">Action</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
