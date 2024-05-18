import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SingUpPage from './pages/SingUpPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import TransactionPage from './pages/TransactionPage'
import NotFound from './pages/NotFound'
import Header from './component/Header'
import { useQuery } from '@apollo/client'
import { GET_AUTH_USER } from './graphQl/queries/user.queries'
import {Toaster} from 'react-hot-toast'

function App() {
  const { loading, error, data } = useQuery(GET_AUTH_USER);

  if(loading)  return null;
const auth = data?.authUser ? true : false
  return (
    <>
 
    {auth && <Header/>}
    <Routes>
				<Route path='/' element={data?.authUser ? <HomePage /> : <Navigate to="/login"/>} />
				<Route path='/login' element={!data?.authUser ? <LoginPage /> : <Navigate to='/' />} />
				<Route path='/signup' element={!data?.authUser ? <SingUpPage /> : <Navigate to='/' />} />
				<Route
					path='/transaction/:id'
					element={data?.authUser ? <TransactionPage/> : <Navigate to='/login' />}
				/>	
        	<Route path='*' element={<NotFound />} /> 
			</Routes>
      <Toaster/>
      </>
  )
}

export default App
