import { useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link} from 'react-router-dom';
import { LogOut} from 'lucide-react';
import { AppDispatch, RootState } from '../../redux/store';
import { getProfileUser, logout } from '../../redux/authSlice';
import { Utils } from '../../utils/Utils';

const NavBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user, token } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        Utils.confirmMessage(
            'Êtes-vous sûr de vouloir déconnecter ?',
            async () => {
                await dispatch(logout());
                navigate('/');
            },
            () => {
                console.log('deconnection annulée par l\'utilisateur.');
            }
        );
    };

    useEffect(() => {
        if (token) {
            dispatch(getProfileUser());
        } else {
        console.log('Utilisateur non connecté ou token absent.');
        
        }
  }, [dispatch, token]);
    return (
        <Navbar bg="white" expand="lg" className="shadow-sm layout-navbar">
            <Container fluid>
                <Navbar.Brand as={Link} to="/admin" className="fw-bold">
                SMART SALES
                </Navbar.Brand>
                <Nav className="ms-auto d-flex align-items-center">
                <span className="me-3">{user?.username}</span>
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleLogout}
                    className="d-flex align-items-center"
                >
                    <LogOut size={18} className="me-1" />
                    Logout
                </Button>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar