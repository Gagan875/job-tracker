'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'
import { Briefcase, LayoutDashboard, Calendar, LogOut, Home } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, token, logout } = useAuthStore()

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token, router])

  if (!token) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-800 shadow-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Briefcase className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-white">JobTracker</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    pathname === '/dashboard'
                      ? 'text-white border-blue-500'
                      : 'text-gray-300 border-transparent hover:text-white hover:border-gray-500'
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
                <Link
                  href="/dashboard/applications"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    pathname?.startsWith('/dashboard/applications')
                      ? 'text-white border-blue-500'
                      : 'text-gray-300 border-transparent hover:text-white hover:border-gray-500'
                  }`}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Applications
                </Link>
                <Link
                  href="/dashboard/interviews"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    pathname?.startsWith('/dashboard/interviews')
                      ? 'text-white border-blue-500'
                      : 'text-gray-300 border-transparent hover:text-white hover:border-gray-500'
                  }`}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Interviews
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-blue-500 text-sm font-medium rounded-md text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
              <div className="text-sm text-gray-300 px-3 py-2 border-l border-slate-600">
                {user?.firstName} {user?.lastName}
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-red-500 text-sm font-medium rounded-md text-red-400 hover:bg-red-500 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">{children}</div>
      </main>
    </div>
  )
}
