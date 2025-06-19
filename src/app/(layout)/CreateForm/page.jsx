// 'use client';
// import { IconArrowLeft, IconArrowRight, IconMaximize, IconSettings, IconTrash } from '@tabler/icons-react';
// import { useEffect, useState } from 'react';
// import ApplicationForm from '../academicsManagement/applicationForm/page';
// import CustomForm from './_components/CustomForm';
// // import CustomForm from '../academicsManagement/applicationForm/_components/CustomForm';

// const CreateForm = (props) => {
//   const { openModal, closeModal } = props;
//   const [selectedCard, setSelectedCard] = useState(1);
//   const [maximizedCard, setMaximizedCard] = useState(null);
//   const [showFormBuilder, setShowFormBuilder] = useState(false);
//   const [formConfig, setFormConfig] = useState(null);
//   const [savedForms, setSavedForms] = useState([]);
//   const [selectedFormId, setSelectedFormId] = useState(null);

//   // Load saved forms from localStorage on component mount
//   useEffect(() => {
//     const saved = localStorage.getItem('savedForms');
//     if (saved) {
//       setSavedForms(JSON.parse(saved));
//     }
//   }, []);

//   // Save forms to localStorage when they change
//   useEffect(() => {
//     if (savedForms.length > 0) {
//       localStorage.setItem('savedForms', JSON.stringify(savedForms));
//     } else {
//       localStorage.removeItem('savedForms');
//     }
//   }, [savedForms]);

//   const handleSaveFormConfig = (config) => {
//     const newForm = {
//       id: Date.now(),
//       name: `Custom Form ${savedForms.length + 1}`,
//       config,
//       createdAt: new Date().toISOString()
//     };
//     setSavedForms([...savedForms, newForm]);
//     setFormConfig(config);
//     setShowFormBuilder(false);
//     setSelectedFormId(newForm.id);
//   };

//   const handleDeleteForm = (id, e) => {
//     e.stopPropagation();
//     const updatedForms = savedForms.filter(form => form.id !== id);
//     setSavedForms(updatedForms);
//     if (selectedFormId === id) {
//       setSelectedFormId(null);
//     }
//   };

//   const cards = [
//     {
//       id: 1,
//       title: 'Available Forms',
//       description: 'Select from existing forms',
//       icon: (
//         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//         </svg>
//       ),
//       preview: (
//         <div className="space-y-4">
//           {savedForms.length > 0 ? (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {savedForms.map(form => (
//                   <div
//                     key={form.id}
//                     onClick={() => setSelectedFormId(form.id)}
//                     className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedFormId === form.id ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
//                   >
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="font-medium text-lg">{form.name}</h3>
//                         <p className="text-sm text-gray-500">
//                           Created: {new Date(form.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <button
//                         onClick={(e) => handleDeleteForm(form.id, e)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <IconTrash size={18} />
//                       </button>
//                     </div>
//                     <div className="mt-2 text-sm">
//                       <p>Sections: {Object.values(form.config.sections).filter(s => s.enabled).length}</p>
//                       <p>Fields: {
//                         Object.values(form.config.sections)
//                           .reduce((total, section) => 
//                             total + Object.values(section.fields).filter(f => f.enabled).length, 0)
//                       }</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               {selectedFormId && (
//                 <div className="mt-6 border-t pt-4">
//                   <h3 className="font-medium mb-2">Preview:</h3>
//                   <ApplicationForm
//                     config={savedForms.find(f => f.id === selectedFormId)?.config}
//                   />
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="text-center py-8">
//               <p className="text-gray-500">No saved forms available</p>
//               <button
//                 onClick={() => setSelectedCard(2)}
//                 className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
//               >
//                 Create New Form
//               </button>
//             </div>
//           )}
//         </div>
//       )
//     },
//     {
//       id: 2,
//       title: 'Create Form',
//       description: 'Build your own form',
//       icon: (
//         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//         </svg>
//       ),
//       preview: showFormBuilder ? (
//         <CustomForm onSave={handleSaveFormConfig} />
//       ) : (
//         <div className="flex flex-col items-center justify-center h-full">
//           <h3 className="text-xl font-semibold mb-4">Custom Form Builder</h3>
//           <p className="text-gray-600 mb-6">Configure your own form by selecting which sections and fields to include</p>
//           <button
//             onClick={() => setShowFormBuilder(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
//           >
//             <IconSettings size={18} /> Configure Form
//           </button>
//           {formConfig && (
//             <div className="mt-6 p-4 border rounded-lg w-full">
//               <h4 className="font-medium mb-2">Current Configuration:</h4>
//               <ul className="list-disc pl-5">
//                 {Object.entries(formConfig.sections).map(([key, section]) => (
//                   section.enabled && (
//                     <li key={key} className="mb-1">
//                       {section.label} ({Object.values(section.fields).filter(f => f.enabled).length} fields)
//                     </li>
//                   )
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )
//     }
//   ];

//   const handleCardClick = (cardId) => {
//     setSelectedCard(cardId);
//     setMaximizedCard(null);
//     if (cardId !== 2) {
//       setShowFormBuilder(false);
//     }
//   };

//   const handleMaximizeClick = (cardId, e) => {
//     e.stopPropagation();
//     setMaximizedCard(maximizedCard === cardId ? null : cardId);
//   };

//   const handleUseTemplate = () => {
//     if (selectedCard === 1 && !selectedFormId) {
//       alert('Please select a form to use as template');
//       return;
//     }
//     closeModal(selectedFormId ? savedForms.find(f => f.id === selectedFormId)?.config : null);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-primary mb-8">Form Template Management</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         {cards?.map((card) => (
//           <div
//             key={card.id}
//             onClick={() => handleCardClick(card.id)}
//             className={`py-4 px-15 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedCard === card.id
//               ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg'
//               : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
//               }`}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="text-primary">{card.icon}</div>
//               {/* {selectedCard === card.id && (
//                 <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
//                   Selected
//                 </span>
//               )} */}
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
//             <p className="text-gray-600 mt-2 mb-4">{card.description}</p>
//             <div className="flex justify-end items-center">
//               <IconMaximize
//                 className='text-primary cursor-pointer hover:text-blue-700'
//                 onClick={(e) => handleMaximizeClick(card.id, e)}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {maximizedCard && (
//         <div className="mt-6 p-6 bg-body-color rounded-xl border border-gray-200 shadow-lg">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-primary">
//               {cards.find(c => c.id === maximizedCard)?.title} Preview
//             </h2>
//             <button
//               onClick={() => setMaximizedCard(null)}
//               className="text-base text-gray-500 hover:text-gray-700"
//             >
//               Close preview
//             </button>
//           </div>

//           <div className="p-4 rounded-xl">
//             {cards.find(c => c.id === maximizedCard)?.preview}
//           </div>
//         </div>
//       )}

//       {/* Buttons */}
//       <div className="flex flex-col-reverse md:flex-row justify-start gap-4 mt-5">
//         <button
//           onClick={closeModal}
//           className="flex items-center gap-2 px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:text-primary hover:border-primary transition-colors duration-200">
//           Back
//           <IconArrowLeft className="w-5 h-5 text-current group-hover:text-primary" />
//         </button>
//         <button
//           onClick={handleUseTemplate}
//           className="flex items-center gap-2 px-3 py-1 rounded-md btn btn-primary border border-primary-10 text-white hover:bg-primary-dark disabled:opacity-80 disabled:cursor-wait transition-colors duration-200 group"
//         >
//           Use This Template
//           <IconArrowRight
//             className="w-5 h-5 text-white group-hover:text-white"
//           />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateForm;

'use client';
import { IconArrowLeft, IconArrowRight, IconSettings, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import ApplicationForm from '../academicsManagement/applicationForm/page';
import CustomForm from './_components/CustomForm';

const CreateForm = (props) => {
  const { openModal, closeModal } = props;
  const [selectedCard, setSelectedCard] = useState(1);
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [formConfig, setFormConfig] = useState(null);
  const [savedForms, setSavedForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);

  // Load saved forms from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedForms');
    if (saved) {
      setSavedForms(JSON.parse(saved));
    }
  }, []);

  // Save forms to localStorage when they change
  useEffect(() => {
    if (savedForms.length > 0) {
      localStorage.setItem('savedForms', JSON.stringify(savedForms));
    } else {
      localStorage.removeItem('savedForms');
    }
  }, [savedForms]);

  const handleSaveFormConfig = (config) => {
    const newForm = {
      id: Date.now(),
      name: `Custom Form ${savedForms.length + 1}`,
      config,
      createdAt: new Date().toISOString()
    };
    setSavedForms([...savedForms, newForm]);
    setFormConfig(config);
    setShowFormBuilder(false);
    setSelectedFormId(newForm.id);
  };

  const handleDeleteForm = (id, e) => {
    e.stopPropagation();
    const updatedForms = savedForms.filter(form => form.id !== id);
    setSavedForms(updatedForms);
    if (selectedFormId === id) {
      setSelectedFormId(null);
    }
  };

  const cards = [
    {
      id: 1,
      title: 'Available Forms',
      description: 'Select from existing forms',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      preview: (
        <div className="space-y-4">
          {savedForms.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedForms.map(form => (
                  <div
                    key={form.id}
                    onClick={() => setSelectedFormId(form.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all relative ${
                      selectedFormId === form.id 
                        ? 'border-primary bg-blue-50 ring-2 ring-primary' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {selectedFormId === form.id && (
                      <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{form.name}</h3>
                        <p className="text-sm text-gray-500">
                          Created: {new Date(form.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteForm(form.id, e)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <IconTrash size={18} />
                      </button>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Sections: {Object.values(form.config.sections).filter(s => s.enabled).length}</p>
                      <p>Fields: {
                        Object.values(form.config.sections)
                          .reduce((total, section) => 
                            total + Object.values(section.fields).filter(f => f.enabled).length, 0)
                      }</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedFormId && (
                <div className="mt-6 border-t pt-4">
                  <h3 className="font-medium mb-2">Preview:</h3>
                  <ApplicationForm
                    config={savedForms.find(f => f.id === selectedFormId)?.config}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No saved forms available</p>
              <button
                onClick={() => setSelectedCard(2)}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Create New Form
              </button>
            </div>
          )}
        </div>
      )
    },
    {
      id: 2,
      title: 'Create Form',
      description: 'Build your own form',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      preview: showFormBuilder ? (
        <CustomForm onSave={handleSaveFormConfig} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-xl font-semibold mb-4">Custom Form Builder</h3>
          <p className="text-gray-600 mb-6">Configure your own form by selecting which sections and fields to include</p>
          <button
            onClick={() => setShowFormBuilder(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            <IconSettings size={18} /> Configure Form
          </button>
          {formConfig && (
            <div className="mt-6 p-4 border rounded-lg w-full">
              <h4 className="font-medium mb-2">Current Configuration:</h4>
              <ul className="list-disc pl-5">
                {Object.entries(formConfig.sections).map(([key, section]) => (
                  section.enabled && (
                    <li key={key} className="mb-1">
                      {section.label} ({Object.values(section.fields).filter(f => f.enabled).length} fields)
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
      )
    }
  ];

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
    if (cardId !== 2) {
      setShowFormBuilder(false);
    }
  };

  const handleUseTemplate = () => {
    if (selectedCard === 1 && !selectedFormId) {
      alert('Please select a form to use as template');
      return;
    }
    closeModal(selectedFormId ? savedForms.find(f => f.id === selectedFormId)?.config : null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Form Template Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {cards?.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`py-4 px-7 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selectedCard === card.id
                ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-primary">{card.icon}</div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
            <p className="text-gray-600 mt-2 mb-4">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Automatically show the preview of the selected card */}
      <div className="mt-6 p-6 bg-body-color rounded-xl border border-gray-200 shadow-lg">
        <h2 className="text-2xl font-bold text-primary mb-6">
          {cards.find(c => c.id === selectedCard)?.title} Preview
        </h2>
        <div className="p-4 rounded-xl">
          {cards.find(c => c.id === selectedCard)?.preview}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse md:flex-row justify-start gap-4 mt-5">
        <button
          onClick={closeModal}
          className="flex items-center gap-2 px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:text-primary hover:border-primary transition-colors duration-200">
          Back
          <IconArrowLeft className="w-5 h-5 text-current group-hover:text-primary" />
        </button>
        <button
          onClick={handleUseTemplate}
          className="flex items-center gap-2 px-3 py-1 rounded-md btn btn-primary border border-primary-10 text-white hover:bg-primary-dark disabled:opacity-80 disabled:cursor-wait transition-colors duration-200 group"
        >
          Use This Template
          <IconArrowRight
            className="w-5 h-5 text-white group-hover:text-white"
          />
        </button>
      </div>
    </div>
  );
};

export default CreateForm;