import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, Menu, X, Home, Users, Wrench, FileText } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const Header = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold">SPH1</h1>
            <span className="text-sm bg-blue-700 px-3 py-1 rounded">Admin</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded ${
                isActive('/') ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/technicians"
              className={`flex items-center space-x-1 px-3 py-2 rounded ${
                isActive('/technicians') ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`}
            >
              <Users size={18} />
              <span>Técnicos</span>
            </Link>
            <Link
              to="/service-calls"
              className={`flex items-center space-x-1 px-3 py-2 rounded ${
                isActive('/service-calls') ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`}
            >
              <Wrench size={18} />
              <span>Chamados</span>
            </Link>
            <Link
              to="/reports"
              className={`flex items-center space-x-1 px-3 py-2 rounded ${
                isActive('/reports') ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`}
            >
              <FileText size={18} />
              <span>Relatórios</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-sm hidden md:block">{user?.name || 'Admin'}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-3 py-2 rounded transition"
            >
              <LogOut size={18} />
              <span className="hidden md:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
