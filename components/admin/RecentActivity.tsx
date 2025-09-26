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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Activity
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{' '}
                  {activity.action}{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="link" className="mt-4 p-0 h-auto">
          View all activity →
        </Button>
      </CardContent>
    </Card>
  )
}