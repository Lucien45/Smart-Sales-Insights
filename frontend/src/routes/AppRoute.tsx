import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Page404 from '../views/Page404';
import { Layout } from '../components/admin/Layout';
import Dashboard from '../views/admin/Dashboard';
import {Parametres} from '../views/admin/Parametres';
import Clients from '../views/admin/Clients';
import SalesAnalysis from '../components/SalesAnalysis';
import ProductManager from '../views/admin/Products';

interface AdminRouteProps {
    setLoading: (value: boolean) => void;
}


const AppRoute = ({ setLoading }: AdminRouteProps) => {
    
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const handleComplete = () => setLoading(false);
        const timeout = setTimeout(handleComplete, 500);
    
        return () => clearTimeout(timeout);
    }, [location, setLoading]);

    return (
        <Routes>
            {/* APP ROUTE */}
            <Route element={<Layout/>}>
                <Route index element={<Dashboard />} />
                <Route path='/parametre' element={<Parametres/>}/>
                <Route path='/clients' element={<Clients />} />
                <Route path='/analyse' element={<SalesAnalysis/>}/>
                <Route path='/products' element={<ProductManager/>}/>
            </Route>
            
            {/* ERREUR */}
            <Route path='*' element={<Page404/>} />
        </Routes>
    )
}

export default AppRoute