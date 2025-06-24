'use client';
import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import TextField from '@/components/utils/TextField';
import { Button, Upload, DatePicker, Radio, Select, Space, message, Collapse } from 'antd';
import { Image as AntdImage } from 'antd';
import { IconUpload } from '@tabler/icons-react';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import CustomDropdown from '@/components/utils/CustomDropdown';

dayjs.extend(customParseFormat);
const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
const { Panel } = Collapse;

const ApplicationForm = ({ config }) => {
  const [expandedSections, setExpandedSections] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fieldRefs = useRef({});
  const accordionRefs = useRef([]);
  const formRef = useRef(null);

  // Initialize form data and expanded sections based on config
  useEffect(() => {
    if (config) {
      const initialData = {};
      const initialExpandedSections = [];
      
      Object.entries(config.sections).forEach(([sectionKey, section], index) => {
        if (section.enabled) {
          initialExpandedSections.push(index);
          
          Object.entries(section.fields).forEach(([fieldKey, field]) => {
            if (field.enabled) {
              // Set default value based on field type
              initialData[fieldKey] = field.defaultValue || 
                (field.type === 'checkbox' ? false : 
                 field.type === 'radio' ? '' : 
                 field.type === 'select' ? '' : 
                 field.type === 'file' ? null : '');
            }
          });
        }
      });
      
      setFormData(initialData);
      setExpandedSections(initialExpandedSections);
    }
  }, [config]);

  const toggleSection = (index) => {
    setExpandedSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
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
    if (!config) return true;
    
    // Find the field configuration
    let fieldConfig = null;
    for (const section of Object.values(config.sections)) {
      if (section.fields && section.fields[name]) {
        fieldConfig = section.fields[name];
        break;
      }
    }

    if (!fieldConfig) return true;

    // Run validation based on field configuration
    let error = '';
    
    if (fieldConfig.required && !value) {
      error = `${fieldConfig.label || name} is required`;
    } else if (fieldConfig.validation) {
      // Custom validation function from config
      error = fieldConfig.validation(value);
    } else if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Invalid email format';
    } else if ((name === 'mobile' || name === 'phone') && value && !/^[0-9]{10}$/.test(value)) {
      error = 'Invalid phone number';
    } else if ((name === 'pinCode') && value && !/^[0-9]{6}$/.test(value)) {
      error = 'PIN code must be 6 digits';
    } else if ((name === 'finalScore') && value && (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 100)) {
      error = 'Score must be between 0 and 100';
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return !error;
  };

  const validateForm = () => {
    if (!config) return false;
    
    let isValid = true;
    const newErrors = {};

    // Validate all enabled fields
    Object.entries(config.sections).forEach(([_, section]) => {
      if (section.enabled) {
        Object.entries(section.fields).forEach(([fieldKey, field]) => {
          if (field.enabled && field.required) {
            const valid = validateField(fieldKey, formData[fieldKey]);
            if (!valid) isValid = false;
          }
        });
      }
    });

    return isValid;
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
    } else {
      message.error('Please fix the errors in the form');
    }

    setIsSubmitting(false);
  };

  const renderField = (fieldKey, field, sectionKey) => {
    if (!field.enabled) return null;

    const commonProps = {
      key: fieldKey,
      label: field.label || fieldKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      name: fieldKey,
      value: formData[fieldKey],
      onChange: (value) => handleChange(fieldKey, value),
      onBlur: () => handleBlur(fieldKey),
      error: errors[fieldKey],
      required: field.required,
      ref: (ref) => fieldRefs.current[fieldKey] = ref,
      placeholder: field.placeholder || `Enter ${field.label || fieldKey.replace(/([A-Z])/g, ' $1')}`,
      disabled: field.disabled
    };

    // Determine field type based on fieldKey for backward compatibility
    let fieldType = field.type;
    if (!fieldType) {
      if (fieldKey === 'dob') fieldType = 'date';
      else if (fieldKey === 'gender') fieldType = 'radio';
      else if (fieldKey === 'studentPhoto') fieldType = 'image';
      else if (['nationality', 'studentCategory', 'bloodGroup', 'country', 'gpRelation', 'gpCountry'].includes(fieldKey)) fieldType = 'select';
      else if (['email'].includes(fieldKey)) fieldType = 'email';
      else if (['mobile', 'phone', 'gpMobile', 'gpOfPhone1', 'gpOfPhone2', 'pinCode'].includes(fieldKey)) fieldType = 'tel';
      else if (['finalScore', 'gpIncome'].includes(fieldKey)) fieldType = 'number';
      else fieldType = 'text';
    }

    switch (fieldType) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
      case 'password':
        return (
          <TextField
            {...commonProps}
            type={fieldType}
          />
        );

      case 'date':
        return (
          <div className="mb-4 form-control">
            <label className="form-label">
              {commonProps.label} {commonProps.required && <span className="text-red-500">*</span>}
            </label>
            <DatePicker
              className={`w-full form-input ${errors[fieldKey] ? 'border-red-500' : ''}`}
              value={formData[fieldKey] ? dayjs(formData[fieldKey], dateFormat) : null}
              format={dateFormat}
              onChange={(date, dateString) => {
                handleChange(fieldKey, dateString);
                handleBlur(fieldKey);
              }}
              status={errors[fieldKey] ? 'error' : ''}
              placeholder={commonProps.placeholder}
            />
            {errors[fieldKey] && <p className="mt-1 text-sm text-red-600">{errors[fieldKey]}</p>}
          </div>
        );

      case 'radio':
        const radioOptions = field.options || [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' }
        ];
        
        return (
          <div className="mb-4 form-control">
            <label className="form-label">
              {commonProps.label} {commonProps.required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex gap-4 items-center">
              {radioOptions.map((option) => (
                <label key={option.value} className="form-radio inline-flex items-center">
                  <input
                    type="radio"
                    name={fieldKey}
                    value={option.value}
                    checked={formData[fieldKey] === option.value}
                    onChange={(e) => handleChange(fieldKey, e.target.value)}
                    className="form-radio-input"
                    required={field.required}
                  />
                  <span className="ml-2 capitalize">{option.label}</span>
                </label>
              ))}
            </div>
            {errors[fieldKey] && <p className="mt-1 text-sm text-red-600">{errors[fieldKey]}</p>}
          </div>
        );

      case 'select':
        const selectOptions = field.options || (() => {
          if (fieldKey === 'nationality' || fieldKey === 'country' || fieldKey === 'gpCountry') {
            return [
              { value: 'India', label: 'India' },
              { value: 'Nepal', label: 'Nepal' },
              { value: 'Bhutan', label: 'Bhutan' },
              { value: 'Indonesia', label: 'Indonesia' },
              { value: 'South Korea', label: 'South Korea' },
              { value: 'Dubai', label: 'Dubai' },
            ];
          } else if (fieldKey === 'studentCategory') {
            return [
              { value: 'Gen', label: 'GEN' },
              { value: 'obc', label: 'OBC' },
              { value: 'sc', label: 'SC' },
              { value: 'st', label: 'ST' },
              { value: 'ebc', label: 'EBC' },
              { value: 'new_student', label: 'NEW STUDENT' },
              { value: 'old_student', label: 'OLD STUDENT' },
            ];
          } else if (fieldKey === 'bloodGroup') {
            return [
              { value: 'A+', label: 'A+' },
              { value: 'A-', label: 'A-' },
              { value: 'B+', label: 'B+' },
              { value: 'B-', label: 'B-' },
              { value: 'AB+', label: 'AB+' },
              { value: 'AB-', label: 'AB-' },
              { value: 'O+', label: 'O+' },
              { value: 'O-', label: 'O-' },
            ];
          } else if (fieldKey === 'gpRelation') {
            return [
              { value: 'Father', label: 'Father' },
              { value: 'Mother', label: 'Mother' },
              { value: 'Other', label: 'Other' },
            ];
          }
          return [];
        })();
        
        return (
          <CustomDropdown
            {...commonProps}
            showSearch={field.showSearch !== false}
            options={selectOptions}
          />
        );

      case 'image':
        return (
          <div className="form-control flex flex-col space-y-2">
            <label className="form-label">
              {commonProps.label} {commonProps.required && <span className="text-red-500">*</span>}
            </label>
            <Upload
              beforeUpload={(file) => {
                handleChange(fieldKey, file);
                handleBlur(fieldKey);
                return false;
              }}
              onRemove={() => handleChange(fieldKey, null)}
              maxCount={1}
              accept="image/*"
              fileList={formData[fieldKey] ? [{
                uid: '-1',
                name: formData[fieldKey].name,
                status: 'done',
                originFileObj: formData[fieldKey],
              }] : []}
              listType="picture-card"
              onPreview={(file) => {
                const imageUrl = URL.createObjectURL(file.originFileObj);
                window.open(imageUrl, '_blank');
              }}
              itemRender={(originNode, file) => (
                <div className="ant-upload-list-item-container">
                  {originNode}
                </div>
              )}
            >
              {!formData[fieldKey] && (
                <Button icon={<IconUpload />} />
              )}
            </Upload>
            {errors[fieldKey] && <p className="mt-1 text-sm text-red-600">{errors[fieldKey]}</p>}
          </div>
        );

      default:
        return (
          <TextField
            {...commonProps}
            type="text"
          />
        );
    }
  };

  const renderSection = (sectionKey, section, index) => {
    if (!section.enabled) return null;

    return (
      <div
        ref={(ref) => accordionRefs.current[index] = ref}
        className="mb-4 border rounded-lg overflow-hidden shadow-lg bg-card-color"
        key={sectionKey}
      >
        <button
          type="button"
          className={`w-full px-4 py-3 md:px-6 md:py-4 text-left flex justify-between items-center transition-colors ${expandedSections.includes(index) ? 'bg-blue-50 text-blue-700' : 'bg-white hover:bg-gray-50'}`}
          onClick={() => toggleSection(index)}
        >
          <span className="font-medium text-base md:text-lg">{section.label}</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${expandedSections.includes(index) ? 'rotate-180 text-blue-600' : 'text-gray-500'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`bg-body-color transition-all duration-300 overflow-hidden ${expandedSections.includes(index) ? 'max-h-[500px] overflow-y-auto py-4' : 'max-h-0'}`}>
          <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(section.fields).map(([fieldKey, field]) => (
              renderField(fieldKey, field, sectionKey)
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (!config) {
    return (
      <div className="w-full bg-body-color p-6 text-center">
        <h2 className="text-xl font-medium text-gray-600">No form configuration selected</h2>
        <p className="text-gray-500 mt-2">Please select or create a form template</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-body-color">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Applicant Registration</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        {Object.entries(config.sections).map(([sectionKey, section], index) => 
          renderSection(sectionKey, section, index)
        )}

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