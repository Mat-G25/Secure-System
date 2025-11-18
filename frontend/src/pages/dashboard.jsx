import { useEffect, useState } from 'react'
import axios from 'axios'
import { Shield, AlertTriangle, CheckCircle, LogOut, Server } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  const [adminData, setAdminData] = useState(null)
  const [accessStatus, setAccessStatus] = useState('idle')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!user || !token) {
      navigate('/')
    }
  }, [user, navigate])

  const testAdminAccess = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get('http://localhost:3000/auth/admin', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setAdminData(response.data)
      setAccessStatus('success')
    } catch (error) {
      console.error('Erro de permissão:', error)
      setAccessStatus('denied')
    }
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
    navigate('/')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <nav className="mb-8 flex items-center justify-between rounded-xl bg-slate-900 p-4 border border-slate-800">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-indigo-500" />
          <span className="text-xl font-bold text-white">SecureDash</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-slate-400 hover:text-white"
        >
          <LogOut className="h-4 w-4" /> Sair
        </button>
      </nav>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-slate-900 p-6 border border-slate-800">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            Sessão Ativa
          </h2>
          <div className="space-y-4 text-slate-300">
            <p>
              <strong>Usuário:</strong> <span className="text-white">{user.name}</span>
            </p>
            <p>
              <strong>Email:</strong> <span className="text-white">{user.email}</span>
            </p>
            <p>
              <strong>Cargo:</strong>{' '}
              <span
                className={`px-2 py-1 rounded text-xs font-bold ${
                  user.role === 'admin'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}
              >
                {user.role.toUpperCase()}
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-900 p-6 border border-slate-800">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Server className="h-5 w-5 text-indigo-400" /> Teste RBAC
          </h2>
          <p className="mb-4 text-sm text-slate-400">
            Tente acessar a rota protegida <code>/admin</code>. O Backend validará se seu token
            possui a permissão necessária.
          </p>
          <button
            onClick={testAdminAccess}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-4 hover:bg-slate-700 text-white font-bold transition"
          >
            Tentar acessar Área Admin
          </button>

          <div className="mt-6">
            {accessStatus === 'success' && (
              <div className="rounded-lg bg-green-500/10 p-4 border border-green-500/20 text-green-400">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle className="h-5 w-5" /> Acesso Permitido
                </div>
                <p className="text-xs font-mono mt-2">{JSON.stringify(adminData?.segredo)}</p>
              </div>
            )}
            {accessStatus === 'denied' && (
              <div className="rounded-lg bg-red-500/10 p-4 border border-red-500/20 text-red-400">
                <div className="flex items-center gap-2 font-bold">
                  <AlertTriangle className="h-5 w-5" /> Acesso Negado (403)
                </div>
                <p className="text-sm mt-1">
                  O sistema barrou sua entrada. Seu cargo não tem permissão.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
