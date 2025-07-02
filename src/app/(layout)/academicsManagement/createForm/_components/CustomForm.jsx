'use client';
import { useState, useEffect, useRef } from 'react';
import { Button, Checkbox, message, DatePicker, Radio, Select, Upload, Collapse, Input, Modal } from 'antd';
import { IconSettings, IconCheck, IconX, IconUpload, IconGripVertical, IconPlus } from '@tabler/icons-react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { postApplicationFormTemplateRequest } from '@/Redux/features/applicationForm/applicationFormSlice';

dayjs.extend(customParseFormat);
const { Panel } = Collapse;

const CustomForm = ({ onSave }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { applicationFormTemplatePostData } = useSelector((state) => state.applicationForm);

    // Default empty config that will be populated from API
    const emptyConfig = {
        title: "",
        sections: {}
    };

    const [config, setConfig] = useState(emptyConfig);
    const [showPreview, setShowPreview] = useState(false);
    const [draggedItem, setDraggedItem] = useState({ section: null, field: null });
    const [hoverIndex, setHoverIndex] = useState({ section: null, field: null });
    const [expandedSections, setExpandedSections] = useState([]);
    const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
    const [templateName, setTemplateName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Transform API response data to our config format
    const transformApiDataToConfig = (apiData) => {
        const transformedSections = {};

        // Assuming apiData.sections exists in the POST response
        Object.entries(apiData.sections).forEach(([sectionKey, sectionData]) => {
            const fields = {};
            const fieldsOrder = [];

            sectionData.fields.forEach(fieldData => {
                const fieldKey = fieldData.fieldName.toLowerCase().replace(/\s+/g, '');

                fields[fieldKey] = {
                    enabled: true,
                    required: fieldData.isRequired || false,
                    type: mapFieldType(fieldData.fieldType),
                    label: fieldData.fieldName,
                    colSpan: 1,
                    ...(fieldData.options ? { options: fieldData.options.map(opt => ({ value: opt, label: opt })) } : {})
                };

                fieldsOrder.push(fieldKey);
            });

            transformedSections[sectionKey] = {
                enabled: true,
                label: sectionData.sectionName,
                fieldsOrder,
                fields
            };
        });

        return {
            title: apiData.templateName,
            sections: transformedSections
        };
    };

    // Map API field types to our field types
    const mapFieldType = (apiType) => {
        switch (apiType.toLowerCase()) {
            case 'text': return 'text';
            case 'number': return 'tel';
            case 'date': return 'date';
            case 'radio': return 'radio';
            case 'dropdown': return 'select';
            case 'file': return 'image';
            case 'textarea': return 'textarea';
            case 'email': return 'email';
            default: return 'text';
        }
    };

    const handleCreateTemplate = () => {
        setIsCreatingTemplate(true);
    };

    const handleTemplateNameSubmit = async () => {
        setIsLoading(true);
        dispatch(postApplicationFormTemplateRequest({
            templateName,
            token
        }));
    };

    const handleSave = () => {
        if (Object.keys(config.sections).length === 0) {
            message.error('No template loaded. Please create or load a template first.');
            return;
        }
        setShowPreview(true);
        message.success('Configuration saved! You can now drag to reorder fields.');
    };

    const handleFinalSave = () => {
        if (onSave) {
            onSave(config);
        }
        message.success('Form configuration saved with new field order!');
    };

    const handleReset = () => {
        setConfig(emptyConfig);
        setShowPreview(false);
        setExpandedSections([]);
        setTemplateName('');
        message.info('Form configuration reset');
    };

    const toggleSection = (sectionKey) => {
        setConfig(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                [sectionKey]: {
                    ...prev.sections[sectionKey],
                    enabled: !prev.sections[sectionKey].enabled
                }
            }
        }));
    };

    const toggleField = (sectionKey, fieldKey) => {
        setConfig(prev => {
            const newEnabled = !prev.sections[sectionKey].fields[fieldKey].enabled;
            let newFieldsOrder = [...prev.sections[sectionKey].fieldsOrder];

            if (newEnabled && !newFieldsOrder.includes(fieldKey)) {
                newFieldsOrder.push(fieldKey);
            } else if (!newEnabled) {
                newFieldsOrder = newFieldsOrder.filter(key => key !== fieldKey);
            }

            return {
                ...prev,
                sections: {
                    ...prev.sections,
                    [sectionKey]: {
                        ...prev.sections[sectionKey],
                        fields: {
                            ...prev.sections[sectionKey].fields,
                            [fieldKey]: {
                                ...prev.sections[sectionKey].fields[fieldKey],
                                enabled: newEnabled
                            }
                        },
                        fieldsOrder: newFieldsOrder
                    }
                }
            };
        });
    };

    const toggleFieldRequired = (sectionKey, fieldKey) => {
        setConfig(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                [sectionKey]: {
                    ...prev.sections[sectionKey],
                    fields: {
                        ...prev.sections[sectionKey].fields,
                        [fieldKey]: {
                            ...prev.sections[sectionKey].fields[fieldKey],
                            required: !prev.sections[sectionKey].fields[fieldKey].required
                        }
                    }
                }
            }
        }));
    };

    // Drag and Drop Handlers
    const handleDragStart = (e, sectionKey, fieldKey) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ sectionKey, fieldKey }));
        e.dataTransfer.effectAllowed = 'move';
        setDraggedItem({ section: sectionKey, field: fieldKey });
        setTimeout(() => {
            e.target.style.opacity = '0.4';
        }, 0);
    };

    const handleDragOver = (e, sectionKey, fieldKey) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setHoverIndex({ section: sectionKey, field: fieldKey });
    };

    const handleDragEnd = () => {
        setDraggedItem({ section: null, field: null });
        setHoverIndex({ section: null, field: null });
    };

    const handleDrop = (e, dropSectionKey, dropFieldKey) => {
        e.preventDefault();
        const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
        const dragSectionKey = dragData.sectionKey;
        const dragFieldKey = dragData.fieldKey;

        if (dragSectionKey !== dropSectionKey || dragFieldKey !== dropFieldKey) {
            setConfig(prev => {
                const dragIndex = prev.sections[dragSectionKey].fieldsOrder.indexOf(dragFieldKey);
                const dropIndex = prev.sections[dropSectionKey].fieldsOrder.indexOf(dropFieldKey);

                // If moving within the same section
                if (dragSectionKey === dropSectionKey) {
                    const newFieldsOrder = [...prev.sections[dragSectionKey].fieldsOrder];
                    const [removed] = newFieldsOrder.splice(dragIndex, 1);
                    newFieldsOrder.splice(dropIndex, 0, removed);

                    return {
                        ...prev,
                        sections: {
                            ...prev.sections,
                            [dragSectionKey]: {
                                ...prev.sections[dragSectionKey],
                                fieldsOrder: newFieldsOrder
                            }
                        }
                    };
                }
                // If moving between sections (not implemented in this example)
                return prev;
            });
        }
        setHoverIndex({ section: null, field: null });
    };

    const renderField = (field) => {
        const commonProps = {
            className: "w-full p-2 border rounded",
            placeholder: `Enter ${field.label}`
        };

        switch (field.type) {
            case 'text':
            case 'email':
            case 'tel':
                return (
                    <div className="form-control">
                        <label className="form-label">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type={field.type}
                            className={`w-full form-input ${field.required ? 'required' : ''}`}
                            placeholder={commonProps.placeholder}
                        />
                    </div>
                );
            case 'date':
                return (
                    <div className="form-control">
                        <label className="form-label">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <DatePicker
                            className="w-full form-input"
                            format={'DD/MM/YYYY'}
                            placeholder={commonProps.placeholder}
                        />
                    </div>
                );
            case 'radio':
                return (
                    <div className="form-control">
                        <label className="form-label">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <div className="flex gap-4 items-center">
                            {field.options.map((option) => (
                                <label key={option.value} className="form-radio inline-flex items-center">
                                    <input
                                        type="radio"
                                        name={field.id}
                                        value={option.value}
                                        className="form-radio-input"
                                    />
                                    <span className="ml-2 capitalize">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            case 'select':
                return (
                    <div className="form-control">
                        <label className="form-label">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <Select
                            className="w-full"
                            placeholder={commonProps.placeholder}
                            options={field.options}
                            showSearch
                        />
                    </div>
                );
            case 'image':
                return (
                    <div className="form-control flex flex-col space-y-2">
                        <label className="form-label">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <Upload
                            maxCount={1}
                            accept="image/*"
                            listType="picture-card"
                        >
                            <Button icon={<IconUpload />}>Upload</Button>
                        </Upload>
                    </div>
                );
            case 'textarea':
                return (
                    <div className="form-control">
                        <label className="form-label">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <textarea
                            className="w-full form-input"
                            rows={3}
                            placeholder={commonProps.placeholder}
                        />
                    </div>
                );
            default:
                return (
                    <div className="form-control">
                        <label className="form-label">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type="text"
                            className="w-full form-input"
                            placeholder={commonProps.placeholder}
                        />
                    </div>
                );
        }
    };

    const renderSectionFields = (sectionKey, section) => {
        // Group fields into rows of 2 columns
        const rows = [];
        let currentRow = [];

        section.fieldsOrder
            .filter(fieldKey => section.fields[fieldKey]?.enabled)
            .forEach((fieldKey, index) => {
                const field = section.fields[fieldKey];
                if (currentRow.length === 0 ||
                    (currentRow.length === 1 && currentRow[0].colSpan === 1 && field.colSpan === 1)) {
                    currentRow.push({ ...field, id: fieldKey });
                } else {
                    rows.push(currentRow);
                    currentRow = [{ ...field, id: fieldKey }];
                }
            });

        if (currentRow.length > 0) {
            rows.push(currentRow);
        }

        return (
            <div className="space-y-4">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-2 gap-4">
                        {row.map((field, colIndex) => {
                            const isDragging = draggedItem.section === sectionKey && draggedItem.field === field.id;
                            const isHovered = hoverIndex.section === sectionKey && hoverIndex.field === field.id;

                            return (
                                <div
                                    key={`${sectionKey}-${field.id}-${colIndex}`}
                                    className={`col-span-${field.colSpan} relative transition-all duration-200 ${isHovered ? 'bg-blue-50' : ''
                                        }`}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, sectionKey, field.id)}
                                    onDragOver={(e) => handleDragOver(e, sectionKey, field.id)}
                                    onDragEnd={handleDragEnd}
                                    onDrop={(e) => handleDrop(e, sectionKey, field.id)}
                                    style={{
                                        opacity: isDragging ? 0.5 : 1,
                                        border: isHovered ? '1px dashed #1890ff' : '1px solid transparent'
                                    }}
                                >
                                    <div className="absolute left-0 top-0 p-1 cursor-grab">
                                        <IconGripVertical size={16} className="text-gray-400" />
                                    </div>
                                    {renderField(field)}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    };

    const renderFormBuilder = () => {
        if (Object.keys(config.sections).length === 0) {
            return (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No template loaded. Create a new template to get started.</p>
                    <Button
                        type="primary"
                        icon={<IconPlus size={18} />}
                        onClick={handleCreateTemplate}
                    >
                        Create New Template
                    </Button>
                </div>
            );
        }

        const items = Object.entries(config.sections).map(([sectionKey, section]) => ({
            key: sectionKey,
            label: (
                <div className="flex items-center justify-between">
                    <span>{section.label}</span>
                    <Checkbox
                        checked={section.enabled}
                        onChange={(e) => {
                            e.stopPropagation();
                            toggleSection(sectionKey);
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        Enable Section
                    </Checkbox>
                </div>
            ),
            extra: (
                <div className="flex items-center">
                    {section.enabled && (
                        <span className="text-sm text-gray-500 mr-2">
                            {Object.values(section.fields).filter(f => f.enabled).length} of {Object.keys(section.fields).length} fields enabled
                        </span>
                    )}
                </div>
            ),
            className: !section.enabled ? 'opacity-60' : '',
            children: section.enabled && (
                <div className="space-y-4">
                    {Object.entries(section.fields).map(([fieldKey, field]) => (
                        <div key={fieldKey} className="flex items-center justify-between p-2 border rounded">
                            <span className="capitalize">{field.label || fieldKey.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <div className="flex items-center gap-4">
                                <Checkbox
                                    checked={field.enabled}
                                    onChange={() => toggleField(sectionKey, fieldKey)}
                                >
                                    Include
                                </Checkbox>
                                <Checkbox
                                    checked={field.required}
                                    onChange={() => toggleFieldRequired(sectionKey, fieldKey)}
                                    disabled={!field.enabled}
                                >
                                    Required
                                </Checkbox>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }));

        return (
            <Collapse
                activeKey={expandedSections}
                onChange={(keys) => setExpandedSections(keys)}
                className="form-builder-accordion"
                items={items}
            />
        );
    };

    const renderFormPreview = () => {
        const items = Object.entries(config.sections)
            .filter(([_, section]) => section.enabled)
            .map(([sectionKey, section]) => ({
                key: sectionKey,
                label: section.label,
                extra: (
                    <span className="text-sm text-gray-500">
                        {section.fieldsOrder.filter(fieldKey => section.fields[fieldKey]?.enabled).length} fields
                    </span>
                ),
                children: renderSectionFields(sectionKey, section)
            }));

        return (
            <Collapse
                activeKey={expandedSections}
                onChange={(keys) => setExpandedSections(keys)}
                className="form-preview-accordion"
                items={items}
            />
        );
    };

    return (
        <div className="p-4 bg-body-color rounded-lg shadow">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                    <IconSettings className="text-primary" /> Custom Form Configuration
                </h2>
                <div className="flex gap-2">
                    <Button
                        onClick={handleReset}
                        icon={<IconX size={18} />}
                    >
                        Reset
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleSave}
                        icon={<IconCheck size={18} />}
                        disabled={Object.keys(config.sections).length === 0}
                    >
                        Save Configuration
                    </Button>
                </div>
            </div>

            {!showPreview ? (
                renderFormBuilder()
            ) : (
                <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Form Preview</h3>
                    <p className="text-gray-600 mb-4">Drag and drop fields to reorder them within each section</p>

                    <div className="w-full bg-body-color">
                        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">{config.title}</h1>
                        {renderFormPreview()}
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <Button onClick={() => setShowPreview(false)}>
                            Back to Configuration
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleFinalSave}
                        >
                            Save Form Order
                        </Button>
                    </div>
                </div>
            )}

            <Modal
                title="Create New Template"
                open={isCreatingTemplate}
                onCancel={() => setIsCreatingTemplate(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsCreatingTemplate(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={isLoading}
                        onClick={handleTemplateNameSubmit}
                    >
                        Create Template
                    </Button>,
                ]}
            >
                <div className="p-4">
                    <p className="mb-4">Enter a name for your new template:</p>
                    <Input
                        placeholder="Template Name"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default CustomForm;