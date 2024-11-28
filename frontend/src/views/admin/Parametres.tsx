import { Container, Card, Row, Col } from 'react-bootstrap';
import { User } from 'lucide-react';

const Parametres: React.FC = () => {
    return (
        <Container className="py-4">
            <Row className="justify-content-center">
            <Col md={8}>
                <Card className="shadow">
                <Card.Body className="p-4">
                    <div className="text-center mb-4">
                        <div className="bg-light rounded-circle p-3 d-inline-block mb-3">
                            <User size={48} className="text-primary" />
                        </div>
                        <h2 className="fw-bold">Profile Settings</h2>
                    </div>
                </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
    )
}

export default Parametres