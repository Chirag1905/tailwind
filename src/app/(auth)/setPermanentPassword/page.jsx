'use client';
import React, { useEffect, useState } from 'react'
import { auth_forgot_password } from '@/assets/images'
import Link from 'next/link';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { backToSignIn, fetchDataRequest, permanentPassRequest } from '@/Redux/features/auth/authSlice';
import Image from 'next/image';

export default function SetPermanentPassword() {
    const dispatch = useDispatch();
    const {
        setPermPassData,
        fetchData,
        token,
        loading,
        error,
    } = useSelector((state) => state.auth);
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
                setClientParams({ clientId: "000017-fe-client", realmName: "000017" });
                return;
            }

            const matchedClient = fetchData.realm_client_mappings.find(
                client => client.allowed_origins === currentOrigin
            );

            if (matchedClient) {
                setClientParams({
                    // clientId: matchedClient.client_id,
                    // realmName: matchedClient.realm_name
                    clientId: "admin-cli",
                    realmName: "master"
                });
            } else {
                console.error("No allowed_origins match for:", currentOrigin);
            }
        }
    }, [fetchData]);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleInputClick = () => {
        if (!password || password.trim().length === 0) {
            const newPassword = generateRandomPassword();
            setPassword(newPassword);
        }
    };

    const generateRandomPassword = () => {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const specialChars = "!@#$%&*";

        // Ensure at least one of each required character
        let password =
            uppercase[Math.floor(Math.random() * uppercase.length)] + // At least one uppercase
            specialChars[Math.floor(Math.random() * specialChars.length)] + // At least one special character
            numbers[Math.floor(Math.random() * numbers.length)] + // At least one number
            lowercase[Math.floor(Math.random() * lowercase.length)]; // At least one lowercase

        const allCharacters = uppercase + lowercase + numbers + specialChars;

        // Fill the rest of the password with random characters
        for (let i = 4; i < 6; i++) {
            password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
        }

        // Shuffle the password to mix the required characters
        return password
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = {
            newPassword: password,
            clientId: clientParams.clientId,
            realmName: clientParams.realmName
        };
        dispatch(permanentPassRequest({ params, token }));
    };

    const BackToSignIn = () => {
        // Clear any existing error messages
        dispatch(backToSignIn());
        router.push('/signIn');
        // Optionally, you can also clear the password state
        setPassword('');
    }

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
                    Permanent Password?
                </p>
                <p className='text-center sm:mb-10 mb-6 text-font-color-100'>
                    Enter the email address you used when you joined and we'll send you instructions to reset your password.
                </p>
                <div className='form-control mb-[20px]'>
                    <div className='flex items-center mb-2'>
                        <label htmlFor='password' className='form-label mb-0'>
                            New Password:
                        </label>
                        <button
                            type="button"
                            className="text-white px-2 py-1 rounded-full bg-[#6c757d] ml-2 
           shadow-transparent text-sm
           hover:shadow-[0_6px_1rem_rgba(25,24,24,0.1),0_0.5rem_1rem_-0.75rem_rgba(25,24,24,0.1)] 
           hover:-translate-y-[3px] 
           transition-[box-shadow,transform] duration-200 ease-in-out"
                            onClick={handleInputClick}
                        >
                            Generate Password
                        </button>
                    </div>
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            placeholder='Enter the password'
                            className='form-input !pr-12'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className='absolute top-[50%] translate-y-[-50%] right-3 text-font-color-100'
                        >
                            {showPassword ? <IconEyeOff /> : <IconEye />}
                        </button>
                    </div>
                </div>
                <button
                    className='btn btn-secondary large w-full uppercase'
                    type='submit'
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            <div className='text-center sm:mt-[30px] mt-6'>
                <Link href="/#" className='text-primary' onClick={BackToSignIn}>
                    Back to Sign in
                </Link>
            </div>
        </>
    )
}
