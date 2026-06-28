import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import Header from '../components/Header'
import { AlertCircle, Loader } from 'lucide-react'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.getStatistics()
        setStats(response.data)
      } catch (err) {
        setError('Erro ao carregar estatísticas')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <Loader className="animate-spin" size={32} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3 mb-8">
            <AlertCircle className="text-red-600 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats &&
            stats.map((stat) => (
              <div key={stat.id} className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-sm mb-2">{stat.name}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{stat.total_calls}</p>
                    <p className="text-xs text-gray-400">Total</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{stat.completed_calls}</p>
                    <p className="text-xs text-gray-400">Concluídos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">{stat.in_progress_calls}</p>
                    <p className="text-xs text-gray-400">Em progresso</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{stat.pending_calls}</p>
                    <p className="text-xs text-gray-400">Pendentes</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
