'use client';
import { useState } from 'react';
import Header from '@/components/partial/Header';
import Sidebar from '@/components/partial/Sidebar';
import Footer from '@/components/partial/Footer';

export default function Layout({ children }) {
    // toggles
    const [mobileNav, setMobileNav] = useState(false);
    const [note, setNote] = useState(false);
    const [chat, setChat] = useState(false);

    const toggleMobileNav = () => setMobileNav(!mobileNav);
    const toggleNote = () => setNote(!note);
    const toggleChat = () => setChat(!chat);
    return (
        <div className='admin-wrapper bg-dark overflow-hidden before:fixed before:left-0 before:right-0 before:top-0 before:h-[198px]'>
            <Header
                toggleMobileNav={toggleMobileNav}
                mobileNav={mobileNav}
                toggleNote={toggleNote}
                toggleChat={toggleChat}
            />
            <div className='flex xl:h-[calc(100svh-72px)] md:h-[calc(100svh-68px)] h-[calc(100svh-60px)] relative'>
                <div className={`sm:w-[260px] w-full min-w-[300px] xl:static fixed z-[3] xl:bg-transparent bg-dark xl:rounded-none sm:rounded-tl-2xl sm:rounded-t-none rounded-t-2xl xl:shadow-none transition-all duration-300 ${mobileNav ? 'shadow-shadow-lg sm:left-2 left-0' : '-left-full'}`}>
                    <Sidebar
                        setMobileNav={setMobileNav}
                        note={note}
                        toggleNote={toggleNote}
                        chat={chat}
                        toggleChat={toggleChat}
                    />
                </div>
                <div className='main flex-1 flex flex-col overflow-auto no-scrollbar md:border-t-[5px] md:border-x-[5px] md:border-border-color rounded-t-2xl xl:mx-6 sm:mx-2 bg-body-color md:p-6 p-4'>
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    );
}