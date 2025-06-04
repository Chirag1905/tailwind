'use client';
import React from 'react'
import { auth_forgot_password } from '@/assets/images/'
import Link from 'next/link';
import Image from 'next/image';

export default function ResetPassword() {
    return (
        <>
            <div className='flex justify-center sm:mb-6 mb-4'>
                <Image
                    src={auth_forgot_password}
                    alt='forgot password'
                    width={240}
                    height={178}
                />
            </div>
            <p className='sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2 text-center'>
                Reset password?
            </p>
            <p className='text-center sm:mb-12 mb-6 text-font-color-100'>
                Enter the email address you used when you joined and we'll send you instructions to reset your password.
            </p>
            <div className='form-control mb-20'>
                <label htmlFor='email' className='form-label'>
                    Email
                </label>
                <input type='email' id='email' placeholder='name@example.com' className='form-input' />
            </div>
            <Link href="/auth-two-step" className='btn btn-secondary large w-full uppercase'>
                Submit
            </Link>
            <div className='text-center sm:mt-30 mt-6'>
                <Link href="/signIn" className='text-primary'>
                    Back to Sign in
                </Link>
            </div>
        </>
    )
}
