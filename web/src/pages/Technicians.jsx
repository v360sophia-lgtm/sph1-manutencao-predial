import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { api } from '../services/api'
import { AlertCircle, Loader } from 'lucide-react'

const Technicians = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getCondominiums()
        setData(response.data)
      } catch (err) {
        setError('Erro ao carregar dados')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Técnicos e Atribuições</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3 mb-8">
            <AlertCircle className="text-red-600 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <p className="text-gray-600">Gerenciar técnicos, atribuir condominios e consultar seu histórico de obras.</p>
            <p className="text-sm text-gray-500 mt-2">Página em desenvolvimento...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Technicians
