'use client';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { IconSquareRoundedX, IconSquareRoundedCheck } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { getCourseRegisterRequest, postCourseRegisterFailure, postCourseRegisterRequest, postCourseRegisterSuccess, updateCourseRegisterRequest } from '@/Redux/features/courseRegister/courseRegisterSlice';
import { DatePicker, Empty, Skeleton } from 'antd';
import dayjs from 'dayjs';
import LoadingSpinner from '@/components/utils/LoadingSpinner';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/common/Breadcrumb';
const { RangePicker } = DatePicker;

const RegisterCourse = () => {
    // Redux state
    const breadcrumbItem = useMemo(() => [
        { link: "academicsManagement", url: "/academicsManagement" },
        { link: "course", url: "/academicsManagement/course" },
        { name: "registerCourse" }
    ], []);
    const router = useRouter();
    const dispatch = useDispatch();
    const { courseRegisterData, courseRegisterPostData, loading, error } = useSelector((state) => state.courseRegister);
    const selectedAcademicYear = useSelector((state) => state.academicYear.selectedAcademicYear);
    const { token } = useSelector((state) => state.auth);

    // Component state
    const [data, setData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [errors, setErrors] = useState({});
    const fieldRefs = useRef({});

    // Effect for data update - automatically select rows where isActive is true
    useEffect(() => {
        if (courseRegisterData) {
            const formattedData = courseRegisterData?.data?.map(item => ({
                ...item,
                selected: item.isActive || false // Automatically select if isActive is true
            })) || [];
            setData(formattedData);

            // Update selectAll state if all active items are selected
            if (formattedData.length > 0) {
                setSelectAll(formattedData.every(item => item.selected));
            }
        }
    }, [courseRegisterData]);

    // Scroll to the first field with error
    const scrollToFirstError = () => {
        const firstErrorField = Object.keys(errors)[0];
        if (!firstErrorField) return;

        // Find which row has the error
        for (let i = 0; i < data.length; i++) {
            if (errors[`${firstErrorField}_${i}`]) {
                const fieldName = firstErrorField.split('_')[0];
                if (fieldRefs.current[i] && fieldRefs.current[i][fieldName] && fieldRefs.current[i][fieldName].current) {
                    fieldRefs.current[i][fieldName].current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    break;
                }
            }
        }
    };

    // Toggle select all checkboxes
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        setData(data.map(item => ({
            ...item,
            selected: isChecked
        })));
    };

    // Toggle individual checkbox
    const handleSelectItem = (index) => (e) => {
        const updatedData = [...data];
        updatedData[index].selected = e.target.checked;
        setData(updatedData);
        setSelectAll(updatedData.every(item => item.selected));
    };

    // Handle field changes
    const handleChange = (index, field) => (e) => {
        const updatedData = [...data];
        updatedData[index][field] = field === 'isDobValidation' || field === 'isActive'
            ? e.target.checked
            : e.target.value;
        setData(updatedData);

        // Clear error when user starts typing
        if (errors[`${field}_${index}`]) {
            const newErrors = { ...errors };
            delete newErrors[`${field}_${index}`];
            setErrors(newErrors);
        }
    };

    // Handle date field changes
    const handleDateChange = (index, dates, dateStrings) => {
        const updatedData = [...data];
        if (dates && dates.length === 2) {
            updatedData[index].dobStartDate = dates[0].format('DD-MM-YYYY');
            updatedData[index].dobEndDate = dates[1].format('DD-MM-YYYY');
        } else {
            updatedData[index].dobStartDate = '';
            updatedData[index].dobEndDate = '';
        }
        setData(updatedData);

        // Clear date errors when dates are selected
        if (errors[`dobStartDate_${index}`] || errors[`dobEndDate_${index}`]) {
            const newErrors = { ...errors };
            delete newErrors[`dobStartDate_${index}`];
            delete newErrors[`dobEndDate_${index}`];
            setErrors(newErrors);
        }
    };

    // Save changes - Only submit selected items and validate only selected fields
    const handleSubmit = async () => {
        try {
            // Filter only selected items
            const selectedItems = data.filter(item => item.selected);

            if (selectedItems.length === 0) {
                toast.error("Please select at least one course to update", {
                    position: "top-right",
                    duration: 2000,
                });
                return;
            }

            // Validate only selected items
            const validationErrors = {};

            selectedItems.forEach((item, index) => {
                const originalIndex = data.findIndex(d => d.campusCourseId === item.campusCourseId);

                if (!item.campusCourseName?.trim()) {
                    validationErrors[`campusCourseName_${originalIndex}`] = 'Course name is required';
                }
                if (!item.appFormPrefix?.trim()) {
                    validationErrors[`appFormPrefix_${originalIndex}`] = 'App form prefix is required';
                }
                if (item.regAmount === null || item.regAmount === undefined || item.regAmount === '') {
                    validationErrors[`regAmount_${originalIndex}`] = 'Registration amount is required';
                }
                if (item.isDobValidation && (!item.dobStartDate || !item.dobEndDate)) {
                    validationErrors[`dobStartDate_${originalIndex}`] = 'Date range is required when DOB validation is enabled';
                }
            });

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                setTimeout(scrollToFirstError, 100);
                return;
            }

            // Prepare payload with only selected items
            const payload = selectedItems.map(item => ({
                campusCourseId: item.campusCourseId,
                campusCourseName: item.campusCourseName,
                appFormPrefix: item.appFormPrefix,
                regAmount: item.regAmount,
                isDobValidation: item.isDobValidation,
                dobStartDate: item.dobStartDate,
                dobEndDate: item.dobEndDate,
                isActive: item.isActive
            }));

            // Dispatch update action
            dispatch(postCourseRegisterRequest({
                data: payload,
                token,
                selectedAcademicYear
            }));
        } catch (err) {
            console.error("Error submitting data:", err);
            toast.error(err || "Failed to submit data. Please try again.", {
                position: "top-right",
                duration: 2000,
            });
        }
    };

    // Effect for data fetching
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(getCourseRegisterRequest({ selectedAcademicYear, token }));
            } catch (error) {
                console.error("Error fetching campus group data:", error);
                toast.error("Failed to load campus group data");
            }
        };
        fetchData();
    }, [dispatch, selectedAcademicYear, token]);

    // Handle API response
    useEffect(() => {
        if (!courseRegisterPostData?.message) return;
        toast.success(courseRegisterPostData.message, {
            position: "top-right",
            duration: 4000,
        });

        router.push("/academicsManagement/course")
        // Refresh campus data
        dispatch(getCourseRegisterRequest({ selectedAcademicYear, token }));
        dispatch(postCourseRegisterSuccess(null));
    }, [dispatch, courseRegisterPostData, token]);

    // Handle API errors
    useEffect(() => {
        if (!error) return;

        // Handle backend validation errors
        if (Array.isArray(error.error)) {
            const newErrors = {};
            error.error.forEach((err) => {
                // Extract index from field name if it's in format "field_index"
                const fieldParts = err.field.split('_');
                let fieldName = err.field;
                let index = 0;

                if (fieldParts.length > 1 && !isNaN(fieldParts[fieldParts.length - 1])) {
                    index = parseInt(fieldParts[fieldParts.length - 1]);
                    fieldName = fieldParts.slice(0, -1).join('_');
                }

                newErrors[`${fieldName}_${index}`] = err.message;

                // Display error in toast
                toast.error(`${fieldName || 'Error'}: ${err.message}`, {
                    position: "top-right",
                    duration: 2000,
                });
            });
            setErrors(newErrors);

            // Scroll to the first error after a small delay to allow state to update
            setTimeout(scrollToFirstError, 100);
        } else if (error.message) {
            toast.error(`${error.message}`, { position: "top-right", duration: 5000 });
        } else {
            toast.error("An unexpected error occurred", { position: "top-right", duration: 2000 });
        }

        // Reset the success and failure flags in Redux
        dispatch(postCourseRegisterSuccess(null));
        dispatch(postCourseRegisterFailure(null));
    }, [error, dispatch]);

    // Convert stored dates to dayjs objects for RangePicker value
    const getRangePickerValue = (index) => {
        const item = data[index];
        return item.dobStartDate && item.dobEndDate
            ? [dayjs(item.dobStartDate, 'DD-MM-YYYY'), dayjs(item.dobEndDate, 'DD-MM-YYYY')]
            : null;
    };

    return (
        <>
            <Breadcrumb breadcrumbItem={breadcrumbItem} />
            <div className="my-10 py-6 md:py-7 px-5 sm:px-6 md:px-0 bg-card-color border rounded-xl shadow-xl">
                {/* Header Section */}
                <div className="flex flex-col px-5 md:mx-6 md:flex-row justify-between items-start md:items-center">
                    <h5 className="text-lg sm:text-xl font-medium">
                        Registration Courses Lists
                    </h5>
                </div>

                {/* Content Section */}
                <div className={`my-6 md:my-8 px-2 sm:px-4 md:px-10 h-fit md:h-max ${loading ? '' : 'overflow-auto cus-scrollbar'}`}>
                    {loading ? (
                        <div className="rounded-xl overflow-hidden border border-primary-10 shadow-sm overflow-x-auto cus-scrollbar">
                            <table className="w-full min-w-[600px] border-collapse">
                                <thead className='bg-primary-10'>
                                    <tr>
                                        {/* Checkbox column */}
                                        <th>
                                            <div className="form-check text-center py-3 px-4 md:px-6">
                                                <Skeleton.Button active style={{ width: 20, height: 20 }} className="rounded-full" />
                                            </div>
                                        </th>

                                        {/* Other columns */}
                                        {['Course Name', 'App Form Prefix', 'Reg Amount', 'DOB Validation', 'DOB Start Date & DOB End Date', 'Status'].map((header, i) => (
                                            <th key={i} className="py-3 px-4 md:px-6 font-medium text-gray-700 text-center">
                                                <Skeleton.Input active style={{ width: i === 0 ? 100 : i === 3 ? 120 : i === 4 ? 200 : 80, height: 24 }} className="rounded-md mx-auto" />
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(5)].map((_, rowIndex) => (
                                        <tr key={`row-${rowIndex}`} className="form-control border-b border-body-color hover:bg-body-color">
                                            {/* Checkbox */}
                                            <td className="form-check text-center py-4 px-4">
                                                <Skeleton.Button active style={{ width: 20, height: 20 }} className="rounded-full" />
                                            </td>

                                            {/* Course Name */}
                                            <td className="py-4 px-4 text-center">
                                                <Skeleton.Input active style={{ width: '90%', height: 32 }} className="rounded-lg" />
                                            </td>

                                            {/* App Form Prefix */}
                                            <td className="py-4 px-4 md:px-6 text-center">
                                                <Skeleton.Input active style={{ width: '80%', height: 32 }} className="rounded-lg" />
                                            </td>

                                            {/* Reg Amount */}
                                            <td className="py-4 px-4 md:px-6 text-center">
                                                <Skeleton.Input active style={{ width: '70%', height: 32 }} className="rounded-lg" />
                                            </td>

                                            {/* DOB Validation Toggle */}
                                            <td className="py-4 px-4 md:px-6 text-center">
                                                <Skeleton.Button active style={{ width: 40, height: 20 }} className="rounded-full" />
                                            </td>

                                            {/* DOB Date Range */}
                                            <td className="py-4 px-4 w-[320px]">
                                                <div className="flex gap-2">
                                                    <Skeleton.Input active style={{ width: '45%', height: 32 }} className="rounded-lg" />
                                                    <Skeleton.Input active style={{ width: '45%', height: 32 }} className="rounded-lg" />
                                                </div>
                                            </td>

                                            {/* Status Toggle */}
                                            <td className="py-4 px-4 text-center">
                                                <Skeleton.Button active style={{ width: 40, height: 20 }} className="rounded-full" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="rounded-xl overflow-hidden border border-primary-10 shadow-sm overflow-x-auto cus-scrollbar">
                            <table className="w-full min-w-[600px] border-collapse">
                                <thead className='bg-primary-10'>
                                    <tr>
                                        <th>
                                            <div className="form-check text-center py-3 px-4 md:px-6">
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                    className="!m-0 form-check-input !float-none h-5 w-10 rounded-full appearance-none"
                                                />
                                            </div>
                                        </th>
                                        <th className="py-3 px-4 md:px-6 font-medium text-gray-700 text-center">Course Name</th>
                                        <th className="py-3 px-4 md:px-6 font-medium text-gray-700 text-center">App Form Prefix</th>
                                        <th className="py-3 px-4 md:px-6 font-medium text-gray-700 text-center">Reg Amount</th>
                                        <th className="py-3 px-4 md:px-6 font-medium text-gray-700 text-center">DOB Validation</th>
                                        <th className="py-3 px-4 md:px-6 font-medium text-gray-700 text-center">DOB Start Date & DOB End Date</th>
                                        <th className="py-3 px-4 md:px-6 font-medium text-gray-700 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.length > 0 ? (
                                        data.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="form-control border-b border-body-color hover:bg-body-color"
                                            >
                                                {/* Checkbox */}
                                                <td className="form-check text-center py-4 px-4 ">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.selected || false}
                                                        onChange={handleSelectItem(index)}
                                                        className="form-check-input !float-none !m-0 h-5 w-5 rounded cursor-pointer"
                                                    />
                                                </td>

                                                {/* Course Name */}
                                                <td className="py-4 px-4  text-center" ref={el => {
                                                    if (!fieldRefs.current[index]) fieldRefs.current[index] = {};
                                                    fieldRefs.current[index].campusCourseName = { current: el };
                                                }}>
                                                    <input
                                                        type="text"
                                                        value={item.campusCourseName || ""}
                                                        onChange={handleChange(index, 'campusCourseName')}
                                                        className={`form-control ${errors[`campusCourseName_${index}`] ? 'border-red-500' : 'border-gray-300'} border rounded-lg px-2 py-1 text-sm w-full`}
                                                        disabled={!item.selected}
                                                    />
                                                    {errors[`campusCourseName_${index}`] && (
                                                        <p className="mt-1 text-xs text-red-600">{errors[`campusCourseName_${index}`]}</p>
                                                    )}
                                                </td>

                                                {/* App Form Prefix */}
                                                <td className="py-4 px-4 md:px-6 text-center" ref={el => {
                                                    if (!fieldRefs.current[index]) fieldRefs.current[index] = {};
                                                    fieldRefs.current[index].appFormPrefix = { current: el };
                                                }}>
                                                    <input
                                                        type="text"
                                                        value={item.appFormPrefix || ""}
                                                        onChange={handleChange(index, 'appFormPrefix')}
                                                        className={`form-control ${errors[`appFormPrefix_${index}`] ? 'border-red-500' : 'border-gray-300'} border rounded-lg px-2 py-1 text-sm w-full`}
                                                        disabled={!item.selected}
                                                    />
                                                    {errors[`appFormPrefix_${index}`] && (
                                                        <p className="mt-1 text-xs text-red-600">{errors[`appFormPrefix_${index}`]}</p>
                                                    )}
                                                </td>

                                                {/* Reg Amount */}
                                                <td className="py-4 px-4 md:px-6 text-center" ref={el => {
                                                    if (!fieldRefs.current[index]) fieldRefs.current[index] = {};
                                                    fieldRefs.current[index].regAmount = { current: el };
                                                }}>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={item.regAmount || ""}
                                                        onChange={handleChange(index, 'regAmount')}
                                                        className={`form-control ${errors[`regAmount_${index}`] ? 'border-red-500' : 'border-gray-300'} border rounded-lg px-2 py-1 text-sm w-full`}
                                                        disabled={!item.selected}
                                                    />
                                                    {errors[`regAmount_${index}`] && (
                                                        <p className="mt-1 text-xs text-red-600">{errors[`regAmount_${index}`]}</p>
                                                    )}
                                                </td>

                                                {/* DOB Validation */}
                                                <td className="py-4 px-4 md:px-6 text-center form-control" ref={el => {
                                                    if (!fieldRefs.current[index]) fieldRefs.current[index] = {};
                                                    fieldRefs.current[index].isDobValidation = { current: el };
                                                }}>
                                                    <div className=" !p-0 form-check form-switch flex items-center justify-center">
                                                        <input
                                                            type="checkbox"
                                                            className="!m-0 form-check-input h-5 w-10 rounded-full appearance-none bg-gray-300 checked:bg-blue-500 transition duration-200 cursor-pointer"
                                                            checked={item.isDobValidation || false}
                                                            onChange={handleChange(index, 'isDobValidation')}
                                                            disabled={!item.selected}
                                                        />
                                                    </div>
                                                </td>

                                                {/* DOB Start-End Range */}
                                                <td className="py-4 px-4  w-[320px]" ref={el => {
                                                    if (!fieldRefs.current[index]) fieldRefs.current[index] = {};
                                                    fieldRefs.current[index].dateRange = { current: el };
                                                }}>
                                                    <div className="form-control w-full">
                                                        <RangePicker
                                                            placeholder={["Start DOB Date", "End DOB Date"]}
                                                            className={`w-full ${errors[`dobStartDate_${index}`] ? 'border-red-500' : 'border-gray-300'} border rounded px-2 py-1 text-sm`}
                                                            onChange={(dates, dateStrings) => handleDateChange(index, dates, dateStrings)}
                                                            value={getRangePickerValue(index)}
                                                            allowEmpty
                                                            format="DD-MM-YYYY"
                                                            disabled={!item.isDobValidation || !item.selected}
                                                        />
                                                        {errors[`dobStartDate_${index}`] && (
                                                            <p className="mt-1 text-xs text-red-600">{errors[`dobStartDate_${index}`]}</p>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Active Status */}
                                                <td className="py-4 px-4  text-center form-control" ref={el => {
                                                    if (!fieldRefs.current[index]) fieldRefs.current[index] = {};
                                                    fieldRefs.current[index].isActive = { current: el };
                                                }}>
                                                    <div className="!p-0 form-check form-switch flex items-center justify-center">
                                                        <input
                                                            type="checkbox"
                                                            className=" !m-0 form-check-input h-5 w-10 rounded-full appearance-none bg-gray-300 checked:bg-blue-500 transition duration-200 cursor-pointer"
                                                            checked={item.isActive || false}
                                                            onChange={handleChange(index, 'isActive')}
                                                            disabled={!item.selected}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center py-6 px-4 ">
                                                <Empty
                                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                    description="No Courses Available For Registration"
                                                    className="flex flex-col items-center justify-center"
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                {/* Buttons */}
                <div className="flex flex-col-reverse md:flex-row md:justify-start items-stretch md:items-center gap-3 mt-5 px-5 md:mx-6 w-full">
                    <button
                        onClick={() => router.push("/academicsManagement/course")}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:text-primary hover:border-primary transition-colors duration-200 w-full md:w-auto"
                    >
                        Close
                        <IconSquareRoundedX className="w-5 h-5 text-current" />
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary border border-primary-10 text-white hover:bg-primary-dark disabled:opacity-80 disabled:cursor-wait transition-colors duration-200 w-full md:w-auto group"
                    >
                        {loading ? (
                            <>
                                Processing...
                                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                            </>
                        ) : (
                            <>
                                Submit
                                <IconSquareRoundedCheck className="w-5 h-5 text-white" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}

export default RegisterCourse;