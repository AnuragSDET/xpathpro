'use client'

import { BookOpen, TrendingUp, FileText, HelpCircle, Code, User, FileCheck, MessageCircle, Settings, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

interface DashboardSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  userName: string
}

export default function DashboardSidebar({ activeTab, setActiveTab, userName }: DashboardSidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'progress', label: 'Learning Progress', icon: TrendingUp },
    { id: 'notes', label: 'My Notes', icon: FileText },
    { id: 'quiz', label: 'Quiz Practice', icon: HelpCircle },
    { id: 'cheatsheet', label: 'Cheat Sheets', icon: Code },
    { id: 'resume', label: 'AI Resume Builder', icon: User },
    { id: 'cover-letter', label: 'AI Cover Letter', icon: FileCheck },
    { id: 'interview', label: 'Interview Prep', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white/5 border-r border-white/10 backdrop-blur-xl">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">X</span>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">xPath Pro</h2>
            <p className="text-slate-400 text-sm">Learning Dashboard</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-slate-400 text-sm mb-2">Welcome back,</p>
          <p className="text-white font-semibold">{userName}</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}