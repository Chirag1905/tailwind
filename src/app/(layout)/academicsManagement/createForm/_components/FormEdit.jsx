'use client';
import { useState, useEffect } from 'react';
import { Button, Checkbox, message, Collapse } from 'antd';
import { IconSettings, IconCheck, IconX } from '@tabler/icons-react';

const { Panel } = Collapse;

const FormEdit = ({ config }) => {
    // Function to transform API data to defaultConfig format
    const transformApiDataToConfig = (apiSections) => {
        if (!Array.isArray(apiSections)) {
            return {
                title: "Applicant Registration",
                sections: {}
            };
        }

        const config = {
            title: "Applicant Registration",
            sections: {}
        };

        apiSections.forEach(section => {
            // Skip deleted sections but include inactive ones (they can be enabled later)
            if (section.isSectionDelete) return;

            const sectionKey = section.sectionName.toLowerCase().replace(/\s+/g, '');
            const sectionFields = {};

            section.applicantStudentSectionFieldsObject?.forEach(field => {
                // Skip deleted fields but include inactive ones
                if (field.isFieldDelete) return;

                const fieldKey = field.fieldColumnName;
                const fieldType = field.fieldElementId?.elementType;

                // Map API field types to your form field types
                let mappedType = 'text';
                switch (fieldType) {
                    case 'textbox':
                        mappedType = 'text';
                        break;
                    case 'textarea':
                        mappedType = 'textarea';
                        break;
                    case 'datepicker':
                        mappedType = 'date';
                        break;
                    case 'radio':
                        mappedType = 'radio';
                        break;
                    case 'dropdown':
                        mappedType = 'select';
                        break;
                    case 'file':
                        mappedType = 'image';
                        break;
                    case 'checkbox':
                        mappedType = 'checkbox';
                        break;
                    default:
                        mappedType = 'text';
                }

                sectionFields[fieldKey] = {
                    enabled: field.isFieldActive && field.showField, // Use both active and showField
                    required: field.mandatoryField,
                    type: mappedType,
                    label: field.fieldDisplayName || field.fieldName,
                    colSpan: 1, // Default column span, can be adjusted
                    // Add options if it's a radio or select field
                    options: field.applicantStudentSectionFieldOptionsObject?.map(opt => ({
                        value: opt.optionValue,
                        label: opt.optionName
                    })) || []
                };
            });

            config.sections[sectionKey] = {
                enabled: section.isSectionActive, // Use the section active status from API
                label: section.displaySectionName || section.sectionName,
                fieldsOrder: Object.keys(sectionFields),
                fields: sectionFields
            };
        });

        return config;
    };

    // Safely extract sections with fallback
    const sections = Array.isArray(config?.applicantStudentSectionObjects)
        ? [...config.applicantStudentSectionObjects]
        : [];

    const [expandedSections, setExpandedSections] = useState([]);
    const [configs, setConfigs] = useState(() => transformApiDataToConfig(sections));

    // Initialize expanded sections based on config
    useEffect(() => {
        const initialExpandedSections = Object.keys(configs.sections)
            .map((_, index) => index)
            .filter(index => {
                const sectionKey = Object.keys(configs.sections)[index];
                return configs.sections[sectionKey].enabled;
            });
        setExpandedSections(initialExpandedSections);
    }, [configs]);

    const handleSave = () => {
        message.success('Configuration saved!');
    };

    const handleReset = () => {
        const newConfig = transformApiDataToConfig(sections);
        setConfigs(newConfig);

        // Also reset expanded sections to show all enabled sections
        const initialExpandedSections = Object.keys(newConfig.sections)
            .map((_, index) => index)
            .filter(index => {
                const sectionKey = Object.keys(newConfig.sections)[index];
                return newConfig.sections[sectionKey].enabled;
            });
        setExpandedSections(initialExpandedSections);

        message.info('Form configuration reset to defaults');
    };

    const toggleSection = (index) => {
        setExpandedSections(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const toggleField = (sectionKey, fieldKey) => {
        setConfigs(prev => {
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
        setConfigs(prev => ({
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

    const renderFormBuilder = () => {
        const items = Object.entries(configs.sections).map(([sectionKey, section], index) => ({
            key: index,
            label: (
                <div className="flex items-center justify-between">
                    <span>{section.label}</span>
                    <Checkbox
                        checked={section.enabled}
                        onChange={(e) => {
                            e.stopPropagation();
                            setConfigs(prev => ({
                                ...prev,
                                sections: {
                                    ...prev.sections,
                                    [sectionKey]: {
                                        ...prev.sections[sectionKey],
                                        enabled: !prev.sections[sectionKey].enabled
                                    }
                                }
                            }));

                            if (!section.enabled && !expandedSections.includes(index)) {
                                setExpandedSections([...expandedSections, index]);
                            }
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        Enable Section
                    </Checkbox>
                </div>
            ),
            extra: section.enabled && (
                <span className="text-sm text-gray-500 mr-2">
                    {Object.values(section.fields).filter(f => f.enabled).length} of {Object.keys(section.fields).length} fields enabled
                </span>
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
                    >
                        Save Configuration
                    </Button>
                </div>
            </div>

            {Object.keys(configs.sections).length > 0 ? (
                renderFormBuilder()
            ) : (
                <div className="text-center py-8 text-gray-500">
                    No form sections available. Please check your configuration.
                </div>
            )}
        </div>
    );
};

export default FormEdit;