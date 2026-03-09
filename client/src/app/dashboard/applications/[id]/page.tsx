'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { toast } from 'sonner'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Trash2, Calendar, User } from 'lucide-react'

export default function ApplicationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const { data: application, isLoading } = useQuery({
    queryKey: ['application', params.id],
    queryFn: async () => {
      const { data } = await api.get(`/applications/${params.id}`)
      return data
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.put(`/applications/${params.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['application', params.id] })
      queryClient.invalidateQueries({ queryKey: ['applications'] })
      toast.success('Application updated!')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/applications/${params.id}`),
    onSuccess: () => {
      toast.success('Application deleted!')
      router.push('/dashboard/applications')
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!application) {
    return <div>Application not found</div>
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        href="/dashboard/applications"
        className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Applications
      </Link>

      <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white">{application.jobTitle}</h1>
              <p className="text-xl text-gray-300 mt-1">{application.companyName}</p>
              {application.location && (
                <p className="text-gray-400 mt-1">{application.location}</p>
              )}
            </div>
            <div className="flex gap-2">
              <select
                className="px-3 py-2 border border-gray-600 rounded-lg bg-slate-700 text-white"
                value={application.status}
                onChange={(e) => updateMutation.mutate({ status: e.target.value })}
              >
                <option value="WISHLIST">Wishlist</option>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="WITHDRAWN">Withdrawn</option>
              </select>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg border border-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            {application.salary && (
              <span className="text-sm text-gray-300">💰 {application.salary}</span>
            )}
            {application.jobUrl && (
              <a
                href={application.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
              >
                View Job Posting <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            )}
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {application.jobDescription && (
              <div>
                <h2 className="text-lg font-semibold mb-2 text-white">Job Description</h2>
                <p className="text-gray-300 whitespace-pre-wrap">{application.jobDescription}</p>
              </div>
            )}

            {application.notes && (
              <div>
                <h2 className="text-lg font-semibold mb-2 text-white">Notes</h2>
                <p className="text-gray-300 whitespace-pre-wrap">{application.notes}</p>
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold mb-3 text-white">Interviews</h2>
              {application.interviews.length > 0 ? (
                <div className="space-y-3">
                  {application.interviews.map((interview: any) => (
                    <div key={interview.id} className="p-4 border border-slate-600 rounded-lg bg-slate-700">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-white">{interview.title}</p>
                          <p className="text-sm text-gray-400">{interview.type}</p>
                          <p className="text-sm text-gray-400 mt-1">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {new Date(interview.scheduledAt).toLocaleString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          interview.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {interview.completed ? 'Completed' : 'Upcoming'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No interviews scheduled</p>
              )}
            </div>

            {application.contacts.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3 text-white">Contacts</h2>
                <div className="space-y-3">
                  {application.contacts.map((contact: any) => (
                    <div key={contact.id} className="p-4 border border-slate-600 rounded-lg bg-slate-700">
                      <div className="flex items-start">
                        <User className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                        <div>
                          <p className="font-medium text-white">{contact.name}</p>
                          {contact.role && <p className="text-sm text-gray-400">{contact.role}</p>}
                          {contact.email && (
                            <a href={`mailto:${contact.email}`} className="text-sm text-blue-400">
                              {contact.email}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <h3 className="font-semibold mb-3 text-white">Timeline</h3>
              <div className="space-y-3">
                {application.activities.map((activity: any) => (
                  <div key={activity.id} className="text-sm">
                    <p className="text-gray-300">{activity.description}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md border border-slate-700">
            <h3 className="text-lg font-semibold mb-2 text-white">Delete Application?</h3>
            <p className="text-gray-300 mb-4">
              This will permanently delete this application and all related data.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMutation.mutate()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
