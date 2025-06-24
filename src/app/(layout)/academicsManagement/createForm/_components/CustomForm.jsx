'use client';
import { useState } from 'react';
import { Button, Checkbox, Collapse, Divider } from 'antd';
import { IconSettings, IconCheck, IconX } from '@tabler/icons-react';

const CustomForm = ({ onSave }) => {
    // Enhanced default configuration with field types
    const defaultConfig = {
        title: "Applicant Registration",
        sections: {
            personalInfo: {
                enabled: true,
                label: 'Student Personal Information',
                fields: {
                    firstName: {
                        enabled: true,
                        required: true,
                        type: 'text',
                        label: 'First Name'
                    },
                    middleName: {
                        enabled: true,
                        required: false,
                        type: 'text',
                        label: 'Middle Name'
                    },
                    lastName: {
                        enabled: true,
                        required: true,
                        type: 'text',
                        label: 'Last Name'
                    },
                    dob: {
                        enabled: true,
                        required: true,
                        type: 'date',
                        label: 'Date of Birth'
                    },
                    gender: {
                        enabled: true,
                        required: true,
                        type: 'radio',
                        label: 'Gender',
                        options: [
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' }
                        ]
                    },
                    nationality: {
                        enabled: true,
                        required: true,
                        type: 'select',
                        label: 'Nationality',
                        options: [
                            { value: 'India', label: 'India' },
                            { value: 'Nepal', label: 'Nepal' },
                            { value: 'Bhutan', label: 'Bhutan' }
                        ]
                    },
                    studentPhoto: {
                        enabled: true,
                        required: false,
                        type: 'image',
                        label: 'Student Photo'
                    },
                    studentCategory: {
                        enabled: true,
                        required: false,
                        type: 'select',
                        label: 'Student Category',
                        options: [
                            { value: 'Gen', label: 'GEN' },
                            { value: 'obc', label: 'OBC' }
                        ]
                    },
                    religion: {
                        enabled: true,
                        required: false,
                        type: 'text',
                        label: 'Religion'
                    },
                    bloodGroup: {
                        enabled: true,
                        required: false,
                        type: 'select',
                        label: 'Blood Group',
                        options: [
                            { value: 'A+', label: 'A+' },
                            { value: 'A-', label: 'A-' }
                        ]
                    },
                    birthPlace: {
                        enabled: true,
                        required: false,
                        type: 'text',
                        label: 'Birth Place'
                    },
                    motherTongue: {
                        enabled: true,
                        required: false,
                        type: 'text',
                        label: 'Mother Tongue'
                    }
                }
            },
            communicationInfo: {
                enabled: true,
                label: 'Student Communication Information',
                fields: {
                    addressLine1: {
                        enabled: true,
                        required: true,
                        type: 'text',
                        label: 'Address Line 1'
                    },
                    addressLine2: {
                        enabled: true,
                        required: false,
                        type: 'text',
                        label: 'Address Line 2'
                    },
                    city: {
                        enabled: true,
                        required: true,
                        type: 'text',
                        label: 'City'
                    },
                    state: {
                        enabled: true,
                        required: true,
                        type: 'text',
                        label: 'State'
                    },
                    pinCode: {
                        enabled: true,
                        required: true,
                        type: 'tel',
                        label: 'PIN Code',
                        validation: (value) => !/^[0-9]{6}$/.test(value) ? 'PIN code must be 6 digits' : ''
                    },
                    country: {
                        enabled: true,
                        required: true,
                        type: 'select',
                        label: 'Country',
                        options: [
                            { value: 'India', label: 'India' },
                            { value: 'Nepal', label: 'Nepal' }
                        ]
                    },
                    phone: {
                        enabled: true,
                        required: false,
                        type: 'tel',
                        label: 'Phone'
                    },
                    mobile: {
                        enabled: true,
                        required: true,
                        type: 'tel',
                        label: 'Mobile',
                        validation: (value) => !/^[0-9]{10}$/.test(value) ? 'Invalid mobile number' : ''
                    },
                    email: {
                        enabled: true,
                        required: true,
                        type: 'email',
                        label: 'Email',
                        validation: (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : ''
                    }
                }
            }
        }
    };

    const [config, setConfig] = useState(defaultConfig);

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
                            enabled: !prev.sections[sectionKey].fields[fieldKey].enabled
                        }
                    }
                }
            }
        }));
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

    const handleSave = () => {
        onSave(config);
    };

    const handleReset = () => {
        setConfig(defaultConfig);
    };

    const collapseItems = Object.entries(config.sections).map(([sectionKey, section]) => ({
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
        children: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <Collapse accordion items={collapseItems} />
        </div>
    );
};

export default CustomForm;