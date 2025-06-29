import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AxiosInstance } from '@/lib/axios';
import { setUser } from '@/redux/authSlice';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { FiLoader } from 'react-icons/fi';

function HomePage() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConformNewPassword, setShowConformNewPassword] = useState(false);
  const [data, setData] = useState({
    password: '',
    newPassword: '',
    conformNewPassword: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // ✅ Dialog state

  const handleLogout = async () => {
    try {
      await AxiosInstance.post('/auth/logout');
      dispatch(setUser(null));
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await AxiosInstance.put(`/auth/update-password/${user?.id}`, data);
      toast.success('Password updated successfully!');
      setDialogOpen(false); // ✅ Close modal
      setData({ password: '', newPassword: '', conformNewPassword: '' }); // Optional reset
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen pt-14 flex justify-center items-center bg-[rgba(253,242,248,255)] text-[rgba(131,13,65,255)] px-4">
      <Card className="w-full max-w-md bg-[rgba(250,228,240,255)] shadow-md rounded-2xl border-none">
        <CardHeader className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-[rgba(131,13,65,255)] text-[rgba(250,228,240,255)] flex items-center justify-center text-2xl font-bold">
            {user?.name?.charAt(0)}
          </div>
          <CardTitle>{user?.name}</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-1">
            <p className="font-medium">Joined On:</p>
            <p className="text-sm">
              {new Date(user?.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Button
              className="w-full bg-[rgba(131,13,65,255)] text-[rgba(250,228,240,255)] hover:bg-[rgba(244,47,152,255)]"
              onClick={() => setDialogOpen(true)}
              type="button"
            >
              Update Password
            </Button>

            <DialogContent className="sm:max-w-[425px] bg-[rgba(250,228,240,255)] text-[rgba(131,13,65,255)]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your password here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>

              {/* ✅ Form moved inside DialogContent */}
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                {/* Current Password */}
                <div className="grid gap-2">
                  <Label>Password</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Current Password"
                      className="rounded-md border-2 border-[rgba(131,13,65,255)] placeholder:text-[rgba(131,13,65,255)]"
                      value={data.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                    />
                    {showPassword ? (
                      <IoEyeOff size={25} onClick={() => setShowPassword(false)} />
                    ) : (
                      <IoEye size={25} onClick={() => setShowPassword(true)} />
                    )}
                  </div>
                </div>

                {/* New Password */}
                <div className="grid gap-2">
                  <Label>New Password</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="New Password"
                      className="rounded-md border-2 border-[rgba(131,13,65,255)] placeholder:text-[rgba(131,13,65,255)]"
                      value={data.newPassword}
                      onChange={(e) =>
                        setData({ ...data, newPassword: e.target.value })
                      }
                    />
                    {showNewPassword ? (
                      <IoEyeOff size={25} onClick={() => setShowNewPassword(false)} />
                    ) : (
                      <IoEye size={25} onClick={() => setShowNewPassword(true)} />
                    )}
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="grid gap-2">
                  <Label>Confirm New Password</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type={showConformNewPassword ? 'text' : 'password'}
                      placeholder="Confirm New Password"
                      className="rounded-md border-2 border-[rgba(131,13,65,255)] placeholder:text-[rgba(131,13,65,255)]"
                      value={data.conformNewPassword}
                      onChange={(e) =>
                        setData({
                          ...data,
                          conformNewPassword: e.target.value,
                        })
                      }
                    />
                    {showConformNewPassword ? (
                      <IoEyeOff size={25} onClick={() => setShowConformNewPassword(false)} />
                    ) : (
                      <IoEye size={25} onClick={() => setShowConformNewPassword(true)} />
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <DialogFooter className="pt-2">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    className="border-[rgba(131,13,65,255)] bg-[rgba(131,13,65,255)] text-white"
                    type="submit"
                  >
                    {isUpdating ? (
                      <FiLoader className="size-5 animate-spin" />
                    ) : (
                      'Save changes'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>


          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full border-[rgba(131,13,65,255)] text-[rgba(131,13,65,255)]"
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default HomePage;
