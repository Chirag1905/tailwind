'use client';
import { useState } from 'react';
import { Button, Checkbox, Collapse, Divider } from 'antd';
import { IconSettings, IconCheck, IconX } from '@tabler/icons-react';

const { Panel } = Collapse;

const CustomForm = ({ onSave }) => {
    // Default configuration with all sections and fields
    const defaultConfig = {
        sections: {
            personalInfo: {
                enabled: true,
                label: 'Student Personal Information',
                fields: {
                    firstName: { enabled: true, required: true },
                    middleName: { enabled: true, required: false },
                    lastName: { enabled: true, required: true },
                    dob: { enabled: true, required: true },
                    gender: { enabled: true, required: true },
                    nationality: { enabled: true, required: true },
                    studentPhoto: { enabled: true, required: false },
                    studentCategory: { enabled: true, required: false },
                    religion: { enabled: true, required: false },
                    bloodGroup: { enabled: true, required: false },
                    birthPlace: { enabled: true, required: false },
                    motherTongue: { enabled: true, required: false }
                }
            },
            communicationInfo: {
                enabled: true,
                label: 'Student Communication Information',
                fields: {
                    addressLine1: { enabled: true, required: true },
                    addressLine2: { enabled: true, required: false },
                    city: { enabled: true, required: true },
                    state: { enabled: true, required: true },
                    pinCode: { enabled: true, required: true },
                    country: { enabled: true, required: true },
                    phone: { enabled: true, required: false },
                    mobile: { enabled: true, required: true },
                    email: { enabled: true, required: true }
                }
            },
            previousInstitution: {
                enabled: true,
                label: 'Previous Institution Information',
                fields: {
                    institutionName: { enabled: true, required: true },
                    qualifyingExamName: { enabled: true, required: true },
                    examRollNo: { enabled: true, required: true },
                    finalScore: { enabled: true, required: true }
                }
            },
            guardianPersonal: {
                enabled: true,
                label: 'Guardian Personal Information',
                fields: {
                    gpFirstName: { enabled: true, required: true },
                    gpLastName: { enabled: true, required: true },
                    gpRelation: { enabled: true, required: true },
                    gpEducation: { enabled: true, required: false },
                    gpOccupation: { enabled: true, required: false },
                    gpIncome: { enabled: true, required: false }
                }
            },
            guardianContact: {
                enabled: true,
                label: 'Guardian Contact Details',
                fields: {
                    gpOfAddressLine1: { enabled: true, required: true },
                    gpOfAddressLine2: { enabled: true, required: false },
                    gpCity: { enabled: true, required: true },
                    gpState: { enabled: true, required: true },
                    gpCountry: { enabled: true, required: true },
                    gpOfPhone1: { enabled: true, required: false },
                    gpOfPhone2: { enabled: true, required: false },
                    gpMobile: { enabled: true, required: true },
                    gpEmail: { enabled: true, required: true }
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

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <IconSettings className="text-primary" /> Custom Form Configuration
                </h2>
                <div className="flex gap-2">
                    <Button onClick={handleReset} icon={<IconX size={18} />}>
                        Reset
                    </Button>
                    <Button type="primary" onClick={handleSave} icon={<IconCheck size={18} />}>
                        Save Configuration
                    </Button>
                </div>
            </div>

            <Divider orientation="left">Form Sections</Divider>

            <Collapse accordion>
                {Object.entries(config.sections).map(([sectionKey, section]) => (
                    <Panel
                        header={
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
                        }
                        key={sectionKey}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(section.fields).map(([fieldKey, field]) => (
                                <div key={fieldKey} className="flex items-center justify-between p-2 border rounded">
                                    <span className="capitalize">{fieldKey.replace(/([A-Z])/g, ' $1').trim()}</span>
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
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default CustomForm;