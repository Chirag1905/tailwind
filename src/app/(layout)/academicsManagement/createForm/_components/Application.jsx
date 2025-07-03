// 'use client';
// import { useState } from 'react';
// import { Input, DatePicker, Select, Radio, Upload, Button, Checkbox, Row, Col, Card, message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import { IconUpload } from '@tabler/icons-react';
// import TextField from '@/components/utils/TextField';

// const { TextArea } = Input;

// const Application = ({ config }) => {
//   // Safely extract sections with fallback
//   const sections = Array.isArray(config?.applicantStudentSectionObjects)
//     ? [...config.applicantStudentSectionObjects]
//     : [];
//   console.log("🚀 ~ Application ~ sections:", sections)

//   // Initialize form state
//   const [formData, setFormData] = useState({});

//   const handleInputChange = (fieldName, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [fieldName]: value
//     }));
//   };

//   const handleFileChange = ({ fileList }) => {
//     // Handle file uploads if needed
//   };

//   const renderField = (field) => {
//     const commonProps = {
//       placeholder: `Enter ${field.fieldDisplayName}`,
//       disabled: !field.isFieldActive,
//       onChange: (e) => handleInputChange(
//         field.fieldColumnName,
//         e?.target?.value ?? e
//       ),
//       value: formData[field.fieldColumnName] || '',
//     };

//     const isRequired = field.mandatoryField;

//     switch (field.fieldElementId.elementType.toLowerCase()) {
//       case 'textbox':
//         return (
//           <div className="form-control">
//             <label className="form-label">
//               {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
//             </label>
//             <TextField
//               className={`w-full ${isRequired ? 'required' : ''}`}
//               {...commonProps}
//             />
//           </div>
//         );
//       case 'textarea':
//         return (
//           <div className="form-control">
//             <label className="form-label">
//               {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
//             </label>
//             <TextArea
//               {...commonProps}
//               rows={4}
//               className="w-full"
//             />
//           </div>
//         );
//       case 'datepicker':
//         return (
//           <div className="form-control">
//             <label className="form-label">
//               {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
//             </label>
//             <DatePicker
//               {...commonProps}
//               format="DD/MM/YYYY"
//               className="w-full"
//             />
//           </div>
//         );
//       case 'dropdown':
//         return (
//           <div className="form-control">
//             <label className="form-label">
//               {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
//             </label>
//             <Select
//               {...commonProps}
//               className="w-full"
//               showSearch
//             >
//               {/* Add your options here */}
//               <Select.Option value="option1">Option 1</Select.Option>
//               <Select.Option value="option2">Option 2</Select.Option>
//             </Select>
//           </div>
//         );
//       case 'radio':
//         return (
//           <div className="form-control">
//             <label className="form-label">
//               {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
//             </label>
//             <Radio.Group
//               {...commonProps}
//               className="flex gap-4 items-center"
//             >
//               {/* Add your radio options here */}
//               <Radio value="male">Male</Radio>
//               <Radio value="female">Female</Radio>
//               <Radio value="other">Other</Radio>
//             </Radio.Group>
//           </div>
//         );
//       case 'checkbox':
//         return (
//           <div className="form-control">
//             <Checkbox
//               {...commonProps}
//               checked={formData[field.fieldColumnName] || false}
//             >
//               {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
//             </Checkbox>
//           </div>
//         );
//       case 'file':
//         return (
//           <div className="form-control flex flex-col space-y-2">
//             <label className="form-label">
//               {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
//             </label>
//             <Upload
//               maxCount={1}
//               accept="image/*"
//               listType="picture-card"
//               fileList={formData[field.fieldColumnName] || []}
//               onChange={(info) => {
//                 handleInputChange(field.fieldColumnName, info.fileList);
//               }}
//               beforeUpload={() => false} // Prevent auto upload
//             >
//               <Button icon={<IconUpload />}>Upload</Button>
//             </Upload>
//           </div>
//         );
//       default:
//         return (
//           <div className="form-control">
//             <label className="form-label">
//               {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
//             </label>
//             <Input
//               {...commonProps}
//               className="w-full"
//             />
//           </div>
//         );
//     }
//   };

//   const renderSection = (section) => {
//     if (!section.isSectionActive) return null;

//     const activeFields = section.applicantStudentSectionFieldsObject
//       .filter(field => field.isFieldActive && field.showField)
//       .sort((a, b) => a.fieldPriority - b.fieldPriority);

//     if (activeFields.length === 0) return null;

//     return (
//       <Card
//         key={section.applicantStudentDefaultSectionId || section.customSectionUniqueId}
//         title={section.displaySectionName}
//         style={{ marginBottom: 24 }}
//       >
//         <Row gutter={16}>
//           {activeFields.map((field) => (
//             <Col
//               key={field.applicantStudentDefaultSectionFieldId || field.customFieldUniqueId}
//               span={12}
//             >
//               {renderField(field)}
//             </Col>
//           ))}
//         </Row>
//       </Card>
//     );
//   };


//   return (
//     <div style={{ padding: 24 }}>
//       {sections
//         .sort((a, b) => a.sectionPriority - b.sectionPriority)
//         .map(renderSection)}

//       <div style={{ marginTop: 24, textAlign: 'right' }}>
//         <Button type="primary">
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Application;

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

const Application = ({ config }) => {
  // Safely extract sections with fallback
  const sections = Array.isArray(config?.applicantStudentSectionObjects)
    ? [...config.applicantStudentSectionObjects]
    : [];
  console.log("🚀 ~ Application ~ sections:", sections)

// const Application = ({ sections }) => {
  // console.log("🚀 ~ Application ~ sections:", sections)
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
    if (sections && sections.length > 0) {
      const initialData = {};
      const initialExpandedSections = [];
      
      sections.forEach((section, index) => {
        if (section.isSectionActive) {
          initialExpandedSections.push(index);
          
          section.applicantStudentSectionFieldsObject.forEach(field => {
            if (field.isFieldActive && field.showField) {
              // Set default value based on field type
              initialData[field.fieldColumnName] = field.defaultValue || 
                (field.fieldElementId.elementType === 'checkbox' ? false : 
                 field.fieldElementId.elementType === 'radio' ? '' : 
                 field.fieldElementId.elementType === 'dropdown' ? '' : 
                 field.fieldElementId.elementType === 'file' ? null : '');
            }
          });
        }
      });
      
      setFormData(initialData);
      setExpandedSections(initialExpandedSections);
    }
  }, []);

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
    if (!sections) return true;
    
    // Find the field configuration
    let fieldConfig = null;
    for (const section of sections) {
      const field = section.applicantStudentSectionFieldsObject.find(f => f.fieldColumnName === name);
      if (field) {
        fieldConfig = field;
        break;
      }
    }

    if (!fieldConfig) return true;

    // Run validation based on field configuration
    let error = '';
    
    if (fieldConfig.mandatoryField && !value) {
      error = `${fieldConfig.fieldDisplayName || name} is required`;
    } else if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Invalid email format';
    } else if ((name === 'mobile' || name === 'phone') && value && !/^[0-9]{10}$/.test(value)) {
      error = 'Invalid phone number';
    } else if ((name === 'pincode') && value && !/^[0-9]{6}$/.test(value)) {
      error = 'PIN code must be 6 digits';
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return !error;
  };

  const validateForm = () => {
    if (!sections) return false;
    
    let isValid = true;
    const newErrors = {};

    // Validate all enabled fields
    sections.forEach(section => {
      if (section.isSectionActive) {
        section.applicantStudentSectionFieldsObject.forEach(field => {
          if (field.isFieldActive && field.showField && field.mandatoryField) {
            const valid = validateField(field.fieldColumnName, formData[field.fieldColumnName]);
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

  const renderField = (field) => {
    if (!field.isFieldActive || !field.showField) return null;

    const commonProps = {
      key: field.fieldColumnName,
      label: field.fieldDisplayName || field.fieldColumnName,
      name: field.fieldColumnName,
      value: formData[field.fieldColumnName],
      onChange: (value) => handleChange(field.fieldColumnName, value),
      onBlur: () => handleBlur(field.fieldColumnName),
      error: errors[field.fieldColumnName],
      required: field.mandatoryField,
      ref: (ref) => fieldRefs.current[field.fieldColumnName] = ref,
      placeholder: `Enter ${field.fieldDisplayName || field.fieldColumnName}`,
      disabled: false // You can add a disabled property to your field config if needed
    };

    switch (field.fieldElementId.elementType) {
      case 'textbox':
        return (
          <TextField
            {...commonProps}
            type="text"
          />
        );

      case 'textarea':
        return (
          <div className="mb-4 form-control">
            <label className="form-label">
              {commonProps.label} {commonProps.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              className={`w-full form-input ${errors[field.fieldColumnName] ? 'border-red-500' : ''}`}
              value={formData[field.fieldColumnName] || ''}
              onChange={(e) => handleChange(field.fieldColumnName, e.target.value)}
              onBlur={commonProps.onBlur}
              placeholder={commonProps.placeholder}
              rows={3}
            />
            {errors[field.fieldColumnName] && <p className="mt-1 text-sm text-red-600">{errors[field.fieldColumnName]}</p>}
          </div>
        );

      case 'datepicker':
        return (
          <div className="mb-4 form-control">
            <label className="form-label">
              {commonProps.label} {commonProps.required && <span className="text-red-500">*</span>}
            </label>
            <DatePicker
              className={`w-full form-input ${errors[field.fieldColumnName] ? 'border-red-500' : ''}`}
              value={formData[field.fieldColumnName] ? dayjs(formData[field.fieldColumnName], dateFormat) : null}
              format={dateFormat}
              onChange={(date, dateString) => {
                handleChange(field.fieldColumnName, dateString);
                handleBlur(field.fieldColumnName);
              }}
              status={errors[field.fieldColumnName] ? 'error' : ''}
              placeholder={commonProps.placeholder}
            />
            {errors[field.fieldColumnName] && <p className="mt-1 text-sm text-red-600">{errors[field.fieldColumnName]}</p>}
          </div>
        );

      case 'radio':
        // Default options for gender, can be extended based on field name
        const radioOptions = field.fieldColumnName === 'gender' ? [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' }
        ] : [];
        
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
                    name={field.fieldColumnName}
                    value={option.value}
                    checked={formData[field.fieldColumnName] === option.value}
                    onChange={(e) => handleChange(field.fieldColumnName, e.target.value)}
                    className="form-radio-input"
                    required={field.mandatoryField}
                  />
                  <span className="ml-2 capitalize">{option.label}</span>
                </label>
              ))}
            </div>
            {errors[field.fieldColumnName] && <p className="mt-1 text-sm text-red-600">{errors[field.fieldColumnName]}</p>}
          </div>
        );

      case 'dropdown':
        // Default options based on field name
        const selectOptions = (() => {
          if (field.fieldColumnName === 'nationality' || field.fieldColumnName === 'country') {
            return [
              { value: 'India', label: 'India' },
              { value: 'Nepal', label: 'Nepal' },
              { value: 'Bhutan', label: 'Bhutan' },
              { value: 'Indonesia', label: 'Indonesia' },
              { value: 'South Korea', label: 'South Korea' },
              { value: 'Dubai', label: 'Dubai' },
            ];
          } else if (field.fieldColumnName === 'studentcategory') {
            return [
              { value: 'Gen', label: 'GEN' },
              { value: 'obc', label: 'OBC' },
              { value: 'sc', label: 'SC' },
              { value: 'st', label: 'ST' },
              { value: 'ebc', label: 'EBC' },
              { value: 'new_student', label: 'NEW STUDENT' },
              { value: 'old_student', label: 'OLD STUDENT' },
            ];
          } else if (field.fieldColumnName === 'bloodgroup') {
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
          }
          return [];
        })();
        
        return (
          <CustomDropdown
            {...commonProps}
            showSearch={true}
            options={selectOptions}
          />
        );

      case 'file':
        return (
          <div className="form-control flex flex-col space-y-2">
            <label className="form-label">
              {commonProps.label} {commonProps.required && <span className="text-red-500">*</span>}
            </label>
            <Upload
              beforeUpload={(file) => {
                handleChange(field.fieldColumnName, file);
                handleBlur(field.fieldColumnName);
                return false;
              }}
              onRemove={() => handleChange(field.fieldColumnName, null)}
              maxCount={1}
              accept="image/*"
              fileList={formData[field.fieldColumnName] ? [{
                uid: '-1',
                name: formData[field.fieldColumnName].name,
                status: 'done',
                originFileObj: formData[field.fieldColumnName],
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
              {!formData[field.fieldColumnName] && (
                <Button icon={<IconUpload />} />
              )}
            </Upload>
            {errors[field.fieldColumnName] && <p className="mt-1 text-sm text-red-600">{errors[field.fieldColumnName]}</p>}
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

  const renderSection = (section, index) => {
    if (!section.isSectionActive) return null;

    return (
      <div
        ref={(ref) => accordionRefs.current[index] = ref}
        className="mb-4 border rounded-lg overflow-hidden shadow-lg bg-card-color"
        key={section.applicantStudentDefaultSectionId}
      >
        <button
          type="button"
          className={`w-full px-4 py-3 md:px-6 md:py-4 text-left flex justify-between items-center transition-colors ${expandedSections.includes(index) ? 'bg-blue-50 text-blue-700' : 'bg-white hover:bg-gray-50'}`}
          onClick={() => toggleSection(index)}
        >
          <span className="font-medium text-base md:text-lg">{section.displaySectionName}</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${expandedSections.includes(index) ? 'rotate-180 text-blue-600' : 'text-gray-500'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`bg-body-color transition-all duration-300 overflow-hidden ${expandedSections.includes(index) ? 'max-h-[500px] overflow-y-auto cus-scrollbar py-4' : 'max-h-0'}`}>
          <div className="px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {section.applicantStudentSectionFieldsObject.map(field => (
                <div key={field.applicantStudentDefaultSectionFieldId}>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!sections || sections.length === 0) {
    return (
      <div className="w-full bg-body-color p-6 text-center">
        <h2 className="text-xl font-medium text-gray-600">No form sections available</h2>
        <p className="text-gray-500 mt-2">Please configure form sections</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-body-color">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Applicant Registration</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        {sections.map((section, index) => 
          renderSection(section, index)
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

export default Application;