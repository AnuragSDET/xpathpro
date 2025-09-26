import Link from 'next/link'

export default function DevAccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Development Access</h1>
        <p className="text-gray-600 mb-4">
          For development purposes, you can access the admin dashboard directly.
        </p>
        <Link
          href="/admin/dashboard"
          className="w-full btn-primary block text-center"
        >
          Enter Admin Dashboard
        </Link>
        <p className="text-xs text-gray-500 mt-4 text-center">
          This bypass is for development only
        </p>
      </div>
    </div>
  )
}