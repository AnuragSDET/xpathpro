'use client'

import { useState } from 'react'
import { CreditCard, Lock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface PaymentFormProps {
  packageId: string | null
}

export default function PaymentForm({ packageId }: PaymentFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    billingAddress: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/mentorship/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId,
          ...formData
        })
      })

      const data = await response.json()

      if (data.success) {
        alert('Payment successful! You will receive a confirmation email shortly.')
        // Redirect to success page
        window.location.href = '/mentorship/success'
      } else {
        alert(data.error || 'Payment failed. Please try again.')
      }
    } catch (error) {
      alert('Payment error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <CreditCard className="w-5 h-5" />
        Payment Details
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Package Summary */}
        <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
          <h4 className="text-purple-300 font-semibold mb-2">4-Month Elite Program</h4>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Monthly Payment</span>
            <span className="text-2xl font-bold text-white">$1,299</span>
          </div>
          <p className="text-purple-300 text-sm mt-2">
            Billed monthly for 4 months • Total: $5,196
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-slate-300">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-800/50 border-slate-600 text-white"
              required
            />
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="cardNumber" className="text-slate-300">Card Number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
              className="bg-slate-800/50 border-slate-600 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate" className="text-slate-300">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                className="bg-slate-800/50 border-slate-600 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="cvv" className="text-slate-300">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={handleChange}
                className="bg-slate-800/50 border-slate-600 text-white"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="name" className="text-slate-300">Cardholder Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-slate-800/50 border-slate-600 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="billingAddress" className="text-slate-300">Billing Address</Label>
            <Input
              id="billingAddress"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              className="bg-slate-800/50 border-slate-600 text-white"
              required
            />
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center gap-3 p-4 bg-green-600/20 border border-green-500/30 rounded-lg">
          <Shield className="w-5 h-5 text-green-400" />
          <div>
            <p className="text-green-300 text-sm font-medium">Secure Payment</p>
            <p className="text-green-400 text-xs">Your payment information is encrypted and secure</p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 text-lg"
        >
          <Lock className="w-5 h-5 mr-2" />
          {loading ? 'Processing...' : 'Start Mentorship Program'}
        </Button>

        <p className="text-slate-400 text-xs text-center">
          By proceeding, you agree to our Terms of Service and Privacy Policy. 
          You can cancel anytime with 30 days notice.
        </p>
      </form>
    </div>
  )
}