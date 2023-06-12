import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import { NavbarComponent } from '../components/navbar'
import { SuccessModal } from '../components/successModal'
import { ErrorModal } from '../components/errorModal'
import { SubmissionList } from '../components/submissionList'
import { useFirebaseRoutesAnalytics } from '../utils/analytics'

export const Manage = () => {
  const [link, setLink] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [startDate, setStartDate] = useState('')
  const [score, setScore] = useState(0)
  const [validated, setValidated] = useState(false)
  const [fetchedData, setFetchedData] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [resultData, setResultData] = useState({})
  const [submissionList, setSubmissionList] = useState([])
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [loading, setLoading] = useState(false)
  useFirebaseRoutesAnalytics()

  useEffect(() => {
    fetchTask()
    fetchSubmissions()
  }, [])

  const errorMessage =
    'Reload the page and try again. If the problem persists, contact the administrator.'

  const fetchTask = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BACKEND + '/api/task', {
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

      if (data.task !== null) {
        setLink(data.task.link)
        setTitle(data.task.title)
        setDescription(data.task.description)
        setImageUrl(data.task.imageUrl)
        setScore(data.task.score)

        // Set the start Date from data.task.startDate of format timestamp
        const startDate = new Date(data.task.startDate)
        const utcStartDate = new Date(
          startDate.getTime() - startDate.getTimezoneOffset() * 60000,
        )
        const formattedStartDate = utcStartDate.toISOString().slice(0, 16)
        setStartDate(formattedStartDate)
      }
      setFetchedData(true)
    } catch (err) {
      setShowErrorModal(true)
      return
    }
  }

  const fetchSubmissions = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND + '/api/submissions',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'irk-token': localStorage.getItem('irk-token'),
          },
        },
      )

      if (!res.ok) {
        setShowErrorModal(true)
        return
      }

      const data = await res.json()
      setSubmissionList(data.submissions)
    } catch (err) {
      setShowErrorModal(true)
      return
    }
  }

  const handleSubmit = (e) => {
    try {
      const form = e.currentTarget
      if (form.checkValidity() === false) {
        e.preventDefault()
        e.stopPropagation()
      } else {
        e.preventDefault()
        setLoading(true)
        const data = {
          title: title,
          description: description,
          imageUrl: imageUrl,
          startDate: startDate,
          link: link,
          score: score,
        }
        fetch(process.env.REACT_APP_BACKEND + '/api/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'irk-token': localStorage.getItem('irk-token'),
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Request failed')
            }
            res.json().then((data) => {
              setResultData(data)
              setShowSuccessModal(true)
            })
          })
          .catch((err) => {
            setShowErrorModal(true)
            return
          })
          .finally(() => {
            setLoading(false)
          })
      }
      setValidated(true)
    } catch (err) {
      setShowErrorModal(true)
      return
    }
  }

  const handleScoreUpdate = (isSuccess) => {
    if (isSuccess) {
      fetchSubmissions()
    } else {
      setShowErrorModal(true)
    }
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
  }

  const handleCloseError = () => {
    setShowErrorModal(false)
  }

  return (
    <div>
      <NavbarComponent />
      <Container>
        <Row>
          <Col xs={6}>
            <div>
              <h2>Add/Update Your Question</h2>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formDescription" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    placeholder="Enter description (max 100 characters)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={100}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formLink" className="mb-3">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formImageUrl" className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formStartDate" className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    required
                    type="datetime-local"
                    placeholder="Enter start date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formScore" className="mb-3">
                  <Form.Label>Score</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Enter score"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={!fetchedData || loading}
                >
                  {loading ? (
                    <span>
                      <Spinner animation="border" size="sm" /> Loading...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Form>
            </div>
          </Col>

          <Col xs={6}>
            <h2>Submissions</h2>
            <SubmissionList
              submissions={submissionList}
              onScoreUpdate={handleScoreUpdate}
            />
          </Col>
        </Row>
      </Container>
      <SuccessModal
        show={showSuccessModal}
        onClose={handleCloseSuccessModal}
        MessageComponent={() => (
          <div>
            <p>
              Submitted/Updated task:{' '}
              <span style={{ color: 'blue' }}>{resultData.task.title}</span>{' '}
            </p>
          </div>
        )}
      />
      <ErrorModal
        show={showErrorModal}
        onClose={handleCloseError}
        error={errorMessage}
      />
    </div>
  )
}
