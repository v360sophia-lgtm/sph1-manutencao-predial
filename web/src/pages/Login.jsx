import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useAuthStore } from '../store/authStore'
import { AlertCircle, Loader } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('admin@sph1.com')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { setToken, setUser } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await api.login(email, password)
      const { token, user } = response.data
      setToken(token)
      setUser(user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">SPH1</h1>
          <p className="text-gray-600">Sistema de Manutenção Predial</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3 mb-6">
            <AlertCircle className="text-red-600 flex-shrink-0" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@sph1.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading && <Loader size={18} className="animate-spin" />}
            <span>{loading ? 'Conectando...' : 'Entrar'}</span>
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Credenciais de teste:
          <br />
          <span className="font-mono">admin@sph1.com / 123456</span>
        </p>
      </div>
    </div>
  )
}

export default Login
