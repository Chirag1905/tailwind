'use client';
import {
  getSingleCourseRegisterRequest,
  postSingleCourseRegisterFailure,
  postSingleCourseRegisterRequest,
  postSingleCourseRegisterSuccess
} from "@/Redux/features/courseRegister/courseRegisterSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IconSquareRoundedCheck, IconSquareRoundedX } from "@tabler/icons-react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const SingleCourseRegister = (props) => {
  const {
    openModal,
    closeModal,
    courseData
  } = props;

  // Redux state
  const dispatch = useDispatch();
  const { singleCourseRegisterData, singleCourseRegisterPostData, loading, error } = useSelector((state) => state.courseRegister);
  const selectedAcademicYear = useSelector((state) => state.academicYear.selectedAcademicYear);
  const { token } = useSelector((state) => state.auth);

  // Component state
  const [data, setData] = useState({
    campusCourseName: '',
    courseDisplayName: '',
    appFormPrefix: '',
    regAmount: '',
    isActive: false,
    isDobValidation: false,
    dobStartDate: null,
    dobEndDate: null
  });
  console.log("🚀 ~ SingleCourseRegister ~ data:", data)

  const [errors, setErrors] = useState({});
  const fieldRefs = useRef({
    campusCourseName: null,
    courseDisplayName: null,
    appFormPrefix: null,
    regAmount: null,
    isActive: null
  });


  // Effect for data update - automatically select rows where isActive is true
  useEffect(() => {
    if (singleCourseRegisterData) {
      setData(prev => ({
        ...prev, // keep defaults
        ...singleCourseRegisterData?.data // apply loaded data
      }));
    }
  }, [singleCourseRegisterData]);

  // Effect for data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getSingleCourseRegisterRequest({
          selectedCourse: courseData?.id,
          selectedAcademicYear,
          token
        }));
      } catch (error) {
        console.error("Error fetching campus group data:", error);
        toast.error("Failed to load campus group data");
      }
    };
    fetchData();
  }, [dispatch, selectedAcademicYear, courseData, token]);

  // Function to update form data
  const handleChange = (name, value) => {
    setData(prevData => ({
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

  // Handle date change for AntD DatePicker
  const handleDateChange = (name, date) => {
    const dateString = date ? date.format('YYYY-MM-DD') : '';
    handleChange(name, dateString);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        campusCourseId: courseData?.id,
        ...data
      };
      dispatch(postSingleCourseRegisterRequest({
        data: payload,
        selectedAcademicYear,
        token
      }));
    } catch (err) {
      console.error("Error submitting data:", err);
      toast.error(err || "Failed to submit data. Please try again.", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  // Scroll to the first field with error
  const scrollToFirstError = () => {
    const firstErrorField = Object.keys(errors)[0];
    if (!firstErrorField) return;

    let refToScroll = null;

    // Map field names to their refs
    if (firstErrorField === 'campusCourseName') {
      refToScroll = fieldRefs.current.campusCourseName;
    } else if (firstErrorField === 'courseDisplayName') {
      refToScroll = fieldRefs.current.courseDisplayName;
    } else if (firstErrorField === 'appFormPrefix') {
      refToScroll = fieldRefs.current.appFormPrefix;
    } else if (firstErrorField === 'regAmount') {
      refToScroll = fieldRefs.current.regAmount;
    } else if (firstErrorField === 'isActive') {
      refToScroll = fieldRefs.current.isActive;
    } else if (firstErrorField === 'dobStartDate') {
      refToScroll = fieldRefs.current.dobStartDate;
    } else if (firstErrorField === 'dobEndDate') {
      refToScroll = fieldRefs.current.dobEndDate;
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
    if (!singleCourseRegisterPostData?.message) return;

    toast.success(singleCourseRegisterPostData?.message, {
      position: "top-right",
      duration: 5000,
    });

    // Refresh course register data
    dispatch(getSingleCourseRegisterRequest({
      data: {
        page: 0,
        size: 10,
        sortBy: "id",
        ascending: true,
      },
      token
    }));

    dispatch(postSingleCourseRegisterSuccess(null));
    closeModal();
  }, [singleCourseRegisterPostData, dispatch, closeModal, token]);

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
    dispatch(postSingleCourseRegisterSuccess(null));
    dispatch(postSingleCourseRegisterFailure(null));
  }, [error, dispatch]);

  return (
    <div className='py-6 px-4 md:py-9 md:px-10 bg-card-color rounded-xl border'>
      <h5 className='text-lg md:text-[20px]/[30px] font-medium ml-2 md:ml-6 mb-2'>
        Register Your Course
      </h5>
      <div className="max-w-1xl mx-auto p-4 md:p-6">
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-5 space-y-4 md:space-y-0">
            {/* Campus Course Name */}
            <div className="w-full relative" ref={fieldRefs.current.campusCourseName}>
              <div className="floating-form-control">
                <input
                  type="text"
                  placeholder="campusCourseName Title"
                  className={`form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.campusCourseName ? 'border-red-500' : ''
                    }`}
                  value={data.campusCourseName}
                  onChange={(e) => handleChange("campusCourseName", e.target.value)}
                />
                <label htmlFor="campusCourseName" className="form-label">
                  Course Name
                </label>
              </div>
              {errors.campusCourseName && (
                <p className="mt-1 text-sm text-red-600">{errors.campusCourseName}</p>
              )}
            </div>

            {/* Course Display Name */}
            <div className="w-full relative" ref={fieldRefs.current.courseDisplayName}>
              <div className="floating-form-control">
                <input
                  type="text"
                  placeholder="courseDisplayName Title"
                  className={`form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.courseDisplayName ? 'border-red-500' : ''
                    }`}
                  value={data.courseDisplayName}
                  onChange={(e) => handleChange("courseDisplayName", e.target.value)}
                />
                <label htmlFor="courseDisplayName" className="form-label">
                  Course Display Name
                </label>
              </div>
              {errors.courseDisplayName && (
                <p className="mt-1 text-sm text-red-600">{errors.courseDisplayName}</p>
              )}
            </div>

            {/* Active Status */}
            <div className="w-full relative" ref={fieldRefs.current.isActive}>
              <label className="block font-medium mb-1 form-label">
                Active Status
              </label>
              <div className="form-check form-switch flex items-center gap-3 mt-1">
                <input
                  type="checkbox"
                  className="form-check-input h-5 w-10 rounded-full appearance-none bg-gray-300 checked:bg-blue-500 transition duration-200 relative cursor-pointer"
                  checked={data.isActive}
                  onChange={(e) => handleChange("isActive", e.target.checked)}
                />
                <span className="text-sm font-medium">
                  {data.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              {errors.isActive && (
                <p className="mt-1 text-sm text-red-600">{errors.isActive}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-5 space-y-4 md:space-y-0">
            {/* App Form Prefix */}
            <div className="w-full relative" ref={fieldRefs.current.appFormPrefix}>
              <div className="floating-form-control">
                <input
                  type="text"
                  placeholder="appFormPrefix Title"
                  className={`form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.appFormPrefix ? 'border-red-500' : ''
                    }`}
                  value={data.appFormPrefix}
                  onChange={(e) => handleChange("appFormPrefix", e.target.value)}
                />
                <label htmlFor="appFormPrefix" className="form-label">
                  App Form Prefix
                </label>
              </div>
              {errors.appFormPrefix && (
                <p className="mt-1 text-sm text-red-600">{errors.appFormPrefix}</p>
              )}
            </div>

            {/* Registration Amount */}
            <div className="w-full relative" ref={fieldRefs.current.regAmount}>
              <div className="floating-form-control">
                <input
                  type="text"
                  placeholder="regAmount Title"
                  className={`form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.regAmount ? 'border-red-500' : ''
                    }`}
                  value={data.regAmount}
                  onChange={(e) => handleChange("regAmount", e.target.value)}
                />
                <label htmlFor="regAmount" className="form-label">
                  Reg Amount
                </label>
              </div>
              {errors.regAmount && (
                <p className="mt-1 text-sm text-red-600">{errors.regAmount}</p>
              )}
            </div>
          </div>

          {/* DOB Validation Section */}
          <div className="w-full relative space-y-2 px-4 py-2 border rounded-lg">
            <div className="form-check form-switch flex items-center">
              <input
                type="checkbox"
                className="form-check-input h-5 w-10 rounded-full appearance-none bg-gray-300 checked:bg-blue-500 transition duration-200 relative cursor-pointer"
                checked={data.isDobValidation}
                onChange={(e) => handleChange("isDobValidation", e.target.checked)}
              />
              <label className="text-sm mt-1 ml-2">
                Enable DOB Validation
              </label>
            </div>

            {data.isDobValidation && (
              <div className="flex flex-col md:flex-row md:space-x-5 space-y-4 md:space-y-0 mt-4">
                {/* DOB Start Date */}
                <div className="w-full relative" ref={fieldRefs.current.dobStartDate}>
                  <div className="floating-form-control">
                    <label className="form-label">DOB Start Date</label>
                    <DatePicker
                      className={`w-full ${errors.dobStartDate ? 'border-red-500' : ''}`}
                      value={data.dobStartDate ? dayjs(data.dobStartDate) : null}
                      onChange={(date) => handleDateChange("dobStartDate", date)}
                      format="YYYY-MM-DD"
                    />
                  </div>
                  {errors.dobStartDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.dobStartDate}</p>
                  )}
                </div>

                {/* DOB End Date */}
                <div className="w-full relative" ref={fieldRefs.current.dobEndDate}>
                  <div className="floating-form-control">
                    <label className="form-label">DOB End Date</label>
                    <DatePicker
                      className={`w-full ${errors.dobEndDate ? 'border-red-500' : ''}`}
                      value={data.dobEndDate ? dayjs(data.dobEndDate) : null}
                      onChange={(date) => handleDateChange("dobEndDate", date)}
                      format="YYYY-MM-DD"
                    />
                  </div>
                  {errors.dobEndDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.dobEndDate}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse md:flex-row md:justify-start items-stretch md:items-center gap-3 mt-5 w-full">
        <button
          onClick={closeModal}
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
  );
};

export default SingleCourseRegister;