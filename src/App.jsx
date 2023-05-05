import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.scss'
import { auth } from './actions/user'
import Preloader from './components/Preloader/Preloader'
import Login from './pages/Authorization/Login'
import Signup from './pages/Authorization/Signup'
import Disk from './pages/Disk/Disk'

function App() {
  const { isAuth, isLoading } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [dispatch])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <BrowserRouter>
      <div className='app'>
        {!isAuth ? (
          <Routes>
            <Route path='/sign-up' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to='/login' replace />} />
          </Routes>
        ) : (
          <>
            <Routes>
              <Route path='/' element={<Disk />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
