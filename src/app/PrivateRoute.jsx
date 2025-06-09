'use client';
import { useLogout } from '@/components/utils/useLogout';
import { clearAuthState, forgotPassSuccess, permanentPassSuccess, refreshTokenSuccess, signOutSuccess } from '@/Redux/features/auth/authSlice';
import { IconArrowBigRightLine, IconLock } from '@tabler/icons-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  useLogout();
  const {
    isAuthenticated,
    // token,
    isTempPass,

    signInLoading,
    signInData,
    signInError,

    // Forgot password states
    forgotPassLoading,
    forgotPassData,
    forgotPassError,

    // Permanent password states
    permPassLoading,
    permPassData,
    permPassError,

    // Reset password states
    resetPassLoading,
    resetPassData,
    resetPassError,

    // Sign out states
    signOutLoading,
    signOutError,

    // Fetch data states
    fetchDataLoading,
    fetchData,
    fetchDataError,


    token,
    refreshToken,
    tokenExpiry,
    refreshTokenExpiry,

  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const publicPages = ['/signIn', '/signUp', '/forgotPassword', '/resetPassword'];
  const isPublicPage = publicPages.includes(pathname);
  const isSetPasswordPage = pathname === '/setPermanentPassword';

  // Sign in Page 
  useEffect(() => {
    if (signInLoading) {
      toast.loading('Logging in...', { id: 'signIn-toast' });
    } else {
      toast.dismiss('signIn-toast');
      if (signInData) {
        toast.success('Login successful!', { id: 'signIn-success' });
        router.push('/');
      } else if (signInError) {
        toast.error(signInError.message || 'Login failed. Please check your credentials.', {
          id: 'signIn-error'
        });
      }
      dispatch(clearAuthState(null));
    }
  }, [signInData, signInLoading, signInError, dispatch]);

  // Forgot Password Page
  useEffect(() => {
    if (forgotPassLoading) {
      toast.loading('Sending Email...', { id: 'forgot-toast' });
    } else {
      toast.dismiss('forgot-toast');
      if (forgotPassData) {
        toast.success('Email sent successfully! Please check your email for the temporary password.', { id: 'forgot-success' });
        router.push('/signIn');
      } else if (forgotPassError) {
        toast.error(forgotPassError.message || 'Failed to send temporary password email. Please try again.', {
          id: 'forgot-error'
        });
      }
      dispatch(forgotPassSuccess(null));
    }
  }, [forgotPassData, forgotPassLoading, forgotPassError, dispatch]);

  // Permanent Password Page
  useEffect(() => {
    if (permPassLoading) {
      toast.loading('Setting permanent password....', { id: 'forgot-toast' });
    } else {
      toast.dismiss('forgot-toast');
      if (permPassData) {
        toast.success('Permanent password set successfully!', { id: 'forgot-success' });
        router.push('/');
      } else if (permPassError) {
        toast.error(permPassError.message || 'Failed to set permanent password. Please try again.', {
          id: 'forgot-error'
        });
      }
      dispatch(permanentPassSuccess(null));
    }
  }, [permPassData, permPassLoading, permPassError, dispatch]);

  // Handle route protection
  useEffect(() => {
    // Case 0: Handle logout case (no authentication)
    if (!isAuthenticated && !isPublicPage) {
      // toast.error('Please sign in to continue', { id: 'auth-required' });
      toast.success("You've been successfully logged out. See you soon!", { id: 'auth-required' })
      router.replace('/signIn');
      return;
    }

    // Case 1: Set Password Page (special case)
    if (isSetPasswordPage) {
      if (!isAuthenticated) {
        toast.error('Please sign in first', { id: 'auth-required' });
        router.replace('/signIn');
      } else if (isAuthenticated && !isTempPass) {
        router.replace('/');
      }
      return;
    }

    // Case 2: Authenticated user trying to access public pages
    if (isAuthenticated && isPublicPage) {
      if (isTempPass) {
        toast('You have temporary password. Please set permanent password', {
          id: 'temp-pass-notice',
          icon: <IconArrowBigRightLine />,
          duration: 5000,
        });
      } else {
        setTimeout(() => {
          toast('Redirecting To Dashboard...', {
            id: 'redirect-notice',
            icon: <IconArrowBigRightLine />,
            duration: 1000,
          });
        }, 2000);
      }
      router.replace(isTempPass ? '/setPermanentPassword' : '/');
    }
  }, [isAuthenticated, isTempPass, isPublicPage, isSetPasswordPage, router, dispatch]);

  const shouldRender =
    // Public route conditions
    (!isAuthenticated && isPublicPage) ||
    (isAuthenticated && isTempPass && isSetPasswordPage) ||
    // Private route condition
    (isAuthenticated && !isTempPass && !isPublicPage && !isSetPasswordPage);

  return shouldRender ? children : null;
  // return children;
};

export default PrivateRoute;