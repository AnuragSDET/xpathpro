import Link from 'next/link'
import { Plus, FileText, Users, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const actions = [
  {
    name: 'Create New Course',
    description: 'Add a new course to your curriculum',
    href: '/admin/courses/new',
    icon: Plus,
  },
  {
    name: 'Add Lesson',
    description: 'Create a new lesson for existing courses',
    href: '/admin/lessons/new',
    icon: FileText,
  },
  {
    name: 'Manage Users',
    description: 'View and manage user accounts',
    href: '/admin/users',
    icon: Users,
  },
  {
    name: 'View Analytics',
    description: 'Check website performance metrics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
]

export default function QuickActions() {
  const iconColors = ['text-green-400', 'text-blue-400', 'text-purple-400', 'text-orange-400'];
  
  return (
    <Card className="bg-gray-900/50 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={action.name}
              asChild
              variant="outline"
              className="h-auto p-4 justify-start bg-gray-800/30 border-white/10 hover:bg-gray-800/50 hover:border-cyan-400/30 transition-all duration-300 group"
            >
              <Link href={action.href}>
                <div className="flex items-start space-x-3">
                  <action.icon className={`h-6 w-6 mt-0.5 ${iconColors[index]} group-hover:scale-110 transition-transform duration-300`} />
                  <div className="text-left">
                    <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">{action.name}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {action.description}
                    </div>
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}