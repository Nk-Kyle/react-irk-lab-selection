import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Image,
} from 'react-bootstrap'

export const ContactGrid = ({ contacts }) => {
  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={5} xl={5} className="g-4">
        {contacts.map((contact, index) => (
          <Col key={index}>
            <Card className="h-100 d-flex flex-column">
              <Card.Img
                variant="top"
                src={contact.picture?.replace('s96-c', 's200-c')}
                alt="Contact"
              />
              <Card.Body className="flex-grow-1">
                <Card.Title>{contact.name ? contact.name : ''}</Card.Title>
                {contact.email}
              </Card.Body>
              <ListGroup className="list-group-flush">
                {contact.lineLink && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Link
                        to={contact.lineLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline-success" size="lg">
                          <Image
                            src="/line.png"
                            alt="Line"
                            style={{ maxHeight: '3vh' }}
                          />
                          {' ' + contact.lineId}
                        </Button>
                      </Link>
                    </div>
                  </ListGroup.Item>
                )}
                {contact.linkdInHandle && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Link
                        to={contact.linkdInLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline-info" size="lg">
                          <Image
                            src="/linkdin.png"
                            alt="LinkdIn"
                            style={{ maxHeight: '3vh' }}
                          />
                          {' ' + contact.linkdInHandle}
                        </Button>
                      </Link>
                    </div>
                  </ListGroup.Item>
                )}
                {contact.instagram && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Link
                        to={'https://www.instagram.com/' + contact.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline-warning" size="lg">
                          <Image
                            src="/instagram.png"
                            alt="Instagram"
                            style={{ maxHeight: '3vh' }}
                          />
                          {' ' + contact.instagram}
                        </Button>
                      </Link>
                    </div>
                  </ListGroup.Item>
                )}
                {/* <ListGroup.Item>
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
                </ListGroup.Item> */}
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
