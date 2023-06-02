import { setWithExpiry } from './expiryStorage'

async function handleCredentialResponse(response) {
  if (response.credential) {
    try {
      const isValidToken = await verifyToken(response.credential)
      if (isValidToken) {
        window.location.href = '/'
        return [true, 'Token verification success']
      } else {
        return [false, 'Token verification failed']
      }
    } catch (error) {
      return [false, 'Token verification failed']
    }
  }
}

async function verifyToken(token) {
  try {
    const response = await fetch(process.env.REACT_APP_BACKEND + '/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'irk-token': token,
      },
    })

    if (!response.ok) {
      throw new Error('Token verification failed')
    }

    // Parse the response and return true if the token is valid
    const data = await response.json()
    if (data.status === 'OK') {
      setWithExpiry('irk-token', token, 60 * 60 * 1000)
      localStorage.setItem('irk-user', JSON.stringify(data.user))
    }
    return response.ok
  } catch (error) {
    throw new Error('Token verification failed')
  }
}

export { handleCredentialResponse }
