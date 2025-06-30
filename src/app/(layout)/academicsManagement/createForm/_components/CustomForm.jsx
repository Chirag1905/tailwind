// 'use client';
// import { useState } from 'react';
// import { Button, Checkbox, Collapse, Divider } from 'antd';
// import { IconSettings, IconCheck, IconX } from '@tabler/icons-react';

// const CustomForm = ({ onSave }) => {
//     // Enhanced default configuration with field types
//     const defaultConfig = {
//         title: "Applicant Registration",
//         sections: {
//             personalInfo: {
//                 enabled: true,
//                 label: 'Student Personal Details',
//                 fields: {
//                     firstName: {
//                         enabled: true,
//                         required: true,
//                         type: 'text',
//                         label: 'First Name'
//                     },
//                     middleName: {
//                         enabled: true,
//                         required: false,
//                         type: 'text',
//                         label: 'Middle Name'
//                     },
//                     lastName: {
//                         enabled: true,
//                         required: true,
//                         type: 'text',
//                         label: 'Last Name'
//                     },
//                     dob: {
//                         enabled: true,
//                         required: true,
//                         type: 'date',
//                         label: 'Date of Birth'
//                     },
//                     gender: {
//                         enabled: true,
//                         required: true,
//                         type: 'radio',
//                         label: 'Gender',
//                         options: [
//                             { value: 'male', label: 'Male' },
//                             { value: 'female', label: 'Female' },
//                             { value: 'other', label: 'Other' }
//                         ]
//                     },
//                     nationality: {
//                         enabled: true,
//                         required: true,
//                         type: 'select',
//                         label: 'Nationality',
//                         options: [
//                             { value: 'India', label: 'India' },
//                             { value: 'Nepal', label: 'Nepal' },
//                             { value: 'Bhutan', label: 'Bhutan' }
//                         ]
//                     },
//                     studentPhoto: {
//                         enabled: true,
//                         required: false,
//                         type: 'image',
//                         label: 'Student Photo'
//                     },
//                     studentCategory: {
//                         enabled: true,
//                         required: false,
//                         type: 'select',
//                         label: 'Student Category',
//                         options: [
//                             { value: 'Gen', label: 'GEN' },
//                             { value: 'obc', label: 'OBC' }
//                         ]
//                     },
//                     religion: {
//                         enabled: true,
//                         required: false,
//                         type: 'text',
//                         label: 'Religion'
//                     },
//                     bloodGroup: {
//                         enabled: true,
//                         required: false,
//                         type: 'select',
//                         label: 'Blood Group',
//                         options: [
//                             { value: 'A+', label: 'A+' },
//                             { value: 'A-', label: 'A-' }
//                         ]
//                     },
//                     birthPlace: {
//                         enabled: true,
//                         required: false,
//                         type: 'text',
//                         label: 'Birth Place'
//                     },
//                     motherTongue: {
//                         enabled: true,
//                         required: false,
//                         type: 'text',
//                         label: 'Mother Tongue'
//                     },
//                     aadharNumber: {
//                         enabled: true,
//                         required: false,
//                         type: 'text',
//                         label: 'Aadhar Number',
//                     }
//                 }
//             },
//             communicationInfo: {
//                 enabled: true,
//                 label: 'Student Communication Details',
//                 fields: {
//                     addressLine1: {
//                         enabled: true,
//                         required: true,
//                         type: 'text',
//                         label: 'Address Line 1'
//                     },
//                     addressLine2: {
//                         enabled: true,
//                         required: false,
//                         type: 'text',
//                         label: 'Address Line 2'
//                     },
//                     city: {
//                         enabled: true,
//                         required: true,
//                         type: 'text',
//                         label: 'City'
//                     },
//                     state: {
//                         enabled: true,
//                         required: true,
//                         type: 'text',
//                         label: 'State'
//                     },
//                     pinCode: {
//                         enabled: true,
//                         required: true,
//                         type: 'tel',
//                         label: 'PIN Code',
//                         validation: (value) => !/^[0-9]{6}$/.test(value) ? 'PIN code must be 6 digits' : ''
//                     },
//                     country: {
//                         enabled: true,
//                         required: true,
//                         type: 'select',
//                         label: 'Country',
//                         options: [
//                             { value: 'India', label: 'India' },
//                             { value: 'Nepal', label: 'Nepal' }
//                         ]
//                     },
//                     phone: {
//                         enabled: true,
//                         required: false,
//                         type: 'tel',
//                         label: 'Phone'
//                     },
//                     mobile: {
//                         enabled: true,
//                         required: true,
//                         type: 'tel',
//                         label: 'Mobile',
//                         validation: (value) => !/^[0-9]{10}$/.test(value) ? 'Invalid mobile number' : ''
//                     },
//                     email: {
//                         enabled: true,
//                         required: true,
//                         type: 'email',
//                         label: 'Email',
//                         validation: (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : ''
//                     }
//                 }
//             },
//            guardianInfo: {
//                 enabled: true,
//                 label: "Guardian Details",
//                 fields: {
//                     fatherName: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Father Name"
//                     },
//                     fatherDob: {
//                         enabled: false,
//                         required: false,
//                         type: "date",
//                         label: "Father Date Of Birth"
//                     },
//                     fatherEducation: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Father Education"
//                     },
//                     fatherOccupation: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Father Occupation"
//                     },
//                     fatherIncome: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Father Income"
//                     },
//                     fatherWorkAddress: {
//                         enabled: false,
//                         required: false,
//                         type: "textarea",
//                         label: "Father Work Place Address"
//                     },
//                     fatherMobile: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Father Mobile"
//                     },
//                     fatherEmail: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Father Email"
//                     },
//                     fatherAadharNo: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Father Aadhar No."
//                     },
//                     motherName: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Mother Name"
//                     },
//                     motherDob: {
//                         enabled: false,
//                         required: false,
//                         type: "date",
//                         label: "Mother Date Of Birth"
//                     },
//                     motherEducation: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Mother Education"
//                     },
//                     motherOccupation: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Mother Occupation"
//                     },
//                     motherIncome: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Mother Income"
//                     },
//                     motherWorkAddress: {
//                         enabled: false,
//                         required: false,
//                         type: "textarea",
//                         label: "Mother Work Place Address"
//                     },
//                     motherMobile: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Mother Mobile"
//                     },
//                     motherEmail: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Mother Email"
//                     },
//                     motherAadharNo: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Mother Aadhar No."
//                     },
//                     guardianName: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Name"
//                     },
//                     guardianDob: {
//                         enabled: false,
//                         required: false,
//                         type: "date",
//                         label: "Guardian Date Of Birth"
//                     },
//                     guardianEducation: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Education"
//                     },
//                     guardianOccupation: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Occupation"
//                     },
//                     guardianIncome: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Income"
//                     },
//                     guardianWorkAddress: {
//                         enabled: false,
//                         required: false,
//                         type: "textarea",
//                         label: "Guardian Work Place Address"
//                     },
//                     guardianMobile: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Mobile"
//                     },
//                     guardianEmail: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Email"
//                     },
//                     guardianAadharNo: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Aadhar No."
//                     },
//                     guardianRelation: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Relation"
//                     }
//                 }
//             },
//             attachments: {
//                 enabled: true,
//                 label: "Attachments",
//                 fields: {}
//             },
//             declaration: {
//                 enabled: true,
//                 label: "Declaration",
//                 fields: {}
//             }
//         }
//     };

//     const [config, setConfig] = useState(defaultConfig);

//     const toggleSection = (sectionKey) => {
//         setConfig(prev => ({
//             ...prev,
//             sections: {
//                 ...prev.sections,
//                 [sectionKey]: {
//                     ...prev.sections[sectionKey],
//                     enabled: !prev.sections[sectionKey].enabled
//                 }
//             }
//         }));
//     };

//     const toggleField = (sectionKey, fieldKey) => {
//         setConfig(prev => ({
//             ...prev,
//             sections: {
//                 ...prev.sections,
//                 [sectionKey]: {
//                     ...prev.sections[sectionKey],
//                     fields: {
//                         ...prev.sections[sectionKey].fields,
//                         [fieldKey]: {
//                             ...prev.sections[sectionKey].fields[fieldKey],
//                             enabled: !prev.sections[sectionKey].fields[fieldKey].enabled
//                         }
//                     }
//                 }
//             }
//         }));
//     };

//     const toggleFieldRequired = (sectionKey, fieldKey) => {
//         setConfig(prev => ({
//             ...prev,
//             sections: {
//                 ...prev.sections,
//                 [sectionKey]: {
//                     ...prev.sections[sectionKey],
//                     fields: {
//                         ...prev.sections[sectionKey].fields,
//                         [fieldKey]: {
//                             ...prev.sections[sectionKey].fields[fieldKey],
//                             required: !prev.sections[sectionKey].fields[fieldKey].required
//                         }
//                     }
//                 }
//             }
//         }));
//     };

//     const handleSave = () => {
//         onSave(config);
//     };

//     const handleReset = () => {
//         setConfig(defaultConfig);
//     };

//     const collapseItems = Object.entries(config.sections).map(([sectionKey, section]) => ({
//         key: sectionKey,
//         label: (
//             <div className="flex items-center justify-between">
//                 <span>{section.label}</span>
//                 <Checkbox
//                     checked={section.enabled}
//                     onChange={(e) => {
//                         e.stopPropagation();
//                         toggleSection(sectionKey);
//                     }}
//                     onClick={(e) => e.stopPropagation()}
//                 >
//                     Enable Section
//                 </Checkbox>
//             </div>
//         ),
//         children: (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {Object.entries(section.fields).map(([fieldKey, field]) => (
//                     <div key={fieldKey} className="flex items-center justify-between p-2 border rounded">
//                         <span className="capitalize">{field.label || fieldKey.replace(/([A-Z])/g, ' $1').trim()}</span>
//                         <div className="flex items-center gap-4">
//                             <Checkbox
//                                 checked={field.enabled}
//                                 onChange={() => toggleField(sectionKey, fieldKey)}
//                             >
//                                 Include
//                             </Checkbox>
//                             <Checkbox
//                                 checked={field.required}
//                                 onChange={() => toggleFieldRequired(sectionKey, fieldKey)}
//                                 disabled={!field.enabled}
//                             >
//                                 Required
//                             </Checkbox>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         )
//     }));

//     return (
//         <div className="p-4 bg-body-color rounded-lg shadow">
//             <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-primary flex items-center gap-2">
//                     <IconSettings className="text-primary" /> Custom Form Configuration
//                 </h2>
//                 <div className="flex gap-2">
//                     <Button
//                         onClick={handleReset}
//                         icon={<IconX size={18} />}
//                     >
//                         Reset
//                     </Button>
//                     <Button
//                         type="primary"
//                         onClick={handleSave}
//                         icon={<IconCheck size={18} />}
//                     >
//                         Save Configuration
//                     </Button>
//                 </div>
//             </div>

//             <Collapse accordion items={collapseItems} />
//         </div>
//     );
// };

// export default CustomForm;

// 'use client';
// import { useState } from 'react';
// import { Button, Checkbox, Collapse, message } from 'antd';
// import { IconSettings, IconCheck, IconX, IconGripVertical } from '@tabler/icons-react';
// import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
// import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// const CustomForm = ({ onSave }) => {
//     // Default configuration with field types
//     const defaultConfig = {
//         title: "Applicant Registration",
//         sections: {
//             personalInfo: {
//                 enabled: true,
//                 label: 'Student Personal Details',
//                 fieldsOrder: ['firstName', 'middleName', 'lastName', 'dob', 'gender', 'nationality', 'studentPhoto', 'studentCategory', 'religion', 'bloodGroup', 'birthPlace', 'motherTongue', 'aadharNumber'],
//                 fields: {
//                     firstName: {
//                         enabled: true,
//                         required: true,
//                         type: 'text',
//                         label: 'First Name'
//                     },
//                     middleName: {
//                         enabled: true,
//                         required: false,
//                         type: 'text',
//                         label: 'Middle Name'
//                     },
//                     lastName: {
//                         enabled: true,
//                         required: true,
//                         type: 'text',
//                         label: 'Last Name'
//                     },
//                     dob: {
//                         enabled: true,
//                         required: true,
//                         type: 'date',
//                         label: 'Date of Birth'
//                     },
//                     gender: {
//                         enabled: true,
//                         required: true,
//                         type: 'radio',
//                         label: 'Gender',
//                         options: [
//                             { value: 'male', label: 'Male' },
//                             { value: 'female', label: 'Female' },
//                             { value: 'other', label: 'Other' }
//                         ]
//                     },
//                     nationality: {
//                         enabled: true,
//                         required: true,
//                         type: 'select',
//                         label: 'Nationality',
//                         options: [
//                             { value: 'India', label: 'India' },
//                             { value: 'Nepal', label: 'Nepal' },
//                             { value: 'Bhutan', label: 'Bhutan' }
//                         ]
//                     },
//                     studentPhoto: {
//                         enabled: true,
//                         required: false,
//                         type: 'image',
//                         label: 'Student Photo'
//                     },
//                     studentCategory: {
//                         enabled: true,
//                         required: false,
//                         type: 'select',
//                         label: 'Student Category',
//                         options: [
//                             { value: 'Gen', label: 'GEN' },
//                             { value: 'obc', label: 'OBC' }
//                         ]
//                     },
//                     religion: {
//                         enabled: true,
//                         required: false,
//                         type: 'text',
//                         label: 'Religion'
//                     },
//                     bloodGroup: {
//                         enabled: true,
//                         required: false,
//                         type: 'select',
//                         label: 'Blood Group',
//                         options: [
//                             { value: 'A+', label: 'A+' },
//                             { value: 'A-', label: 'A-' }
//                         ]
//                     },
//                     birthPlace: {
//                         enabled: true,
//                         required: false,
//                         type: 'text',
//                         label: 'Birth Place'
//                     },
//                     motherTongue: {
//                         enabled: true,
//                         required: false,
//                         type: 'text',
//                         label: 'Mother Tongue'
//                     },
//                     aadharNumber: {
//                         enabled: true,
//                         required: false,
//                         type: 'text',
//                         label: 'Aadhar Number',
//                     }
//                 }
//             },
//             communicationInfo: {
//                 enabled: true,
//                 label: 'Student Communication Details',
//                 fieldsOrder: ['addressLine1', 'addressLine2', 'city', 'state', 'pinCode', 'country', 'phone', 'mobile', 'email'],
//                 fields: {
//                     addressLine1: {
//                         enabled: true,
//                         required: true,
//                         type: 'text',
//                         label: 'Address Line 1'
//                     },
//                     addressLine2: {
//                         enabled: true,
//                         required: false,
//                         type: 'text',
//                         label: 'Address Line 2'
//                     },
//                     city: {
//                         enabled: true,
//                         required: true,
//                         type: 'text',
//                         label: 'City'
//                     },
//                     state: {
//                         enabled: true,
//                         required: true,
//                         type: 'text',
//                         label: 'State'
//                     },
//                     pinCode: {
//                         enabled: true,
//                         required: true,
//                         type: 'tel',
//                         label: 'PIN Code',
//                         validation: (value) => !/^[0-9]{6}$/.test(value) ? 'PIN code must be 6 digits' : ''
//                     },
//                     country: {
//                         enabled: true,
//                         required: true,
//                         type: 'select',
//                         label: 'Country',
//                         options: [
//                             { value: 'India', label: 'India' },
//                             { value: 'Nepal', label: 'Nepal' }
//                         ]
//                     },
//                     phone: {
//                         enabled: true,
//                         required: false,
//                         type: 'tel',
//                         label: 'Phone'
//                     },
//                     mobile: {
//                         enabled: true,
//                         required: true,
//                         type: 'tel',
//                         label: 'Mobile',
//                         validation: (value) => !/^[0-9]{10}$/.test(value) ? 'Invalid mobile number' : ''
//                     },
//                     email: {
//                         enabled: true,
//                         required: true,
//                         type: 'email',
//                         label: 'Email',
//                         validation: (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : ''
//                     }
//                 }
//             },
//             guardianInfo: {
//                 enabled: true,
//                 label: "Guardian Details",
//                 fieldsOrder: ['fatherName', 'fatherDob', 'fatherEducation', 'fatherOccupation', 'fatherIncome', 'fatherWorkAddress', 'fatherMobile', 'fatherEmail', 'fatherAadharNo', 'motherName', 'motherDob', 'motherEducation', 'motherOccupation', 'motherIncome', 'motherWorkAddress', 'motherMobile', 'motherEmail', 'motherAadharNo', 'guardianName', 'guardianDob', 'guardianEducation', 'guardianOccupation', 'guardianIncome', 'guardianWorkAddress', 'guardianMobile', 'guardianEmail', 'guardianAadharNo', 'guardianRelation'],
//                 fields: {
//                     fatherName: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Father Name"
//                     },
//                     fatherDob: {
//                         enabled: false,
//                         required: false,
//                         type: "date",
//                         label: "Father Date Of Birth"
//                     },
//                     fatherEducation: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Father Education"
//                     },
//                     fatherOccupation: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Father Occupation"
//                     },
//                     fatherIncome: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Father Income"
//                     },
//                     fatherWorkAddress: {
//                         enabled: false,
//                         required: false,
//                         type: "textarea",
//                         label: "Father Work Place Address"
//                     },
//                     fatherMobile: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Father Mobile"
//                     },
//                     fatherEmail: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Father Email"
//                     },
//                     fatherAadharNo: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Father Aadhar No."
//                     },
//                     motherName: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Mother Name"
//                     },
//                     motherDob: {
//                         enabled: false,
//                         required: false,
//                         type: "date",
//                         label: "Mother Date Of Birth"
//                     },
//                     motherEducation: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Mother Education"
//                     },
//                     motherOccupation: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Mother Occupation"
//                     },
//                     motherIncome: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Mother Income"
//                     },
//                     motherWorkAddress: {
//                         enabled: false,
//                         required: false,
//                         type: "textarea",
//                         label: "Mother Work Place Address"
//                     },
//                     motherMobile: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Mother Mobile"
//                     },
//                     motherEmail: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Mother Email"
//                     },
//                     motherAadharNo: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Mother Aadhar No."
//                     },
//                     guardianName: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Name"
//                     },
//                     guardianDob: {
//                         enabled: false,
//                         required: false,
//                         type: "date",
//                         label: "Guardian Date Of Birth"
//                     },
//                     guardianEducation: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Education"
//                     },
//                     guardianOccupation: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Occupation"
//                     },
//                     guardianIncome: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Income"
//                     },
//                     guardianWorkAddress: {
//                         enabled: false,
//                         required: false,
//                         type: "textarea",
//                         label: "Guardian Work Place Address"
//                     },
//                     guardianMobile: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Mobile"
//                     },
//                     guardianEmail: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Email"
//                     },
//                     guardianAadharNo: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Aadhar No."
//                     },
//                     guardianRelation: {
//                         enabled: false,
//                         required: false,
//                         type: "text",
//                         label: "Guardian Relation"
//                     }
//                 }
//             },
//             attachments: {
//                 enabled: true,
//                 label: "Attachments",
//                 fieldsOrder: [],
//                 fields: {}
//             },
//             declaration: {
//                 enabled: true,
//                 label: "Declaration",
//                 fieldsOrder: [],
//                 fields: {}
//             }
//         }
//     };

//     const [config, setConfig] = useState(defaultConfig);
//     const [activeId, setActiveId] = useState(null);
//     const [activeSection, setActiveSection] = useState(null);
//     const [showPreview, setShowPreview] = useState(false);
//     const [previewConfig, setPreviewConfig] = useState(null);

//     const sensors = useSensors(
//         useSensor(PointerSensor),
//         useSensor(KeyboardSensor, {
//             coordinateGetter: sortableKeyboardCoordinates,
//         })
//     );

//     // Sortable field component for PREVIEW mode
//     const PreviewSortableField = ({ id, sectionKey, fieldKey, field }) => {
//         const {
//             attributes,
//             listeners,
//             setNodeRef,
//             transform,
//             transition,
//             isDragging,
//         } = useSortable({ id: `${sectionKey}-${fieldKey}` });

//         const style = {
//             transform: CSS.Transform.toString(transform),
//             transition,
//             opacity: isDragging ? 0.5 : 1,
//         };

//         return (
//             <div
//                 ref={setNodeRef}
//                 style={style}
//                 className="p-2 bg-white rounded border"
//                 {...attributes}
//             >
//                 <div className="flex items-center gap-2">
//                     <button {...listeners} className="touch-none p-1 cursor-grab active:cursor-grabbing">
//                         <IconGripVertical size={16} className="text-gray-400" />
//                     </button>
//                     <div className="flex-1">
//                         {renderFieldPreview(fieldKey, field)}
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const toggleSection = (sectionKey) => {
//         setConfig(prev => ({
//             ...prev,
//             sections: {
//                 ...prev.sections,
//                 [sectionKey]: {
//                     ...prev.sections[sectionKey],
//                     enabled: !prev.sections[sectionKey].enabled
//                 }
//             }
//         }));
//     };

//     const toggleField = (sectionKey, fieldKey) => {
//         setConfig(prev => {
//             const newEnabled = !prev.sections[sectionKey].fields[fieldKey].enabled;
//             let newFieldsOrder = [...prev.sections[sectionKey].fieldsOrder];

//             if (newEnabled && !newFieldsOrder.includes(fieldKey)) {
//                 newFieldsOrder.push(fieldKey);
//             } else if (!newEnabled) {
//                 newFieldsOrder = newFieldsOrder.filter(key => key !== fieldKey);
//             }

//             return {
//                 ...prev,
//                 sections: {
//                     ...prev.sections,
//                     [sectionKey]: {
//                         ...prev.sections[sectionKey],
//                         fields: {
//                             ...prev.sections[sectionKey].fields,
//                             [fieldKey]: {
//                                 ...prev.sections[sectionKey].fields[fieldKey],
//                                 enabled: newEnabled
//                             }
//                         },
//                         fieldsOrder: newFieldsOrder
//                     }
//                 }
//             };
//         });
//     };

//     const toggleFieldRequired = (sectionKey, fieldKey) => {
//         setConfig(prev => ({
//             ...prev,
//             sections: {
//                 ...prev.sections,
//                 [sectionKey]: {
//                     ...prev.sections[sectionKey],
//                     fields: {
//                         ...prev.sections[sectionKey].fields,
//                         [fieldKey]: {
//                             ...prev.sections[sectionKey].fields[fieldKey],
//                             required: !prev.sections[sectionKey].fields[fieldKey].required
//                         }
//                     }
//                 }
//             }
//         }));
//     };

//     const handleSave = () => {
//         // Create a deep copy of the config for preview
//         const previewConfigCopy = JSON.parse(JSON.stringify(config));
//         setPreviewConfig(previewConfigCopy);
//         setShowPreview(true);
//         message.success('Configuration saved! Now you can reorder fields in the preview.');
//     };

//     const handleFinalSave = () => {
//         onSave(previewConfig); // Save the potentially reordered config
//         message.success('Form configuration finalized!');
//     };

//     const handleReset = () => {
//         setConfig(defaultConfig);
//         setShowPreview(false);
//         message.info('Form configuration reset to defaults');
//     };

//     const handleDragStart = (event) => {
//         const [sectionKey, fieldKey] = event.active.id.split('-');
//         setActiveId(event.active.id);
//         setActiveSection(sectionKey);
//     };

//     const handleDragEnd = (event) => {
//         const { active, over } = event;

//         if (active.id !== over.id) {
//             const sectionKey = activeSection;
//             const oldIndex = previewConfig.sections[sectionKey].fieldsOrder.findIndex(
//                 fieldKey => `${sectionKey}-${fieldKey}` === active.id
//             );
//             const newIndex = previewConfig.sections[sectionKey].fieldsOrder.findIndex(
//                 fieldKey => `${sectionKey}-${fieldKey}` === over.id
//             );

//             setPreviewConfig(prev => ({
//                 ...prev,
//                 sections: {
//                     ...prev.sections,
//                     [sectionKey]: {
//                         ...prev.sections[sectionKey],
//                         fieldsOrder: arrayMove(prev.sections[sectionKey].fieldsOrder, oldIndex, newIndex)
//                     }
//                 }
//             }));
//         }

//         setActiveId(null);
//         setActiveSection(null);
//     };

//     const handleDragCancel = () => {
//         setActiveId(null);
//         setActiveSection(null);
//     };

//     const renderFieldPreview = (fieldKey, field) => {
//         if (!field.enabled) return null;

//         const commonProps = {
//             key: fieldKey,
//             className: "w-full p-2 border rounded",
//             required: field.required,
//             placeholder: `Enter ${field.label || fieldKey}`
//         };

//         switch (field.type) {
//             case 'text':
//                 return <input type="text" {...commonProps} />;
//             case 'email':
//                 return <input type="email" {...commonProps} />;
//             case 'tel':
//                 return <input type="tel" {...commonProps} />;
//             case 'date':
//                 return <input type="date" {...commonProps} />;
//             case 'textarea':
//                 return <textarea rows={3} {...commonProps} />;
//             case 'select':
//                 return (
//                     <select {...commonProps}>
//                         <option value="">Select {field.label || fieldKey}</option>
//                         {field.options?.map(opt => (
//                             <option key={opt.value} value={opt.value}>{opt.label}</option>
//                         ))}
//                     </select>
//                 );
//             case 'radio':
//                 return (
//                     <div className="space-y-2">
//                         {field.options?.map(opt => (
//                             <label key={opt.value} className="flex items-center gap-2">
//                                 <input type="radio" name={fieldKey} value={opt.value} />
//                                 {opt.label}
//                             </label>
//                         ))}
//                     </div>
//                 );
//             case 'image':
//                 return <input type="file" accept="image/*" {...commonProps} />;
//             default:
//                 return <input type="text" {...commonProps} />;
//         }
//     };

//     const collapseItems = Object.entries(config.sections).map(([sectionKey, section]) => ({
//         key: sectionKey,
//         label: (
//             <div className="flex items-center justify-between">
//                 <span>{section.label}</span>
//                 <Checkbox
//                     checked={section.enabled}
//                     onChange={(e) => {
//                         e.stopPropagation();
//                         toggleSection(sectionKey);
//                     }}
//                     onClick={(e) => e.stopPropagation()}
//                 >
//                     Enable Section
//                 </Checkbox>
//             </div>
//         ),
//         children: (
//             <div className="space-y-2">
//                 {Object.entries(section.fields).map(([fieldKey, field]) => (
//                     <div key={fieldKey} className="flex items-center justify-between p-2 border rounded">
//                         <span className="capitalize">{field.label || fieldKey.replace(/([A-Z])/g, ' $1').trim()}</span>
//                         <div className="flex items-center gap-4">
//                             <Checkbox
//                                 checked={field.enabled}
//                                 onChange={() => toggleField(sectionKey, fieldKey)}
//                             >
//                                 Include
//                             </Checkbox>
//                             <Checkbox
//                                 checked={field.required}
//                                 onChange={() => toggleFieldRequired(sectionKey, fieldKey)}
//                                 disabled={!field.enabled}
//                             >
//                                 Required
//                             </Checkbox>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         )
//     }));

//     return (
//         <div className="p-4 bg-body-color rounded-lg shadow">
//             <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-primary flex items-center gap-2">
//                     <IconSettings className="text-primary" /> Custom Form Configuration
//                 </h2>
//                 <div className="flex gap-2">
//                     <Button
//                         onClick={handleReset}
//                         icon={<IconX size={18} />}
//                     >
//                         Reset
//                     </Button>
//                     <Button
//                         type="primary"
//                         onClick={handleSave}
//                         icon={<IconCheck size={18} />}
//                     >
//                         Save Configuration
//                     </Button>
//                 </div>
//             </div>

//             <Collapse accordion items={collapseItems} />

//             {showPreview && (
//                 <div className="mt-8 border-t pt-6">
//                     <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
//                         <span>Form Preview - Drag to reorder fields</span>
//                         <Button
//                             type="primary"
//                             onClick={handleFinalSave}
//                             className="ml-4"
//                         >
//                             Finalize Form
//                         </Button>
//                     </h3>

//                     <DndContext
//                         sensors={sensors}
//                         collisionDetection={closestCenter}
//                         onDragStart={handleDragStart}
//                         onDragEnd={handleDragEnd}
//                         onDragCancel={handleDragCancel}
//                     >
//                         <div className="space-y-6">
//                             {Object.entries(previewConfig.sections).map(([sectionKey, section]) => (
//                                 section.enabled && (
//                                     <div key={sectionKey} className="border rounded-lg p-4">
//                                         <h3 className="text-lg font-semibold mb-4">{section.label}</h3>
//                                         <SortableContext
//                                             items={section.fieldsOrder
//                                                 .filter(fieldKey => section.fields[fieldKey]?.enabled)
//                                                 .map(fieldKey => `${sectionKey}-${fieldKey}`)}
//                                             strategy={verticalListSortingStrategy}
//                                         >
//                                             <div className="space-y-4">
//                                                 {section.fieldsOrder
//                                                     .filter(fieldKey => section.fields[fieldKey]?.enabled)
//                                                     .map(fieldKey => (
//                                                         <PreviewSortableField
//                                                             key={`${sectionKey}-${fieldKey}`}
//                                                             id={`${sectionKey}-${fieldKey}`}
//                                                             sectionKey={sectionKey}
//                                                             fieldKey={fieldKey}
//                                                             field={section.fields[fieldKey]}
//                                                         />
//                                                     ))}
//                                             </div>
//                                         </SortableContext>
//                                     </div>
//                                 )
//                             ))}
//                         </div>
//                         <DragOverlay>
//                             {activeId ? (
//                                 <div className="p-2 bg-white rounded border shadow-lg opacity-90">
//                                     <div className="flex items-center gap-2">
//                                         <IconGripVertical size={16} className="text-gray-400" />
//                                         {renderFieldPreview(
//                                             activeId.split('-')[1],
//                                             previewConfig.sections[activeSection]?.fields[activeId.split('-')[1]]
//                                         )}
//                                     </div>
//                                 </div>
//                             ) : null}
//                         </DragOverlay>
//                     </DndContext>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CustomForm;

'use client';
import { useState, useEffect, useRef } from 'react';
import { Button, Checkbox, message, DatePicker, Radio, Select, Upload, Collapse } from 'antd';
import { IconSettings, IconCheck, IconX, IconUpload, IconGripVertical } from '@tabler/icons-react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
const { Panel } = Collapse;

const CustomForm = ({ onSave }) => {
    const defaultConfig = {
        title: "Applicant Registration",
        sections: {
            personalInfo: {
                enabled: true,
                label: 'Student Personal Details',
                fieldsOrder: ['firstName', 'middleName', 'lastName', 'dob', 'gender', 'nationality', 'studentPhoto', 'studentCategory', 'religion', 'bloodGroup', 'birthPlace', 'motherTongue', 'aadharNumber'],
                fields: {
                    firstName: {
                        enabled: true,
                        required: true,
                        type: 'text',
                        label: 'First Name',
                        colSpan: 1
                    },
                    middleName: {
                        enabled: true,
                        required: false,
                        type: 'text',
                        label: 'Middle Name',
                        colSpan: 1
                    },
                    lastName: {
                        enabled: true,
                        required: true,
                        type: 'text',
                        label: 'Last Name',
                        colSpan: 1
                    },
                    dob: {
                        enabled: true,
                        required: true,
                        type: 'date',
                        label: 'Date of Birth',
                        colSpan: 1
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
                        ],
                        colSpan: 2
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
                        ],
                        colSpan: 1
                    },
                    studentPhoto: {
                        enabled: true,
                        required: false,
                        type: 'image',
                        label: 'Student Photo',
                        colSpan: 2
                    },
                    studentCategory: {
                        enabled: true,
                        required: false,
                        type: 'select',
                        label: 'Student Category',
                        options: [
                            { value: 'Gen', label: 'GEN' },
                            { value: 'obc', label: 'OBC' }
                        ],
                        colSpan: 1
                    },
                    religion: {
                        enabled: true,
                        required: false,
                        type: 'text',
                        label: 'Religion',
                        colSpan: 1
                    },
                    bloodGroup: {
                        enabled: true,
                        required: false,
                        type: 'select',
                        label: 'Blood Group',
                        options: [
                            { value: 'A+', label: 'A+' },
                            { value: 'A-', label: 'A-' }
                        ],
                        colSpan: 1
                    },
                    birthPlace: {
                        enabled: true,
                        required: false,
                        type: 'text',
                        label: 'Birth Place',
                        colSpan: 1
                    },
                    motherTongue: {
                        enabled: true,
                        required: false,
                        type: 'text',
                        label: 'Mother Tongue',
                        colSpan: 1
                    },
                    aadharNumber: {
                        enabled: true,
                        required: false,
                        type: 'text',
                        label: 'Aadhar Number',
                        colSpan: 1
                    }
                }
            },
            communicationInfo: {
                enabled: true,
                label: 'Student Communication Details',
                fieldsOrder: ['addressLine1', 'addressLine2', 'city', 'state', 'pinCode', 'country', 'phone', 'mobile', 'email'],
                fields: {
                    addressLine1: {
                        enabled: true,
                        required: true,
                        type: 'text',
                        label: 'Address Line 1',
                        colSpan: 2
                    },
                    addressLine2: {
                        enabled: true,
                        required: false,
                        type: 'text',
                        label: 'Address Line 2',
                        colSpan: 2
                    },
                    city: {
                        enabled: true,
                        required: true,
                        type: 'text',
                        label: 'City',
                        colSpan: 1
                    },
                    state: {
                        enabled: true,
                        required: true,
                        type: 'text',
                        label: 'State',
                        colSpan: 1
                    },
                    pinCode: {
                        enabled: true,
                        required: true,
                        type: 'tel',
                        label: 'PIN Code',
                        validation: (value) => !/^[0-9]{6}$/.test(value) ? 'PIN code must be 6 digits' : '',
                        colSpan: 1
                    },
                    country: {
                        enabled: true,
                        required: true,
                        type: 'select',
                        label: 'Country',
                        options: [
                            { value: 'India', label: 'India' },
                            { value: 'Nepal', label: 'Nepal' }
                        ],
                        colSpan: 1
                    },
                    phone: {
                        enabled: true,
                        required: false,
                        type: 'tel',
                        label: 'Phone',
                        colSpan: 1
                    },
                    mobile: {
                        enabled: true,
                        required: true,
                        type: 'tel',
                        label: 'Mobile',
                        validation: (value) => !/^[0-9]{10}$/.test(value) ? 'Invalid mobile number' : '',
                        colSpan: 1
                    },
                    email: {
                        enabled: true,
                        required: true,
                        type: 'email',
                        label: 'Email',
                        validation: (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : '',
                        colSpan: 1
                    }
                }
            },
            guardianInfo: {
                enabled: true,
                label: "Guardian Details",
                fieldsOrder: ['fatherName', 'fatherDob', 'fatherEducation', 'fatherOccupation', 'fatherIncome', 'fatherWorkAddress', 'fatherMobile', 'fatherEmail', 'fatherAadharNo', 'motherName', 'motherDob', 'motherEducation', 'motherOccupation', 'motherIncome', 'motherWorkAddress', 'motherMobile', 'motherEmail', 'motherAadharNo', 'guardianName', 'guardianDob', 'guardianEducation', 'guardianOccupation', 'guardianIncome', 'guardianWorkAddress', 'guardianMobile', 'guardianEmail', 'guardianAadharNo', 'guardianRelation'],
                fields: {
                    fatherName: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Father Name",
                        colSpan: 1
                    },
                    fatherDob: {
                        enabled: false,
                        required: false,
                        type: "date",
                        label: "Father Date Of Birth",
                        colSpan: 1
                    },
                    fatherEducation: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Father Education",
                        colSpan: 1
                    },
                    fatherOccupation: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Father Occupation",
                        colSpan: 1
                    },
                    fatherIncome: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Father Income",
                        colSpan: 1
                    },
                    fatherWorkAddress: {
                        enabled: false,
                        required: false,
                        type: "textarea",
                        label: "Father Work Place Address",
                        colSpan: 2
                    },
                    fatherMobile: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Father Mobile",
                        colSpan: 1
                    },
                    fatherEmail: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Father Email",
                        colSpan: 1
                    },
                    fatherAadharNo: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Father Aadhar No.",
                        colSpan: 1
                    },
                    motherName: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Mother Name",
                        colSpan: 1
                    },
                    motherDob: {
                        enabled: false,
                        required: false,
                        type: "date",
                        label: "Mother Date Of Birth",
                        colSpan: 1
                    },
                    motherEducation: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Mother Education",
                        colSpan: 1
                    },
                    motherOccupation: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Mother Occupation",
                        colSpan: 1
                    },
                    motherIncome: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Mother Income",
                        colSpan: 1
                    },
                    motherWorkAddress: {
                        enabled: false,
                        required: false,
                        type: "textarea",
                        label: "Mother Work Place Address",
                        colSpan: 2
                    },
                    motherMobile: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Mother Mobile",
                        colSpan: 1
                    },
                    motherEmail: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Mother Email",
                        colSpan: 1
                    },
                    motherAadharNo: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Mother Aadhar No.",
                        colSpan: 1
                    },
                    guardianName: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Guardian Name",
                        colSpan: 1
                    },
                    guardianDob: {
                        enabled: false,
                        required: false,
                        type: "date",
                        label: "Guardian Date Of Birth",
                        colSpan: 1
                    },
                    guardianEducation: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Guardian Education",
                        colSpan: 1
                    },
                    guardianOccupation: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Guardian Occupation",
                        colSpan: 1
                    },
                    guardianIncome: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Guardian Income",
                        colSpan: 1
                    },
                    guardianWorkAddress: {
                        enabled: false,
                        required: false,
                        type: "textarea",
                        label: "Guardian Work Place Address",
                        colSpan: 2
                    },
                    guardianMobile: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Guardian Mobile",
                        colSpan: 1
                    },
                    guardianEmail: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Guardian Email",
                        colSpan: 1
                    },
                    guardianAadharNo: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Guardian Aadhar No.",
                        colSpan: 1
                    },
                    guardianRelation: {
                        enabled: false,
                        required: false,
                        type: "text",
                        label: "Guardian Relation",
                        colSpan: 1
                    }
                }
            },
            attachments: {
                enabled: true,
                label: "Attachments",
                fieldsOrder: [],
                fields: {}
            },
            declaration: {
                enabled: true,
                label: "Declaration",
                fieldsOrder: [],
                fields: {}
            }
        }
    };

    const [config, setConfig] = useState(defaultConfig);
    const [showPreview, setShowPreview] = useState(false);
    const [draggedItem, setDraggedItem] = useState({ section: null, field: null });
    const [hoverIndex, setHoverIndex] = useState({ section: null, field: null });
    const [expandedSections, setExpandedSections] = useState(['personalInfo', 'communicationInfo', 'guardianInfo']);
    const containerRef = useRef(null);

    const handleSave = () => {
        setShowPreview(true);
        message.success('Configuration saved! You can now drag to reorder fields.');
    };

    const handleFinalSave = () => {
        onSave(config);
        message.success('Form configuration saved with new field order!');
    };

    const handleReset = () => {
        setConfig(defaultConfig);
        setShowPreview(false);
        setExpandedSections(['personalInfo', 'communicationInfo', 'guardianInfo']);
        message.info('Form configuration reset to defaults');
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
                            format={dateFormat}
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

    const renderFormBuilder = () => (
        <Collapse
            activeKey={expandedSections}
            onChange={(keys) => setExpandedSections(keys)}
            className="form-builder-accordion"
        >
            {Object.entries(config.sections).map(([sectionKey, section]) => (
                <Panel
                    key={sectionKey}
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
                    extra={
                        <div className="flex items-center">
                            {section.enabled && (
                                <span className="text-sm text-gray-500 mr-2">
                                    {Object.values(section.fields).filter(f => f.enabled).length} of {Object.keys(section.fields).length} fields enabled
                                </span>
                            )}
                        </div>
                    }
                    className={!section.enabled ? 'opacity-60' : ''}
                >
                    {section.enabled && (
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
                    )}
                </Panel>
            ))}
        </Collapse>
    );

    const renderFormPreview = () => (
        <Collapse
            activeKey={expandedSections}
            onChange={(keys) => setExpandedSections(keys)}
            className="form-preview-accordion"
        >
            {Object.entries(config.sections).map(([sectionKey, section]) => (
                section.enabled && (
                    <Panel
                        key={sectionKey}
                        header={section.label}
                        extra={
                            <span className="text-sm text-gray-500">
                                {section.fieldsOrder.filter(fieldKey => section.fields[fieldKey]?.enabled).length} fields
                            </span>
                        }
                    >
                        {renderSectionFields(sectionKey, section)}
                    </Panel>
                )
            ))}
        </Collapse>
    );

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
        </div>
    );
};

export default CustomForm;