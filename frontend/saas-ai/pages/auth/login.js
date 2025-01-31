import { useState } from 'react'
import { useRouter } from 'next/router'
import useAuthStore from '@/store/useAuthStore'
import AuthLayout from '@/components/AuthLayout'
import axios from 'axios'
import { FaLock } from 'react-icons/fa'

export default function Login() {
  const [credentials, setCredentials] = useState({ email: 'admin@solusikonsep.co.id', password: 'u6{gHNaa' })
  const [error, setError] = useState('')
  const setUser = useAuthStore((state) => state.setUser)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token) // Store token in localStorage
      router.push('/chat')
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError('Invalid response from server')
      }
    }
  }

  return (
    <AuthLayout>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Sign in to your account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaLock className="mr-2" />
              <input
                type="email"
                required
                defaultValue={credentials.email}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Email address"
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
            <div className="flex items-center">
              <FaLock className="mr-2" />
              <input
                type="password"
                required
                defaultValue={credentials.password}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Password"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Sign in
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="#" className="text-blue-600 hover:underline">Forgot your password?</a>
        </div>
      </div>
    </AuthLayout>
  )
}