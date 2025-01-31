'use client';

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useAuthStore from '@/store/useAuthStore'
import jwtDecode from 'jwt-decode'

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter()
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
        if (token) {
          try {
            const decodedToken = jwtDecode(token)
            const currentTime = Date.now() / 1000

            if (decodedToken.exp < currentTime) {
              localStorage.removeItem('token')
              router.replace('/auth/login')
            } else {
              useAuthStore.setState({ isAuthenticated: true })
            }
          } catch (error) {
            localStorage.removeItem('token')
            router.replace('/auth/login')
          }
        } else if (!isAuthenticated) {
          router.replace('/auth/login')
        }
      }
    }, [isAuthenticated, router])

    if (!isAuthenticated && typeof window !== 'undefined' && !localStorage.getItem('token')) {
      return null // or a loading spinner
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
