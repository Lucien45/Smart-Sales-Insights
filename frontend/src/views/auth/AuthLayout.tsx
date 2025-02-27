import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap';

const AuthLayout = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Card className="shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
            <Card.Body className="p-5">
                <Outlet/>
            </Card.Body>
        </Card>
    </Container>
  )
}

export default AuthLayout