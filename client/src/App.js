import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import ForgetPassword from './containers/auth/ForgetPassword';
import UserDashboard from './containers/users/userDashboard';
import AdminDashboard from './containers/admin/adminDashboard';
import { useSelector } from "react-redux";


function App() {
  const {email} =useSelector(state=>state.user)
    if(email==='khatiwadadiwakar@gmail.com'){
      return <AdminScreens/>
    }else if(email!==''){
      return <UserScreens/>
    }
      return <AuthScreens/>
}
const AuthScreens = () => {
  return (
    <Routes>
    
       
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget_password" element={<ForgetPassword />} />
    </Routes>
  )
}


const UserScreens = () => {
  return (
    <Routes>
      <Route exact path="/" element={<UserDashboard />} />
    </Routes>
  )
}

const AdminScreens = () => {
  return (
    <Routes>
      <Route exact path="/" element={<AdminDashboard />} />
    </Routes>
  )
}
export default App


