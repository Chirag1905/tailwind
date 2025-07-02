'use client';
import { useState } from 'react';
import { Input, DatePicker, Select, Radio, Upload, Button, Checkbox, Row, Col, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { IconUpload } from '@tabler/icons-react';

const { TextArea } = Input;

const Application = ({ config }) => {
  // Safely extract sections with fallback
  const sections = Array.isArray(config?.applicantStudentSectionObjects) 
    ? [...config.applicantStudentSectionObjects] 
    : [];

  // Initialize form state
  const [formData, setFormData] = useState({});

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleFileChange = ({ fileList }) => {
    // Handle file uploads if needed
  };

  const renderField = (field) => {
    const commonProps = {
      placeholder: `Enter ${field.fieldDisplayName}`,
      disabled: !field.isFieldActive,
      onChange: (e) => handleInputChange(
        field.fieldColumnName,
        e?.target?.value ?? e
      ),
      value: formData[field.fieldColumnName] || '',
    };

    const isRequired = field.mandatoryField;

    switch (field.fieldElementId.elementType.toLowerCase()) {
      case 'textbox':
        return (
          <div className="form-control">
            <label className="form-label">
              {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <Input
              {...commonProps}
              className={`w-full ${isRequired ? 'required' : ''}`}
            />
          </div>
        );
      case 'textarea':
        return (
          <div className="form-control">
            <label className="form-label">
              {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <TextArea
              {...commonProps}
              rows={4}
              className="w-full"
            />
          </div>
        );
      case 'datepicker':
        return (
          <div className="form-control">
            <label className="form-label">
              {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <DatePicker
              {...commonProps}
              format="DD/MM/YYYY"
              className="w-full"
            />
          </div>
        );
      case 'dropdown':
        return (
          <div className="form-control">
            <label className="form-label">
              {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <Select
              {...commonProps}
              className="w-full"
              showSearch
            >
              {/* Add your options here */}
              <Select.Option value="option1">Option 1</Select.Option>
              <Select.Option value="option2">Option 2</Select.Option>
            </Select>
          </div>
        );
      case 'radio':
        return (
          <div className="form-control">
            <label className="form-label">
              {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <Radio.Group
              {...commonProps}
              className="flex gap-4 items-center"
            >
              {/* Add your radio options here */}
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </Radio.Group>
          </div>
        );
      case 'checkbox':
        return (
          <div className="form-control">
            <Checkbox
              {...commonProps}
              checked={formData[field.fieldColumnName] || false}
            >
              {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
            </Checkbox>
          </div>
        );
      case 'file':
        return (
          <div className="form-control flex flex-col space-y-2">
            <label className="form-label">
              {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <Upload
              maxCount={1}
              accept="image/*"
              listType="picture-card"
              fileList={formData[field.fieldColumnName] || []}
              onChange={(info) => {
                handleInputChange(field.fieldColumnName, info.fileList);
              }}
              beforeUpload={() => false} // Prevent auto upload
            >
              <Button icon={<IconUpload />}>Upload</Button>
            </Upload>
          </div>
        );
      default:
        return (
          <div className="form-control">
            <label className="form-label">
              {field.fieldDisplayName} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <Input
              {...commonProps}
              className="w-full"
            />
          </div>
        );
    }
  };

  const renderSection = (section) => {
    if (!section.isSectionActive) return null;

    const activeFields = section.applicantStudentSectionFieldsObject
      .filter(field => field.isFieldActive && field.showField)
      .sort((a, b) => a.fieldPriority - b.fieldPriority);

    if (activeFields.length === 0) return null;

    return (
      <Card
        key={section.applicantStudentDefaultSectionId || section.customSectionUniqueId}
        title={section.displaySectionName}
        style={{ marginBottom: 24 }}
      >
        <Row gutter={16}>
          {activeFields.map((field) => (
            <Col
              key={field.applicantStudentDefaultSectionFieldId || field.customFieldUniqueId}
              span={12}
            >
              {renderField(field)}
            </Col>
          ))}
        </Row>
      </Card>
    );
  };

  
  return (
    <div style={{ padding: 24 }}>
      {sections
        .sort((a, b) => a.sectionPriority - b.sectionPriority)
        .map(renderSection)}

      <div style={{ marginTop: 24, textAlign: 'right' }}>
        <Button type="primary">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Application;