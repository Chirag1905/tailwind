'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconBrandGoogleFilled, IconEye, IconEyeOff } from '@tabler/icons-react';
import { fetchDataRequest, signInRequest } from '@/Redux/features/auth/authSlice';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { fetchCustomizationRequest } from '@/Redux/features/customization/customizationSlice';

const Signin = () => {
    const dispatch = useDispatch();
    const {
        signInLoading,
        signInData,
        signInError,
        fetchDataLoading,
        fetchData,
        fetchDataError
    } = useSelector((state) => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    });
    const [clientParams, setClientParams] = useState({
        clientId: "",
        realmName: ""
    });

    useEffect(() => {
        dispatch(fetchDataRequest());
    }, []);

    // Extract realm name from subdomain and find matching client
    useEffect(() => {
        if (typeof window !== 'undefined' && fetchData?.realm_client_mappings?.length > 0) {
            const currentOrigin = window.location.origin;

            // Skip if localhost (development)
            if (currentOrigin.includes("localhost")) {
                setClientParams({ clientId: "000001-fe-client", realmName: "000001" });
                return;
            }

            const matchedClient = fetchData?.realm_client_mappings?.find(
                client => client?.allowed_origins === currentOrigin
            );

            if (matchedClient) {
                setClientParams({
                    clientId: matchedClient?.client_id,
                    realmName: matchedClient?.realm_name
                });
            } else {
                console.error("No allowed_origins match for:", currentOrigin);
            }
        }
    }, [fetchData]);

    useEffect(() => {
        // Only dispatch if clientParams.realmName is available
        if (clientParams?.realmName) {
            dispatch(fetchCustomizationRequest(clientParams.realmName));
        }
    }, [dispatch, clientParams?.realmName]);

    // Load saved credentials if "Remember me" was checked previously
    useEffect(() => {
        const rememberedCredentials = Cookies.get('rememberedCredentials');
        const rememberMeStatus = Cookies.get('rememberMe') === 'true';

        if (rememberMeStatus && rememberedCredentials) {
            try {
                const credentials = JSON.parse(rememberedCredentials);
                setUsername(credentials.username);
                setPassword(credentials.password);
                setRememberMe(true);
            } catch (error) {
                console.error('Failed to parse credentials:', error);
                // Clear invalid cookies
                Cookies.remove('rememberedCredentials');
                Cookies.remove('rememberMe');
            }
        }
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            email: '',
            password: ''
        };

        if (!username.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        }
        //  else if (!/\S+@\S+\.\S+/.test(username)) {
        //     newErrors.email = 'Email is invalid';
        //     valid = false;
        // }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Set cookies if "Remember me" is checked
        if (rememberMe) {
            const credentials = {
                username,
                password
            };

            Cookies.set('rememberedCredentials', JSON.stringify(credentials), {
                expires: 30, // Expires in 30 days
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/'
            });

            Cookies.set('rememberMe', 'true', {
                expires: 30,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/'
            });
        } else {
            // Remove cookies if "Remember me" is unchecked
            Cookies.remove('rememberedCredentials', { path: '/' });
            Cookies.remove('rememberMe', { path: '/' });
        }

        dispatch(signInRequest({
            username,
            password,
            // clientId: "000001-fe-client",
            // realmName: "000001"
            clientId: clientParams.clientId,
            realmName: clientParams.realmName
        }));
    };

    return (
        <>
            <div className='mb-6 sm:mb-8 text-center'>
                <div className='text-[30px]/[36px] sm:text-[40px]/[48px] font-medium mb-2'>
                    Sign In
                </div>
                <span className='text-font-color-100 inline-block'>
                    Free access to our dashboard.
                </span>
            </div>
            <div className='mb-4 sm:mb-6 text-center'>
                <Link href="#" prefetch={true} className='btn btn-white !border-border-color w-full sm:w-auto justify-center'>
                    <IconBrandGoogleFilled className='fill-font-color-100' />
                    <span>Sign in with Google</span>
                </Link>
                <div className='mt-6 flex items-center'>
                    <span className='inline-block h-[1px] flex-1 bg-font-color-400'></span>
                    <span className='px-4 sm:px-[30px] text-font-color-400'>OR</span>
                    <span className='inline-block h-[1px] flex-1 bg-font-color-400'></span>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className='form-control mb-4 sm:mb-[15px]'>
                        <label htmlFor='email' className='form-label'>
                            Email
                        </label>
                        <input
                            type='text'
                            id='email'
                            placeholder='name@example.com'
                            className={`form-input ${formErrors.email ? 'border-red-500' : ''}`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {formErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                        )}
                    </div>
                    <div className='form-control mb-4 sm:mb-[15px]'>
                        <label htmlFor='password' className='form-label'>
                            Password
                        </label>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                placeholder='Enter the password'
                                className={`form-input !pr-12 ${formErrors.password ? 'border-red-500' : ''}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className='absolute top-[50%] translate-y-[-50%] right-3 text-font-color-100'
                            >
                                {showPassword ? <IconEyeOff /> : <IconEye />}
                            </button>
                        </div>
                        {formErrors.password && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                        )}
                    </div>
                    <div className='flex flex-wrap items-center justify-between gap-2 my-4 sm:my-2'>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                className="form-check-input"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="rememberMe">
                                Remember me
                            </label>
                        </div>
                        <Link href="/forgotPassword" prefetch={false} className='text-primary text-[14px]/[20px] sm:text-[16px]/[24px]'>
                            Forgot Password?
                        </Link>
                    </div>
                    {signInError && <p className="error mb-4 text-red-500">{'The email or password you entered is incorrect. Please try again!'}</p>}
                    <button
                        type="submit"
                        className='btn btn-primary large w-full uppercase'
                        disabled={signInLoading}
                    >
                        {signInLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                    <div className='text-center mt-6 sm:mt-[10px] text-font-color-100'>
                        <p>Don&apos;t have an account yet?</p>
                        <Link href="/signUp" prefetch={false} className='text-primary'>
                            Sign up here
                        </Link>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Signin;