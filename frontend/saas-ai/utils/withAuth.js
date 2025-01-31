import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useAuthStore from '@/store/useAuthStore'

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter()
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/auth/login')
      }
    }, [isAuthenticated, router])

    if (!isAuthenticated) {
      return null // or a loading spinner
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
