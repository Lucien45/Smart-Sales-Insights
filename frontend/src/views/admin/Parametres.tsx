/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, Form, Nav } from 'react-bootstrap';
import { Users, PlusCircle, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { clearError, getAllUser, getProfileUser, register } from '../../redux/authSlice';
import { Utils } from '../../utils/Utils';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { UpdateUserProps } from '../../types/Utilisateur';
import axios from 'axios';

export const Parametres: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const [userInfo, setUserInfo] = useState({
        id: 0,
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

    const [showUpdate, setShowUpdate] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number>(null);

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
            id: user?.id,
            username: user?.username,
            mail: user?.mail,
            role: user?.type || 'Utilisateur',
            date_creation: user?.dateCreation,
        })
    }, [dispatch, user]);

    useEffect(() => {
        if (!showUpdate) {
            dispatch(clearError());
        }
    }, [dispatch]);

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
                fetchUsers();
            },
            () => {
                console.log("Enregistrement annuler");
            }
        );
        setNewUser({
            username:'', mail: '', password:'', confirme_mdp: '', role: ''
        })
    };

    const handleEditUser = (id: number) => {
        setSelectedUserId(id);
        setShowUpdate(true);
    };

    const handleDeleteUser = (id: string) => {
        Utils.confirmMessage(
            `Êtes-vous sûr de vouloir supprimer cet utilisateur ?`, 
            async () => {
                try {
                    await axios.delete(`http://localhost:3000/users/delete/${id}`);
                    Utils.success('utilisateur supprimée avec succès', 'success');
                    fetchUsers();
                } catch (error) {
                    Utils.errorPage(`Erreur lors de la suppression de la responsabilité: ${error}`, 'error');
                }
            },
            () => { 
              console.log('suppression annuler .');
            }
        );
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
                                <Button variant="primary" onClick={() => handleEditUser(userInfo.id)}>
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
                                <Button variant="success" type="submit" className="w-100 mb-3">
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
            {showUpdate && <UpdateUser id={selectedUserId} onClose={() => { setShowUpdate(false); fetchUsers(); }} />}
        </Container>
    );
};


export const UpdateUser:React.FC<UpdateUserProps> = ({ id, onClose }) => {
    const [UserData, setUserData] = useState({ 
        username: '', mail: '', role: '',  new_password:'', confirme_mdp: ''
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [initialData, setInitialData] = useState({
        username: '',
        mail: '',
        role: '',
    });

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

        // Compare les valeurs pour identifier les champs modifiés
        const updatedFields: Partial<typeof UserData> = {};
        Object.keys(UserData).forEach((key) => {
            if (UserData[key as keyof typeof UserData] !== initialData[key as keyof typeof initialData] && key !== 'new_password' && key !== 'confirme_mdp') {
                updatedFields[key as keyof typeof UserData] = UserData[key as keyof typeof UserData];
            }
        });

        // Inclure le mot de passe s'il est renseigné
        if (UserData.new_password) {
            if (UserData.new_password === UserData.confirme_mdp) {
                updatedFields.new_password = UserData.new_password;
            } else {
                Utils.errorPage("Les mots de passe ne correspondent pas", 'error');
                return;
            }
        }

        Utils.confirmMessage(
        `Êtes-vous sûr de vouloir mettre à jour l'utilisateur ${UserData.username}  avec ces informations [ ${UserData.mail}, ${UserData.role} ]?`,
            async () => {
                try {
                    await axios.put(`http://localhost:3000/users/update/${id}`, updatedFields);
                    Utils.success(" mis à jour avec succès!",'succcess');
                    onClose();
                } catch (error: any) {
                    Utils.errorPage(error.response?.data?.detail || 'Une erreur s\'est produite','error');
                }
            },
            () => { 
                console.log('Mise à jour annulée.');
            }
        );
    }    

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`);
                setUserData({
                    username: response.data.username,
                    mail: response.data.mail,
                    role: response.data.type,
                });
              } catch (error: any) {
                console.log(error.response?.data?.message || 'Failed to fetch profile');
                
            }
        }
        fetchUser();
    }, [id]);
    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Modifier les informations</h5>
                    <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nom d'utilisateur</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={UserData.username}
                        onChange={(e) => setUserData({ ...UserData, username: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                        type="email" 
                        className="form-control" 
                        value={UserData.mail}
                        onChange={(e) => setUserData({ ...UserData, mail: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select 
                            className="form-control" 
                            value={UserData.role} 
                            onChange={(e) => setUserData({ ...UserData, role: e.target.value })} 
                        >
                            <option value="">Sélectionnez un rôle</option>
                            <option value="superuser">Superuser</option>
                            <option value="user">Utilisateur</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nouveau Mot de passe</label>
                        <input 
                        type="password" 
                        className="form-control" 
                        value={UserData.new_password}
                        onChange={(e) => setUserData({ ...UserData, new_password: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nouveau Mot de passe</label>
                        <input 
                        type="password" 
                        className="form-control" 
                        value={UserData.confirme_mdp}
                        onChange={(e) => setUserData({ ...UserData, confirme_mdp: e.target.value })}
                        />
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Enregistrer</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}
