'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronDown,
  ChevronRight,
  Plus,
  List,
  Palette,
  Database,
  FileText,
  Tag,
  UserCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface MenuItem {
  name: string
  href?: string
  icon: any
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    name: 'Content Management',
    icon: BookOpen,
    children: [
      {
        name: 'All Courses',
        href: '/admin/courses',
        icon: List
      },
      {
        name: 'New Course',
        href: '/admin/courses/new',
        icon: Plus
      },
      {
        name: 'Categories',
        href: '/admin/categories',
        icon: Tag
      },
      {
        name: 'New Category',
        href: '/admin/categories/new',
        icon: Plus
      },
      {
        name: 'Lessons',
        href: '/admin/lessons',
        icon: GraduationCap
      }
    ]
  },
  {
    name: 'User Management',
    icon: Users,
    children: [
      {
        name: 'All Users',
        href: '/admin/users',
        icon: List
      },
      {
        name: 'Admins',
        href: '/admin/users?role=admin',
        icon: UserCheck
      }
    ]
  },
  {
    name: 'Analytics',
    icon: BarChart3,
    children: [
      {
        name: 'Overview',
        href: '/admin/analytics',
        icon: BarChart3
      },
      {
        name: 'Course Stats',
        href: '/admin/analytics/courses',
        icon: BookOpen
      },
      {
        name: 'User Activity',
        href: '/admin/analytics/users',
        icon: Users
      }
    ]
  },
  {
    name: 'System',
    icon: Settings,
    children: [
      {
        name: 'Layout Settings',
        href: '/admin/layout',
        icon: Palette
      },
      {
        name: 'Database',
        href: '/admin/dev-access',
        icon: Database
      },
      {
        name: 'Settings',
        href: '/admin/settings',
        icon: Settings
      }
    ]
  }
]

interface SidebarItemProps {
  item: MenuItem
  pathname: string
  level?: number
}

function SidebarItem({ item, pathname, level = 0 }: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState(
    item.children?.some(child => pathname === child.href) || false
  )
  
  const hasChildren = item.children && item.children.length > 0
  const isActive = pathname === item.href
  const hasActiveChild = item.children?.some(child => pathname === child.href)

  if (hasChildren) {
    return (
      <div className="space-y-1">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-left font-normal text-gray-300 hover:text-white hover:bg-gray-800/50",
            level > 0 && "pl-8",
            (isActive || hasActiveChild) && "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-400/30"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <item.icon className="mr-3 h-4 w-4" />
          <span className="flex-1">{item.name}</span>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        
        {isOpen && item.children && (
          <div className="space-y-1 ml-4">
            {item.children.map((child) => (
              <SidebarItem
                key={child.name}
                item={child}
                pathname={pathname}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start text-left font-normal text-gray-300 hover:text-white hover:bg-gray-800/50",
        level > 0 && "pl-8",
        isActive && "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-400/30"
      )}
      asChild
    >
      <Link href={item.href!}>
        <item.icon className="mr-3 h-4 w-4" />
        {item.name}
      </Link>
    </Button>
  )
}

export default function AdminSidebar() {
  const pathname = usePathname() || ''

  return (
    <div className="w-64 bg-gray-900/95 backdrop-blur-xl border-r border-white/10 flex flex-col h-full">
      <div className="p-6">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">xPath Pro Admin</h2>
      </div>
      
      <Separator className="bg-white/10" />
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            pathname={pathname}
          />
        ))}
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800/50"
          onClick={() => console.log('Sign out')}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}