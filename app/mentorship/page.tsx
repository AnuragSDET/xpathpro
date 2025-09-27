'use client'

import { useState } from 'react'
import { Calendar, Clock, Video, Star, Award, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BookingCalendar from '@/components/mentorship/BookingCalendar'
import PaymentForm from '@/components/mentorship/PaymentForm'

export default function MentorshipPage() {
  const [showBooking, setShowBooking] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const packages = [
    {
      id: 'monthly',
      name: '4-Month Elite Program',
      price: 1299,
      duration: '4 months',
      sessions: '2-hour daily sessions (Mon-Thu)',
      features: [
        '2-hour daily sessions (Mon-Thu)',
        'Personalized learning roadmap',
        'Resume & LinkedIn optimization',
        'Mock interview preparation',
        'Job application strategy',
        'Salary negotiation guidance',
        '24/7 mentor support via chat',
        'Portfolio project reviews'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6">
            ELITE MENTORSHIP
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Transform your career with personalized 1-on-1 guidance from an industry expert
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Mentor Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sticky top-24">
              <div className="text-center mb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-4xl font-black text-white">AP</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Anurag Patel</h2>
                <p className="text-purple-400 font-semibold mb-4">Senior SDET Architect</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-slate-300 ml-2">5.0 (127 reviews)</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300">8+ years SDET experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">500+ students mentored</span>
                </div>
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-purple-400" />
                  <span className="text-slate-300">1000+ hours of mentoring</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {['Selenium', 'RestAssured', 'TestNG', 'Cucumber', 'Jenkins', 'Docker', 'AWS', 'Java'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-2">
            {!showBooking ? (
              <div className="space-y-8">
                {/* Package Selection */}
                {packages.map((pkg) => (
                  <div key={pkg.id} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-500 opacity-30 blur rounded-2xl" />
                    <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                          <p className="text-slate-400">{pkg.sessions}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-purple-400">${pkg.price}</div>
                          <div className="text-slate-400">per month</div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <span className="text-slate-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button 
                        onClick={() => {
                          setSelectedPackage(pkg.id)
                          setShowBooking(true)
                        }}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 text-lg"
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Book Your Mentorship
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Success Stories */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Success Stories</h3>
                  <div className="space-y-6">
                    {[
                      { name: 'Sarah M.', role: 'SDET at Google', salary: '$165K', story: 'Landed my dream job at Google within 3 months of completing the program!' },
                      { name: 'Mike R.', role: 'Senior QA at Microsoft', salary: '$145K', story: 'Anurag helped me transition from manual testing to automation. Amazing mentor!' },
                      { name: 'Lisa K.', role: 'Test Lead at Amazon', salary: '$180K', story: 'The personalized guidance was exactly what I needed. Worth every penny!' }
                    ].map((story, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{story.name[0]}</span>
                          </div>
                          <div>
                            <div className="text-white font-semibold">{story.name}</div>
                            <div className="text-purple-400 text-sm">{story.role} • {story.salary}</div>
                          </div>
                        </div>
                        <p className="text-slate-300 italic">"{story.story}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-8">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowBooking(false)}
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                  >
                    ← Back to Packages
                  </Button>
                  <h2 className="text-2xl font-bold text-white">Book Your Mentorship</h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <BookingCalendar />
                  <PaymentForm packageId={selectedPackage} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}