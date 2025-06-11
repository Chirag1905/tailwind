'use client';
import Link from 'next/link';
import React from 'react'

export default function Signup() {
  return (
    <>
        <div className='sm:mb-8 mb-6 text-center'>
          <div className='sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2'>
            Create Account
          </div>
          <span className='text-font-color-100 inline-block'>
            Free access to our dashboard.
          </span>
        </div>
        <div className=''>
          <div className='mb-2 flex gap-3'>
            <div className='form-control'>
              <label htmlFor='firstName' className='form-label'>
                Firstname
              </label>
              <input type='text' id='firstName' placeholder='John' className='form-input' />
            </div>
            <div className='form-control'>
              <label htmlFor='lastName' className='form-label'>
                Lastname
              </label>
              <input type='text' id='lastName' placeholder='Parker' className='form-input' />
            </div>
          </div>
          <div className='form-control mb-2'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input type='email' id='email' placeholder='name@example.com' className='form-input' />
          </div>
          <div className='form-control mb-2'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input type='password' id='password' placeholder='8+ characters required' className='form-input' />
          </div>
          <div className='form-control mb-2'>
            <label htmlFor='confirmPassword' className='form-label'>
              Confirm Password
            </label>
            <input type='password' id='confirmPassword' placeholder='8+ characters required' className='form-input' />
          </div>
          <div className="form-check mb-4">
            <input
              type="checkbox"
              id="forgotPassword"
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="forgotPassword">I accept the <Link href="/" className='text-primary'>Terms and Conditions</Link></label>
          </div>
          <Link href="/" className='btn btn-secondary large w-full uppercase'>
            Sign Up
          </Link>
          <div className='text-center sm:mt-5 mt-6 text-font-color-100'>
            <p>
              Already have an account?
            </p>
            <Link href="/signIn" className='text-primary'>
              Sign in here
            </Link>
          </div>
        </div>
    </>
  )
}
