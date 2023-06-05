import React, { useState } from 'react'
import { ListGroup, Form, Image } from 'react-bootstrap'

export const SubmissionEntries = ({ submissions }) => {
  const [orderBy, setOrderBy] = useState('score')
  const [orderDirection, setOrderDirection] = useState('desc')

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value)
  }

  const handleOrderDirectionChange = (event) => {
    setOrderDirection(event.target.value)
  }

  const orderedSubmissions = [...submissions].sort((a, b) => {
    let comparison = 0

    if (orderBy === 'score') {
      if (a.scored && !b.scored) return -1
      if (!a.scored && b.scored) return 1
      comparison = b.score - a.score
    } else if (orderBy === 'lastUpdated') {
      comparison =
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    }

    return orderDirection === 'asc' ? comparison : -comparison
  })

  return (
    <div>
      <div className="d-flex align-items-center">
        <div className="mr-2">
          Order by:
          <Form.Select value={orderBy} onChange={handleOrderByChange}>
            <option value="score">Score</option>
            <option value="lastUpdated">Last Updated</option>
          </Form.Select>
        </div>
        <div>
          Order direction:
          <Form.Select
            value={orderDirection}
            onChange={handleOrderDirectionChange}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </Form.Select>
        </div>
      </div>
      <ListGroup>
        {orderedSubmissions.map((submission) => (
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
                <Image
                  src={submission.student_picture}
                  alt="submission"
                  className="mb-2 rounded-circle"
                  style={{ maxHeight: '50%', maxWidth: '50%' }}
                />
              </div>
            </div>
            <div className="d-flex flex-wrap align-items-center mt-2">
              <div className="flex-grow-1">
                <strong>Score:</strong>{' '}
                {submission.scored ? submission.score : 'Not Scored'}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}
