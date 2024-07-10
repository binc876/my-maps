import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Registrasi from './pages/regist/Registrasi'
import LoginAlumni from './pages/LoginAlumni'
import LoginAdmin from './pages/admin/LoginAdmin'
import ForgotPassword from './pages/forgotpassword/ForgotPassword'
import VerifPassword from './pages/forgotpassword/VerifPassword'
import Dashboard from './pages/Dashboard'
import DashboardAdmin from './pages/admin/DashboardAdmin'
import ProfileAlumni from './pages/ProfileAlumni'
import ProfileAdmin from './pages/admin/ProfileAdmin'
import ListAlumni from './pages/admin/ListAlumni'
import { Profile as UserProfile } from './services/API/User.jsx'

function App() {
  return (
    <Router basename='/'>
      <Routes>
        <Route path='/' Component={LandingPage}/>
        <Route path='/registrasi' Component={Registrasi}/>
        <Route path='/login-alumni' Component={LoginAlumni}/>
        <Route path='/login-admin' Component={LoginAdmin}/>
        <Route path='/forgot-password' Component={ForgotPassword}/>
        <Route path='/verif-password' Component={VerifPassword}/>
        <Route element={<UserProfile/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
        <Route path='/profile-alumni' Component={ProfileAlumni}/>
        <Route path='/dashboard-admin' Component={DashboardAdmin}/>
        <Route path='/profile-admin' Component={ProfileAdmin}/>
        <Route path='/list-alumni' Component={ListAlumni}/>
      </Routes>
    </Router>
  )
}

export default App
