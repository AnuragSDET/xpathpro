import { Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const activities = [
  {
    id: 1,
    user: 'John Doe',
    action: 'completed',
    target: 'Introduction to SDET',
    time: '2 hours ago',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'enrolled in',
    target: 'Advanced Testing Techniques',
    time: '4 hours ago',
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'started',
    target: 'API Testing Fundamentals',
    time: '6 hours ago',
  },
  {
    id: 4,
    user: 'Sarah Wilson',
    action: 'completed',
    target: 'Test Automation Basics',
    time: '8 hours ago',
  },
]

export default function RecentActivity() {
  return (
    <Card className="bg-gray-900/50 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white text-xl font-bold">
          Recent Activity
          <Clock className="h-5 w-5 text-cyan-400" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 animate-pulse"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">{activity.user}</span>{' '}
                  {activity.action}{' '}
                  <span className="font-medium text-cyan-400">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="link" className="mt-6 p-0 h-auto text-cyan-400 hover:text-cyan-300 font-medium">
          View all activity →
        </Button>
      </CardContent>
    </Card>
  )
}