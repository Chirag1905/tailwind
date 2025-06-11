'use client';
import {
  getAcademicYearPaginationRequest,
  postAcademicYearRequest,
  postAcademicYearSuccess,
  postAcademicYearFailure,
} from "@/Redux/features/academicYear/academicYearSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import CustomDropdown from "@/components/utils/CustomDropdown";
import { IconSquareRoundedCheck, IconSquareRoundedX } from "@tabler/icons-react";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const AcademicYearCreate = (props) => {
  const {
    openModal,
    closeModal,
  } = props;

  // Redux state
  const dispatch = useDispatch();
  const { academicYearPostData, loading, error } = useSelector((state) => state.academicYear);
  const { token } = useSelector((state) => state.auth);

  // Component state
  const [formData, setFormData] = useState({
    academicYearName: "",
    startDate: "",
    endDate: "",
    isActive: false,
  });

  const [errors, setErrors] = useState({});
  const fieldRefs = useRef({
    academicYearName: null,
    isActive: null,
    dateRange: null
  });

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 1;
  const endYear = currentYear + 5;
  const academicYears = [];

  for (let year = startYear; year < endYear; year++) {
    academicYears.push({
      value: `${year}-${year + 1}`,
      label: `${year}-${year + 1}`,
    });
  }

  // Handle date range selection
  const handleDateRangeChange = (dates, dateStrings) => {
    if (dates && dates.length === 2) {
      setFormData(prev => ({
        ...prev,
        startDate: dates[0].format('DD-MM-YYYY'),
        endDate: dates[1].format('DD-MM-YYYY')
      }));
      // Clear date errors when dates are selected
      setErrors(prev => ({
        ...prev,
        startDate: undefined,
        endDate: undefined
      }));
    } else {
      // Clear dates if selection is cancelled
      setFormData(prev => ({
        ...prev,
        startDate: "",
        endDate: ""
      }));
    }
  };

  // Convert stored dates to dayjs objects for RangePicker value
  const rangePickerValue = formData.startDate && formData.endDate
    ? [dayjs(formData.startDate, 'DD-MM-YYYY'), dayjs(formData.endDate, 'DD-MM-YYYY')]
    : null;

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

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(postAcademicYearRequest({ data: formData, token }));
    } catch (err) {
      console.error("Error submitting data:", err);
      toast.error(err || "Failed to submit data. Please try again.", {
        position: "top-right",
        duration: 2000,
      });
    };
  };

  // Scroll to the first field with error
  const scrollToFirstError = () => {
    const firstErrorField = Object.keys(errors)[0];
    if (!firstErrorField) return;

    let refToScroll = null;

    // Map field names to their refs
    if (firstErrorField === 'academicYearName') {
      refToScroll = fieldRefs.current.academicYearName;
    } else if (firstErrorField === 'isActive') {
      refToScroll = fieldRefs.current.isActive;
    } else if (firstErrorField === 'startDate' || firstErrorField === 'endDate') {
      refToScroll = fieldRefs.current.dateRange;
    }

    if (refToScroll && refToScroll.current) {
      refToScroll.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Handle API response
  useEffect(() => {
    if (!academicYearPostData?.message) return;
    toast.success(academicYearPostData.message, {
      position: "top-right",
      duration: 4000,
    });

    // Refresh campus data
    dispatch(getAcademicYearPaginationRequest({
      data: {
        page: 0,
        size: 10,
        sortBy: "id",
        ascending: true,
        searchFilter: "",
      },
      token
    }));
    dispatch(postAcademicYearSuccess(null));
    closeModal();
  }, [dispatch, academicYearPostData, closeModal, token]);

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
      toast.error(`${error.message}`, { position: "top-right", duration: 5000 });
    } else {
      toast.error("An unexpected error occurred", { position: "top-right", duration: 2000 });
    }

    // Reset the success and failure flags in Redux
    dispatch(postAcademicYearSuccess(null));
    dispatch(postAcademicYearFailure(null));
  }, [error, dispatch]);

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-6 bg-card-color rounded-xl shadow-xl border">
      <h5 className="text-left px-1 text-lg md:text-xl font-semibold mb-6">
        Create Academic Year
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6 border rounded-xl">
        {/* Academic Year Name */}
        <div className="w-full" ref={fieldRefs.current.academicYearName}>
          <CustomDropdown
            name="academicYearName"
            onChange={(value) => handleChange('academicYearName', value)}
            showSearch
            options={academicYears}
            label="Academic Year Name"
            placeholder="Select Academic Year Name"
            error={errors.academicYearName}
            virtual={false}
            required
          />
        </div>

        {/* Status */}
        <div className="w-full form-control" ref={fieldRefs.current.isActive}>
          <label className="block font-medium mb-1 form-label">
            Status <span className="text-red-500">*</span>
          </label>
          <div className="form-check form-switch flex items-center gap-3 mt-1">
            <input
              type="checkbox"
              className="form-check-input h-5 w-10 rounded-full appearance-none bg-gray-300 checked:bg-blue-500 transition duration-200 relative cursor-pointer"
              checked={formData?.isActive || false}
              onChange={(e) => handleChange('isActive', e.target.checked)}
            />
            <span className="text-sm font-medium">
              {formData?.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          {errors.isActive && (
            <p className="mt-1 text-sm text-red-600">{errors.isActive}</p>
          )}
        </div>

        {/* Academic Year Date */}
        <div className="w-full md:col-span-2 form-control" ref={fieldRefs.current.dateRange}>
          <label className="block font-medium mb-1 form-label">
            Academic Year Date <span className="text-red-500">*</span>
          </label>
          <RangePicker
            placeholder={["Start Date", "End Date"]}
            className={`w-full form-input ${errors.startDate || errors.endDate ? 'border-red-500' : ''}`}
            onChange={handleDateRangeChange}
            value={rangePickerValue}
            format="DD-MM-YYYY"
            status={errors.startDate || errors.endDate ? 'error' : ''}
          />
          {(errors.startDate || errors.endDate) && (
            <p className="mt-1 text-sm text-red-600">
              {errors.startDate || errors.endDate}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse md:flex-row justify-start gap-4 mt-5">
        <button
          onClick={closeModal}
          className="flex items-center gap-2 px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:text-primary hover:border-primary transition-colors duration-200">
          Close
          <IconSquareRoundedX className="w-5 h-5 text-current group-hover:text-primary" />
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? (
            <>
              Processing...
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
            </>
          ) : (
            <>
              Submit
              <IconSquareRoundedCheck
                className="w-5 h-5 text-white group-hover:text-white"
              />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AcademicYearCreate;