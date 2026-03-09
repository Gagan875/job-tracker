'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import Link from 'next/link'
import { Search, Plus } from 'lucide-react'

export default function ApplicationsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications', search, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (statusFilter) params.append('status', statusFilter)
      const { data } = await api.get(`/applications?${params}`)
      return data
    },
  })

  const statuses = ['WISHLIST', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'ACCEPTED', 'WITHDRAWN']

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Applications</h1>
        <Link
          href="/dashboard/applications/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Application
        </Link>
      </div>

      <div className="bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by company or job title..."
              className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-600 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications?.map((app: any) => (
            <Link
              key={app.id}
              href={`/dashboard/applications/${app.id}`}
              className="bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border border-slate-700"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">{app.jobTitle}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>
              <p className="text-gray-300 mb-2">{app.companyName}</p>
              {app.location && (
                <p className="text-sm text-gray-400 mb-2">{app.location}</p>
              )}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-600">
                <span className="text-xs text-gray-400">
                  Applied: {new Date(app.appliedDate).toLocaleDateString()}
                </span>
                {app.interviews.length > 0 && (
                  <span className="text-xs text-blue-400">
                    {app.interviews.length} interview{app.interviews.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {!isLoading && applications?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No applications found</p>
        </div>
      )}
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
