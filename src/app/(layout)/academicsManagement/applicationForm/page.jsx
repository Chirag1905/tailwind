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
              initialData[fieldKey] = '';
            }
          });
        }
      });
      
      setFormData(initialData);
      setExpandedSections(initialExpandedSections);
    }
  }, [config]);

  if (!config) {
    return (
      <div className="w-full bg-body-color p-6 text-center">
        <h2 className="text-xl font-medium text-gray-600">No form configuration selected</h2>
        <p className="text-gray-500 mt-2">Please select or create a form template</p>
      </div>
    );
  }

  // Rest of your existing ApplicationForm component code...
  // Keep all your existing handlers (handleChange, handleBlur, etc.)
  // Modify the form rendering to only show enabled sections and fields

  const renderSection = (sectionKey, section, index) => {
    if (!section.enabled) return null;

    return (
      <div
        // ref={(ref) => registerAccordionRef(index, ref)}
        className="mb-4 border rounded-lg overflow-hidden shadow-lg bg-card-color"
        key={sectionKey}
      >
        <button
          type="button"
          className={`w-full px-4 py-3 md:px-6 md:py-4 text-left flex justify-between items-center transition-colors ${expandedSections.includes(index) ? 'bg-blue-50 text-blue-700' : 'bg-white hover:bg-gray-50'}`}
        //   onClick={() => toggleSection(index)}
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
              field.enabled && renderField(fieldKey, field, sectionKey)
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderField = (fieldKey, field, sectionKey) => {
    // Your existing field rendering logic, but only for enabled fields
    // Example for text field:
    return (
      <div 
    //   ref={(ref) => registerFieldRef(fieldKey, ref)}
       key={fieldKey}>
        <TextField
          label={fieldKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          placeholder={`Enter ${fieldKey.replace(/([A-Z])/g, ' $1')}`}
          name={fieldKey}
        //   onChange={(value) => handleChange(fieldKey, value)}
        //   onBlur={() => handleBlur(fieldKey)}
          value={formData[fieldKey] || ''}
          error={errors[fieldKey]}
          required={field.required}
        />
      </div>
    );
  };

  return (
    <div className="w-full bg-body-color">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Applicant Registration</h1>
      <form ref={formRef}
    //    onSubmit={handleSubmit}
       >
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