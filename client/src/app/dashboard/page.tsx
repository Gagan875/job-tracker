'use client'

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { Briefcase, Calendar, TrendingUp, FileText } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data } = await api.get('/stats')
      return data
    },
  })

  const { data: applications } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data } = await api.get('/applications')
      return data
    },
  })

  const { data: upcomingInterviews } = useQuery({
    queryKey: ['interviews', 'upcoming'],
    queryFn: async () => {
      const { data } = await api.get('/interviews?upcoming=true')
      return data
    },
  })

  const statCards = [
    {
      title: 'Total Applications',
      value: stats?.total || 0,
      icon: Briefcase,
      color: 'bg-blue-500',
    },
    {
      title: 'Upcoming Interviews',
      value: stats?.upcomingInterviews || 0,
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      title: 'Response Rate',
      value: `${stats?.responseRate || 0}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'Last 30 Days',
      value: stats?.recentApplications || 0,
      icon: FileText,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <Link
          href="/dashboard/applications/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Application
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Recent Applications</h2>
          <div className="space-y-3">
            {applications?.slice(0, 5).map((app: any) => (
              <Link
                key={app.id}
                href={`/dashboard/applications/${app.id}`}
                className="block p-3 border border-slate-600 rounded-lg hover:bg-slate-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-white">{app.jobTitle}</p>
                    <p className="text-sm text-gray-400">{app.companyName}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/dashboard/applications"
            className="block mt-4 text-center text-blue-400 hover:text-blue-300"
          >
            View all applications
          </Link>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Upcoming Interviews</h2>
          <div className="space-y-3">
            {upcomingInterviews?.slice(0, 5).map((interview: any) => (
              <div key={interview.id} className="p-3 border border-slate-600 rounded-lg">
                <p className="font-medium text-white">{interview.title}</p>
                <p className="text-sm text-gray-400">{interview.application.companyName}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(interview.scheduledAt).toLocaleString()}
                </p>
              </div>
            ))}
            {(!upcomingInterviews || upcomingInterviews.length === 0) && (
              <p className="text-gray-400 text-center py-4">No upcoming interviews</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    WISHLIST: 'bg-gray-100 text-gray-800',
    APPLIED: 'bg-blue-100 text-blue-800',
    INTERVIEW: 'bg-yellow-100 text-yellow-800',
    OFFER: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    ACCEPTED: 'bg-purple-100 text-purple-800',
    WITHDRAWN: 'bg-gray-100 text-gray-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}
