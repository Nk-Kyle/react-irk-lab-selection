import { NavbarComponent } from '../components/navbar'
import { TaskGrid } from '../components/taskGrid'
import { ErrorModal } from '../components/errorModal'
import React, { useEffect, useState } from 'react'

export const Home = () => {
  const [tasks, setTasks] = useState([])
  const [showErrorModal, setShowErrorModal] = useState(false)
  const errorMessage =
    'Reload the page and try again. If the problem persists, contact the administrator.'
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BACKEND + '/api/tasks', {
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

      if (data.tasks !== null) {
        setTasks(data.tasks)
      }
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
      <h1 className="text-center">Welcome To Seleksi IRK</h1>
      <TaskGrid tasks={tasks} />
      <ErrorModal
        show={showErrorModal}
        onClose={handleCloseError}
        error={errorMessage}
      />
    </div>
  )
}
