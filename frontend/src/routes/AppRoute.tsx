import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Page404 from '../views/Page404';

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
            <Route element=''>
                
            </Route>
            {/* ERREUR */}
            <Route path='*' element={<Page404/>} />
        </Routes>
    )
}

export default AppRoute