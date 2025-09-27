'use client'

import { useState } from 'react'
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const timeSlots = [
    '09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM', '02:00 PM - 04:00 PM', '04:00 PM - 06:00 PM'
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const formatDate = (day: number) => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const isDateAvailable = (day: number) => {
    const today = new Date()
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dayOfWeek = date.getDay()
    return date >= today && dayOfWeek >= 1 && dayOfWeek <= 4 // Mon-Thu only
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Select Date & Time
      </h3>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={prevMonth}
          className="bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h4 className="text-lg font-semibold text-white">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h4>
        <Button
          variant="outline"
          size="sm"
          onClick={nextMonth}
          className="bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-slate-400 text-sm font-medium py-2">
            {day}
          </div>
        ))}
        {getDaysInMonth(currentMonth).map((day, index) => (
          <button
            key={index}
            onClick={() => day && isDateAvailable(day) && setSelectedDate(formatDate(day))}
            disabled={!day || !isDateAvailable(day)}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-lg transition-all
              ${!day ? 'invisible' : ''}
              ${!day || !isDateAvailable(day) ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:bg-white/10'}
              ${day && selectedDate === formatDate(day) ? 'bg-purple-600 text-white' : ''}
            `}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Available Times
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`
                  py-3 px-4 rounded-lg text-sm font-medium transition-all
                  ${selectedTime === time 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && selectedTime && (
        <div className="mt-6 p-4 bg-purple-600/20 border border-purple-500/30 rounded-lg">
          <p className="text-purple-300 text-sm">
            Selected: {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} at {selectedTime}
          </p>
        </div>
      )}
    </div>
  )
}