import { AxiosInstance } from '@/lib/axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import { setUser } from '@/redux/authSlice';

function Navbar() {

  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await AxiosInstance.post('/auth/logout');
      dispatch(setUser(null));
      toast.success('Logged Out successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <header className={`flex items-center py-4 px-5 fixed top-0 w-full ${user ? 'justify-between' : 'justify-center'}`}>

      <h2 className='text-[rgba(131,13,65,255)] text-2xl font-bold hover:underline hover:underline-offset-4'>
        Auth System
      </h2>

      {user ? (
        <Button className='bg-[rgba(131,13,65,255)] text-[rgba(250,228,240,255)] hover:bg-[rgba(244,47,152,255)]' onClick={() => logout()}>
          Logout
        </Button>
      ) : null}

    </header>
  )
}

export default Navbar