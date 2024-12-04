import { Link} from 'react-router-dom';
import { LayoutDashboard, Settings, BarChart2, Users, TrendingUp} from 'lucide-react';
import { Nav} from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="layout-sidebar">
        <Nav className="flex-column">
        <Nav.Link as={Link} to="/admin" className="sidebar-link">
            <LayoutDashboard size={18} className="me-2" />
            Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/analyse" className="sidebar-link">
            <BarChart2 size={18} className="me-2" />
            Analyses
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/clients" className="sidebar-link">
            <Users size={18} className="me-2" />
            Gestion des Clients
        </Nav.Link>
        <Nav.Link as={Link} to="#" className="sidebar-link">
            <TrendingUp size={18} className="me-2" />
            Prévisions
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/parametre" className="sidebar-link">
            <Settings size={18} className="me-2" />
            Paramètres & Profile
        </Nav.Link>
        </Nav>
    </div>
  )
}

export default Sidebar