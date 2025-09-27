'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'

interface AdminPageLayoutProps {
  title: string
  description: string
  backUrl?: string
  backLabel?: string
  actionUrl?: string
  actionLabel?: string
  children: ReactNode
}

export default function AdminPageLayout({
  title,
  description,
  backUrl,
  backLabel,
  actionUrl,
  actionLabel,
  children
}: AdminPageLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {backUrl && (
            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10" asChild>
              <Link href={backUrl}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backLabel || 'Back'}
              </Link>
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            <p className="text-gray-400 mt-1">{description}</p>
          </div>
        </div>
        
        {actionUrl && (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <Link href={actionUrl}>
              <Plus className="h-4 w-4 mr-2" />
              {actionLabel || 'Add New'}
            </Link>
          </Button>
        )}
      </div>

      {/* Content */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}