import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import auth from './firebase.init';


const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);

  
    let location = useLocation();


    if (loading)  return <div className=' flex justify-center font-bold text-3xl pt-20 min-h-screen'><Spinner /></div>




    if (!user) {

        return <Navigate to="/logIn" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth







