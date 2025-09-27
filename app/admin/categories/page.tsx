import CategoriesList from '../../../components/admin/CategoriesList'

export const metadata = {
  title: 'Categories Management - xPath Pro Admin',
  description: 'Manage course categories',
}

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Categories Management</h1>
          <p className="text-gray-300 mt-2 text-lg">Organize your course content with categories</p>
        </div>
      </div>
      <CategoriesList />
    </div>
  )
}