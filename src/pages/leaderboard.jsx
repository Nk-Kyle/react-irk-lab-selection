import React, { useState, useEffect } from 'react'
import { NavbarComponent } from '../components/navbar'
import { Table } from 'react-bootstrap'
import { ErrorModal } from '../components/errorModal'
import { useNavigate } from 'react-router-dom'
import { LoadingWrapper } from '../components/loadingWrapper'
import { useFirebaseRoutesAnalytics } from '../utils/analytics'

export const Leaderboard = () => {
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useFirebaseRoutesAnalytics()
  const errorMessage =
    'Reload the page and try again. If the problem persists, contact the administrator.'
  useEffect(() => {
    fetchScores()
  }, [])

  const [scores, setScores] = useState([])
  const navigate = useNavigate()

  const fetchScores = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BACKEND + '/api/scores', {
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
      setScores(data.scores)
      setIsLoading(false)
    } catch (err) {
      setShowErrorModal(true)
      return
    }
  }

  const handleCloseError = () => {
    setShowErrorModal(false)
  }

  const handleNavigate = (id) => {
    navigate(`/task/${id}`)
  }

  const users = Array.from(
    new Set(
      scores.flatMap((task) =>
        task.submissions.map((submission) => ({
          student_name: submission.student_name,
          score: submission.score,
        })),
      ),
    ),
  ).reduce((acc, user) => {
    const existingUser = acc.find((u) => u.student_name === user.student_name)
    if (existingUser) {
      existingUser.score += user.score
    } else {
      acc.push(user)
    }
    return acc
  }, [])

  users.sort((a, b) => b.score - a.score)

  return (
    <div>
      <NavbarComponent />
      <h1 className="pb-3 mb-4 text-center">Leaderboard</h1>
      <LoadingWrapper isLoading={isLoading}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              {scores.map((task) => (
                <th
                  key={task.id}
                  className="text-center"
                  onClick={() => handleNavigate(task.id)}
                  style={{ cursor: 'pointer' }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = '#f5f5f5')
                  }
                  onMouseOut={(e) => (e.target.style.backgroundColor = '')}
                >
                  {task.title}
                </th>
              ))}
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.student_name}>
                <td className="text-center">{index + 1}</td>
                <td>{user.student_name}</td>
                {scores.map((task) => {
                  const submission = task.submissions.find(
                    (sub) => sub.student_name === user.student_name,
                  )
                  const score = submission ? submission.score : '-'
                  return (
                    <td key={task.id} className="text-center">
                      {score}
                    </td>
                  )
                })}
                <td className="text-center">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </LoadingWrapper>
      <ErrorModal
        show={showErrorModal}
        onClose={handleCloseError}
        error={errorMessage}
      />
    </div>
  )
}
