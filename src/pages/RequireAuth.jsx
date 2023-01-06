import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../firebase.init';


const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);

  
    let location = useLocation();


    if (loading) return <div className='flex justify-center items-center h-screen'> <p>Loading</p>
    </div>


    if (!user) {

        return <Navigate to="/logIn" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth







