import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Categories Management - xPath Pro Admin',
  description: 'Manage course categories',
}

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground mt-1">Organize your courses by category</p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="h-4 w-4 mr-2" />
            New Category
          </Link>
        </Button>
      </div>

      <div className="text-center py-12">
        <p className="text-muted-foreground">Categories management coming soon...</p>
      </div>
    </div>
  )
}