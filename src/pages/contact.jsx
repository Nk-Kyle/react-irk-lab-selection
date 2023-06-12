import { NavbarComponent } from '../components/navbar'
import { ErrorModal } from '../components/errorModal'
import React, { useEffect, useState } from 'react'
import { ContactGrid } from '../components/contactGrid'
import { LoadingWrapper } from '../components/loadingWrapper'
import { useFirebaseRoutesAnalytics } from '../utils/analytics'

export const Contact = () => {
  const [contacts, setContacts] = useState([])
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const errorMessage =
    'Reload the page and try again. If the problem persists, contact the administrator.'
  useEffect(() => {
    fetchContacts()
  }, [])

  useFirebaseRoutesAnalytics()

  const fetchContacts = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BACKEND + '/api/contacts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'irk-token': localStorage.getItem('irk-token'),
        },
      })

      if (!res.ok) {
        setShowErrorModal(true)
        return
      }

      const data = await res.json()

      setContacts(data.contacts)
      setIsLoading(false)
    } catch (err) {
      setShowErrorModal(true)
      return
    }
  }

  const handleCloseError = () => {
    setShowErrorModal(false)
  }

  return (
    <div>
      <NavbarComponent />
      <h1 className="text-center">Contacts</h1>
      <LoadingWrapper isLoading={isLoading}>
        <ContactGrid contacts={contacts} />
      </LoadingWrapper>
      
      <ErrorModal
        show={showErrorModal}
        onClose={handleCloseError}
        error={errorMessage}
      />
    </div>
  )
}
