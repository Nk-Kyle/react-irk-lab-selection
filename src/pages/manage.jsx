import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { NavbarComponent } from '../components/navbar'
import { useState } from 'react'

export const Manage = () => {
  const [link, setLink] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [startDate, setStartDate] = useState('')
  const [validated, setValidated] = useState(false)

  const handleSubmit = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
    }

    setValidated(true)
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
                <Form.Group controlId="formTitle">
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

                <Form.Group controlId="formDescription">
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

                <Form.Group controlId="formLink">
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

                <Form.Group controlId="formImageUrl">
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

                <Form.Group controlId="formStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    placeholder="Enter start date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
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
    </div>
  )
}
