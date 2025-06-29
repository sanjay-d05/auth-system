import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { FiLoader } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { AxiosInstance } from '@/lib/axios';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    try {
      await AxiosInstance.post('/auth/signup', data);
      toast.success('Account Created Successfully !');
      setData({});
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsSigningUp(false);
    }
  };
  console.log(data);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgba(253,242,248,255)] px-4">

      <Card className="w-full max-w-sm bg-[rgba(250,228,240,255)] shadow-lg rounded-2xl border-none text-[rgba(131,13,65,255)] ">

        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your details below to sign up for a new account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>

            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="John Doe"
                className="rounded-md border-2  border-[rgba(131,13,65,255)] placeholder:text-[rgba(131,13,65,255)]"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="you@example.com"
                className="rounded-md border-2  border-[rgba(131,13,65,255)] placeholder:text-[rgba(131,13,65,255)]"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Password</Label>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="xxxxxx"
                  className="rounded-md border-2  border-[rgba(131,13,65,255)] placeholder:text-[rgba(131,13,65,255)] "
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                {showPassword ? <IoEyeOff size={25} onClick={() => setShowPassword(false)} /> : <IoEye size={25} onClick={() => setShowPassword(true)} />}
              </div>
            </div>

            <div className='grid gap-2'>
              <Button type='submit' className={'bg-[rgba(131,13,65,255)] text-[rgba(250,228,240,255)] hover:bg-[rgba(244,47,152,255)]'}>
                {isSigningUp ? <FiLoader className='size-8 animate-spin' /> : 'SignUp'}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <p className="text-sm text-center">
            Already have an account?{' '}
            <a href="/login" className="hover:underline underline-offset-4 hover:opacity-90">
              Login
            </a>
          </p>
        </CardFooter>

      </Card>

    </div >
  );
}

export default SignUpPage;
