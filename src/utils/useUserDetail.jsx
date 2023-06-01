import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export const useUserDetail = () => {
  const [userDetail, setUserDetail] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('irk-user')

    if (!storedUser) {
      navigate('/login')
    } else {
      const parsedUser = JSON.parse(storedUser)
      setUserDetail(parsedUser)
      setLoading(false)
    }
  }, [navigate])

  return { userDetail, loading }
}
