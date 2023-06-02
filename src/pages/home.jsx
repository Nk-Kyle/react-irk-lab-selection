import { NavbarComponent } from '../components/navbar'
import { ProtectedComponent } from '../components/protectedComponent'
import { TaskGrid } from '../components/taskGrid'
import { ErrorModal } from '../components/errorModal'
// import useUserDetail from '../components/useUserDetail'
import React, { useEffect, useState } from 'react'

export const Home = () => {
  const [tasks, setTasks] = useState([])
  const [showErrorModal, setShowErrorModal] = useState(false)
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
      <ProtectedComponent allowedRole="student">
        <h1 className="text-center">Welcome To Seleksi IRK</h1>
      </ProtectedComponent>
      <TaskGrid tasks={tasks} />
      <ErrorModal show={showErrorModal} onClose={handleCloseError} error="" />
    </div>
  )
}
