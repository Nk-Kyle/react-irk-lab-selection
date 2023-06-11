import React, { useState } from 'react'
import { Button, ListGroup, Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const SubmissionList = ({ submissions, onScoreUpdate }) => {
  const [loadingStates, setLoadingStates] = useState(
    submissions.map(() => false),
  )
  const [scores, setScores] = useState(submissions.map(() => ''))

  const handleScoreUpdate = async (submission, index) => {
    const newScore = scores[index]
    const parsedScore = parseInt(newScore, 10)
    if (isNaN(parsedScore) || parsedScore < 0) {
      return
    }

    const updatedLoadingStates = [...loadingStates]
    updatedLoadingStates[index] = true
    setLoadingStates(updatedLoadingStates)

    const data = {
      student_email: submission.student_email,
      score: newScore,
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND + '/api/submissions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'irk-token': localStorage.getItem('irk-token'),
          },
          body: JSON.stringify(data),
        },
      )

      if (response.ok) {
        onScoreUpdate(true)
        const updatedScores = [...scores]
        updatedScores[index] = newScore
        setScores(updatedScores)
      } else {
        onScoreUpdate(false)
      }
    } catch (error) {
      onScoreUpdate(false)
    }

    const resetLoadingStates = [...loadingStates]
    resetLoadingStates[index] = false
    setLoadingStates(resetLoadingStates)
  }

  const handleInputChange = (e, index) => {
    const newScore = e.target.value
    const updatedScores = [...scores]
    updatedScores[index] = newScore
    setScores(updatedScores)
  }

  return (
    <ListGroup>
      {submissions.map((submission, index) => (
        <ListGroup.Item key={submission.student_email}>
          <div className="d-flex flex-wrap align-items-center">
            <div className="flex-grow-1">
              <strong>Student:</strong> {submission.student_name}
              <div>
                <strong>Last Updated:</strong>{' '}
                {new Date(submission.updated_at).toLocaleString()}
              </div>
            </div>
            <div className="ml-auto">
              <Link
                to={submission.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary">View Submission</Button>
              </Link>
            </div>
          </div>
          <div className="d-flex flex-wrap align-items-center mt-2">
            <div className="flex-grow-1">
              <strong>Score:</strong>{' '}
              {submission.scored ? submission.score : 'Not Scored'}
              <div className="ml-auto col-sm-5">
                <Form.Control
                  type="number"
                  placeholder="Enter new score"
                  value={scores[index]}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            </div>

            <div>
              <Button
                onClick={() => handleScoreUpdate(submission, index)}
                variant="primary"
                disabled={loadingStates[index]}
              >
                {loadingStates[index] ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'Update Score'
                )}
              </Button>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
