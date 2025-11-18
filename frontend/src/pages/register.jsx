import { useState } from 'react'
import axios from 'axios'
import { Lock, User, Mail, ArrowRight, ArrowLeft } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/auth/register', {
        name,
        email,
        password,
      })

      navigate('/')
    } catch (err) {
      console.error(err);
      setError('Erro ao criar conta. Tente outro email.');
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-slate-900 p-8 shadow-2xl border border-slate-800">
        <div className="text-center">
          <h2 className="mt-4 text-2xl font-bold text-white">Crie sua Conta</h2>
          <p className="mt-2 text-sm text-slate-400">Junte-se ao sistema seguro</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                required
                className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 pl-10 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Seu Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-slate-500" />
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

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="password"
                required
                className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 pl-10 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Senha forte"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
            Cadastrar
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="text-center">
            <Link
              to="/"
              className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar para Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
