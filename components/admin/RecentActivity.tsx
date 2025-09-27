import { Clock } from 'lucide-react'
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
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">
          Recent Activity
        </h3>
        <Clock className="h-5 w-5 text-blue-400" />
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-300">
                <span className="font-medium text-white">{activity.user}</span>{' '}
                {activity.action}{' '}
                <span className="font-medium text-blue-400">{activity.target}</span>
              </p>
              <p className="text-xs text-slate-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="link" className="mt-6 p-0 h-auto text-blue-400 hover:text-blue-300 font-medium">
        View all activity →
      </Button>
    </div>
  )
}