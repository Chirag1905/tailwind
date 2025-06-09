import { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
    getCampusGroupPaginationRequest,
    postCampusGroupFailure,
    postCampusGroupRequest,
    postCampusGroupSuccess
} from '@/Redux/features/campusGroup/campusGroupSlice';
import { sanitizeText } from '@/components/utils/sanitizeText';
import TextField from '@/components/utils/TextField';

const CampusGroupCreate = (props) => {
    const {
        openModal,
        closeModal,
    } = props;

    // Redux state
    const dispatch = useDispatch();
    const { campusGroupPostData, loading, error } = useSelector((state) => state.campusGroup);
    const { token } = useSelector((state) => state.auth);

    // Component state
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({
        campusGroupName: "",
        licenseCount: "",
        gpsEnabled: false,
        zoomEnabled: false,
        isActive: false,
    });
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const fieldRefs = useRef({
        campusGroupName: null,
        licenseCount: null,
        gpsEnabled: null,
        zoomEnabled: null,
        isActive: null,
    });

    // Function to update form data
    const handleChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(postCampusGroupRequest({ data: formData, token }));
        } catch (err) {
            console.error("Error submitting data:", err);
            toast.error(err || "Failed to submit data. Please try again.", {
                position: "top-right",
                duration: 2000,
            });
        }
    };

    const handleBlur = (name) => {
        if (!touchedFields[name]) {
            setTouchedFields(prev => ({
                ...prev,
                [name]: true
            }));
        }
    };

    // Scroll to the first field with error
    const scrollToFirstError = () => {
        const firstErrorField = Object.keys(errors)[0];
        if (!firstErrorField) return;

        let refToScroll = null;

        // Map field names to their refs
        if (firstErrorField === 'campusGroupName') {
            refToScroll = fieldRefs.current.campusGroupName;
        } else if (firstErrorField === 'licenseCount') {
            refToScroll = fieldRefs.current.licenseCount;
        } else if (firstErrorField === 'gpsEnabled') {
            refToScroll = fieldRefs.current.gpsEnabled;
        } else if (firstErrorField === 'zoomEnabled') {
            refToScroll = fieldRefs.current.zoomEnabled;
        } else if (firstErrorField === 'isActive') {
            refToScroll = fieldRefs.current.isActive;
        }

        if (refToScroll && refToScroll.current) {
            refToScroll.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    // Handle API responses
    useEffect(() => {
        if (!campusGroupPostData?.message) return;
        toast.success(campusGroupPostData.message, {
            position: "top-right",
            duration: 4000,
        });

        // Refresh campus data
        dispatch(getCampusGroupPaginationRequest({
            data: {
                page: 0,
                size: 10,
                sortBy: "id",
                ascending: true,
                searchFilter: "",
            },
            token
        }));
        dispatch(postCampusGroupSuccess(null));
        closeModal();
    }, [campusGroupPostData, closeModal, token]);

    // Handle API errors
    useEffect(() => {
        if (!error) return;
        // Handle backend validation errors
        if (Array.isArray(error.error)) {
            const newErrors = {};
            error.error.forEach((err) => {
                newErrors[err.field] = err.message;
                // Display error in toast
                toast.error(`${err.field || 'Error'}: ${err.message}`, {
                    position: "top-right",
                    duration: 2000,
                });
            });
            setErrors(newErrors);

            // Scroll to the first error after a small delay to allow state to update
            setTimeout(scrollToFirstError, 100);
        } else if (error.message) {
            toast.error(error.message, { position: "top-right", duration: 2000 });
        } else {
            toast.error("An unexpected error occurred", { position: "top-right", duration: 2000 });
        }
        dispatch(postCampusGroupSuccess(null));
        dispatch(postCampusGroupFailure(null));
    }, [error]);

    return (
        <>
            <div className='py-6 md:py-[10px] px-4 md:px-[10px] mt-6 md:mt-[10px] bg-card-color border rounded-xl shadow-xl'>
                <div className='my-6 md:my-[10px] px-2 md:px-4 lg:px-[20px] max-h-[60svh] md:max-h-[80svh] overflow-auto cus-scrollbar'>
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                        <div className='text-lg md:text-2xl font-medium'>
                            New Campus Group
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
                                        {/* Campus Group Name Field */}
                                        {/* <div className="w-full" ref={fieldRefs.current.campusGroupName}>
                                            <TextField
                                                label="Campus Group Name"
                                                placeholder="Enter Campus Group Name"
                                                name="campusGroupName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={formData.campusGroupName}
                                                error={errors.campusGroupName}
                                                required
                                            />
                                        </div> */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                                            <label htmlFor="campusGroupName" className="md:w-1/3 flex items-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    Campus Group Name:
                                                </span>
                                                <div className="relative group ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg">
                                                        The official name of your campus group
                                                    </div>
                                                </div>
                                            </label>
                                            <div className="md:w-3/4">
                                                <input
                                                    type="text"
                                                    id="campusGroupName"
                                                    placeholder="Enter campus name"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none transition"
                                                    value={sanitizeText(formData?.campusGroupName || "")}
                                                    onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                                    aria-describedby="campusGroupNameHelp"
                                                />
                                                <div id="campusGroupNameHelp" className="sr-only">The official name of your campus group</div>
                                            </div>
                                        </div>

                                        {/* Campus Code Field */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                                            <label htmlFor="licenseCount" className="md:w-1/3 flex items-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    Campus Group License Count:
                                                </span>
                                                <div className="relative group ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg">
                                                        Unique identifier for your campus group
                                                    </div>
                                                </div>
                                            </label>
                                            <div className="md:w-3/4">
                                                <input
                                                    type="number"
                                                    id="licenseCount"
                                                    placeholder="Enter campus code"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none transition"
                                                    value={formData?.licenseCount || ""}
                                                    onChange={(e) => {
                                                        const digitsOnly = e.target.value.replace(/\D/g, '');
                                                        const limitedValue = digitsOnly.slice(0, 9);
                                                        updateFormData("licenseCount", limitedValue);
                                                    }}
                                                    maxLength={9}
                                                    aria-describedby="licenseCountHelp"
                                                />
                                                <div id="licenseCountHelp" className="sr-only">Unique identifier for your licenseCount</div>
                                            </div>
                                        </div>

                                        {/* Admin Email Field */}
                                        {/* <div className="flex flex-col md:flex-row md:items-center gap-5">
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
                                        </div> */}

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
                                                        Enable location services for this campus group
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

                                        {/* Zoom Enabled Toggle */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                                            <div className="md:w-1/3 flex items-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    Zoom Enabled:
                                                </span>
                                                <div className="relative group ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg">
                                                        Enable Zoom services for this campus group
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:w-3/4 flex items-center">
                                                <label className="form-check form-switch inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className='form-check-input sr-only peer'
                                                        checked={formData?.zoomEnabled || false}
                                                        onChange={(e) => updateFormData("zoomEnabled", e.target.checked)}
                                                        aria-describedby="zoomEnabledHelp"
                                                    />
                                                    <span className="ml-3 text-sm font-medium text-primary">
                                                        {formData?.zoomEnabled ? "Enabled" : "Disabled"}
                                                    </span>
                                                </label>
                                                <div id="zoomEnabledHelp" className="sr-only">Enable Zoom services for this campus</div>
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
                                                        Activate or deactivate this campus group profile
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
                                                <div id="isActiveHelp" className="sr-only">Activate or deactivate this campus group profile</div>
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
                                        {/* <div className="flex flex-col md:flex-row md:items-center gap-5">
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
                                        </div> */}
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
                                        {/* <div className="flex flex-col md:flex-row md:items-center gap-5">
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
                                        </div> */}
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
                                        {/* <div className="flex flex-col md:flex-row md:items-center gap-5">
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
                                        </div> */}
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
                                        {/* <div className="flex flex-col md:flex-row md:items-center gap-5">
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
                                        </div> */}
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
                                        {/* <div className="flex flex-col md:flex-row md:items-center gap-5">
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
                                        </div> */}
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

export default CampusGroupCreate;