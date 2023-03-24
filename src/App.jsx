
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Form from './pages/Dashboard/Form';
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
import AllUser from './pages/Dashboard/AllUser';
import ManageAllOrders from './pages/Dashboard/ManageAllOrders';
import ManageProducts from './pages/Dashboard/ManageProducts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Portfolio from './pages/Portfolio';



function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/' element={<Home />} />
        <Route path='/form' element={<Form />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/users' element={<Users />} />
        <Route path='/buy/:id' element={<RequireAuth><BuyNow /></RequireAuth>} />
        <Route path='dashboard' element={<RequireAuth><Dashboard /> </RequireAuth>}>
          <Route index='profile' element={<Profile></Profile>}></Route>
          <Route path='MyOrders' element={<MyOrders></MyOrders>}></Route>
          <Route path='MyReview' element={<MyReview></MyReview>}></Route>
          <Route path='allUser' element={<AllUser></AllUser>}></Route>
          <Route path='form' element={<Form></Form>}></Route>
          <Route path='manageAllOrder' element={<ManageAllOrders></ManageAllOrders>}></Route>
          <Route path='manageProducts' element={<ManageProducts></ManageProducts>}></Route>

        </Route>
        <Route path='/payment/:id' element={<RequireAuth><Payment /></RequireAuth>} />
        <Route path='login' element={<Login />} />
        <Route path='signUp' element={<SignUp />} />
        <Route path='resetPassword' element={<ResetPassword />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default App
