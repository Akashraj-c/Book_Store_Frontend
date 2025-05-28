import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './users/pages/Home'
import Auth from './pages/Auth'
import PagenotFound from './pages/PagenotFound'
import Preloader from './components/Preloader'
import { useEffect, useState } from 'react'
import AllBooks from './users/pages/AllBooks'
import Careers from './users/pages/Careers'
import Contact from './users/pages/Contact'
import Profile from './users/pages/Profile'
import AdminHome from './admin/pages/AdminHome'
import AdminBooks from './admin/pages/AdminBooks'
import AdminCareers from './admin/pages/AdminCareers'
import AdminSettings from './admin/pages/AdminSettings'
import ViewBook from './users/pages/ViewBook'
import PaymentSuccess from './users/pages/PaymentSuccess'
import PaymentError from './users/pages/PaymentError'

function App() {

  const [isloading, setIsloading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsloading(true)
    }, 1000)
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={isloading ? <Home /> : <Preloader />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/allbooks' element={<AllBooks />} />
        <Route path='/view-books/:id' element={<ViewBook />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/adminhome' element={isloading ? <AdminHome /> : <Preloader />} />
        <Route path='/admin-books' element={<AdminBooks />} />
        <Route path='/admin-careers' element={<AdminCareers />} />
        <Route path='/admin-settings' element={<AdminSettings />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-error' element={<PaymentError />} />
        <Route path='*' element={<PagenotFound />} />
      </Routes>
    </>
  )
}

export default App
