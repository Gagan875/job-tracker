'use client'

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Video } from 'lucide-react'

export default function InterviewsPage() {
  const { data: interviews, isLoading } = useQuery({
    queryKey: ['interviews'],
    queryFn: async () => {
      const { data } = await api.get('/interviews')
      return data
    },
  })

  const upcoming = interviews?.filter((i: any) => 
    new Date(i.scheduledAt) >= new Date() && !i.completed
  )
  const past = interviews?.filter((i: any) => 
    new Date(i.scheduledAt) < new Date() || i.completed
  )

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Interviews</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Upcoming Interviews</h2>
          {upcoming && upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcoming.map((interview: any) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No upcoming interviews</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Past Interviews</h2>
          {past && past.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {past.map((interview: any) => (
                <InterviewCard key={interview.id} interview={interview} isPast />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No past interviews</p>
          )}
        </div>
      </div>
    </div>
  )
}

function InterviewCard({ interview, isPast = false }: { interview: any; isPast?: boolean }) {
  return (
    <Link
      href={`/dashboard/applications/${interview.application.id}`}
      className={`block bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-slate-700 ${
        isPast ? 'opacity-75' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-white">{interview.title}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${
          interview.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {interview.completed ? 'Completed' : 'Upcoming'}
        </span>
      </div>

      <p className="text-gray-300 mb-2">{interview.application.companyName}</p>
      <p className="text-sm text-gray-400 mb-3">{interview.application.jobTitle}</p>

      <div className="space-y-2 text-sm text-gray-300">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(interview.scheduledAt).toLocaleDateString()}
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          {new Date(interview.scheduledAt).toLocaleTimeString()}
        </div>
        {interview.type && (
          <div className="flex items-center">
            <Video className="w-4 h-4 mr-2" />
            {interview.type}
          </div>
        )}
        {interview.location && (
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            {interview.location}
          </div>
        )}
      </div>
    </Link>
  )
}
