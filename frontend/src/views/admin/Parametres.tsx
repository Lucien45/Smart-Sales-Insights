import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, Modal, Form, Nav } from 'react-bootstrap';
import { Users, PlusCircle, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { clearError, getAllUser, getProfileUser, register } from '../../redux/authSlice';
import { Utils } from '../../utils/Utils';
import { FaEdit, FaTrash } from 'react-icons/fa';
const Parametres: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isLoading } = useSelector((state: RootState) => state.auth);
    const [showModal, setShowModal] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: '',
        mail: '',
        role: '',
        date_creation: '',
    });
    const [ListUser, setListUser] = useState([]);
    const [NewUser, setNewUser] = useState({
        username: '', mail:'', password: '', confirme_mdp:'', role: ''
    })
    const [selectedMenu, setSelectedMenu] = useState('info');

    const fetchUsers = async () => {
        const resultAction = await dispatch(getAllUser());
        if (getAllUser.fulfilled.match(resultAction)) {
            setListUser(resultAction.payload);
        } else {
            Utils.errorPage('Erreur lors du chargement des utilisateurs.', 'Error');
        }
    };

    useEffect(() => {
        dispatch(getProfileUser());
        setUserInfo({
            username: user?.username,
            mail: user?.mail,
            role: user?.type || 'Utilisateur',
            date_creation: user?.dateCreation,
        })
    }, [dispatch, user]);

    useEffect(() => {
        if (!showModal) {
            dispatch(clearError());
        }
    }, [showModal, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target;
        setNewUser((pevNew) => ({
            ...pevNew,
            [name]: value
        }))
    };
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        if (NewUser.password !== NewUser.confirme_mdp) {
            return;
        }

        Utils.confirmMessage(
            `Êtes-vous sûr de vouloir cree un compte pour ${NewUser.username} avec le role ${NewUser.role}`,
            async () =>{
                const data = {
                    username: NewUser.username,
                    mail: NewUser.mail,
                    password: NewUser.password,
                    role: NewUser.role
                }
                await dispatch(register(data));
            },
            () => {
                console.log("Enregistrement annuler");
            }
        );
        setNewUser({
            username:'', mail: '', password:'', confirme_mdp: '', role: ''
        })
    };

    const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };
    const handleSaveChanges = () => {
        console.log('Updated User Info:', userInfo);
        setShowModal(false);
    };


    const handleEditUser = (id: string) => {
        console.log(`Modifier l'utilisateur avec l'ID: ${id}`);
    };
    const handleDeleteUser = (id: string) => {
        console.log(`Supprimer l'utilisateur avec l'ID: ${id}`)
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
                                <p><strong>Email:</strong> {userInfo.mail}</p>
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
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="newUsername" className="mb-3">
                                    <Form.Label>Nom d'utilisateur</Form.Label>
                                    <Form.Control type="text" name='username' value={NewUser.username} onChange={handleChange} placeholder="Entrez le nom d'utilisateur" required />
                                </Form.Group>
                                <Form.Group controlId="newEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name='mail' value={NewUser.mail} onChange={handleChange} placeholder="Entrez l'email" required />
                                </Form.Group>
                                <Form.Group controlId="newPassword" className="mb-3">
                                    <Form.Label>Mot de passe</Form.Label>
                                    <Form.Control type="password" name='password' value={NewUser.password} onChange={handleChange} placeholder="Entrez le mot de passe" required />
                                </Form.Group>
                                <Form.Group controlId="comfirmeNewPassword" className="mb-3">
                                    <Form.Label>Confirmer Le mot de passe</Form.Label>
                                    <Form.Control type="password" name='confirme_mdp' value={NewUser.confirme_mdp} onChange={handleChange} placeholder="Confirmer le mot de passe" required />
                                </Form.Group>
                                <Form.Group controlId="newRole" className="mb-3">
                                    <Form.Label>Rôle</Form.Label>
                                    <Form.Select name="role" value={NewUser.role} onChange={(e) => setNewUser({ ...NewUser, role: e.target.value })}>
                                        <option value="">selectionez un role</option>
                                        <option value="superuser">superuser</option>
                                        <option value="user">user</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button variant="success" type="submit" className="w-100 mb-3" disabled={isLoading}>
                                    {isLoading ? 'Enregistrement...' : 'Ajouter'}
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
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Nom d'utilisateur</th>
                                            <th>Email</th>
                                            <th>Type</th>
                                            <th>Date de création</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {ListUser.map((utilisateur: any) => (
                                        <tr key={utilisateur.id}>
                                            <td>{utilisateur.username}</td>
                                            <td>{utilisateur.mail}</td>
                                            <td>{utilisateur.type}</td>
                                            <td>{new Date(utilisateur.date_creation).toLocaleDateString()}</td>
                                            <td className="action-icons">
                                                <FaEdit className="icon edit-icon" onClick={() => handleEditUser(utilisateur.id)} />
                                                <FaTrash className="icon delete-icon" onClick={() => handleDeleteUser(utilisateur.id)} />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                        </Card.Body>
                    </Card>
                );
            default:
                return null;
        }
    };

    useEffect(() =>{
        fetchUsers()
    }, [])

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
                            <Form.Label>Nom d'utilisateur *</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={userInfo.username}
                                onChange={handleEdit}
                            />
                        </Form.Group>
                        <Form.Group controlId="mail" className="mb-3">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control
                                type="email"
                                name="mail"
                                value={userInfo.mail}
                                onChange={handleEdit}
                            />
                        </Form.Group>
                        <Form.Group controlId="role" className="mb-3">
                            <Form.Label>Role *</Form.Label>
                            <Form.Select name="role" value={userInfo.role} onChange={(e) => setUserInfo({ ...userInfo, role: e.target.value })}>
                                <option value="">selectionez un role</option>
                                <option value="superuser">superuser</option>
                                <option value="user">user</option>
                            </Form.Select>
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
