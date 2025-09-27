'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Clock, Trophy, Target, ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface OverviewTabProps {
  userProgress: any
}

export default function OverviewTab({ userProgress }: OverviewTabProps) {
  const stats = userProgress || {
    coursesCompleted: 0,
    totalCourses: 0,
    lessonsCompleted: 0,
    totalLessons: 0,
    studyTime: 0,
    overallProgress: 0
  }

  const [nextLesson, setNextLesson] = useState({
    title: 'Introduction to Selenium WebDriver',
    course: 'SDET Fundamentals',
    duration: '15 min',
    progress: 0
  })

  const [recentActivity, setRecentActivity] = useState([
    { type: 'completed', title: 'Test Planning Basics', time: '2 hours ago' },
    { type: 'started', title: 'API Testing with RestAssured', time: '1 day ago' },
    { type: 'quiz', title: 'SDET Quiz #3', score: '85%', time: '2 days ago' }
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-400 text-lg">Track your SDET learning journey and progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.coursesCompleted}/{stats.totalCourses}</span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Courses Completed</h3>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">{stats.lessonsCompleted}/{stats.totalLessons}</span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Lessons Completed</h3>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">{stats.studyTime}h</span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Study Time</h3>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{stats.overallProgress}%</span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Overall Progress</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Continue Learning</h2>
          
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{nextLesson.title}</h3>
                <p className="text-slate-400">{nextLesson.course} • {nextLesson.duration}</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </div>
            <Progress value={nextLesson.progress} className="h-2" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'completed' ? 'bg-green-400' :
                  activity.type === 'started' ? 'bg-blue-400' : 'bg-yellow-400'
                }`} />
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.title}</p>
                  <p className="text-slate-400 text-sm">{activity.time}</p>
                </div>
                {activity.score && (
                  <span className="text-green-400 font-semibold">{activity.score}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10">
              Take Quiz
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button variant="outline" className="w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10">
              View Notes
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button variant="outline" className="w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10">
              Cheat Sheets
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button variant="outline" className="w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10">
              Interview Prep
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="pt-4 border-t border-white/10">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                ⚡ Upgrade to Pro
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}