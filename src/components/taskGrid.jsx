import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Container, Row, Col, ListGroup, Button } from 'react-bootstrap'

export const TaskGrid = ({ tasks }) => {
  const navigate = useNavigate()

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`)
  }

  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4">
        {tasks.map((task, index) => (
          <Col key={index}>
            <Card className="h-100 d-flex flex-column">
              <Card.Img variant="top" src={task.imageUrl} alt="Task" />
              <Card.Body className="flex-grow-1">
                <Card.Title>{task.title}</Card.Title>
                <div style={{ whiteSpace: 'pre-wrap' }}>{task.description}</div>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <span className="fw-bold">Start Date:</span>{' '}
                  {new Date(task.startDate).toLocaleString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">Max Score:</span> {task.score}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">Submissions:</span>{' '}
                  {task.submissionCount}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid gap-2">
                    <Button
                      variant="outline-primary"
                      size="lg"
                      onClick={() => handleTaskClick(task.id)}
                    >
                      Go to Task
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>

              <Card.Footer
                className="d-flex align-items-center"
                style={{ height: '10%' }}
              >
                <img
                  src={task.assistant_picture}
                  alt="Assistant"
                  className="rounded-circle img-fluid me-2"
                  style={{
                    maxHeight: '100%',
                    maxWidth: 'auto',
                    objectFit: 'contain',
                  }}
                />
                <span>{task.assistant_name}</span>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
