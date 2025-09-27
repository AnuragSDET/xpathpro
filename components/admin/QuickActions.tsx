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
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action, index) => (
          <Link key={action.name} href={action.href}>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-200 group">
              <div className={`p-2 rounded-lg bg-slate-800/50 group-hover:scale-110 transition-transform duration-200`}>
                <action.icon className={`h-5 w-5 ${iconColors[index]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white group-hover:text-blue-400 transition-colors truncate">
                  {action.name}
                </div>
                <div className="text-sm text-slate-400 mt-1 line-clamp-2">
                  {action.description}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}