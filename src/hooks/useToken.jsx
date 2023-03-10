
import { useState, useEffect } from 'react';



const useToken = user => {
    const [token, setToken] = useState('')
   
    useEffect(() => {
        console.log(user)
        const email = user?.user?.email;
        
        const currentUser = { email: email }

        console.log('user information', user)
        if (email) {
            fetch(`http://localhost:5000/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                    
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken)
                    setToken(accessToken)
                })


        }

    }, [user])

    return [token];

}

export default useToken;