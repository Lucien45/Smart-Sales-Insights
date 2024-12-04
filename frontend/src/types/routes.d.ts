export interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: ('user' | 'superuser')[];  
}