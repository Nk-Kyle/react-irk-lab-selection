import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import { NavbarComponent } from '../components/navbar'
import { SuccessModal } from '../components/successModal'
import { ErrorModal } from '../components/errorModal'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ProtectedComponent } from '../components/protectedComponent'
import { SubmissionEntries } from '../components/submissionEntries'

export const Task = () => {
  const [link, setLink] = useState('')
  const [validated, setValidated] = useState(false)
  const [fetchedData, setFetchedData] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [submissionList, setSubmissionList] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchTask()
    fetchSubmissions()
  })

  const errorMessage =
    'Reload the page and try again. If the problem persists, contact the administrator.'

  const fetchTask = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND + '/api/task/' + id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'irk-token': localStorage.getItem('irk-token'),
          },
        },
      )

      if (!res.ok) {
        if (res.status === 404) {
          navigate('/404')
        } else {
          setErrorMsg(errorMessage)
          setShowErrorModal(true)
          return
        }
      }

      const data = await res.json()

      data.task.submission ? setLink(data.task.submission.link) : setLink('')
      setFetchedData(true)
    } catch (err) {
      setErrorMsg(errorMessage)
      setShowErrorModal(true)
      return
    }
  }

  const fetchSubmissions = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND + '/api/submissions/' + id,
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

  const handleSubmit = async (e) => {
    try {
      const form = e.currentTarget
      if (form.checkValidity() === false) {
        e.preventDefault()
        e.stopPropagation()
      } else {
        e.preventDefault()
        setLoading(true)

        const data = {
          link: link,
        }
        const res = await fetch(
          process.env.REACT_APP_BACKEND + '/api/task/' + id,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'irk-token': localStorage.getItem('irk-token'),
            },
            body: JSON.stringify(data),
          },
        )

        if (!res.ok) {
          if (res.status === 404) {
            navigate('/404')
          } else if (res.status === 403) {
            setErrorMsg("Submission had already been scored. Can't edit.")
            setShowErrorModal(true)
            return
          } else {
            setErrorMsg(errorMessage)
            setShowErrorModal(true)
            return
          }
        }
        const dataRes = await res.json()
        setLink(dataRes.link)
        setShowSuccessModal(true)
      }
      setValidated(true)
    } catch (err) {
      setErrorMsg(errorMessage)
      setShowErrorModal(true)
      return
    } finally {
      setLoading(false)
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
            <h2>Submissions</h2>
            <SubmissionEntries submissions={submissionList} />
          </Col>
          <ProtectedComponent allowedRole={'student'}>
            <Col xs={6}>
              <div>
                <h2>Submit/Edit Your Submission</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicLink" className="mb-3">
                    <Form.Label>Link</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid link.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!fetchedData || loading}
                  >
                    {loading ? (
                      <span>
                        <Spinner animation="border" size="sm" /> Submitting...
                      </span>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </Form>
              </div>
            </Col>
          </ProtectedComponent>
        </Row>
      </Container>
      <SuccessModal
        show={showSuccessModal}
        onClose={handleCloseSuccessModal}
        MessageComponent={() => (
          <div>
            <p>Submission: </p>
            <a href={link} target="_blank" rel="noreferrer">
              {link}
            </a>
          </div>
        )}
      />
      <ErrorModal
        show={showErrorModal}
        onClose={handleCloseError}
        error={errorMsg}
      />
    </div>
  )
}
