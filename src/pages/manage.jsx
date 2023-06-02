import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { NavbarComponent } from '../components/navbar'
import { SuccessModal } from '../components/successModal'
import { ErrorModal } from '../components/errorModal'

export const Manage = () => {
  const [link, setLink] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [startDate, setStartDate] = useState('')
  const [validated, setValidated] = useState(false)
  const [fetchedData, setFetchedData] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [resultData, setResultData] = useState({})
  const [showErrorModal, setShowErrorModal] = useState(false)

  useEffect(() => {
    fetchTask()
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

  const handleSubmit = (e) => {
    try {
      const form = e.currentTarget
      if (form.checkValidity() === false) {
        e.preventDefault()
        e.stopPropagation()
      } else {
        e.preventDefault()
        const data = {
          title: title,
          description: description,
          imageUrl: imageUrl,
          startDate: startDate,
          link: link,
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
      }
      setValidated(true)
    } catch (err) {
      setShowErrorModal(true)
      return
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
          <Col xs={8}>
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
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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

                <Button variant="primary" type="submit" disabled={!fetchedData}>
                  Submit
                </Button>
              </Form>
            </div>
          </Col>

          <Col xs={4}>
            <h2>Statistics</h2>
            <p>Some statistics go here...</p>
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
