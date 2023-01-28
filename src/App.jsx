
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Form from './pages/Form';
import Blog from './pages/Blog';
import Login from './pages/Authentication/Login';
import SignUp from './pages/Authentication/SingUp';
import ResetPassword from './pages/Authentication/ResetPassword';
import NotFound from './pages/NotFound';
import Users from './pages/Users';
import BuyNow from './pages/BuyNow';
import RequireAuth from './pages/Authentication/RequireAuth';
import Dashboard from './pages/Dashboard/Dashboard';
import Payment from './pages/Payment';
import Profile from './pages/Dashboard/Profile';
import MyOrders from './pages/Dashboard/MyOrders';
import MyReview from './pages/Dashboard/MyReview';




function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/form' element={<Form />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/users' element={<Users />} />
            <Route path='/buy/:id' element={<RequireAuth><BuyNow /></RequireAuth>} />
            <Route path='dashboard' element={<RequireAuth><Dashboard /> </RequireAuth>}>
              <Route index='profile' element={<Profile></Profile>}></Route>
              <Route path='MyOrders' element={<MyOrders></MyOrders>}></Route>
              <Route path='MyReview' element={<MyReview></MyReview>}></Route>

              {/* <Route path='AllOrders' element={<RequireAdmin><Orders /></RequireAdmin>}></Route>
              <Route path='form' element={<RequireAdmin><Form /></RequireAdmin>}></Route>
              <Route path='allUser' element={<RequireAdmin><AllUser /></RequireAdmin>}></Route> */}
            </Route>
            <Route path='/payment' element={<RequireAuth><Payment /></RequireAuth>} />
            <Route path='login' element={<Login />} />
            <Route path='signUp' element={<SignUp />} />
            <Route path='resetPassword' element={<ResetPassword />} />
            <Route path='*' element={<NotFound />} />
      
          </Routes>
          <Footer />
    </>
  )
}

export default App
