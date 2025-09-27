'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Users, DollarSign, Video, MessageSquare, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MentorshipBooking {
  id: string
  email: string
  cardholder_name: string
  status: string
  payment_status: string
  amount: number
  created_at: string
}

export default function AdminMentorshipPage() {
  const [bookings, setBookings] = useState<MentorshipBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('students')

  useEffect(() => {
    fetchMentorshipData()
  }, [])

  const fetchMentorshipData = async () => {
    try {
      const response = await fetch('/api/admin/mentorship/bookings')
      const data = await response.json()
      
      if (data.success) {
        setBookings(data.bookings)
      }
    } catch (error) {
      console.error('Error fetching mentorship data:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    totalBookings: bookings.length,
    activeStudents: bookings.filter(b => b.status === 'active').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.amount, 0),
    monthlyRevenue: bookings.length * 1299
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white text-xl">Loading mentorship data...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Mentorship Management</h1>
        <p className="text-slate-400 text-lg">Manage your mentorship program and sessions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 rounded-2xl" />
          <div className="relative bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">{stats.totalBookings}</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Total Students</h3>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 rounded-2xl" />
          <div className="relative bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-white">{stats.activeStudents}</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Active Students</h3>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 rounded-2xl" />
          <div className="relative bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Total Revenue</h3>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 rounded-2xl" />
          <div className="relative bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">${stats.monthlyRevenue.toLocaleString()}</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Monthly Revenue</h3>
          </div>
        </div>
      </div>

      {/* Student Management */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Student Management</h2>
        
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No Students Yet</h3>
            <p className="text-slate-500">Students will appear here once they book mentorship sessions</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">{booking.cardholder_name}</h3>
                  <p className="text-slate-400 text-sm">{booking.email}</p>
                  <p className="text-slate-400 text-sm">
                    Started: {new Date(booking.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'active' 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-gray-600/20 text-gray-400'
                  }`}>
                    {booking.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.payment_status === 'paid' 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {booking.payment_status}
                  </span>
                  <span className="text-white font-semibold">${booking.amount}</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-300 text-sm">No sessions scheduled for today</p>
              <p className="text-slate-400 text-xs">Sessions will appear here once students book time slots</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start bg-white/5 border border-white/10 text-white hover:bg-white/10">
              <Calendar className="w-4 h-4 mr-2" />
              Manage Schedule
            </Button>
            <Button className="w-full justify-start bg-white/5 border border-white/10 text-white hover:bg-white/10">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Announcements
            </Button>
            <Button className="w-full justify-start bg-white/5 border border-white/10 text-white hover:bg-white/10">
              <Video className="w-4 h-4 mr-2" />
              Generate Meeting Links
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}