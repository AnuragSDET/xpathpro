'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import OverviewTab from '@/components/dashboard/OverviewTab'
import ProgressTab from '@/components/dashboard/ProgressTab'
import NotesTab from '@/components/dashboard/NotesTab'
import QuizTab from '@/components/dashboard/QuizTab'
import CheatSheetTab from '@/components/dashboard/CheatSheetTab'
import ResumeTab from '@/components/dashboard/ResumeTab'
import CoverLetterTab from '@/components/dashboard/CoverLetterTab'
import InterviewTab from '@/components/dashboard/InterviewTab'
import SettingsTab from '@/components/dashboard/SettingsTab'

export default function DashboardPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('overview')
  const [userProgress, setUserProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProgress()
  }, [])

  const fetchUserProgress = async () => {
    try {
      const response = await fetch('/api/user/progress')
      const data = await response.json()
      if (data.success) {
        setUserProgress(data.progress)
      }
    } catch (error) {
      console.error('Error fetching progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab userProgress={userProgress} />
      case 'progress':
        return <ProgressTab userProgress={userProgress} />
      case 'notes':
        return <NotesTab />
      case 'quiz':
        return <QuizTab />
      case 'cheatsheet':
        return <CheatSheetTab />
      case 'resume':
        return <ResumeTab />
      case 'cover-letter':
        return <CoverLetterTab />
      case 'interview':
        return <InterviewTab />
      case 'settings':
        return <SettingsTab />
      default:
        return <OverviewTab userProgress={userProgress} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        <DashboardSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          userName={session?.user?.name || 'Student'}
        />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-white text-xl">Loading...</div>
              </div>
            ) : (
              renderTabContent()
            )}
          </div>
        </main>
      </div>
    </div>
  )
}