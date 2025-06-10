import { createRef, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import {
    getCampusGroupFetchRequest,
    getCampusGroupPaginationRequest,
    putCampusGroupFailure,
    putCampusGroupRequest,
    putCampusGroupSuccess
} from '@/Redux/features/campusGroup/campusGroupSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { IconBooksOff, IconChevronLeftPipe, IconChevronRightPipe, IconSquareRoundedCheck, IconSquareRoundedX } from '@tabler/icons-react';
import { sanitizeText } from '@/components/utils/sanitizeText';
import TextField from '@/components/utils/TextField';

const CampusGroupEdit = (props) => {
    const {
        openModal,
        closeModal,
        selectedItem,
        setSelectedItem
    } = props;

    // Memoized selectors to prevent unnecessary re-renders
    const selectCampusGroup = useCallback((state) => state.campusGroup, []);
    const selectAuth = useCallback((state) => state.auth, []);

    // Redux state
    const dispatch = useDispatch();
    const { campusGroupFetchData, campusGroupPutData, loading, error } = useSelector(selectCampusGroup);
    const { token } = useSelector(selectAuth);

    // Component state
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const fieldRefs = useRef({
        campusGroupName: createRef(),
        licenseCount: createRef(),
        gpsEnabled: createRef(),
        zoomEnabled: createRef(),
        isActive: createRef(),
    });

    // Memoized form data update
    const handleChange = useCallback((name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Clear error when user starts typing
        setErrors(prev => (prev[name] ? { ...prev, [name]: undefined } : prev));
    }, []);

    // License count specific handler
    const handleLicenseCountChange = useCallback((name, value) => {
        // Handle both direct value and event object
        const inputValue = typeof value === 'string' ? value : (value?.target?.value || '');
        const digitsOnly = inputValue.replace(/\D/g, '');
        const limitedValue = digitsOnly.slice(0, 9);
        handleChange("licenseCount", limitedValue);
    }, [handleChange]);

    // Memoized success/close handler
    const handleSuccessOrClose = useCallback(() => {
        setErrors({});
        dispatch(putCampusGroupSuccess(null));
        closeModal();
    }, [dispatch, closeModal]);

    // Form submission handler
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            dispatch(putCampusGroupRequest({
                data: formData,
                id: selectedItem?.id,
                token,
            }));
        } catch (err) {
            console.error("Error submitting data:", err);
            toast.error(err?.message || "Failed to submit data. Please try again.", {
                position: "top-right",
                duration: 2000,
            });
        };
    }, [formData, token, dispatch]);

    // Memoized scroll to error function
    const scrollToFirstError = useCallback(() => {
        const firstErrorField = Object.keys(errors)[0];
        if (!firstErrorField) return;

        const ref = fieldRefs.current[firstErrorField];
        if (ref?.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [errors]);

    //  const modules = [
    //     "Instant Fee",
    //     "Discussion",
    //     "Online Exam",
    //     "Data Management",
    //     "Gallery",
    //     "Custom Report",
    //     "Assignment",
    //     "Task",
    //     "Placement",
    //     "Online Meeting",
    //     "Moodle",
    //     "Applicant Registration",
    //     "Blog",
    //     "Data Profile",
    //     "App Frame",
    //   ];

    //  const handleModuleChange = (module) => {
    //     if (selectedModules.includes(module)) {
    //       setSelectedModules(selectedModules.filter((m) => m !== module));
    //     } else {
    //       setSelectedModules([...selectedModules, module]);
    //     }
    //   };

    useEffect(() => {
        if (selectedItem) {
            dispatch(getCampusGroupFetchRequest({
                id: selectedItem?.id,
                token,
            }));
        }
    }, [selectedItem]);

    useEffect(() => {
        if (campusGroupFetchData?.data) {
            const {
                campusGroupName,
                licenseCount,
                gpsEnabled,
                zoomEnabled,
                isActive,
            } = campusGroupFetchData?.data;
            setFormData({
                campusGroupName: campusGroupName || "N/A",
                licenseCount: licenseCount || "N/A",
                gpsEnabled: gpsEnabled || false,
                zoomEnabled: zoomEnabled || false,
                isActive: isActive || false,
            });
        }
    }, [campusGroupFetchData]);

    // Handle successful API response
    useEffect(() => {
        if (!campusGroupPutData?.message) return;
        toast.success(campusGroupPutData.message, {
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
        handleSuccessOrClose();
    }, [campusGroupPutData, handleSuccessOrClose, token, dispatch]);

    // Handle API errors
    useEffect(() => {
        if (!error) return;
        // Handle backend validation errors
        if (Array.isArray(error.error)) {
            const newErrors = error.error.reduce((acc, err) => {
                acc[err.field] = err.message;
                return acc;
            }, {});
            toast.error('Oops! Some details are missing or incorrect.', {
                position: "top-right",
                duration: 2000,
            });
            setErrors(newErrors);
            setTimeout(scrollToFirstError, 100);
        } else {
            toast.error(error.message || "An unexpected error occurred", {
                position: "top-right",
                duration: 2000
            });
        }
        dispatch(putCampusGroupSuccess(null));
        dispatch(putCampusGroupFailure(null));
    }, [error, scrollToFirstError, dispatch]);

    return (
        <>
            <div className='py-6 md:py-[10px] px-4 md:px-[10px] mt-6 md:mt-[10px] bg-card-color border rounded-xl shadow-xl'>
                <div className='my-6 md:my-[10px] px-2 md:px-4 lg:px-[20px] max-h-[60svh] md:max-h-[80svh] overflow-auto cus-scrollbar'>
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                        <div className='text-lg md:text-2xl font-medium'>
                            Modify Campus Group
                        </div>
                        <span> Step {activeTab + 1} of 7</span>
                        <button
                            onClick={closeModal}
                            className="flex gap-1 btn btn-light-primary mt-2"
                        >
                            <IconBooksOff />
                            <span className="md:block hidden">Deactivate Campus</span>
                        </button>
                    </div>

                    {/* Flex container for tabs and content - changes to column on mobile */}
                    <div className="flex flex-col md:flex-row">
                        {/* Left Side Tabs - full width on mobile, 1/4 on desktop */}
                        <div className="w-full md:w-1/4 bg-card-color mb-4 md:mb-0">
                            <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 p-2 sm:p-3 md:p-4 overflow-x-auto md:overflow-x-visible border rounded-xl shadow-sm">
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

                        <div className="hidden md:block border-r border-border-color mx-3" />
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
                                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                                            <label htmlFor="campusGroupName" className="md:w-1/3 flex items-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    Campus Group Name:
                                                </span>
                                                <div className="relative group ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-card-color border border-gray-200 rounded-md shadow-lg">
                                                        The official name of your campus group
                                                    </div>
                                                </div>
                                            </label>
                                            <div className="md:w-3/4">
                                                <TextField
                                                    placeholder="Enter Campus Group Name"
                                                    name="campusGroupName"
                                                    onChange={handleChange}
                                                    value={formData.campusGroupName}
                                                    error={errors.campusGroupName}
                                                    required
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
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-card-color border border-gray-200 rounded-md shadow-lg">
                                                        Unique identifier for your campus group
                                                    </div>
                                                </div>
                                            </label>
                                            <div className="md:w-3/4">
                                                <TextField
                                                    placeholder="Enter Campus Group Code"
                                                    name="licenseCount"
                                                    onChange={handleLicenseCountChange}
                                                    value={formData.licenseCount}
                                                    error={errors.licenseCount}
                                                    required
                                                />
                                                <div id="licenseCountHelp" className="sr-only">Unique identifier for your licenseCount</div>
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
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-card-color border border-gray-200 rounded-md shadow-lg">
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
                                                        onChange={(e) => handleChange("gpsEnabled", e.target.checked)}
                                                        aria-describedby="gpsEnabledHelp"
                                                    />
                                                    <span className="ml-3 text-sm font-medium text-primary">
                                                        {formData?.gpsEnabled ? "Enabled" : "Disabled"}
                                                    </span>
                                                    {errors.gpsEnabled && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.gpsEnabled}</p>
                                                    )}
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
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-card-color border border-gray-200 rounded-md shadow-lg">
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
                                                        onChange={(e) => handleChange("zoomEnabled", e.target.checked)}
                                                        aria-describedby="zoomEnabledHelp"
                                                    />
                                                    <span className="ml-3 text-sm font-medium text-primary">
                                                        {formData?.zoomEnabled ? "Enabled" : "Disabled"}
                                                    </span>
                                                    {errors.zoomEnabled && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.zoomEnabled}</p>
                                                    )}
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
                                                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 -ml-2 text-xs text-gray-600 bg-card-color border border-gray-200 rounded-md shadow-lg">
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
                                                        onChange={(e) => handleChange("isActive", e.target.checked)}
                                                        aria-describedby="isActiveHelp"
                                                    />
                                                    <span className="ml-3 text-sm font-medium text-primary">
                                                        {formData?.isActive ? "Active" : "Inactive"}
                                                    </span>
                                                    {errors.isActive && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.isActive}</p>
                                                    )}
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
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse md:flex-row md:justify-start items-stretch md:items-center gap-3 mt-5 w-full">
                        {/* Close button - only shown on tab 1 */}
                        {activeTab === 0 && (
                            <button
                                onClick={handleSuccessOrClose}
                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:text-primary hover:border-primary transition-colors duration-200 w-full md:w-auto"
                            >
                                Close
                                <IconSquareRoundedX className="w-5 h-5 text-current" />
                            </button>
                        )}

                        {/* Previous button - shown on all tabs except first */}
                        {activeTab > 0 && (
                            <button
                                onClick={() => setActiveTab(activeTab - 1)}
                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:text-primary hover:border-primary transition-colors duration-200 w-full md:w-auto"
                            >
                                <IconChevronLeftPipe className="w-5 h-5 text-current" />
                                Previous
                            </button>
                        )}

                        {/* Next button - shown on all tabs except last */}
                        {activeTab < 6 && (
                            <button
                                onClick={() => setActiveTab(activeTab + 1)}
                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary border border-primary-10 text-card-color hover:bg-primary-dark disabled:opacity-80 disabled:cursor-wait transition-colors duration-200 w-full md:w-auto group"
                            >
                                Next
                                <IconChevronRightPipe className="w-5 h-5 text-card-color" />
                            </button>
                        )}

                        {/* Submit button - only shown on last tab */}
                        {activeTab === 6 && (
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary border border-primary-10 text-card-color hover:bg-primary-dark disabled:opacity-80 disabled:cursor-wait transition-colors duration-200 w-full md:w-auto group"
                            >
                                {loading ? (
                                    <>
                                        Updating...
                                        <div className="w-5 h-5 border-2 border-t-transparent border-card-color rounded-full animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Update
                                        <IconSquareRoundedCheck className="w-5 h-5 text-card-color" />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CampusGroupEdit;