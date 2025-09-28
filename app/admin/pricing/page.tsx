'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PricingPlan {
  id: string
  name: string
  description: string
  base_price: number
  current_price: number
  currency: string
  billing_period: string
  features: string[]
  is_active: boolean
}

interface Coupon {
  id: string
  code: string
  name: string
  description: string
  discount_type: string
  discount_value: number
  max_uses: number | null
  used_count: number
  valid_until: string | null
  is_active: boolean
}

export default function PricingManagement() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null)
  const [newCoupon, setNewCoupon] = useState({
    name: '',
    description: '',
    discount_type: 'percentage',
    discount_value: 0,
    max_uses: null as number | null,
    valid_until: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [pricingRes, couponsRes] = await Promise.all([
        fetch('/api/pricing'),
        fetch('/api/coupons')
      ])
      
      const pricingData = await pricingRes.json()
      const couponsData = await couponsRes.json()
      
      setPlans(pricingData.plans || [])
      setCoupons(couponsData.coupons || [])
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updatePricing = async (planId: string, newPrice: number) => {
    try {
      const response = await fetch('/api/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: planId, current_price: newPrice })
      })
      
      if (response.ok) {
        fetchData()
        setEditingPlan(null)
      }
    } catch (error) {
      console.error('Failed to update pricing:', error)
    }
  }

  const createCoupon = async () => {
    try {
      const response = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCoupon)
      })
      
      if (response.ok) {
        fetchData()
        setNewCoupon({
          name: '',
          description: '',
          discount_type: 'percentage',
          discount_value: 0,
          max_uses: null,
          valid_until: ''
        })
      }
    } catch (error) {
      console.error('Failed to create coupon:', error)
    }
  }

  const toggleCoupon = async (couponId: string, isActive: boolean) => {
    try {
      await fetch('/api/coupons', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: couponId, is_active: !isActive })
      })
      fetchData()
    } catch (error) {
      console.error('Failed to toggle coupon:', error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-white">Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-2">
          Pricing Management
        </h1>
        <p className="text-slate-400">Manage mentorship pricing and discount coupons</p>
      </div>

      {/* Current Pricing */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Current Pricing Plans</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {plans.map((plan) => (
            <div key={plan.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="text-slate-400">{plan.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-2xl font-bold text-emerald-400">
                    ${plan.current_price}/{plan.billing_period}
                  </span>
                  {plan.base_price !== plan.current_price && (
                    <span className="text-slate-500 line-through">
                      ${plan.base_price}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {editingPlan?.id === plan.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      defaultValue={plan.current_price}
                      className="w-24 bg-slate-600 border-slate-500 text-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const newPrice = parseFloat((e.target as HTMLInputElement).value)
                          updatePricing(plan.id, newPrice)
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={() => setEditingPlan(null)}
                      variant="outline"
                      className="border-slate-600 text-slate-300"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setEditingPlan(plan)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Edit Price
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Create Coupon */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Create New Coupon</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300">Coupon Name</Label>
              <Input
                value={newCoupon.name}
                onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
                placeholder="Black Friday Sale"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-300">Description</Label>
              <Input
                value={newCoupon.description}
                onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                placeholder="50% off mentorship program"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-slate-300">Discount Type</Label>
              <select
                value={newCoupon.discount_type}
                onChange={(e) => setNewCoupon({ ...newCoupon, discount_type: e.target.value })}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed_amount">Fixed Amount</option>
              </select>
            </div>
            <div>
              <Label className="text-slate-300">Discount Value</Label>
              <Input
                type="number"
                value={newCoupon.discount_value}
                onChange={(e) => setNewCoupon({ ...newCoupon, discount_value: parseFloat(e.target.value) })}
                placeholder="50"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-300">Max Uses (optional)</Label>
              <Input
                type="number"
                value={newCoupon.max_uses || ''}
                onChange={(e) => setNewCoupon({ ...newCoupon, max_uses: e.target.value ? parseInt(e.target.value) : null })}
                placeholder="100"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          <div>
            <Label className="text-slate-300">Valid Until (optional)</Label>
            <Input
              type="datetime-local"
              value={newCoupon.valid_until}
              onChange={(e) => setNewCoupon({ ...newCoupon, valid_until: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <Button
            onClick={createCoupon}
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
          >
            Generate Coupon Code
          </Button>
        </CardContent>
      </Card>

      {/* Active Coupons */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Active Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <div className="flex items-center gap-3">
                    <code className="px-3 py-1 bg-slate-600 rounded text-cyan-400 font-mono font-bold">
                      {coupon.code}
                    </code>
                    <Badge variant={coupon.is_active ? "default" : "secondary"}>
                      {coupon.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <h4 className="text-white font-semibold mt-2">{coupon.name}</h4>
                  <p className="text-slate-400 text-sm">{coupon.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-300">
                    <span>
                      {coupon.discount_type === 'percentage' ? `${coupon.discount_value}% off` : `$${coupon.discount_value} off`}
                    </span>
                    {coupon.max_uses && (
                      <span>{coupon.used_count}/{coupon.max_uses} uses</span>
                    )}
                    {coupon.valid_until && (
                      <span>Expires: {new Date(coupon.valid_until).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={coupon.is_active ? "destructive" : "default"}
                  onClick={() => toggleCoupon(coupon.id, coupon.is_active)}
                >
                  {coupon.is_active ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}