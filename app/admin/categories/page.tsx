import AdminPageLayout from '../../../components/admin/AdminPageLayout'
import CategoriesList from '../../../components/admin/CategoriesList'

export const metadata = {
  title: 'Categories Management - xPath Pro Admin',
  description: 'Manage course categories',
}

export default function CategoriesPage() {
  return (
    <AdminPageLayout
      title="Categories Management"
      description="Organize your course content with categories"
      actionUrl="/admin/categories/new"
      actionLabel="New Category"
    >
      <CategoriesList />
    </AdminPageLayout>
  )
}