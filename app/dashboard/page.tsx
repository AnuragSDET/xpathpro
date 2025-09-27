'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Trophy, Target, FileText, Star, MessageSquare } from 'lucide-react';
import VideoMockInterview from '@/components/dashboard/VideoMockInterview';

interface DashboardData {
  totalCourses: number;
  completedCourses: number;
  totalLessons: number;
  completedLessons: number;
  studyTime: number;
  recentProgress: any[];
  subscription: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    fetchDashboardData();
  }, [session, status, router]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/user/dashboard');
      const data = await response.json();
      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!dashboardData) {
    return <div className="flex items-center justify-center h-screen">Error loading dashboard</div>;
  }

  const overallProgress = dashboardData.totalLessons > 0 
    ? (dashboardData.completedLessons / dashboardData.totalLessons) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4">Welcome back, {session?.user?.name}!</h1>
          <p className="text-gray-300 text-xl leading-relaxed">Continue your SDET learning journey and unlock your potential</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 rounded-2xl" />
            <Card className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-cyan-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Courses</p>
                    <p className="text-2xl font-bold text-white">
                      {dashboardData.completedCourses}/{dashboardData.totalCourses}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 rounded-2xl" />
            <Card className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 hover:border-emerald-400/30 transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-emerald-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Lessons</p>
                    <p className="text-2xl font-bold text-white">
                      {dashboardData.completedLessons}/{dashboardData.totalLessons}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 rounded-2xl" />
            <Card className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 hover:border-purple-400/30 transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-purple-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Study Time</p>
                    <p className="text-2xl font-bold text-white">{dashboardData.studyTime}h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 rounded-2xl" />
            <Card className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Trophy className="h-8 w-8 text-yellow-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Progress</p>
                    <p className="text-2xl font-bold text-white">{Math.round(overallProgress)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Video Mock Interview Section */}
        <div className="mb-12">
          <VideoMockInterview userId={session?.user?.email || session?.user?.id || 'demo-user'} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Progress Overview */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl font-bold">Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Overall Progress</span>
                      <span className="text-cyan-400 font-bold">{Math.round(overallProgress)}%</span>
                    </div>
                    <Progress value={overallProgress} className="h-3 bg-gray-800" />
                  </div>
                  
                  {dashboardData.recentProgress.map((course: any, index: number) => (
                    <div key={index} className="border-t border-white/10 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-white">{course.title}</h4>
                        <span className="text-sm text-gray-400">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2 bg-gray-800" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="bg-gray-900/50 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl font-bold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gray-800/50 border-white/10 text-gray-300 hover:text-white hover:bg-gray-700/50" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Courses
                </Button>
                <Button className="w-full justify-start bg-gray-800/50 border-white/10 text-gray-300 hover:text-white hover:bg-gray-700/50" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  My Notes
                </Button>
                <Button className="w-full justify-start bg-gray-800/50 border-white/10 text-gray-300 hover:text-white hover:bg-gray-700/50" variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  Take Assessment
                </Button>
                <Button className="w-full justify-start bg-gray-800/50 border-white/10 text-gray-300 hover:text-white hover:bg-gray-700/50" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  AI Mock Interview
                </Button>
                <Button className="w-full justify-start bg-gray-800/50 border-white/10 text-gray-300 hover:text-white hover:bg-gray-700/50" variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Resume Builder
                </Button>
                {dashboardData.subscription === 'free' && (
                  <Button className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold hover:scale-105 transition-transform duration-300">
                    ⚡ Upgrade to Pro
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}