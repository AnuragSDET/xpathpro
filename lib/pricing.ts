'use client'

import { useState, useEffect } from 'react'

interface PricingPlan {
  id: string
  name: string
  current_price: number
  currency: string
  billing_period: string
}

interface Coupon {
  id: string
  code: string
  discount_type: string
  discount_value: number
  is_active: boolean
}

export function usePricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPricing()
  }, [])

  const fetchPricing = async () => {
    try {
      const response = await fetch('/api/pricing')
      const data = await response.json()
      setPlans(data.plans || [])
    } catch (error) {
      console.error('Failed to fetch pricing:', error)
    } finally {
      setLoading(false)
    }
  }

  const validateCoupon = async (code: string, planId: string) => {
    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, planId })
      })
      return await response.json()
    } catch (error) {
      return { valid: false, error: 'Failed to validate coupon' }
    }
  }

  const calculatePrice = (originalPrice: number, coupon?: Coupon) => {
    if (!coupon) return originalPrice

    if (coupon.discount_type === 'percentage') {
      return originalPrice * (1 - coupon.discount_value / 100)
    } else {
      return Math.max(0, originalPrice - coupon.discount_value)
    }
  }

  return {
    plans,
    loading,
    validateCoupon,
    calculatePrice,
    refetch: fetchPricing
  }
}