import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { api } from '../services/api'
import { AlertCircle, Loader, Plus } from 'lucide-react'

const ServiceCalls = () => {
  const [serviceCalls, setServiceCalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    status: '',
  })

  useEffect(() => {
    const fetchServiceCalls = async () => {
      try {
        const params = {}
        if (filters.status) params.status = filters.status
        const response = await api.getServiceCalls(params)
        setServiceCalls(response.data)
      } catch (err) {
        setError('Erro ao carregar chamados')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchServiceCalls()
  }, [filters])

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-orange-100 text-orange-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
    }
    return colors[priority] || 'bg-gray-100 text-gray-800'
  }

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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Chamados de Serviço</h2>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <Plus size={18} />
            <span>Novo Chamado</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3 mb-8">
            <AlertCircle className="text-red-600 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="mb-6">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos os status</option>
            <option value="pending">Pendentes</option>
            <option value="in_progress">Em progresso</option>
            <option value="completed">Concluídos</option>
            <option value="cancelled">Cancelados</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Título</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Prioridade</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Criado em</th>
              </tr>
            </thead>
            <tbody>
              {serviceCalls.length > 0 ? (
                serviceCalls.map((call) => (
                  <tr key={call.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">#{call.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{call.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(call.status)}`}>
                        {call.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(call.priority)}`}>
                        {call.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(call.created_at).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    Nenhum chamado encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ServiceCalls
