'use client';

import Link from 'next/link';
import { IconBrandFacebookFilled, IconBrandGithubFilled, IconBrandTwitterFilled, IconBrandYoutubeFilled } from '@tabler/icons-react';
import { Techvein_logo, profile_av } from '@/assets/images/';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchDataRequest } from '@/Redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomizationRequest } from '@/Redux/features/customization/customizationSlice';

export default function AuthLayout({ children }) {
    const {
        signInLoading,
        signInData,
        signInError,
        fetchDataLoading,
        fetchData,
        fetchDataError
    } = useSelector((state) => state.auth);
    const customizationData = useSelector((state) => state.customization.customizationData);
    // console.log("🚀 ~ AuthLayout ~ customizationData:", customizationData)
    const dispatch = useDispatch();
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

    useEffect(() => {
        if (customizationData) {
            document.documentElement.setAttribute('data-theme', customizationData.darkMode ? 'dark' : 'light');
        }
    }, [customizationData]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-body-color py-4 px-4 sm:px-6">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 xl:gap-12 max-w-7xl">
                {/* Left Content */}
                <div className="w-full lg:w-1/2 max-w-2xl text-center lg:text-left px-2 sm:px-0">
                    <div className="mb-4 sm:mb-6 lg:mb-8">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-3 sm:mb-4">
                            <Image
                                src={customizationData?.schoolLogo || profile_av}
                                // src={profile_av}
                                alt="Campus Logo"
                                className="text-primary rounded-full"
                                width={64}
                                height={64}
                                sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 116px"
                                priority
                            />
                            <span className="text-primary font-bold text-xl sm:text-2xl lg:text-3xl">
                                {customizationData?.schoolName || "Demo School Portal"}
                            </span>
                        </div>

                        <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl lg:text-2xl font-medium">
                            {customizationData?.heading || "Effortless Control, Powerful Management."}
                        </h2>

                        <div className="mb-4 sm:mb-6">
                            <p className="text-base sm:text-lg lg:text-xl mb-1 sm:mb-2 font-medium">
                                {customizationData?.motto || "All-in-One Tool"}
                            </p>
                            <p className="text-xs text-justify sm:text-sm lg:text-base text-gray-600">
                                {customizationData?.quote || "Welcome to the central hub for managing your Campus & School Management ERP solution. Streamline administration, improve efficiency, and stay organized — all from one place. /n Welcome to the central hub for managing your Campus & School Management ERP solution. Streamline administration, improve efficiency, and stay organized — all from one place."}
                            </p>
                        </div>

                        <div className="mb-4 sm:mb-6">
                            <p className="text-base sm:text-lg lg:text-xl mb-1 sm:mb-2 font-medium">
                                {customizationData?.motto2 || "Log in to take full control of your ERP ecosystem."}
                            </p>
                            <p className="text-xs text-justify sm:text-sm lg:text-base text-gray-600">
                                {customizationData?.quote2 || "Built on a robust AWS microservices architecture, this portal empowers SSAS administrators with seamless access to configure, monitor, and support tenant environments in real time.Built on a robust AWS microservices architecture, this portal empowers SSAS administrators with seamless access to configure, monitor, and support tenant environments in real time."}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <Link href="#" className="text-xs sm:text-sm transition-all hover:text-primary">
                                Home
                            </Link>
                            <Link href="#" className="text-xs sm:text-sm transition-all hover:text-primary">
                                About Us
                            </Link>
                            <Link href="#" className="text-xs sm:text-sm transition-all hover:text-primary">
                                FAQs
                            </Link>
                        </div>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                            <Link href="#" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary flex items-center justify-center text-white transition-all hover:bg-secondary">
                                <IconBrandFacebookFilled className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Link>
                            <Link href="#" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary flex items-center justify-center text-white transition-all hover:bg-secondary">
                                <IconBrandTwitterFilled className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Link>
                            <Link href="#" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary flex items-center justify-center text-white transition-all hover:bg-secondary">
                                <IconBrandGithubFilled className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Link>
                            <Link href="#" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary flex items-center justify-center text-white transition-all hover:bg-secondary">
                                <IconBrandYoutubeFilled className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Content (Sign In Box) */}
                <div className="w-full sm:max-w-sm md:max-w-md px-2 sm:px-0">
                    <div className="bg-card-color rounded-2xl p-4 sm:p-5 shadow-md w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}