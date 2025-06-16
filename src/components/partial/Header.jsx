'use client';
import React, { useEffect, useState } from 'react';
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
import { fetchCustomizationRequest, resetCustomization } from '@/Redux/features/customization/customizationSlice';

export default function Header({ toggleMobileNav, mobileNav, toggleNote, toggleChat }) {
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    // console.log("🚀 ~ Header ~ customization:", customization)
    const authToken = useSelector((state) => state.auth.token); // Assuming you have auth token

    // Load customization on mount
    useEffect(() => {
        dispatch(fetchCustomizationRequest('master'));
    }, [dispatch]);

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

    // Settings sidebar
    const [settingToggle, setSettingToggle] = useState(false)
    const toggleThemeSetting = () => {
        setSettingToggle(!settingToggle)
        document.body.classList.toggle("overflow-hidden", !settingToggle)
    }

    useEffect(() => {
        const savedCustomizations = localStorage.getItem('customizations');
        if (savedCustomizations) {
            try {
                const parsedCustomizations = JSON.parse(savedCustomizations);
                setCustomizations({
                    ...defaultSettings,
                    ...parsedCustomizations,
                    dynamicFont: {
                        fontUrl: parsedCustomizations.dynamicFont?.fontUrl || "",
                        fontLink: parsedCustomizations.dynamicFont?.fontLink || ""
                    }
                });
            } catch (error) {
                console.error("Failed to parse customizations from localStorage:", error);
                localStorage.removeItem('customizations'); // Clear invalid data
                setCustomizations(defaultSettings);
            }
        }
    }, []);

    const defaultSettings = {
        schoolLogo: profile_av,
        schoolName: "ERP School Portal",
        heading: "Effortless Control, Powerful Management.",
        motto: "All-in-One Tool",
        quote: "Welcome to the central hub for managing your Campus & School Management ERP solution. Streamline administration, improve efficiency, and stay organized — all from one place.",
        motto2: "Log in to take full control of your ERP ecosystem.",
        quote2: "Built on a robust AWS microservices architecture, this portal empowers SSAS administrators with seamless access to configure, monitor, and support tenant environments in real time.",
        theme: "cyan",
        darkMode: false,
        rtlMode: false,
        fontFamily: "Mulish, sans-serif",
        dynamicFont: {
            fontUrl: "",
            fontLink: ""
        },
        showRadius: true,
        showShadow: false,
        dynamicColors: {
            primary: { r: 99, g: 102, b: 241, a: 1 },
            secondary: { r: 128, g: 129, b: 145, a: 1 },
            bodyColor: { r: 22, g: 22, b: 30, a: 1 },
            cardColor: { r: 28, g: 28, b: 39, a: 1 },
            borderColor: { r: 45, g: 45, b: 60, a: 1 },
            chartColor1: { r: 99, g: 102, b: 241, a: 1 },
            chartColor2: { r: 14, g: 165, b: 233, a: 1 },
            chartColor3: { r: 22, g: 163, b: 74, a: 1 },
            chartColor4: { r: 234, g: 88, b: 12, a: 1 },
            chartColor5: { r: 244, g: 63, b: 94, a: 1 }
        }
    };

    const colorItem = [
        {
            name: "indigo",
            color: "bg-theme-indigo",
        },
        {
            name: "blue",
            color: "bg-theme-blue",
        },
        {
            name: "cyan",
            color: "bg-theme-cyan",
        },
        {
            name: "green",
            color: "bg-theme-green",
        },
        {
            name: "orange",
            color: "bg-theme-orange",
        },
        {
            name: "blush",
            color: "bg-theme-blush",
        },
        {
            name: "red",
            color: "bg-theme-red",
        },
        {
            name: "dynamic",
            color: "bg-primary-10",
            icon: IconBrush,
        },
    ]

    const [dynamicColorItem, setDynamicColorItem] = useState([
        {
            color: "bg-primary",
            label: "Primary Color",
            variable: "--primary",
        },
        {
            color: "bg-secondary",
            label: "Secondary Color",
            variable: "--secondary",
        },
        {
            color: "bg-body-color",
            label: "Body Background",
            variable: "--body-color",
        },
        {
            color: "bg-card-color",
            label: "Card Background",
            variable: "--card-color",
        },
        {
            color: "bg-border-color",
            label: "Border Color",
            variable: "--border-color",
        },
        {
            color: "bg-chart-color1",
            label: "Chart Color 1",
            variable: "--chart-color1",
        },
        {
            color: "bg-chart-color2",
            label: "Chart Color 2",
            variable: "--chart-color2",
        },
        {
            color: "bg-chart-color3",
            label: "Chart Color 3",
            variable: "--chart-color3",
        },
        {
            color: "bg-chart-color4",
            label: "Chart Color 4",
            variable: "--chart-color4",
        },
        {
            color: "bg-chart-color5",
            label: "Chart Color 5",
            variable: "--chart-color5",
        },
    ])

    const fontItem = [
        {
            image: font_mali,
            font: "Mali, sans-serif"
        },
        {
            image: font_quicksand,
            font: "Quicksand, sans-serif"
        },
        {
            image: font_mulish,
            font: "Mulish, sans-serif"
        },
        {
            image: font_jura,
            font: "Jura, sans-serif"
        },
    ]

    const [customizations, setCustomizations] = useState(defaultSettings);
    // In your component, use the hook with the schoolLogo
    const setFavicon = useFavicon();
    useEffect(() => {
        setFavicon(customizations.schoolLogo || '/Techvein_logo.png');
    }, [customizations.schoolLogo, setFavicon]);

    // Also update the handleFileChange function to save to localStorage:
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newLogo = reader.result;
                setCustomizations(prev => ({
                    ...prev,
                    schoolLogo: newLogo
                }));
                setFavicon(newLogo);
                // Save to localStorage
                const savedCustomizations = JSON.parse(localStorage.getItem('customizations') || {});
                localStorage.setItem('customizations', JSON.stringify({
                    ...savedCustomizations,
                    schoolLogo: newLogo
                }));

                // Favicon will update automatically through the hook
            };
            reader.readAsDataURL(file);
        }
    };

    // Theme Setting
    const handleThemeChange = (name) => {
        setCustomizations((prev) => ({
            ...prev,
            theme: name,
        }));
        document.body.setAttribute("data-swift-theme", name);
    };

    useEffect(() => {
        document.body.setAttribute("data-swift-theme", customizations.theme);
    }, [customizations.theme]);

    // dynamic color setting
    const handleChangeDynamicColor = (newColor, index) => {
        const updatedDynamicColorItem = [...dynamicColorItem];
        updatedDynamicColorItem[index].colorValue = newColor.rgb;
        setDynamicColorItem(updatedDynamicColorItem);
        updateCssVariable(updatedDynamicColorItem[index].variable, newColor.rgb);
    };
    const handleClickDynamicColor = (index) => {
        const updatedDynamicColorItem = [...dynamicColorItem];
        updatedDynamicColorItem[index].displayColorPicker = !updatedDynamicColorItem[index].displayColorPicker;
        setDynamicColorItem(updatedDynamicColorItem);
    };
    const handleCloseDynamicColor = (index) => {
        const updatedDynamicColorItem = [...dynamicColorItem];
        updatedDynamicColorItem[index].displayColorPicker = false;
        setDynamicColorItem(updatedDynamicColorItem);
    };
    const updateCssVariable = (variable, color) => {
        document.documentElement.style.setProperty(variable, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
    };

    // light dark mode
    const toggleDarkMode = () => {
        const newDarkMode = !customizations.darkMode;
        setCustomizations((prev) => ({
            ...prev,
            darkMode: newDarkMode,
        }));
        document.documentElement.setAttribute("data-theme", newDarkMode ? "dark" : "light");
    };
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', customizations.darkMode ? 'dark' : 'light');
    }, [customizations.darkMode]);

    // rtl mode
    const toggleRtlMode = () => {
        const newRtlMode = !customizations.rtlMode;
        setCustomizations((prev) => ({
            ...prev,
            rtlMode: newRtlMode,
        }));
        document.documentElement.setAttribute("dir", newRtlMode ? "rtl" : "ltr");
    };
    useEffect(() => {
        document.documentElement.setAttribute('dir', customizations.rtlMode ? 'rtl' : 'ltr');
    }, [customizations.rtlMode]);

    // font family setting
    const toggleFontFamily = (fontFamily) => {
        setCustomizations((prev) => ({
            ...prev,
            fontFamily: fontFamily,
        }));
        document.body.style.setProperty("--font-family", fontFamily);
    };

    // dynamic font setting
    const handleApply = () => {
        const { fontUrl, fontLink } = customizations.dynamicFont || { fontUrl: '', fontLink: '' };

        if (fontUrl) {
            const link = document.createElement('link');
            link.href = fontUrl;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }

        if (fontLink) {
            document.body.style.setProperty("--font-family", fontLink);
            setCustomizations(prev => ({
                ...prev,
                fontFamily: fontLink
            }));
        }
    };

    // Clear Font 
    const handleClear = () => {
        const fontUrl = customizations.dynamicFont?.fontUrl || '';
        if (fontUrl) {
            const link = document.querySelector(`link[href="${fontUrl}"]`);
            if (link) {
                link.remove();
            }
        }

        // Reset font-family CSS variable
        document.body.style.setProperty("--font-family", "");

        // Clear dynamicFont
        setCustomizations(prev => ({
            ...prev,
            dynamicFont: {
                fontUrl: "",
                fontLink: ""
            },
            fontFamily: defaultSettings.fontFamily // Reset to default font
        }));
    };


    useEffect(() => {
        document.body.style.setProperty("--font-family", customizations.fontFamily);
    }, [customizations.fontFamily]);

    // border radius setting
    const radiusToggle = () => {
        setCustomizations((prev) => ({
            ...prev,
            showRadius: !prev.showRadius
        }));
        document.body.classList.toggle("radius-0");
    };

    // box shadow setting
    const cardShadow = document.querySelectorAll(".card")
    const shadowToggle = () => {
        setCustomizations((prev) => ({
            ...prev,
            showShadow: !prev.showShadow
        }));
        cardShadow.forEach(card => {
            card.classList.toggle("shadow-shadow-sm");
        });
    }

    // Save the title to localStorage when the "Save" button is clicked
    const handleSave = () => {
        localStorage.setItem('customizations', JSON.stringify(customizations));
        toast.success('Customizations saved!', { position: 'top-right' });
    };

    const handleReset = () => {
        dispatch(resetCustomization());
        setCustomizations(defaultSettings);
        localStorage.removeItem('customizations');
        setDynamicColorItem(dynamicColorItem.map(item => ({
            ...item,
            colorValue: defaultSettings.dynamicColors[item.label.toLowerCase().replace(/\s+/g, '')],
            displayColorPicker: false
        })));
        toast.success('Customizations reset to default', { position: 'top-right' });
        setFavicon('/Techvein_logo.png');
        document.body.setAttribute("data-swift-theme", defaultSettings.theme);
        document.documentElement.setAttribute('data-theme', defaultSettings.darkMode ? 'dark' : 'light');
        document.documentElement.setAttribute('dir', defaultSettings.rtlMode ? 'rtl' : 'ltr');
        document.body.style.setProperty("--font-family", defaultSettings.fontFamily);
        if (defaultSettings.showRadius) {
            document.body.classList.remove("radius-0");
        } else {
            document.body.classList.add("radius-0");
        }
        document.querySelectorAll(".card").forEach(card => {
            if (defaultSettings.showShadow) {
                card.classList.add("shadow-shadow-sm");
            } else {
                card.classList.remove("shadow-shadow-sm");
            }
        });
    };

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
                                {/* {customizations?.schoolName?.length === 8 ? customizations.schoolName : "Techvein"} */}
                                Demo
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
                                Notification
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
                {settingToggle && <div className={`fixed top-0 bg-card-color z-[5] h-svh w-full max-w-[500px] transition-all duration-200 ${settingToggle ? 'ltr:right-0 rtl:left-0' : 'ltr:-right-full rtl:-left-full'}`}>
                    <div className='md:px-6 px-4 md:py-4 py-3 flex items-center justify-between gap-[15px] border-b border-border-color'>
                        <div className='text-[20px]/[30px] font-medium'>
                            Customizations Setting
                        </div>
                        <div className='flex items-center gap-2'>
                            {/* Reset Button */}
                            <div className="relative group">
                                <button className='btn' onClick={handleReset}>
                                    <IconRestore />
                                </button>
                                <span className="absolute top-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition">
                                    Reset Settings
                                </span>
                            </div>

                            {/* Close Button */}
                            <div className="relative group">
                                <button onClick={toggleThemeSetting}>
                                    <IconX />
                                </button>
                                <span className="absolute top-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition">
                                    Close
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='md:p-6 p-4 md:h-[calc(100svh-63px-75px)] h-[calc(100svh-55px-67px)] overflow-auto no-scrollbar'>
                        <div className='relative mb-6 md:p-4 py-4 px-3 bg-body-color rounded-xl'>
                            <div className='flex justify-between'>
                                <label className='inline-block font-semibold mb-2'>
                                    Admin Image:
                                </label>
                                <div className='sm:w-[120px] sm:h-[120px] sm:min-w-[120px] w-[100px] h-[100px] min-w-[100px] relative'>
                                    <Image
                                        src={customizations?.schoolLogo}
                                        alt='avatar'
                                        width={"120"}
                                        height={"120"}
                                        className='w-full h-full object-cover rounded-xl'
                                    />
                                    <button className='absolute right-2 top-2 p-2 shadow-lg bg-white rounded-full transform translate-x-1/2 -translate-y-1/2'>
                                        <input
                                            type='file'
                                            id='editProfile'
                                            onChange={handleFileChange}
                                            className='opacity-0 absolute left-0 top-0 w-full h-full cursor-pointer'
                                        />
                                        <label htmlFor='editProfile' className='opacity-0 absolute left-0 top-0 w-full h-full cursor-pointer' />
                                        <IconPencil className='w-[16px] h-[16px]' />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='relative mb-6 md:p-4 py-4 px-3 bg-body-color rounded-xl'>
                            <span className='inline-block font-semibold mb-4'>
                                Admin Name:
                            </span>
                            <div className='mb-2 form-control'>
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="font_url"
                                    value={customizations?.schoolName}
                                    onChange={(e) => {
                                        const words = e.target.value.trim().split(/\s+/);
                                        // Limit to 20 words (adjust the number as needed)
                                        if (words.length <= 20) {
                                            setCustomizations({ ...customizations, schoolName: e.target.value });
                                        }
                                    }}
                                    // placeholder="Welcome to the central hub for managing your Campus & School Management ERP solution."
                                    className="form-input"
                                />
                            </div>

                        </div>
                        <div className='relative mb-6 md:p-4 py-4 px-3 bg-body-color rounded-xl'>
                            <span className='inline-block font-semibold mb-4'>
                                Admin Title Display:
                            </span>
                            <div className='mb-2 form-control'>
                                <label className="form-label">Heading</label>
                                <input
                                    type="text"
                                    id="font_url"
                                    value={customizations?.heading}
                                    onChange={(e) => {
                                        const words = e.target.value.trim().split(/\s+/);
                                        // Limit to 20 words (adjust the number as needed)
                                        if (words.length <= 20) {
                                            setCustomizations({ ...customizations, heading: e.target.value });
                                        }
                                    }}
                                    // placeholder="Welcome to the central hub for managing your Campus & School Management ERP solution."
                                    className="form-input"
                                />
                            </div>

                        </div>
                        <div className='relative mb-6 md:p-4 py-4 px-3 bg-body-color rounded-xl'>
                            <span className='inline-block font-semibold mb-4'>
                                Admin Motto/Quote Display:
                            </span>
                            <div className='mb-2 form-control'>
                                <label className="form-label">Motto</label>
                                <input
                                    type="text"
                                    id="font_url"
                                    value={customizations?.motto}
                                    onChange={(e) => {
                                        const words = e.target.value.trim().split(/\s+/);
                                        // Limit to 20 words (adjust the number as needed)
                                        if (words.length <= 20) {
                                            setCustomizations({ ...customizations, motto: e.target.value });
                                        }
                                    }}
                                    // placeholder="Welcome to the central hub for managing your Campus & School Management ERP solution."
                                    className="form-input"
                                />
                                <label className="form-label">Quote</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder="Leave a Quote here"
                                    rows="4"
                                    value={customizations?.quote}
                                    onChange={(e) => {
                                        const words = e.target.value.trim().split(/\s+/);
                                        // Limit to 20 words (adjust the number as needed)
                                        if (words.length <= 20) {
                                            setCustomizations({ ...customizations, quote: e.target.value });
                                        }
                                    }}
                                />
                            </div>
                            <div className='mb-4 form-control'>
                                <label className="form-label">Motto 2</label>
                                <input
                                    type="text"
                                    id="font_url"
                                    value={customizations?.motto2}
                                    onChange={(e) => {
                                        const words = e.target.value.trim().split(/\s+/);
                                        // Limit to 20 words (adjust the number as needed)
                                        if (words.length <= 20) {
                                            setCustomizations({ ...customizations, motto2: e.target.value });
                                        }
                                    }}
                                    // placeholder="Welcome to the central hub for managing your Campus & School Management ERP solution."
                                    className="form-input"
                                />
                                <label className="form-label">Quote 2</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder="Leave a Quote here"
                                    rows="4"
                                    value={customizations?.quote2}
                                    onChange={(e) => {
                                        const words = e.target.value.trim().split(/\s+/);
                                        // Limit to 20 words (adjust the number as needed)
                                        if (words.length <= 20) {
                                            setCustomizations({ ...customizations, quote2: e.target.value });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className='relative mb-6 md:p-4 py-4 px-3 border border-dashed border-primary rounded-xl'>
                            <span className='inline-block bg-card-color px-[5px] font-semibold text-primary absolute -top-3'>
                                Color Setting
                            </span>
                            <ul className='flex gap-2'>
                                {colorItem?.map((item, key) => (
                                    <li
                                        key={key}
                                        onClick={() => handleThemeChange(item?.name)}
                                        className={`sm:w-[30px] w-[24px] sm:h-[26px] h-[20px] rounded-md flex items-center justify-center relative cursor-pointer ${item?.color} ${customizations?.theme === item?.name ? 'after:absolute after:-left-1 after:-top-1 sm:after:w-[38px] after:w-[32px] sm:after:h-[34px] after:h-[28px] after:rounded-md after:border after:border-primary' : ''}`}
                                    >
                                        {item?.icon && <item.icon className='stroke-[1.5] w-[20px] h-[20px] cursor-pointer' />}
                                    </li>
                                ))}
                            </ul>
                            <div className='dynamic-color-setting relative md:p-4 py-4 px-3 border border-dashed border-primary rounded-xl mt-6'>
                                <span className='inline-block bg-card-color px-[5px] font-semibold text-primary absolute -top-3'>
                                    Dynamic Color Setting
                                </span>
                                <ul className='sm:columns-2 gap-2'>
                                    {dynamicColorItem?.map((item, index) => (
                                        <li key={index}>
                                            <div className='flex items-center gap-2'>
                                                <button
                                                    className={`w-[26px] h-[16px] rounded-md border border-border-color ${item?.color}`}
                                                    onClick={() => handleClickDynamicColor(index)}
                                                ></button>
                                                <label>
                                                    {item?.label}
                                                </label>
                                            </div>
                                            {item.displayColorPicker && (
                                                <div className='absolute z-[2]'>
                                                    <div onClick={() => handleCloseDynamicColor(index)} className='fixed top-0 right-0 bottom-0 left-0' />
                                                    <ChromePicker color={item?.colorValue} onChange={(newColor) => handleChangeDynamicColor(newColor, index)} />
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='relative mb-6 md:p-4 py-4 px-3 border border-dashed border-border-color rounded-xl'>
                            <span className='inline-block bg-card-color px-[5px] font-semibold absolute -top-3'>
                                Light/Dark & RTL Mode
                            </span>
                            <div className='flex'>
                                <div
                                    onClick={toggleDarkMode}
                                    className={`p-2 m-1 rounded-xl border cursor-pointer hover:bg-primary-10 ${!customizations?.darkMode ? 'bg-primary-10 border-dashed border-primary' : 'bg-card-color border-transparent'}`}
                                >
                                    <Image src={light_version} alt='light version' width={300} height={168} />
                                </div>
                                <div
                                    onClick={toggleDarkMode}
                                    className={`p-2 m-1 rounded-xl border cursor-pointer hover:bg-primary-10 ${customizations?.darkMode ? 'bg-primary-10 border-dashed border-primary' : 'bg-card-color border-transparent'}`}
                                >
                                    <Image src={dark_version} alt='dark version' width={300} height={168} />
                                </div>
                                <div
                                    onClick={toggleRtlMode}
                                    className={`p-2 m-1 rounded-xl border cursor-pointer hover:bg-primary-10 ${customizations?.rtlMode ? 'bg-primary-10 border-dashed border-primary' : 'bg-card-color border-transparent'}`}
                                >
                                    <Image src={rtl_version} alt='rtl version' width={300} height={168} />
                                </div>
                            </div>
                        </div>
                        <div className='relative mb-6 md:p-4 py-4 px-3 border border-dashed border-border-color rounded-xl'>
                            <span className='inline-block bg-card-color px-[5px] font-semibold absolute -top-3'>
                                Google Font Setting
                            </span>
                            <div className='flex'>
                                {fontItem?.map((item, key) => (
                                    <div
                                        key={key}
                                        onClick={() => toggleFontFamily(item?.font)}
                                        className={`p-2 m-1 rounded-xl border cursor-pointer hover:bg-primary-10 ${customizations?.fontFamily === item?.font ? 'bg-primary-10 border-dashed border-primary' : 'bg-card-color border-transparent'}`}
                                    >
                                        <Image src={item?.image} alt='font mali' width={79} height={44} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='relative mb-6 md:p-4 py-4 px-3 bg-body-color rounded-xl'>
                            <span className='inline-block font-semibold mb-4'>
                                Dynamic Font Setting
                            </span>
                            <div className='mb-2 form-control'>
                                <label className="form-label">Enter font URL</label>
                                <input
                                    type="text"
                                    id="font_url"
                                    value={customizations?.dynamicFont?.fontUrl || ""}
                                    onChange={(e) =>
                                        setCustomizations({
                                            ...customizations,
                                            dynamicFont: {
                                                ...customizations?.dynamicFont,
                                                fontUrl: e.target.value
                                            }
                                        })
                                    }
                                    className="form-input"
                                    placeholder="http://fonts.cdnfonts.com/css/vonfont"
                                />
                            </div>
                            <div className='mb-4 form-control'>
                                <label className="form-label">Enter font family name</label>
                                <input
                                    type="text"
                                    id="font_family"
                                    value={customizations?.dynamicFont?.fontLink || ""}
                                    onChange={(e) =>
                                        setCustomizations({
                                            ...customizations,
                                            dynamicFont: {
                                                ...customizations?.dynamicFont,
                                                fontLink: e.target.value
                                            }
                                        })
                                    }
                                    placeholder="vonfont"
                                    className="form-input"
                                />
                            </div>
                            <div className='flex items-start gap-[5px]'>
                                <button
                                    onClick={handleApply}
                                    className='btn btn-primary'
                                >
                                    Apply Font
                                </button>
                                <button
                                    onClick={handleClear}
                                    className='btn btn-secondary'
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className='mb-[5px]'>
                                More Setting
                            </div>
                            <ul>
                                <li className='py-3 px-4 border-b border-dashed border-border-color hover:bg-primary-10'>
                                    <div className="form-check form-switch">
                                        <input
                                            type="checkbox"
                                            id="radius_checkbox"
                                            onChange={radiusToggle}
                                            checked={customizations?.showRadius}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label" htmlFor="radius_checkbox">Border Radius</label>
                                    </div>
                                </li>
                                <li className='py-3 px-4 hover:bg-primary-10'>
                                    <div className="form-check form-switch">
                                        <input
                                            type="checkbox"
                                            id="shadow_checkbox"
                                            onChange={shadowToggle}
                                            checked={customizations?.showShadow}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label" htmlFor="shadow_checkbox">Card Box-Shadow</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='md:px-6 px-4 md:py-4 py-3 flex items-center gap-[10px] border-t border-border-color'>
                        <button className='btn btn-primary w-full' onClick={handleSave}>
                            Save Changes
                        </button>
                        <button className='btn btn-white !border-border-color w-full' onClick={toggleThemeSetting}>
                            Close
                        </button>
                    </div>
                </div>}
            </div>
        </>
    )
}
