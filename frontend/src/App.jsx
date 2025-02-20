
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import Signup from './pages/signupPage'
import LoginPage from './pages/loginPage'
import { Toaster } from "react-hot-toast";
import { useAuthStore } from './store/userAuth'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import VerifyUser from './pages/verifyUser';
import Footer from "./components/footer"
import WatchPage from './pages/watchPage';
import SearchPage from './pages/SearchPage';
import HistoryPage from './pages/HistoryPage';





function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore()
  // console.log("auth user", user)

  useEffect(() => {
    authCheck()

  }, [authCheck])

  if (isCheckingAuth) {

    return (
      <div className='h-screen'>
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    )
  }


  return (
    <>
      
      <Routes>
        <Route path='/' element={<VerifyUser />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to={"/"} />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
        <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
        <Route path='/history' element={user ? <HistoryPage /> : <Navigate to={"/login"} />} />
      </Routes>

      {/* <Footer /> */}
      <Toaster />
    </>
  )
}

export default App
