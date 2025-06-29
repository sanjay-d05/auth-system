import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
import Navbar from './components/custom/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { ToastContainer } from 'react-toastify';

function App() {

  const {user} = useSelector(store => store.auth);

  console.log(user);

  return (
    <>
    <ToastContainer position='top-center'/>
    <Navbar />
    <Routes>
      <Route path='/' element={user ? <HomePage /> : <Navigate to={'/login'} />} />
      <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={'/'} />} />
      <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
    </Routes>
    </>
  )
}

export default App