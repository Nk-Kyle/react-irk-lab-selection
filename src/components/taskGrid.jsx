import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Container, Row, Col, ListGroup } from 'react-bootstrap'
import styles from './taskGrid.module.css'

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
            <div
              className={styles.card}
              onClick={() => handleTaskClick(task.id)}
            >
              <Card className="d-flex flex-column">
                <div className={styles.container}>
                  <Card.Img
                    variant="top"
                    height="150px"
                    style={{ objectFit: 'cover' }}
                    src={task.imageUrl}
                    alt="Task"
                  />
                  <div className={styles.overlay}>
                    <div className={styles.text}>Go to task</div>
                  </div>
                </div>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <h4 className="fw-bold">{task.title}</h4>
                  </ListGroup.Item>
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
                    <span className="fw-bold">Multiplier:</span>{' '}
                    {task.multiplier * 100}%
                  </ListGroup.Item>

                  {/* <ListGroup.Item>
                  <div className="d-grid gap-2">
                  <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={() => handleTaskClick(task.id)}
                  >
                  Go to Task
                  </Button>
                  </div>
                </ListGroup.Item> */}
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
                      maxHeight: '40px',
                      maxWidth: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                  <span>{task.assistant_name}</span>
                </Card.Footer>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
