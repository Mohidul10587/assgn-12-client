
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Form from './pages/Form';
import Blog from './pages/Blog';
import Login from './pages/Login';
import SignUp from './pages/SingUp';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';


function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/form' element={<Form />} />
            <Route path='/blog' element={<Blog />} />

        

            <Route path='login' element={<Login />} />
            <Route path='signUp' element={<SignUp />} />
            <Route path='resetPassword' element={<ResetPassword />} />

            <Route path='*' element={<NotFound />} />
      
          </Routes>
    </>
  )
}

export default App
