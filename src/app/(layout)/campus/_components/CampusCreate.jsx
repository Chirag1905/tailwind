import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    getCampusPaginationRequest,
    postCampusFailure,
    postCampusRequest,
    postCampusSuccess,
} from '@/Redux/features/campus/campusSlice';
import { IconCopy, IconKeyFilled } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { sanitizeText } from '@/components/utils/sanitizeText';

const CampusCreate = (props) => {
    const {
        openModal,
        closeModal,
    } = props;

    // Redux state
    const dispatch = useDispatch();
    const { campusPostData, loading, error } = useSelector((state) => state.campus);
    const { token } = useSelector((state) => state.auth);

    // Component state
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({
        campusName: "",
        campusCode: "",
        primaryDomainName: "",
        campusEmailId: "",
        smsEnabled: false,
        emailEnabled: false,
        gpsEnabled: false,
        onlineMeetingEnabled: false,
        paymentGatewayEnabled: false,
        isActive: false
    });
    const [subDomain, setSubDomain] = useState("");

    // Function to update form data
    const updateFormData = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const hardCodedDomain = (e) => {
        const value = e
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, '')
            .replace(/^-+/, '')
            .replace(/-+$/, '');

        setSubDomain(value);
        setFormData(prev => ({
            ...prev,
            primaryDomainName: value ? `${value}.testmazing.com` : ""
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(postCampusRequest({ data: formData, token }));
        } catch (err) {
            console.error("Error submitting data:", err);
            toast.error(err || "Failed to submit data. Please try again.", {
                position: "top-right",
                duration: 2000,
            });
        }
    };

    // Handle API responses
    useEffect(() => {
        if (!campusPostData?.message) return;
        // Show credentials in a separate toast
        if (campusPostData?.data?.campusKeyCloakRealm) {
            const credentials = campusPostData?.data?.campusKeyCloakRealm;
            toast(
                (t) => (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        fontSize: '14px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(credentials.username);
                                    toast.success('Username copied!', { position: 'top-right' });
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                title="Copy username"
                            >
                                <IconCopy size={16} color="#4b5563" />
                            </button>
                            <span>Username: {credentials.username}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(credentials.temporaryPassword);
                                    toast.success('Password copied!', { position: 'top-right' });
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                title="Copy password"
                            >
                                <IconCopy size={16} color="#4b5563" />
                            </button>
                            <span>Password: {credentials.temporaryPassword}</span>
                        </div>
                    </div>
                ),
                {
                    position: 'top-right',
                    duration: 30000,
                    style: {
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#334155',
                        padding: '16px',
                        borderRadius: '8px'
                    },
                    icon: <span><IconKeyFilled fill="#f59e0b" color="#f59e0b" /></span>,
                }
            );
        }

        toast.success(campusPostData.message, {
            position: "top-right",
            duration: 4000,
        });
        // Refresh campus data
        dispatch(getCampusPaginationRequest({
            data: {
                page: 0,
                size: 10,
                sortBy: "id",
                ascending: true,
                searchFilter: "",
            },
            token
        }));
        dispatch(postCampusSuccess(null));
        closeModal();
    }, [campusPostData, closeModal]);

    // Handle API errors
    useEffect(() => {
        if (!error) return;
        if (Array.isArray(error.error)) {
            error.error.forEach((err) => {
                toast.error(`${err.field || 'Error'}: ${err.message}`, {
                    position: "top-right",
                    duration: 4000,
                });
            });
        } else if (error.message) {
            toast.error(error.message, { position: "top-right", duration: 2000 });
        } else {
            toast.error("An unexpected error occurred", { position: "top-right", duration: 2000 });
        }
        dispatch(postCampusSuccess(null));
        dispatch(postCampusFailure(null));
    }, [error]);

    return (
        <>
            <div className='py-6 md:py-[10px] px-4 md:px-[10px] mt-6 md:mt-[10px] bg-card-color border rounded-xl shadow-xl'>
                <div className='my-6 md:my-[10px] px-2 md:px-4 lg:px-[20px] max-h-[60svh] md:max-h-[80svh] overflow-auto cus-scrollbar'>
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                        <div className='text-lg md:text-2xl font-medium'>
                            New Campus
                        </div>
                        <span> Step {activeTab + 1} of 7</span>
                    </div>

                    {/* Flex container for tabs and content - changes to column on mobile */}
                    <div className="flex flex-col md:flex-row">
                        {/* Left Side Tabs - full width on mobile, 1/4 on desktop */}
                        <div className="w-full md:w-1/4 bg-card-color mb-4 md:mb-0">
                            <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 p-2 md:p-4 overflow-x-auto md:overflow-x-visible border rounded-xl shadow-sm">
                                {['Profile', 'Domain', 'Plugins', 'Email', 'SMS Setting', 'Plugin Settings', 'Gateways'].map((tab, index, array) => (
                                    <Fragment key={index}>
                                        <button
                                            key={`button-${index}`}
                                            className={`py-1 px-3 md:px-4 text-sm md:text-base text-left rounded-xl whitespace-nowrap ${activeTab === index
                                                ? 'bg-border-color text-primary border'
                                                : 'bg-card-color text-secondary hover:text-secondary hover:bg-border-color dark:hover:bg-border-color'
                                                }`}
                                            onClick={() => setActiveTab(index)}
                                        >
                                            {tab}
                                        </button>
                                        {index !== array.length - 1 && (
                                            <div key={`divider-${index}`} className='border-b border-border-color mx-3' />
                                        )}
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                        <div className='border-r border-border-color mx-3' />

                        {/* Right Side Content - full width on mobile, 3/4 on desktop */}
                        <div className="w-full md:w-3/4">
                            {activeTab === 0 && (
                                <div className="bg-card-color border rounded-xl shadow-sm px-10 py-4 h-full">
                                    <div className='mb-4'>
                                        <h2 className="text-xl font-semibold mb-3">
                                            Profile Settings
                                        </h2>
                                        <div className='border-b border-border-color' />
                                    </div>

                                    <div className="space-y-6 py-1">
                                        {/* Campus Name Field */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                                            <label htmlFor="campusName" className="md:w-1/3 flex items-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    Campus Name:
                                                </span>
                                                <div className="relative group ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg">
                                                        The official name of your campus
                                                    </div>
                                                </div>
                                            </label>
                                            <div className="md:w-3/4">
                                                <input
                                                    type="text"
                                                    id="campusName"
                                                    placeholder="Enter campus name"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none transition"
                                                    value={sanitizeText(formData?.campusName || "")}
                                                    onChange={(e) => updateFormData("campusName", e.target.value)}
                                                    aria-describedby="campusNameHelp"
                                                />
                                                <div id="campusNameHelp" className="sr-only">The official name of your campus</div>
                                            </div>
                                        </div>

                                        {/* Campus Code Field */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                                            <label htmlFor="campusCode" className="md:w-1/3 flex items-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    Campus Code:
                                                </span>
                                                <div className="relative group ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg">
                                                        Unique identifier for your campus
                                                    </div>
                                                </div>
                                            </label>
                                            <div className="md:w-3/4">
                                                <input
                                                    type="number"
                                                    id="campusCode"
                                                    placeholder="Enter campus code"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none transition"
                                                    value={formData?.campusCode || ""}
                                                    onChange={(e) => {
                                                        const digitsOnly = e.target.value.replace(/\D/g, '');
                                                        const limitedValue = digitsOnly.slice(0, 9);
                                                        updateFormData("campusCode", limitedValue);
                                                    }}
                                                    maxLength={9}
                                                    aria-describedby="campusCodeHelp"
                                                />
                                                <div id="campusCodeHelp" className="sr-only">Unique identifier for your campus</div>
                                            </div>
                                        </div>

                                        {/* Admin Email Field */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                                            <label htmlFor="campusEmail" className="md:w-1/3 flex items-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    Admin Email:
                                                </span>
                                                <div className="relative group ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg">
                                                        Primary contact email for campus admin
                                                    </div>
                                                </div>
                                            </label>
                                            <div className="md:w-3/4">
                                                <input
                                                    type="email"
                                                    id="campusEmail"
                                                    placeholder="admin@campus.edu"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none transition"
                                                    value={sanitizeText(formData?.campusEmailId || "")}
                                                    onChange={(e) => updateFormData("campusEmailId", e.target.value)}
                                                    aria-describedby="campusEmailHelp"
                                                />
                                                <div id="campusEmailHelp" className="sr-only">Primary contact email for campus admin</div>
                                            </div>
                                        </div>

                                        {/* GPS Enabled Toggle */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                                            <div className="md:w-1/3 flex items-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    GPS Enabled:
                                                </span>
                                                <div className="relative group ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg">
                                                        Enable location services for this campus
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:w-3/4 flex items-center">
                                                <label className="form-check form-switch inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className='form-check-input sr-only peer'
                                                        checked={formData?.gpsEnabled || false}
                                                        onChange={(e) => updateFormData("gpsEnabled", e.target.checked)}
                                                        aria-describedby="gpsEnabledHelp"
                                                    />
                                                    <span className="ml-3 text-sm font-medium text-primary">
                                                        {formData?.gpsEnabled ? "Enabled" : "Disabled"}
                                                    </span>
                                                </label>
                                                <div id="gpsEnabledHelp" className="sr-only">Enable location services for this campus</div>
                                            </div>
                                        </div>

                                        {/* Active Status Toggle */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                                            <div className="md:w-1/3 flex items-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    Is Active:
                                                </span>
                                                <div className="relative group ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg">
                                                        Activate or deactivate this campus profile
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:w-3/4 flex items-center">
                                                <label className="form-check form-switch inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className='form-check-input sr-only peer'
                                                        checked={formData?.isActive || false}
                                                        onChange={(e) => updateFormData("isActive", e.target.checked)}
                                                        aria-describedby="isActiveHelp"
                                                    />
                                                    <span className="ml-3 text-sm font-medium text-primary">
                                                        {formData?.isActive ? "Active" : "Inactive"}
                                                    </span>
                                                </label>
                                                <div id="isActiveHelp" className="sr-only">Activate or deactivate this campus profile</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 1 && (
                                <div className="bg-card-color border rounded-xl shadow-sm px-10 py-4 h-full">
                                    <div className='mb-4'>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                            Domain Settings
                                        </h2>
                                        <div className='border-b border-border-color' />
                                    </div>

                                    <div className="space-y-6 py-1">
                                        {/* Domain Name Field */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                                            <label htmlFor="campusEmail" className="md:w-1/3 flex items-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    Domain Name:
                                                </span>
                                                <div className="relative group ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg">
                                                        Primary domain assigned to Campus Admin. Only edit the subdomain part (before .testing.com)
                                                    </div>
                                                </div>
                                            </label>
                                            <div className="md:w-3/4 flex items-center">
                                                <div className="relative flex-grow">
                                                    <input
                                                        type="text"
                                                        id="campusDomainHelp"
                                                        placeholder="primaryDomainName"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-1 focus:outline-none transition"
                                                        value={sanitizeText(subDomain || "")}
                                                        onChange={(e) => hardCodedDomain(e.target.value)}
                                                        aria-describedby="campusDomainHelp"
                                                    />
                                                </div>
                                                <div className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-primary">
                                                    .testmazing.com
                                                </div>
                                            </div>
                                            <div id="campusDomainHelp" className="sr-only">
                                                Enter subdomain part only (e.g., "dev" for dev.testing.com)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 2 && (
                                <div className="bg-card-color border rounded-xl shadow-sm px-10 py-4 h-full">
                                    <div className='mb-4'>
                                        <h2 className="text-xl font-semibold mb-3">
                                            Plugins Settings
                                        </h2>
                                        <div className='border-b border-border-color' />
                                    </div>

                                    <div className="space-y-6 py-1">
                                        <div className='form-control'>
                                            <div className='flex flex-col md:flex-row justify-between mb-4 gap-2 md:gap-0'>
                                                <label className='form-label'>
                                                    Assign Plugins
                                                </label>
                                                <label className='form-label'>
                                                    All | Name
                                                </label>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {/* Plugins would go here */}
                                                <span className='text-secondary items-center text-center'>
                                                    Work In Progress
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 3 && (
                                <div className="bg-card-color border rounded-xl shadow-sm px-10 py-4 h-full">
                                    <div className='mb-4'>
                                        <h2 className="text-xl font-semibold mb-3">
                                            Email Settings
                                        </h2>
                                        <div className='border-b border-border-color' />
                                    </div>

                                    <div className="space-y-6 py-1">
                                        {/* Email Enabled Toggle */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                                            <div className="md:w-1/3 flex items-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    Email Enabled:
                                                </span>
                                                <div className="relative group ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg">
                                                        Enable Email services for this campus
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:w-3/4 flex items-center">
                                                <label className="form-check form-switch inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className='form-check-input sr-only peer'
                                                        checked={formData?.emailEnabled || false}
                                                        onChange={(e) => updateFormData("emailEnabled", e.target.checked)}
                                                        aria-describedby="emailEnabledHelp"
                                                    />
                                                    <span className="ml-3 text-sm font-medium text-primary">
                                                        {formData?.emailEnabled ? "Enabled" : "Disabled"}
                                                    </span>
                                                </label>
                                                <div id="emailEnabledHelp" className="sr-only">Enable Email services for this campus</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 4 && (
                                <div className="bg-card-color border rounded-xl shadow-sm px-10 py-4 h-full">
                                    <div className='mb-4'>
                                        <h2 className="text-xl font-semibold mb-3">
                                            SMS Settings
                                        </h2>
                                        <div className='border-b border-border-color' />
                                    </div>

                                    <div className="space-y-6 py-1">
                                        {/* SMS Enabled Toggle */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                                            <div className="md:w-1/3 flex items-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    SMS Enabled:
                                                </span>
                                                <div className="relative group ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg">
                                                        Enable SMS services for this campus
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:w-3/4 flex items-center">
                                                <label className="form-check form-switch inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className='form-check-input sr-only peer'
                                                        checked={formData?.smsEnabled || false}
                                                        onChange={(e) => updateFormData("smsEnabled", e.target.checked)}
                                                        aria-describedby="SMSEnabledHelp"
                                                    />
                                                    <span className="ml-3 text-sm font-medium text-primary">
                                                        {formData?.smsEnabled ? "Enabled" : "Disabled"}
                                                    </span>
                                                </label>
                                                <div id="SMSEnabledHelp" className="sr-only">Enable SMS services for this campus</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 5 && (
                                <div className="bg-card-color border rounded-xl shadow-sm px-10 py-4 h-full">
                                    <div className='mb-4'>
                                        <h2 className="text-xl font-semibold mb-3">
                                            Plugin Settings
                                        </h2>
                                        <div className='border-b border-border-color' />
                                    </div>

                                    <div className="space-y-6 py-1">
                                        {/* Plugin Enabled Toggle */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                                            <div className="md:w-1/3 flex items-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    Plugin Enabled:
                                                </span>
                                                <div className="relative group ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg">
                                                        Enable Plugin services for this campus
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:w-3/4 flex items-center">
                                                <label className="form-check form-switch inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className='form-check-input sr-only peer'
                                                        checked={formData?.onlineMeetingEnabled || false}
                                                        onChange={(e) => updateFormData("onlineMeetingEnabled", e.target.checked)}
                                                        aria-describedby="meetingEnabledHelp"
                                                    />
                                                    <span className="ml-3 text-sm font-medium text-primary">
                                                        {formData?.onlineMeetingEnabled ? "Enabled" : "Disabled"}
                                                    </span>
                                                </label>
                                                <div id="meetingEnabledHelp" className="sr-only">Enable Plugin services for this campus</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 6 && (
                                <div className="bg-card-color border rounded-xl shadow-sm px-10 py-4 h-full">
                                    <div className='mb-4'>
                                        <h2 className="text-xl font-semibold mb-3">
                                            Gateways Settings
                                        </h2>
                                        <div className='border-b border-border-color' />
                                    </div>

                                    <div className="space-y-6 py-1">
                                        {/* Plugin Enabled Toggle */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                                            <div className="md:w-1/3 flex items-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    Gateways Enabled:
                                                </span>
                                                <div className="relative group ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg">
                                                        Enable Gateways services for this campus
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:w-3/4 flex items-center">
                                                <label className="form-check form-switch inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className='form-check-input sr-only peer'
                                                        checked={formData?.paymentGatewayEnabled || false}
                                                        onChange={(e) => updateFormData("paymentGatewayEnabled", e.target.checked)}
                                                        aria-describedby="gatewayEnabledHelp"
                                                    />
                                                    <span className="ml-3 text-sm font-medium text-primary">
                                                        {formData?.paymentGatewayEnabled ? "Enabled" : "Disabled"}
                                                    </span>
                                                </label>
                                                <div id="gatewayEnabledHelp" className="sr-only">Enable Gateways services for this campus</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Buttons Section */}
                    <div className="flex flex-col-reverse md:flex-row justify-start gap-4 mt-10">
                        <button
                            onClick={closeModal}
                            className='btn btn-secondary flex-1 sm:flex-none'
                        >
                            Close
                        </button>
                        {activeTab < 6 && (
                            <button
                                className='btn btn-primary flex-1 sm:flex-none'
                                onClick={() => setActiveTab(activeTab + 1)}
                            >
                                Next
                            </button>
                        )}
                        {activeTab === 6 && (
                            <button
                                className='btn btn-primary flex-1 sm:flex-none'
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : 'Submit'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CampusCreate;