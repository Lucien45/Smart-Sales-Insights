import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Page404 from '../views/Page404';
import { Layout } from '../components/admin/Layout';
import Dashboard from '../views/admin/Dashboard';
import {Parametres} from '../views/admin/Parametres';
import Clients from '../views/admin/Clients';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface AdminRouteProps {
    setLoading: (value: boolean) => void;
}


const AppRoute = ({ setLoading }: AdminRouteProps) => {
    
    const location = useLocation();
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        setLoading(true);
        const handleComplete = () => setLoading(false);
        const timeout = setTimeout(handleComplete, 500);
    
        return () => clearTimeout(timeout);
    }, [location, setLoading]);

    if (!user) {
        return <Page404 />;
    }

    return (
        <Routes>
            {/* APP ROUTE */}
            <Route element={<Layout/>}>
                <Route index element={<Dashboard />} />
                <Route path='/parametre' element={<Parametres/>}/>
                <Route path='/clients' element={<Clients />} />
            </Route>
            {/* <Route element={<Layout />}>
                <Route
                    index
                    element={
                        <ProtectedRoute allowedRoles={['superuser']}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/parametre"
                    element={
                        <ProtectedRoute allowedRoles={['superuser']}>
                            <Parametres />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/clients"
                    element={
                        <ProtectedRoute allowedRoles={['superuser']}>
                            <Clients />
                        </ProtectedRoute>
                    }
                />
            </Route> */}
            {/* ERREUR */}
            <Route path='*' element={<Page404/>} />
        </Routes>
    )
}

export default AppRoute