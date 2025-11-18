import { useState } from 'react'
import axios from 'axios'
import { Lock, User, ArrowRight } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      navigate('/dashboard')
    } catch {
      setError('Acesso Negado: Credenciais Inválidas')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-slate-900 p-8 shadow-2xl border border-slate-800">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
            <Lock className="h-6 w-6 text-indigo-400" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white">Secure Access</h2>
          <p className="mt-2 text-sm text-slate-400">Sistema de Login com JWT & RBAC</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 pl-10 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Email corporativo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 pl-10 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded bg-red-500/10 p-3 text-center text-sm text-red-400 border border-red-500/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Entrar no Sistema
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-slate-400">
              Não tem uma conta?{' '}
              <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300">
                Registre-se agora
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
