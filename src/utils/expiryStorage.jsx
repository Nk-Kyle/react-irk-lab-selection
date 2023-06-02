function setWithExpiry(key, value, ttl) {
  const now = new Date()
  localStorage.setItem(key, value)
  localStorage.setItem(key + '-expiry', now.getTime() + ttl)
}

function getWithExpiry(key) {
  const now = new Date()
  if (now.getTime() > localStorage.getItem(key + '-expiry')) {
    localStorage.removeItem(key)
    localStorage.removeItem(key + '-expiry')
    return null
  }
  return localStorage.getItem(key)
}

export { setWithExpiry, getWithExpiry }
