import React, { useState } from 'react'
import { Button, ListGroup, Form, Spinner } from 'react-bootstrap'

export const SubmissionList = ({ submissions, onScoreUpdate }) => {
  const [newScore, setNewScore] = useState('')
  const [loading, setLoading] = useState(false)

  const handleScoreUpdate = async (submission, newScore) => {
    const parsedScore = parseInt(newScore, 10)
    if (isNaN(parsedScore) || parsedScore < 0) {
      setLoading(false)
      return
    }
    setLoading(true)

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
        setNewScore(0)
      } else {
        onScoreUpdate(false)
      }
    } catch (error) {
      onScoreUpdate(false)
    }

    setLoading(false)
  }

  const handleInputChange = (e) => {
    setNewScore(e.target.value)
  }

  return (
    <ListGroup>
      {submissions.map((submission) => (
        <ListGroup.Item key={submission.student_email}>
          <div className="d-flex flex-wrap align-items-center">
            <div className="flex-grow-1">
              <strong>Student:</strong> {submission.student_name}
              <div>
                <strong>Last Updated:</strong>{' '}
                {new Date(submission.updated_at).toDateString()}
              </div>
            </div>
            <div className="ml-auto">
              <Button href={submission.link} variant="primary">
                View Submission
              </Button>
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
                  value={newScore}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <Button
                onClick={() => handleScoreUpdate(submission, newScore)}
                variant="primary"
                disabled={loading}
              >
                {loading ? (
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
