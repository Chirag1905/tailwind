'use client';
import React, { useEffect, useState } from 'react'
import { auth_forgot_password } from '@/assets/images/'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRequest, forgotPassRequest } from '@/Redux/features/auth/authSlice';
import Image from 'next/image';
import { fetchCustomizationRequest } from '@/Redux/features/customization/customizationSlice';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const {
        forgotPassData,
        forgotPassLoading,
        forgotPassError,
        fetchData,
        fetchDataLoading,
        fetchDataError,
    } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
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

            const matchedClient = fetchData.realm_client_mappings.find(
                client => client.allowed_origins === currentOrigin
            );

            if (matchedClient) {
                setClientParams({
                    clientId: matchedClient.client_id,
                    realmName: matchedClient.realm_name
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(forgotPassRequest({
            email: email,
            clientId: clientParams.clientId,
            realmName: clientParams.realmName
        }));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-center sm:mb-6 mb-4'>
                    <Image
                        src={auth_forgot_password}
                        alt='forgot password'
                        width={240}
                        height={178}
                    />
                </div>
                <p className='sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2 text-center'>
                    Forgot password?
                </p>
                <p className='text-center sm:mb-10 mb-6 text-font-color-100'>
                    Enter the email address you used when you joined and we'll send you instructions to reset your password.
                </p>
                <div className='form-control mb-[20px]'>
                    <label htmlFor='email' className='form-label'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        placeholder='name@example.com'
                        className='form-input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className='btn btn-secondary large w-full uppercase'
                    disabled={forgotPassLoading}
                >
                    {forgotPassLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            <div className='text-center sm:mt-[30px] mt-6'>
                <Link href="/signIn" prefetch={false} className='text-primary'>
                    Back to Sign in
                </Link>
            </div>
        </>
    )
}

export default ForgotPassword;
