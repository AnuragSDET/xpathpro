import { CheckCircle, Calendar, Mail, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function MentorshipSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-4">
            WELCOME ABOARD!
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Your Elite Mentorship Program has been successfully activated. Get ready to transform your career!
          </p>
        </div>

        {/* Next Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Check Your Email</h3>
            <p className="text-slate-400 text-sm">
              Confirmation email with program details and next steps has been sent
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Schedule First Session</h3>
            <p className="text-slate-400 text-sm">
              Book your first 1-on-1 session within the next 48 hours
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <Video className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Join Community</h3>
            <p className="text-slate-400 text-sm">
              Access exclusive Discord community for program participants
            </p>
          </div>
        </div>

        {/* Program Details */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Your Program Includes</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-slate-300">16 weekly 1-on-1 sessions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-slate-300">Personalized learning roadmap</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-slate-300">Resume & LinkedIn optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-slate-300">Mock interview preparation</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-slate-300">Job application strategy</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-slate-300">Salary negotiation guidance</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-slate-300">24/7 mentor support via chat</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-slate-300">Portfolio project reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10 py-3 px-8">
            <Link href="/mentorship">Schedule First Session</Link>
          </Button>
        </div>

        <p className="text-slate-400 text-sm mt-8">
          Questions? Email us at <span className="text-purple-400">support@xpathpro.com</span> or join our Discord community
        </p>
      </div>
    </div>
  )
}