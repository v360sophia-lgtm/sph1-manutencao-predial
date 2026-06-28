import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Technicians from './pages/Technicians'
import ServiceCalls from './pages/ServiceCalls'
import Reports from './pages/Reports'
import ServiceCallDetail from './pages/ServiceCallDetail'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { token } = useAuthStore()

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technicians"
          element={
            <ProtectedRoute>
              <Technicians />
            </ProtectedRoute>
          }
        />
        <Route
          path="/service-calls"
          element={
            <ProtectedRoute>
              <ServiceCalls />
            </ProtectedRoute>
          }
        />
        <Route
          path="/service-calls/:id"
          element={
            <ProtectedRoute>
              <ServiceCallDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
