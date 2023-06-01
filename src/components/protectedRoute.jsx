import { Navigate } from 'react-router-dom'
import { useUserDetail } from './useUserDetail'

const protectionLevel = {
  guest: 0,
  student: 1,
  assistant: 2,
}

export const ProtectedRoute = ({
  element: Component,
  allowedRole,
  ...rest
}) => {
  const { userDetail, loading } = useUserDetail()

  const hasPermission = () => {
    if (!allowedRole || !userDetail.role) {
      return false
    }
    return protectionLevel[userDetail.role] >= protectionLevel[allowedRole]
  }

  if (loading) {
    // Handle loading state, such as showing a spinner or skeleton
    return <div>Loading...</div>
  }

  return hasPermission() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace={true} />
  )
}
