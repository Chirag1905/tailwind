'use client';
import React from 'react'
import Link from 'next/link'
import CompanyLogo from '../common/CompanyLogo'
import { profile_av, Techvein_logo } from '@/assets/images'
import Image from 'next/image';
export default function Footer({ className }) {

  const CurrentYear = new Date().getFullYear()

  return (
    <div className={`${className ? className : ''} footer pt-6 flex items-center justify-between gap-15 md:flex-row flex-col mt-auto md:text-[16px]/[24px] text-[14px]/[20px]`}>
      <p className='text-font-color-100 text-center'>
        © {CurrentYear} <Link href="/" className='text-primary'>Demo</Link>, All Rights Reserved.
      </p>
      <Link href="/">
        {/* <CompanyLogo className="w-[53px] h-[18px] text-primary transition-all hover:text-secondary" /> */}
        <Image
          src={profile_av}
          alt="Campus Logo"
          className="text-primary transition-all hover:text-secondary rounded-4xl"
          width={53}
          height={18}
          priority
        />
      </Link>
      <ul className='flex items-center gap-x-8 gap-y-5 flex-wrap justify-center'>
        <li>
          <Link href="#" className='text-font-color-100 transition-all hover:text-blue'>
            Portfolio
          </Link>
        </li>
        <li>
          <Link href="#" className='text-font-color-100 transition-all hover:text-blue'>
            Licenses
          </Link>
        </li>
        <li>
          <Link href="#" className='text-font-color-100 transition-all hover:text-blue'>
            Support
          </Link>
        </li>
        <li>
          <Link href="#" className='text-font-color-100 transition-all hover:text-blue'>
            FAQs
          </Link>
        </li>
      </ul>
    </div>
  )
}
