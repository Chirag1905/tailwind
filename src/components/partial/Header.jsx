'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ChromePicker } from 'react-color';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CompanyLogo from '../common/CompanyLogo';
import {
    IconArrowsMaximize,
    IconWorld,
    IconMoonStars,
    IconSettings,
    IconX,
    IconBrush,
    IconBellRinging,
    IconNote,
    IconMessage,
    IconThumbUpFilled,
    IconChartPieFilled,
    IconInfoCircleFilled,
    IconInfoTriangleFilled,
    IconUser,
    IconCreditCard,
    IconUsersGroup,
    IconCalendarFilled,
    IconTag,
    IconEdit,
    IconArrowBigLeftFilled,
    IconPencil,
    IconRestore,
} from '@tabler/icons-react';
import {
    dark_version,
    light_version,
    rtl_version,
    font_mali,
    font_quicksand,
    font_mulish,
    font_jura,
    avatar5,
    avatar6,
    avatar1,
    avatar3,
    avatar4,
    avatar7,
    flag_uk,
    flag_us,
    flag_de,
    flag_in,
    flag_sa,
    profile_av,
    Techvein_logo
} from '@/assets/images';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useFavicon } from '../utils/useFavicon';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomizationRequest, postCustomizationRequest, resetCustomization } from '@/Redux/features/customization/customizationSlice';
import CustomizationSettings from './Customization';

export default function Header({ toggleMobileNav, mobileNav, toggleNote, toggleChat }) {
    const dispatch = useDispatch();
    // Settings sidebar
    const [settingToggle, setSettingToggle] = useState(false)
    const customizationData = useSelector((state) => state.customization);
    const [localCustomizations, setLocalCustomizations] = useState(customizationData?.customizationData);

    useEffect(() => {
        if(customizationData){
            setLocalCustomizations(customizationData?.customizationData)
        }
    }, [customizationData])
    
    // console.log("Redux State", customizationData?.customizationData)
    // console.log("Local State", localCustomizations)


    // useEffect(() => {
    //     dispatch(fetchCustomizationRequest('000001'));
    // }, [dispatch]);

    // Search bar open
    const [searchBar, setSearchBar] = useState(false);
    const openSearchBar = () => {
        setSearchBar(true)
        document.body.classList.add("overflow-hidden")
    }
    const closeSearchBar = () => {
        setSearchBar(false)
        document.body.classList.remove("overflow-hidden")
    }

    // Full screen
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };


    const toggleThemeSetting = () => {
        setSettingToggle(!settingToggle)
        document.body.classList.toggle("overflow-hidden", !settingToggle)
    }

    // light dark mode
    const toggleDarkMode = () => {
        const newDarkMode = !localCustomizations?.darkMode;
        setLocalCustomizations((prev) => ({
            ...prev,
            darkMode: newDarkMode,
        }));
        document.documentElement.setAttribute("data-theme", newDarkMode ? "dark" : "light");
    };
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', localCustomizations.darkMode ? 'dark' : 'light');
    }, [localCustomizations.darkMode]);

    return (
        <>
            <div className='md:py-4 py-3 md:px-6 px-4 flex-1 flex items-center relative'>
                <div className="text-white flex items-center justify-center rounded-lg xl:w-[300px]">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                            {/* <CompanyLogo /> */}
                            <span
                                className="p-1 font-semibold text-xl text-white text-left w-full bg-transparent"
                            >
                                {localCustomizations?.schoolName?.length === 8 ? localCustomizations.schoolName : "Demo"}
                            </span>
                        </Link>
                        <span className="text-white w-full bg-transparent hover:border-gray-400 transition-colors placeholder-gray-400 hidden sm:block">- Admin</span>
                    </div>
                </div>
                <div className='flex-1 flex items-center justify-end text-font-color-200'>
                    {/* <button
                        className="xl:flex hidden items-center justify-center w-[40px] h-[40px] min-w-[40px] bg-white-10 rounded-full">
                        <IconArrowBigLeftFilled />
                    </button> */}
                    <div className='relative px-4 flex-1 md:block hidden'>
                        <input type="text" placeholder="Enter your search key word" onClick={openSearchBar} className={`w-full py-[6px] px-[12px] bg-transparent focus:outline-0 placeholder:text-white placeholder:opacity-50 ${searchBar ? 'z-[5] relative' : ''}`} />
                        <div className={`bg-card-color text-font-color xl:absolute fixed xl:left-0 left-[30px] xl:top-[40px] top-[68px] z-[5] xl:w-full w-[calc(100%-60px)] rounded-xl p-6 transition-all duration-300 origin-top ${searchBar ? 'opacity-1 visible scale-y-100' : 'opacity-0 invisible scale-y-0'}`}>
                            <p className='text-font-color-100 text-[14px]/[20px] mb-3 uppercase'>
                                RECENT SEARCHES
                            </p>
                            <div className='flex gap-2 mb-6'>
                                <Link href="#" className='inline-block p-2 text-white font-semibold bg-danger text-[12px]/[1] rounded-md'>
                                    HRMS Admin
                                </Link>
                                <Link href="#" className='inline-block p-2 text-black font-semibold bg-warning text-[12px]/[1] rounded-md'>
                                    Hospital Admin
                                </Link>
                                <Link href="#" className='inline-block p-2 text-white font-semibold bg-success text-[12px]/[1] rounded-md'>
                                    Project
                                </Link>
                                <Link href="#" className='inline-block p-2 text-white font-semibold bg-info text-[12px]/[1] rounded-md'>
                                    Social App
                                </Link>
                                <Link href="#" className='inline-block p-2 text-white font-semibold bg-blue text-[12px]/[1] rounded-md'>
                                    University Admin
                                </Link>
                            </div>
                            <p className='text-font-color-100 text-[14px]/[20px] mb-3 uppercase'>
                                SUGGESTIONS
                            </p>
                            <div className='flex flex-col border border-border-color rounded-xl overflow-hidden'>
                                <Link href="#" className='py-[10px] px-[15px] border-b border-dashed border-border-color transition hover:bg-primary-10'>
                                    <div className='font-bold mb-[5px]'>
                                        Cras justo odio
                                    </div>
                                    <p className='text-[14px]/[20px] text-font-color-100'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    </p>
                                </Link>
                                <Link href="#" className='py-[10px] px-[15px] border-b border-dashed border-border-color transition hover:bg-primary-10'>
                                    <div className='font-bold mb-[5px]'>
                                        Date Range Picker
                                    </div>
                                    <p className='text-[14px]/[20px] text-font-color-100'>
                                        There are many variations of passages of Lorem Ipsum available
                                    </p>
                                </Link>
                                <Link href="#" className='py-[10px] px-[15px] border-b border-dashed border-border-color transition hover:bg-primary-10'>
                                    <div className='font-bold mb-[5px]'>
                                        Image Input
                                    </div>
                                    <p className='text-[14px]/[20px] text-font-color-100'>
                                        It is a long established fact that a reader will be distracted
                                    </p>
                                </Link>
                                <Link href="#" className='py-[10px] px-[15px] border-b border-dashed border-border-color transition hover:bg-primary-10'>
                                    <div className='font-bold mb-[5px]'>
                                        DataTables for jQuery
                                    </div>
                                    <p className='text-[14px]/[20px] text-font-color-100'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    </p>
                                </Link>
                                <Link href="#" className='py-[10px] px-[15px] transition hover:bg-primary-10'>
                                    <div className='font-bold mb-[5px]'>
                                        Development Setup
                                    </div>
                                    <p className='text-[14px]/[20px] text-font-color-100'>
                                        Contrary to popular belief, Lorem Ipsum is not simply random text.
                                    </p>
                                </Link>
                            </div>
                        </div>
                        <div onClick={closeSearchBar} className={`fixed z-[4] w-full h-full left-0 top-0 bg-black-50 backdrop-blur-2xs transition-all duration-300 ease-in-out ${searchBar ? 'opacity-1 visible overflow-auto' : 'opacity-0 invisible overflow-hidden'}`}></div>
                    </div>
                    <div className='relative group'>
                        <button className='md:py-2 md:px-3 p-2 hover:bg-primary-10 transition-all duration-300'>
                            <span className='xl:block hidden'>
                                <IconBellRinging className='stroke-[1.5]' />
                            </span>
                            <IconBellRinging className='stroke-[1.5] xl:hidden w-[20px] h-[20px]' />
                        </button>
                        <div className='bg-card-color text-font-color rounded-xl overflow-hidden md:w-[380px] w-[calc(100%-30px)] shadow-shadow-lg md:absolute fixed md:end-0 end-[15px] md:top-full top-[55px] origin-top-right rtl:origin-top-left z-[1] opacity-0 invisible scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:scale-100'>
                            <div className='flex items-center justify-between gap-[10px] p-4'>
                                <div className='font-semibold'>
                                    Notifications Center
                                </div>
                                <span className='inline-block bg-danger text-white rounded-md text-[14px]/[1] py-1 px-2 font-semibold'>
                                    14
                                </span>
                            </div>
                            <Tabs>
                                <TabList className="flex flex-wrap sm:px-6 px-4 border-b border-border-color relative">
                                    <Tab className="flex-1 cursor-pointer py-2 px-3 border-b-[7px] border-transparent text-center -mb-1 text-secondary rounded-t-md transition-all hover:bg-primary-10 hover:border-primary focus:outline-0" selectedClassName='!border-primary'>
                                        Message
                                    </Tab>
                                    <Tab className="flex-1 cursor-pointer py-2 px-3 border-b-[7px] border-transparent text-center -mb-1 text-secondary rounded-t-md transition-all hover:bg-primary-10 hover:border-primary focus:outline-0" selectedClassName='!border-primary'>
                                        Events
                                    </Tab>
                                    <Tab className="flex-1 cursor-pointer py-2 px-3 border-b-[7px] border-transparent text-center -mb-1 text-secondary rounded-t-md transition-all hover:bg-primary-10 hover:border-primary focus:outline-0" selectedClassName='!border-primary'>
                                        Logs
                                    </Tab>
                                </TabList>
                                <div className='md:h-[calc(60svh-185px)] h-[calc(80svh-185px)] sm:p-6 p-4 overflow-auto no-scrollbar'>
                                    <TabPanel>
                                        <ul>
                                            <li className='py-[10px] border-b border-border-color flex gap-4'>
                                                <Image src={avatar5} alt='notification icon' width={36} height={36} className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                                                <div className='w-full'>
                                                    <div className='flex justify-between gap-2'>
                                                        <div className='font-medium'>
                                                            Olive Tree
                                                        </div>
                                                        <span className='text-[12px]/[1] text-font-color-100'>
                                                            13MIN
                                                        </span>
                                                    </div>
                                                    <div className='text-[14px]/[20px]'>
                                                        making it over 2000 years old
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='py-[10px] border-b border-border-color flex gap-4'>
                                                <Image src={avatar6} alt='notification icon' width={36} height={36} className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                                                <div className='w-full'>
                                                    <div className='flex justify-between gap-[10px]'>
                                                        <div className='font-medium'>
                                                            Del Phineum
                                                        </div>
                                                        <span className='text-[12px]/[1] text-font-color-100'>
                                                            1HR
                                                        </span>
                                                    </div>
                                                    <div className='text-[14px]/[20px]'>
                                                        There are many variations of passages
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='py-[10px] border-b border-border-color flex gap-4'>
                                                <Image src={avatar1} alt='notification icon' width={36} height={36} className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                                                <div className='w-full'>
                                                    <div className='flex justify-between gap-[10px]'>
                                                        <div className='font-medium'>
                                                            Rose Bush
                                                        </div>
                                                        <span className='text-[12px]/[1] text-font-color-100'>
                                                            2MIN
                                                        </span>
                                                    </div>
                                                    <div className='text-[14px]/[20px]'>
                                                        changed an issue from "In Progress" to <span className='text-white text-center text-[12px]/[1] bg-success rounded-md py-[2px] px-[5px]'>Review</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='py-[10px] border-b border-border-color flex gap-4'>
                                                <div className='w-[36px] h-[36px] min-w-[36px] rounded-md font-semibold text-secondary bg-primary-10 flex items-center justify-center'>
                                                    PT
                                                </div>
                                                <div className='w-full'>
                                                    <div className='flex justify-between gap-[10px]'>
                                                        <div className='font-medium'>
                                                            Pat Thettick
                                                        </div>
                                                        <span className='text-[12px]/[1] text-font-color-100'>
                                                            13MIN
                                                        </span>
                                                    </div>
                                                    <div className='text-[14px]/[20px]'>
                                                        It is a long established fact that a reader will be distracted
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='py-[10px] border-b border-border-color flex gap-4'>
                                                <Image src={avatar3} alt='notification icon' width={36} height={36} className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                                                <div className='w-full'>
                                                    <div className='flex justify-between gap-[10px]'>
                                                        <div className='font-medium'>
                                                            Eileen Dover
                                                        </div>
                                                        <span className='text-[12px]/[1] text-font-color-100'>
                                                            1HR
                                                        </span>
                                                    </div>
                                                    <div className='text-[14px]/[20px]'>
                                                        There are many variations of passages
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='py-[10px] border-b border-border-color flex gap-4'>
                                                <Image src={avatar4} alt='notification icon' width={36} height={36} className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                                                <div className='w-full'>
                                                    <div className='flex justify-between gap-[10px]'>
                                                        <div className='font-medium'>
                                                            Carmen Goh
                                                        </div>
                                                        <span className='text-[12px]/[1] text-font-color-100'>
                                                            1DAY
                                                        </span>
                                                    </div>
                                                    <div className='text-[14px]/[20px]'>
                                                        Contrary to popular belief <span className='text-white text-center text-[12px]/[1] bg-danger rounded-md py-[2px] px-[5px]'>Code</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='py-[10px] border-b border-border-color flex gap-4'>
                                                <Image src={avatar7} alt='notification icon' width={36} height={36} className='w-[36px] h-[36px] min-w-[36px] rounded-md' />
                                                <div className='w-full'>
                                                    <div className='flex justify-between gap-[10px]'>
                                                        <div className='font-medium'>
                                                            Karen Onnabit
                                                        </div>
                                                        <span className='text-[12px]/[1] text-font-color-100'>
                                                            1DAY
                                                        </span>
                                                    </div>
                                                    <div className='text-[14px]/[20px]'>
                                                        The generated Lorem Ipsum
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </TabPanel>
                                    <TabPanel>
                                        <ul>
                                            <li className='py-[10px] border-b border-border-color flex gap-4'>
                                                <IconThumbUpFilled className='fill-secondary w-[24px] h-[24px] min-w-[24px]' />
                                                <div className='w-full'>
                                                    <div className='font-medium mb-1'>
                                                        Your New Campaign <span className='text-primary font-semibold'>Holiday Sale</span> is approved.
                                                    </div>
                                                    <div className='text-[12px]/[18px] text-font-color-100'>
                                                        11:30 AM Today
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='py-[10px] border-b border-border-color flex gap-4'>
                                                <IconChartPieFilled className='fill-secondary w-[24px] h-[24px] min-w-[24px]' />
                                                <div className='w-full'>
                                                    <div className='font-medium mb-1'>
                                                        Website visits from Twitter is <span className='text-primary font-semibold'>27% higher</span> than last week.
                                                    </div>
                                                    <div className='text-[12px]/[18px] text-font-color-100'>
                                                        04:00 PM Today
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='py-[10px] border-b border-border-color flex gap-4'>
                                                <IconInfoCircleFilled className='fill-secondary w-[24px] h-[24px] min-w-[24px]' />
                                                <div className='w-full'>
                                                    <div className='font-medium mb-1'>
                                                        Campaign <span className='text-primary font-semibold'>Holiday Sale</span> is nearly reach budget limit.
                                                    </div>
                                                    <div className='text-[12px]/[18px] text-font-color-100'>
                                                        10:00 AM Today
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='py-[10px] border-b border-border-color flex gap-4'>
                                                <IconInfoTriangleFilled className='fill-secondary w-[24px] h-[24px] min-w-[24px]' />
                                                <div className='w-full'>
                                                    <div className='font-medium mb-1'>
                                                        <span className='text-warning font-semibold'>Error</span> on website analytics configurations
                                                    </div>
                                                    <div className='text-[12px]/[18px] text-font-color-100'>
                                                        Yesterday
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="text-font-color-400 text-[24px]/[30px] font-medium">No Logs right now!</div>
                                    </TabPanel>
                                </div>
                            </Tabs>
                            <Link href="#" className='bg-primary text-[14px]/[20px] text-white py-[5px] px-[10px] text-center w-full inline-block'>
                                View all notifications
                            </Link>
                        </div>
                    </div>
                    <button onClick={toggleFullScreen} className='xl:block hidden md:py-2 md:px-3 p-2 hover:bg-primary-10 transition-all duration-300'>
                        <IconArrowsMaximize className='stroke-[1.5]' />
                    </button>
                    <button onClick={toggleNote} className='xl:hidden sm:block hidden md:py-2 md:px-3 p-2 hover:bg-primary-10 transition-all duration-300'>
                        <IconNote className='stroke-[1.5] w-[20px] h-[20px]' />
                    </button>
                    <div className='relative group'>
                        <button className='xl:block hidden md:py-2 md:px-3 p-2 hover:bg-primary-10 transition-all duration-300'>
                            <IconWorld className='stroke-[1.5]' />
                        </button>
                        <div className='bg-card-color text-font-color rounded-xl overflow-auto max-h-[50svh] no-scrollbar w-[200px] shadow-shadow-lg absolute end-0 top-full origin-top-right rtl:origin-top-left z-[1] opacity-0 invisible scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:scale-100'>
                            <ul>
                                <li className='py-2 px-3 border-b border-dashed border-border-color transition-all hover:bg-primary-10'>
                                    <Link href="#" className='flex items-center gap-2'>
                                        <Image src={flag_uk} width="" height="" alt='language' className='w-[20px] h-[15px] min-w-[20px]' />
                                        UK English
                                    </Link>
                                </li>
                                <li className='py-2 px-3 border-b border-dashed border-border-color transition-all hover:bg-primary-10'>
                                    <Link href="#" className='flex items-center gap-2'>
                                        <Image src={flag_in} width="" height="" alt='language' className='w-[20px] h-[15px] min-w-[20px]' />
                                        Hindi
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button onClick={toggleChat} className='xl:hidden sm:block hidden md:py-2 md:px-3 p-2 hover:bg-primary-10 transition-all duration-300'>
                        <IconMessage className='stroke-[1.5] w-[20px] h-[20px]' />
                    </button>
                    <button
                        onClick={toggleDarkMode}
                        className='md:py-2 md:px-3 p-2 hover:bg-primary-10 transition-all duration-300'
                    >
                        <IconMoonStars className='stroke-[1.5] xl:w-[24px] xl:h-[24px] w-[20px] h-[20px]' />
                    </button>
                    <div className='relative group flex'>
                        <button className='xl:hidden md:px-3 px-2'>
                            <Image src={profile_av} alt='profile' width={36} height={36} className='bg-white shadow-shadow-lg p-1 rounded-full saturate-50 transition-all hover:filter-none' />
                        </button>
                        <div className='bg-card-color text-font-color rounded-xl overflow-hidden md:w-[240px] w-[calc(100%-30px)] shadow-shadow-lg md:absolute fixed md:right-0 right-[15px] md:top-full top-[55px] origin-top-right z-[1] opacity-0 invisible scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:scale-100'>
                            <div className='p-4 border-b border-border-color'>
                                <div className='font-semibold'>
                                    Allie Grater
                                </div>
                                <div className='text-font-color-100'>
                                    alliegrater@swift.com
                                </div>
                            </div>
                            <div className='p-1 m-1 cus-scrollbar overflow-auto max-h-[calc(80svh-163px)]'>
                                <Link href="#" className='py-2 px-4 flex items-center gap-3'>
                                    <IconUser className='w-[16px] h-[16px]' />
                                    My Profile
                                </Link>
                                <Link href="#" className='py-2 px-4 flex items-center gap-3'>
                                    <IconSettings className='w-[16px] h-[16px]' />
                                    Settings
                                </Link>
                                <Link href="#" className='py-2 px-4 flex items-center gap-3'>
                                    <IconCreditCard className='w-[16px] h-[16px]' />
                                    Billing
                                </Link>
                                <Link href="#" className='py-2 px-4 flex items-center gap-3'>
                                    <IconUsersGroup className='w-[16px] h-[16px]' />
                                    Manage Team
                                </Link>
                                <Link href="#" className='py-2 px-4 flex items-center gap-3'>
                                    <IconCalendarFilled className='w-[16px] h-[16px]' />
                                    My Events
                                </Link>
                                <Link href="#" className='py-2 px-4 flex items-center gap-3'>
                                    <IconTag className='w-[16px] h-[16px]' />
                                    Support Ticket
                                </Link>
                            </div>
                            <Link href="auth-signin" className='bg-secondary uppercase text-[14px]/[20px] text-white py-[5px] px-[10px] text-center w-full inline-block'>
                                Sign Out
                            </Link>
                        </div>
                    </div>
                    <button onClick={toggleThemeSetting} className={`md:py-2 md:px-3 p-2 hover:bg-primary-10 transition-all duration-300 after:fixed after:z-[4] after:w-full after:h-full after:left-0 after:top-0 after:bg-black-50 after:backdrop-blur-2xs after:transition-all after:duration-500 after:ease-in-out ${settingToggle ? 'after:opacity-1 after:visible after:overflow-auto' : 'after:opacity-0 after:invisible after:overflow-hidden'}`}>
                        <IconSettings className='stroke-[1.5] xl:w-[24px] xl:h-[24px] w-[20px] h-[20px]' />
                    </button>
                    <button className={`md:py-2 md:px-3 p-2 hover:bg-primary-10 transition-all duration-300 xl:hidden hamburger-menu ${mobileNav ? 'opened' : ''}`} onClick={toggleMobileNav}>
                        <svg width={20} height={20} viewBox="0 0 100 100">
                            <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                            <path className="line line2" d="M 20,50 H 80" />
                            <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                        </svg>
                    </button>
                </div>
                {settingToggle &&
                    <CustomizationSettings
                        settingToggle={settingToggle}
                        localCustomizations={localCustomizations}
                        setLocalCustomizations={setLocalCustomizations}
                        toggleThemeSetting={toggleThemeSetting}
                        toggleDarkMode={toggleDarkMode}
                    />
                }
            </div>
        </>
    )
}
