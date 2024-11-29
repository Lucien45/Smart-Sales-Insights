import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, Modal, Form, Nav } from 'react-bootstrap';
import { User, Users, PlusCircle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearError, getProfileUser } from '../../redux/authSlice';
const Parametres: React.FC = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector((state: RootState) => state.auth);
    const [showModal, setShowModal] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        role: '',
    });
    const [selectedMenu, setSelectedMenu] = useState('info');

    // Charger les données utilisateur depuis Redux
    useEffect(() => {
        if (!user) {
            dispatch(getProfileUser());
        } else {
            setUserInfo({
                username: user.username,
                email: user.mail,
                role: user.type || 'Utilisateur',
            });
        }
    }, [dispatch, user]);

    // Réinitialiser les erreurs si la modal est fermée
    useEffect(() => {
        if (!showModal) {
            dispatch(clearError());
        }
    }, [showModal, dispatch]);

    const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        // Ajouter l'action pour sauvegarder les modifications utilisateur via Redux
        console.log('Updated User Info:', userInfo);
        setShowModal(false);
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case 'info':
                return (
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <div className="bg-light rounded-circle p-3 d-inline-block mb-3">
                                    <User size={48} className="text-primary" />
                                </div>
                                <h2 className="fw-bold">Informations de l'utilisateur</h2>
                            </div>
                            <div>
                                <p><strong>Nom d'utilisateur:</strong> {userInfo.username}</p>
                                <p><strong>Email:</strong> {userInfo.email}</p>
                                <p><strong>Rôle:</strong> {userInfo.role}</p>
                                <Button variant="primary" onClick={() => setShowModal(true)}>
                                    Modifier les informations
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                );
            case 'add-account':
                return (
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <h2 className="fw-bold text-center">Ajouter un nouveau compte</h2>
                            {/* Formulaire d'ajout d'un nouveau compte */}
                            <Form>
                                <Form.Group controlId="newUsername" className="mb-3">
                                    <Form.Label>Nom d'utilisateur</Form.Label>
                                    <Form.Control type="text" placeholder="Entrez le nom d'utilisateur" />
                                </Form.Group>
                                <Form.Group controlId="newEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Entrez l'email" />
                                </Form.Group>
                                <Form.Group controlId="newRole" className="mb-3">
                                    <Form.Label>Rôle</Form.Label>
                                    <Form.Control as="select">
                                        <option>Utilisateur</option>
                                        <option>Admin</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="success" type="submit">
                                    Ajouter
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                );
            case 'list-users':
                return (
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <h2 className="fw-bold text-center">Liste des utilisateurs</h2>
                            {/* Liste des utilisateurs */}
                            <ul>
                                <li>John Doe - Admin</li>
                                <li>Jane Smith - Utilisateur</li>
                                <li>Mark Wilson - Admin</li>
                            </ul>
                        </Card.Body>
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <Container className="py-4">
            <Row>
                <Col md={3}>
                    <Nav className="flex-column bg-light shadow-sm rounded p-3">
                        <Nav.Link
                            onClick={() => setSelectedMenu('info')}
                            className={selectedMenu === 'info' ? 'active' : ''}
                        >
                            <User size={18} className="me-2" />
                            Informations
                        </Nav.Link>
                        {userInfo.role === 'superuser' && (
                            <>
                                <Nav.Link
                                    onClick={() => setSelectedMenu('add-account')}
                                    className={selectedMenu === 'add-account' ? 'active' : ''}
                                >
                                    <PlusCircle size={18} className="me-2" />
                                    Ajouter un compte
                                </Nav.Link>
                                <Nav.Link
                                    onClick={() => setSelectedMenu('list-users')}
                                    className={selectedMenu === 'list-users' ? 'active' : ''}
                                >
                                    <Users size={18} className="me-2" />
                                    Liste des utilisateurs
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Col>
                <Col md={9}>{renderContent()}</Col>
            </Row>

            {/* Modal pour modification des informations */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier les informations</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label>Nom d'utilisateur</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={userInfo.username}
                                onChange={handleEdit}
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleEdit}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Parametres;
