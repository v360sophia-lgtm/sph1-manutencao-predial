import React from 'react'
import Header from '../components/Header'

const ServiceCallDetail = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Detalhes do Chamado</h2>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Detalhes completos do chamado, evidências e histórico de atualizações.</p>
          <p className="text-sm text-gray-500 mt-2">Página em desenvolvimento...</p>
        </div>
      </div>
    </div>
  )
}

export default ServiceCallDetail
