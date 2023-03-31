import { getAuth } from "firebase/auth";
import auth from '../pages/Authentication/firebase.init';




function UserList() {
   

    return (
        <div>
            <h2>Registered users</h2>
            <ul>

            </ul>
        </div>
    );
}

export default UserList;
