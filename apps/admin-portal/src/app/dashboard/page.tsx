import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | FutureLabs LMS',
  description: 'Admin dashboard for FutureLabs Learning Management System',
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard content will go here */}
      </div>
    </div>
  )
} 