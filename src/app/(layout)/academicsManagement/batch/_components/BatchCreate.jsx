'use client';
import {
  getBatchPaginationRequest,
  postBatchRequest,
  postBatchSuccess,
  postBatchFailure,
} from "@/Redux/features/batch/batchSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import TextField from "@/components/utils/TextField";
import { IconProgressCheck, IconProgressX, IconSquareRoundedCheck, IconSquareRoundedX } from "@tabler/icons-react";

const BatchCreate = (props) => {
  const {
    openModal,
    closeModal,
    courseId,
  } = props;

  // Redux state
  const dispatch = useDispatch();
  const { batchPostData, loading, error } = useSelector((state) => state.batch);
  const { token } = useSelector((state) => state.auth);
  const selectedAcademicYear = useSelector((state) => state.academicYear.selectedAcademicYear);

  // Component state
  const [formData, setFormData] = useState({
    campusBatchName: "",
    isActive: false,
    campusCourseId: courseId || "",
    academicYearId: selectedAcademicYear || "",
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const fieldRefs = useRef({
    campusBatchName: null,
    isActive: null
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
      dispatch(postBatchRequest({ data: formData, token }));
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
    if (firstErrorField === 'campusBatchName') {
      refToScroll = fieldRefs.current.campusCourseName;
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
    if (!batchPostData?.message) return;
    toast.success(batchPostData?.message, {
      position: "top-right",
      duration: 4000,
    });

    // Refresh campus data
    dispatch(getBatchPaginationRequest({
      data: {
        page: 0,
        size: 10,
        sortBy: "id",
        ascending: true,
        searchFilter: "",
      },
      courseId,
      selectedAcademicYear,
      token
    }));
    dispatch(postBatchSuccess(null));
    closeModal();
  }, [dispatch, batchPostData, closeModal]);

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
    dispatch(postBatchSuccess(null));
    dispatch(postBatchFailure(null));
  }, [error, dispatch]);

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-6 bg-card-color rounded-xl shadow-xl border">
      <h5 className="text-left px-1 text-lg md:text-xl font-semibold mb-6">
        Create Batch
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6 border rounded-xl bg-white">
        {/* Batch Name */}
        <div className="w-full" ref={fieldRefs.current.campusBatchName}>
          <TextField
            label="Batch Name"
            placeholder="Enter Batch Name"
            name="campusBatchName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.campusBatchName}
            error={errors.campusBatchName}
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
          className="flex items-center gap-2 px-3 py-1 rounded-md bg-primary border border-primary-10 text-white hover:bg-primary-dark disabled:opacity-80 disabled:cursor-wait transition-colors duration-200 group"
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

export default BatchCreate;