'use client';
import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import TextField from '@/components/utils/TextField';
import { Button, Upload, DatePicker, Radio, Select, Space, message } from 'antd';
import { Image as AntdImage } from 'antd';
import { IconUpload } from '@tabler/icons-react';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import CustomDropdown from '@/components/utils/CustomDropdown';

dayjs.extend(customParseFormat);
const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const ApplicationForm = () => {
    const [expandedSections, setExpandedSections] = useState([0, 1, 2, 3, 4]);

    // Toggle function
    const toggleSection = (index) => {
        setExpandedSections(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };
    const fieldRefs = useRef({});
    const accordionRefs = useRef([]);
    const formRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touchedFields, setTouchedFields] = useState({});

    const [formData, setFormData] = useState({
        // Personal Details
        firstName: '',
        middleName: '',
        lastName: '',
        dob: null,
        gender: '',
        nationality: '',
        studentPhoto: null,
        studentCategory: '',
        religion: '',
        bloodGroup: '',
        birthPlace: '',
        motherTongue: '',

        // Communication Details
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pinCode: '',
        country: '',
        phone: '',
        mobile: '',
        email: '',

        // Previous Institution Information
        institutionName: '',
        qualifyingExamName: '',
        examRollNo: '',
        finalScore: '',

        // Guardian Personal Information
        gpFirstName: '',
        gpLastName: '',
        gpRelation: '',
        gpEducation: '',
        gpOccupation: '',
        gpIncome: '',

        // Guardian Contact Details
        gpOfAddressLine1: '',
        gpOfAddressLine2: '',
        gpCity: '',
        gpState: '',
        gpCountry: '',
        gpOfPhone1: '',
        gpOfPhone2: '',
        gpMobile: '',
        gpEmail: ''
    });

    const [errors, setErrors] = useState({});

    // Field validations
    // const validations = {
    //     firstName: (value) => !value ? 'First name is required' :
    //         value.length < 2 ? 'First name must be at least 2 characters' : '',
    //     lastName: (value) => !value ? 'Last name is required' :
    //         value.length < 2 ? 'Last name must be at least 2 characters' : '',
    //     dob: (value) => {
    //         if (!value) return 'Date of birth is required';
    //         const date = dayjs(value, dateFormat);
    //         if (!date.isValid()) return 'Invalid date format';
    //         if (date.isAfter(dayjs().subtract(5, 'year'))) return 'Student must be at least 5 years old';
    //         return '';
    //     },
    //     gender: (value) => !value ? 'Gender is required' : '',
    //     nationality: (value) => !value ? 'Nationality is required' : '',
    //     studentPhoto: (value) => {
    //         if (value) {
    //             if (!value.type?.match('image.*')) return 'Only image files are allowed';
    //             if (value.size > 2 * 1024 * 1024) return 'File size must be less than 2MB';
    //         }
    //         return '';
    //     },
    //     studentCategory: (value) => !value ? 'Student category is required' : '',
    //     religion: (value) => !value ? 'Religion is required' : '',
    //     bloodGroup: (value) => !value ? 'Blood group is required' : '',
    //     birthPlace: (value) => !value ? 'Birth place is required' : '',
    //     motherTongue: (value) => !value ? 'Mother tongue is required' : '',
    //     addressLine1: (value) => !value ? 'Address line 1 is required' : '',
    //     city: (value) => !value ? 'City is required' : '',
    //     state: (value) => !value ? 'State is required' : '',
    //     pinCode: (value) => {
    //         if (!value) return 'PIN code is required';
    //         if (!/^\d{6}$/.test(value)) return 'PIN code must be 6 digits';
    //         return '';
    //     },
    //     country: (value) => !value ? 'Country is required' : '',
    //     mobile: (value) => {
    //         if (!value) return 'Mobile number is required';
    //         if (!/^[0-9]{10}$/.test(value)) return 'Invalid mobile number';
    //         return '';
    //     },
    //     email: (value) => {
    //         if (!value) return 'Email is required';
    //         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
    //         return '';
    //     }
    // };

    // Field validations
    const validations = {
        // Personal Details
        firstName: (value) => !value ? 'First name is required' :
            value.length < 2 ? 'First name must be at least 2 characters' : '',
        middleName: (value) => value && value.length < 2 ? 'Middle name must be at least 2 characters' : '',
        lastName: (value) => !value ? 'Last name is required' :
            value.length < 2 ? 'Last name must be at least 2 characters' : '',
        dob: (value) => {
            if (!value) return 'Date of birth is required';
            const date = dayjs(value, dateFormat);
            if (!date.isValid()) return 'Invalid date format';
            if (date.isAfter(dayjs().subtract(5, 'year'))) return 'Student must be at least 5 years old';
            return '';
        },
        gender: (value) => !value ? 'Gender is required' : '',
        nationality: (value) => !value ? 'Nationality is required' : '',
        studentPhoto: (value) => {
            if (value) {
                if (!value.type?.match('image.*')) return 'Only image files are allowed';
                if (value.size > 2 * 1024 * 1024) return 'File size must be less than 2MB';
            }
            return '';
        },
        studentCategory: (value) => !value ? 'Student category is required' : '',
        religion: (value) => !value ? 'Religion is required' : '',
        bloodGroup: (value) => !value ? 'Blood group is required' : '',
        birthPlace: (value) => !value ? 'Birth place is required' : '',
        motherTongue: (value) => !value ? 'Mother tongue is required' : '',

        // Communication Details
        addressLine1: (value) => !value ? 'Address line 1 is required' : '',
        city: (value) => !value ? 'City is required' : '',
        state: (value) => !value ? 'State is required' : '',
        pinCode: (value) => {
            if (!value) return 'PIN code is required';
            if (!/^\d{6}$/.test(value)) return 'PIN code must be 6 digits';
            return '';
        },
        country: (value) => !value ? 'Country is required' : '',
        mobile: (value) => {
            if (!value) return 'Mobile number is required';
            if (!/^[0-9]{10}$/.test(value)) return 'Invalid mobile number';
            return '';
        },
        phone: (value) => value && !/^[0-9]{10}$/.test(value) ? 'Invalid phone number' : '',
        email: (value) => {
            if (!value) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
            return '';
        },

        // Previous Institution Information
        institutionName: (value) => !value ? 'Institution name is required' : '',
        qualifyingExamName: (value) => !value ? 'Qualifying exam name is required' : '',
        examRollNo: (value) => !value ? 'Exam roll number is required' : '',
        finalScore: (value) => {
            if (!value) return 'Final score is required';
            if (isNaN(value)) return 'Final score must be a number';
            if (parseFloat(value) < 0 || parseFloat(value) > 100) return 'Final score must be between 0 and 100';
            return '';
        },

        // Guardian Personal Information
        gpFirstName: (value) => !value ? 'Guardian first name is required' : '',
        gpLastName: (value) => !value ? 'Guardian last name is required' : '',
        gpRelation: (value) => !value ? 'Relation is required' : '',
        gpEducation: (value) => !value ? 'Education is required' : '',
        gpOccupation: (value) => !value ? 'Occupation is required' : '',
        gpIncome: (value) => {
            if (!value) return 'Income is required';
            if (isNaN(value)) return 'Income must be a number';
            if (parseFloat(value) < 0) return 'Income cannot be negative';
            return '';
        },

        // Guardian Contact Details
        gpOfAddressLine1: (value) => !value ? 'Office address line 1 is required' : '',
        gpCity: (value) => !value ? 'City is required' : '',
        gpState: (value) => !value ? 'State is required' : '',
        gpCountry: (value) => !value ? 'Country is required' : '',
        gpOfPhone1: (value) => value && !/^[0-9]{10}$/.test(value) ? 'Invalid phone number' : '',
        gpOfPhone2: (value) => value && !/^[0-9]{10}$/.test(value) ? 'Invalid phone number' : '',
        gpMobile: (value) => {
            if (!value) return 'Mobile number is required';
            if (!/^[0-9]{10}$/.test(value)) return 'Invalid mobile number';
            return '';
        },
        gpEmail: (value) => {
            if (!value) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
            return '';
        }
    };

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate on change if the field has been touched
        if (touchedFields[name]) {
            validateField(name, value);
        }
    };

    const handleBlur = (name) => {
        if (!touchedFields[name]) {
            setTouchedFields(prev => ({
                ...prev,
                [name]: true
            }));
            validateField(name, formData[name]);
        }
    };

    const validateField = (name, value) => {
        const validationFn = validations[name];
        if (validationFn) {
            const error = validationFn(value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
            return !error;
        }
        return true;
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        Object.keys(validations).forEach(key => {
            const error = validations[key](formData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    // Track errors and open accordion when new errors appear
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstError = Object.keys(errors).find(key => errors[key]);
            if (firstError) {
                scrollToError(firstError);
            }
        }
    }, [errors]);

    // Improved scroll to error function
    const scrollToError = async (errorField) => {
        const personalDetailsFields = [
            'firstName', 'middleName', 'lastName', 'dob', 'gender',
            'nationality', 'studentPhoto', 'studentCategory', 'religion',
            'bloodGroup', 'birthPlace', 'motherTongue'
        ];

        const communicationFields = [
            'addressLine1', 'addressLine2', 'city', 'state',
            'pinCode', 'country', 'phone', 'mobile', 'email'
        ];

        // Determine which section contains the error
        let sectionIndex = -1;
        if (personalDetailsFields.includes(errorField)) {
            sectionIndex = 0;
        } else if (communicationFields.includes(errorField)) {
            sectionIndex = 1;
        }

        if (sectionIndex !== -1) {
            // Open the accordion section if it's not already open
            if (!expandedSections.includes(sectionIndex)) {
                setExpandedSections(prev => [...prev, sectionIndex]);

                // Wait for the accordion to open
                await new Promise(resolve => setTimeout(resolve, 300));
            }

            // Scroll to the field
            const fieldRef = fieldRefs.current[errorField];
            if (fieldRef) {
                // Scroll to the field with smooth behavior
                fieldRef.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                // Focus the field after a small delay to ensure it's visible
                setTimeout(() => {
                    const focusableElement = fieldRef.querySelector('input, select, textarea') || fieldRef;
                    if (focusableElement) {
                        focusableElement.focus();
                    }
                }, 100);
            }
        }
    };

    // Register field refs
    const registerFieldRef = (name, ref) => {
        if (ref) {
            fieldRefs.current[name] = ref;
        }
    };

    // Register accordion refs
    const registerAccordionRef = (index, ref) => {
        if (ref) {
            accordionRefs.current[index] = ref;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mark all fields as touched
        const allFieldsTouched = {};
        Object.keys(formData).forEach(key => {
            allFieldsTouched[key] = true;
        });
        setTouchedFields(allFieldsTouched);

        if (validateForm()) {
            // Form is valid, proceed with submission
            console.log('Form submitted:', formData);
            message.success('Form submitted successfully!');
            // Here you would typically send the data to your API
        } else {
            message.error('Please fix the errors in the form');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="w-full bg-body-color">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Applicant Registration</h1>
            <form ref={formRef} onSubmit={handleSubmit}>

                {/* Student Personal Information */}
                <div
                    ref={(ref) => registerAccordionRef(0, ref)}
                    className="mb-4 border rounded-lg overflow-hidden shadow-lg bg-card-color"
                >
                    <button
                        type="button"
                        className={`w-full px-4 py-3 md:px-6 md:py-4 text-left flex justify-between items-center transition-colors ${expandedSections.includes(0) ? 'bg-blue-50 text-blue-700' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => toggleSection(0)}
                    >
                        <span className="font-medium text-base md:text-lg">Student Personal Information</span>
                        <svg
                            className={`w-5 h-5 transform transition-transform duration-200 ${expandedSections.includes(0) ? 'rotate-180 text-blue-600' : 'text-gray-500'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div className={`bg-body-color transition-all duration-300 overflow-hidden  ${expandedSections.includes(0) ? 'max-h-[500px] overflow-y-auto py-4' : 'max-h-0'}`}>
                        <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div ref={(ref) => registerFieldRef('firstName', ref)}>
                                <TextField
                                    label="First Name"
                                    placeholder="Enter First Name"
                                    name="firstName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.firstName}
                                    error={errors.firstName}
                                    required
                                // helperText="Please enter your given name"
                                />
                            </div>

                            {/* Middle Name */}
                            <div ref={(ref) => registerFieldRef('middleName', ref)}>
                                <TextField
                                    label="Middle Name"
                                    name="middleName"
                                    placeholder="Enter Middle Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.middleName}
                                    error={errors.middleName}
                                />
                            </div>

                            {/* Last Name */}
                            <div ref={(ref) => registerFieldRef('lastName', ref)}>
                                <TextField
                                    label="Last Name"
                                    placeholder="Enter Last Name"
                                    name="lastName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.lastName}
                                    error={errors.lastName}
                                    required
                                />
                            </div>

                            {/* Date of Birth */}
                            <div ref={(ref) => registerFieldRef('dob', ref)} className="mb-4 form-control">
                                <label className="form-label">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <DatePicker
                                    className={`w-full form-input ${errors.dob ? 'border-red-500' : ''}`}
                                    value={formData.dob ? dayjs(formData.dob, dateFormat) : null}
                                    format={dateFormat}
                                    onChange={(date, dateString) => {
                                        handleChange('dob', dateString);
                                        handleBlur('dob');
                                    }}
                                    status={errors.dob ? 'error' : ''}
                                    placeholder="Select Date of Birth"
                                />
                                {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
                            </div>

                            {/* Gender */}
                            <div className="mb-4 form-control" ref={(ref) => registerFieldRef('gender', ref)}>
                                <label className="form-label">
                                    Gender <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-4 items-center">
                                    {['male', 'female', 'other'].map((option) => (
                                        <label key={option} className="form-radio inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={option}
                                                checked={formData.gender === option}
                                                onChange={(e) => handleChange('gender', e.target.value)}
                                                className="form-radio-input"
                                                required
                                            />
                                            <span className="ml-2 capitalize">{option}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                            </div>

                            {/* Nationality */}
                            <div ref={(ref) => registerFieldRef('nationality', ref)}>
                                <CustomDropdown
                                    name="nationality"
                                    onChange={(value) => handleChange('nationality', value)}
                                    showSearch
                                    options={[
                                        { value: 'India', label: 'India' },
                                        { value: 'Nepal', label: 'Nepal' },
                                        { value: 'Bhutan', label: 'Bhutan' },
                                        { value: 'Indonesia', label: 'Indonesia' },
                                        { value: 'South Korea', label: 'South Korea' },
                                        { value: 'Dubai', label: 'Dubai' },
                                    ]}
                                    label="Nationality"
                                    placeholder="Select Nationality"
                                    error={errors.nationality}
                                    required
                                />
                            </div>

                            {/* Student Photo */}
                            <div ref={(ref) => registerFieldRef('studentPhoto', ref)} className="form-control flex flex-col space-y-2">
                                <label className="form-label">Student Photo</label>
                                <Upload
                                    beforeUpload={(file) => {
                                        handleChange('studentPhoto', file);
                                        handleBlur('studentPhoto');
                                        return false;
                                    }}
                                    onRemove={() => handleChange('studentPhoto', null)}
                                    maxCount={1}
                                    accept="image/*"
                                    fileList={formData.studentPhoto ? [{
                                        uid: '-1',
                                        name: formData.studentPhoto.name,
                                        status: 'done',
                                        originFileObj: formData.studentPhoto,
                                    }] : []}
                                    listType="picture-card"
                                    onPreview={(file) => {
                                        // Open image in new tab when eye icon is clicked
                                        const imageUrl = URL.createObjectURL(file.originFileObj);
                                        window.open(imageUrl, '_blank');
                                    }}
                                    itemRender={(originNode, file) => {
                                        // Customize the preview item to ensure both icons appear
                                        return (
                                            <div className="ant-upload-list-item-container">
                                                {originNode}
                                            </div>
                                        );
                                    }}
                                >
                                    {!formData.studentPhoto && (
                                        <Button icon={<IconUpload />} />
                                    )}
                                </Upload>
                                {errors.studentPhoto && <p className="mt-1 text-sm text-red-600">{errors.studentPhoto}</p>}
                            </div>
                            {/* Custom preview if you want it outside the upload component
                                {formData.studentPhoto && (
                                    <AntdImage
                                        width={200}
                                        src={URL.createObjectURL(formData.studentPhoto)}
                                        alt="Preview"
                                        className="mt-2"
                                    />
                                )} */}

                            {/* Religion */}
                            <div ref={(ref) => registerFieldRef('religion', ref)}>
                                <TextField
                                    label="Religion"
                                    placeholder="Enter Religion"
                                    name="religion"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.religion}
                                    error={errors.religion}
                                    required
                                />
                            </div>

                            {/* Student Category */}
                            <div ref={(ref) => registerFieldRef('studentCategory', ref)}>
                                <CustomDropdown
                                    name="studentCategory"
                                    onChange={(value) => handleChange('studentCategory', value)}
                                    showSearch
                                    options={[
                                        { value: 'Gen', label: 'GEN' },
                                        { value: 'obc', label: 'OBC' },
                                        { value: 'sc', label: 'SC' },
                                        { value: 'st', label: 'ST' },
                                        { value: 'ebc', label: 'EBC' },
                                        { value: 'new_student', label: 'NEW STUDENT' },
                                        { value: 'old_student', label: 'OLD STUDENT' },
                                    ]}
                                    label="Student Category"
                                    placeholder="Select category"
                                    error={errors.studentCategory}
                                />
                            </div>

                            {/* Birth Place */}
                            <div ref={(ref) => registerFieldRef('birthPlace', ref)}>
                                <TextField
                                    label="Birth Place"
                                    placeholder="Enter Birth Place"
                                    name="birthPlace"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.birthPlace}
                                    error={errors.birthPlace}
                                    required
                                />
                            </div>

                            {/* Blood Group */}
                            <div ref={(ref) => registerFieldRef('bloodGroup', ref)}>
                                <CustomDropdown
                                    name="bloodGroup"
                                    onChange={(value) => handleChange('bloodGroup', value)}
                                    showSearch
                                    options={[
                                        { value: 'A+', label: 'A+' },
                                        { value: 'A-', label: 'A-' },
                                        { value: 'B+', label: 'B+' },
                                        { value: 'B-', label: 'B-' },
                                        { value: 'AB+', label: 'AB+' },
                                        { value: 'AB-', label: 'AB-' },
                                        { value: 'O+', label: 'O+' },
                                        { value: 'O-', label: 'O-' },
                                    ]}
                                    label="Blood Group"
                                    placeholder="Select BloodGroup"
                                    error={errors.bloodGroup}
                                />
                            </div>

                            {/* Mother Tongue */}
                            <div ref={(ref) => registerFieldRef('motherTongue', ref)}>
                                <TextField
                                    label="Mother Tongue"
                                    placeholder="Enter Mother Tongue"
                                    name="motherTongue"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.motherTongue}
                                    error={errors.motherTongue}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student Communication Information */}
                <div
                    ref={(ref) => registerAccordionRef(1, ref)}
                    className="mb-4 border rounded-lg overflow-hidden shadow-lg bg-card-color"
                >
                    <button
                        type="button"
                        className={`w-full px-4 py-3 md:px-6 md:py-4 text-left flex justify-between items-center transition-colors ${expandedSections.includes(1) ? 'bg-blue-50 text-blue-700' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => toggleSection(1)}
                    >
                        <span className="font-medium text-base md:text-lg">Student Communication Information</span>
                        <svg
                            className={`w-5 h-5 transform transition-transform duration-200 ${expandedSections.includes(1) ? 'rotate-180 text-blue-600' : 'text-gray-500'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div className={`bg-body-color transition-all duration-300 overflow-hidden ${expandedSections.includes(1) ? 'max-h-[500px] overflow-y-auto py-4' : 'max-h-0'}`}>
                        <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Address Line 1 */}
                            <div ref={(ref) => registerFieldRef('addressLine1', ref)}>
                                <TextField
                                    label="Address Line 1"
                                    placeholder="Enter Address Line 1"
                                    name="addressLine1"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.addressLine1}
                                    error={errors.addressLine1}
                                />
                            </div>

                            {/* Address Line 2 */}
                            <div ref={(ref) => registerFieldRef('addressLine2', ref)}>
                                <TextField
                                    label="Address Line 2"
                                    placeholder="Enter Address Line 2"
                                    name="addressLine2"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.addressLine2}
                                    error={errors.addressLine2}
                                />
                            </div>

                            {/* City */}
                            <div ref={(ref) => registerFieldRef('city', ref)}>
                                <TextField
                                    label="City"
                                    placeholder="Enter City"
                                    name="city"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.city}
                                    error={errors.city}
                                />
                            </div>

                            {/* State */}
                            <div ref={(ref) => registerFieldRef('state', ref)}>
                                <TextField
                                    label="State"
                                    placeholder="Enter State"
                                    name="state"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.state}
                                    error={errors.state}
                                    required
                                />
                            </div>

                            {/* PIN Code */}
                            <div ref={(ref) => registerFieldRef('pinCode', ref)}>
                                <TextField
                                    label="PIN Code"
                                    placeholder="Enter PIN Code"
                                    name="pinCode"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.pinCode}
                                    error={errors.pinCode}
                                    maxLength={6}
                                />
                            </div>

                            {/* Country */}
                            <div ref={(ref) => registerFieldRef('country', ref)}>
                                <CustomDropdown
                                    name="country"
                                    onChange={(value) => handleChange('country', value)}
                                    showSearch
                                    options={[
                                        { value: 'India', label: 'India' },
                                        { value: 'Nepal', label: 'Nepal' },
                                        { value: 'Bhutan', label: 'Bhutan' },
                                        { value: 'Indonesia', label: 'Indonesia' },
                                        { value: 'South Korea', label: 'South Korea' },
                                        { value: 'Dubai', label: 'Dubai' },
                                    ]}
                                    label="Country"
                                    placeholder="Select Country"
                                    error={errors.country}
                                />
                            </div>

                            {/* Phone */}
                            <div ref={(ref) => registerFieldRef('phone', ref)}>
                                <TextField
                                    label="Phone"
                                    placeholder="Enter Phone Number"
                                    name="phone"
                                    type="tel"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.phone}
                                    error={errors.phone}
                                    maxLength={10}
                                />
                            </div>

                            {/* Mobile */}
                            <div ref={(ref) => registerFieldRef('mobile', ref)}>
                                <TextField
                                    label="Mobile"
                                    placeholder="Enter Mobile Number"
                                    name="mobile"
                                    type="tel"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.mobile}
                                    error={errors.mobile}
                                    maxLength={10}
                                />
                            </div>
                            {/* Email */}
                            <div ref={(ref) => registerFieldRef('email', ref)}>
                                <TextField
                                    label="Email"
                                    placeholder="Enter Email Address"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.email}
                                    error={errors.email}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Previous Institution Information */}
                <div
                    ref={(ref) => registerAccordionRef(2, ref)}
                    className="mb-4 border rounded-lg overflow-hidden shadow-lg bg-card-color"
                >
                    <button
                        type="button"
                        className={`w-full px-4 py-3 md:px-6 md:py-4 text-left flex justify-between items-center transition-colors ${expandedSections.includes(2) ? 'bg-blue-50 text-blue-700' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => toggleSection(2)}
                    >
                        <span className="font-medium text-base md:text-lg">Previous Institution Information</span>
                        <svg
                            className={`w-5 h-5 transform transition-transform duration-200 ${expandedSections.includes(2) ? 'rotate-180 text-blue-600' : 'text-gray-500'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div className={`bg-body-color transition-all duration-300 overflow-hidden ${expandedSections.includes(2) ? 'max-h-[500px] overflow-y-auto py-4' : 'max-h-0'}`}>
                        <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Institution Name */}
                            <div ref={(ref) => registerFieldRef('institutionName', ref)}>
                                <TextField
                                    label="Institution Name"
                                    placeholder="Enter Institution Name"
                                    name="institutionName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.institutionName}
                                    error={errors.institutionName}
                                />
                            </div>

                            {/* Qualifying Exam Name */}
                            <div ref={(ref) => registerFieldRef('qualifyingExamName', ref)}>
                                <TextField
                                    label="Qualifying Exam Name"
                                    placeholder="Enter Qualifying Exam Name"
                                    name="qualifyingExamName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.qualifyingExamName}
                                    error={errors.qualifyingExamName}
                                />
                            </div>

                            {/* Exam Roll No. */}
                            <div ref={(ref) => registerFieldRef('Exam Roll No.', ref)}>
                                <TextField
                                    label="Exam Roll No."
                                    placeholder="Enter Exam Roll No"
                                    name="examRollNo"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.examRollNo}
                                    error={errors.examRollNo}
                                />
                            </div>

                            {/* State */}
                            <div ref={(ref) => registerFieldRef('state', ref)}>
                                <TextField
                                    label="State"
                                    placeholder="Enter State"
                                    name="state"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.state}
                                    error={errors.state}
                                    required
                                />
                            </div>

                            {/* Final Score */}
                            <div ref={(ref) => registerFieldRef('finalScore', ref)}>
                                <TextField
                                    label="Final Score"
                                    placeholder="Enter Final Score"
                                    name="finalScore"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.finalScore}
                                    error={errors.finalScore}
                                    maxLength={6}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Guardian Personal Information - Guardian 1 */}
                <div
                    ref={(ref) => registerAccordionRef(3, ref)}
                    className="mb-4 border rounded-lg overflow-hidden shadow-lg bg-card-color"
                >
                    <button
                        type="button"
                        className={`w-full px-4 py-3 md:px-6 md:py-4 text-left flex justify-between items-center transition-colors ${expandedSections.includes(1) ? 'bg-blue-50 text-blue-700' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => toggleSection(3)}
                    >
                        <span className="font-medium text-base md:text-lg">Guardian Personal Information - Guardian 1</span>
                        <svg
                            className={`w-5 h-5 transform transition-transform duration-200 ${expandedSections.includes(3) ? 'rotate-180 text-blue-600' : 'text-gray-500'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div className={`bg-body-color transition-all duration-300 overflow-hidden ${expandedSections.includes(3) ? 'max-h-[500px] overflow-y-auto py-4' : 'max-h-0'}`}>
                        <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Guardian First Name */}
                            <div ref={(ref) => registerFieldRef('gpFirstName', ref)}>
                                <TextField
                                    label="Guardian First Name"
                                    placeholder="Enter Guardian First Name"
                                    name="gpFirstName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.gpFirstName}
                                    error={errors.gpFirstName}
                                />
                            </div>

                            {/* Guardian Last Name */}
                            <div ref={(ref) => registerFieldRef('gpLastName', ref)}>
                                <TextField
                                    label="Guardian Last Name"
                                    placeholder="Enter Guardian Last Name"
                                    name="gpLastName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.gpLastName}
                                    error={errors.gpLastName}
                                />
                            </div>

                            {/* Guardian Relation */}
                            <div ref={(ref) => registerFieldRef('gpRelation', ref)}>
                                <CustomDropdown
                                    name="gpRelation"
                                    onChange={(value) => handleChange('gpRelation', value)}
                                    showSearch
                                    options={[
                                        { value: 'Father', label: 'Father' },
                                        { value: 'Mother', label: 'Mother' },
                                        { value: 'Other', label: 'Other' },
                                    ]}
                                    label="Relation"
                                    placeholder="Select Relation"
                                    error={errors.gpRelation}
                                />
                            </div>

                            {/* Guardian Education */}
                            <div ref={(ref) => registerFieldRef('gpEducation', ref)}>
                                <TextField
                                    label="Guardian Education"
                                    placeholder="Enter Guardian Education"
                                    name="gpEducation"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.gpEducation}
                                    error={errors.gpEducation}
                                />
                            </div>

                            {/* Guardian Occupation */}
                            <div ref={(ref) => registerFieldRef('gpOccupation', ref)}>
                                <TextField
                                    label="Guardian Occupation"
                                    placeholder="Enter Guardian Occupation"
                                    name="gpOccupation"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.gpOccupation}
                                    error={errors.gpOccupation}
                                />
                            </div>

                            {/* Guardian Income */}
                            <div ref={(ref) => registerFieldRef('gpIncome', ref)}>
                                <TextField
                                    label="Guardian Income"
                                    type="number"
                                    placeholder="Enter Guardian Income"
                                    name="gpIncome"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.gpIncome}
                                    error={errors.gpIncome}
                                    maxLength={6}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Guardian Contact Details - Guardian 1 */}
                <div
                    ref={(ref) => registerAccordionRef(4, ref)}
                    className="mb-4 border rounded-lg overflow-hidden shadow-lg bg-card-color"
                >
                    <button
                        type="button"
                        className={`w-full px-4 py-3 md:px-6 md:py-4 text-left flex justify-between items-center transition-colors ${expandedSections.includes(4) ? 'bg-blue-50 text-blue-700' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => toggleSection(4)}
                    >
                        <span className="font-medium text-base md:text-lg">Guardian Contact Details - Guardian 1</span>
                        <svg
                            className={`w-5 h-5 transform transition-transform duration-200 ${expandedSections.includes(4) ? 'rotate-180 text-blue-600' : 'text-gray-500'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div className={`bg-body-color transition-all duration-300 overflow-hidden ${expandedSections.includes(4) ? 'max-h-[500px] overflow-y-auto py-4' : 'max-h-0'}`}>
                        <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Guardian Contact Address Line 1 */}
                            <div ref={(ref) => registerFieldRef('gpOfAddressLine1', ref)}>
                                <TextField
                                    label="Guardian Office Address Line 1"
                                    placeholder="Enter Guardian Office Address Line 1"
                                    name="gpOfAddressLine1"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.gpOfAddressLine1}
                                    error={errors.gpOfAddressLine1}
                                />
                            </div>

                            {/* Guardian Contact Address Line 2 */}
                            <div ref={(ref) => registerFieldRef('gpOfAddressLine2', ref)}>
                                <TextField
                                    label="Guardian Contact Office Address Line 2"
                                    placeholder="Enter Guardian Contact Address Line 2"
                                    name="gpOfAddressLine2"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.gpOfAddressLine2}
                                    error={errors.gpOfAddressLine2}
                                />
                            </div>

                            {/* Guardian City */}
                            <div ref={(ref) => registerFieldRef('gpCity', ref)}>
                                <TextField
                                    label="Guardian City"
                                    placeholder="Enter Guardian City"
                                    name="gpCity"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.gpCity}
                                    error={errors.gpCity}
                                />
                            </div>

                            {/* Guardian State */}
                            <div ref={(ref) => registerFieldRef('gpState', ref)}>
                                <TextField
                                    label="Guardian State"
                                    placeholder="Enter Guardian State"
                                    name="gpState"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.gpState}
                                    error={errors.gpState}
                                />
                            </div>

                            {/* Guardian Country */}
                            <div ref={(ref) => registerFieldRef('gpCountry', ref)}>
                                <CustomDropdown
                                    name="gpCountry"
                                    onChange={(value) => handleChange('gpCountry', value)}
                                    showSearch
                                    options={[
                                        { value: 'India', label: 'India' },
                                        { value: 'Nepal', label: 'Nepal' },
                                        { value: 'Bhutan', label: 'Bhutan' },
                                        { value: 'Indonesia', label: 'Indonesia' },
                                        { value: 'South Korea', label: 'South Korea' },
                                        { value: 'Dubai', label: 'Dubai' },
                                    ]}
                                    label="Guardian Country"
                                    placeholder="Select Guardian Country"
                                    error={errors.gpCountry}
                                />
                            </div>

                            {/* Guardian Office Phone 1 */}
                            <div ref={(ref) => registerFieldRef('gpOfPhone1', ref)}>
                                <TextField
                                    label="Guardian Office Phone 1"
                                    placeholder="Enter Guardian Office Phone 1"
                                    name="phone"
                                    type="tel"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.gpOfPhone1}
                                    error={errors.gpOfPhone1}
                                    maxLength={10}
                                />
                            </div>

                            {/* Guardian Office Phone 2 */}
                            <div ref={(ref) => registerFieldRef('gpOfPhone2', ref)}>
                                <TextField
                                    label="Guardian Office Phone 2"
                                    placeholder="Enter Guardian Office Phone 2"
                                    name="phone"
                                    type="tel"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.gpOfPhone2}
                                    error={errors.gpOfPhone2}
                                    maxLength={10}
                                />
                            </div>

                            {/* Guardian Mobile */}
                            <div ref={(ref) => registerFieldRef('gpMobile', ref)}>
                                <TextField
                                    label="Guardian Mobile"
                                    placeholder="Enter Guardian Mobile Number"
                                    name="gpMobile"
                                    type="tel"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.gpMobile}
                                    error={errors.gpMobile}
                                    maxLength={10}
                                />
                            </div>
                            {/* Guardian Email */}
                            <div ref={(ref) => registerFieldRef('gpEmail', ref)}>
                                <TextField
                                    label="Guardian Email"
                                    placeholder="Enter Guardian Email Address"
                                    name="gpEmail"
                                    type="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.gpEmail}
                                    error={errors.gpEmail}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-1 mt-5">
                    <p className='text-primary'>Total Payable Fee: <span>₹ 0.00</span></p>
                    <p className='text-primary'>Summary: <span>Application Fee: </span><span>₹ 0.00</span></p>
                </div>
                <div className="mt-6 flex justify-start">
                    <Button
                        className='btn btn-primary'
                        htmlType="submit"
                        size="large"
                        loading={isSubmitting}
                    >
                        Submit Form
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ApplicationForm;