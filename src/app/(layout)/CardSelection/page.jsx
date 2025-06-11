'use client';
import { IconArrowLeft, IconArrowRight, IconMaximize, IconSettings } from '@tabler/icons-react';
import { useState } from 'react';
import ApplicationForm from '../academicsManagement/applicationForm/page';
import CustomForm from '../academicsManagement/applicationForm/_components/CustomForm';

const CardSelection = (props) => {
  const { openModal, closeModal } = props;
  const [selectedCard, setSelectedCard] = useState(1);
  const [maximizedCard, setMaximizedCard] = useState(null);
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [formConfig, setFormConfig] = useState(null);

  const cards = [
    {
      id: 1,
      title: 'Basic Form',
      description: 'Perfect for getting started',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      preview: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Course Name</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Course Code</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Detailed Description</label>
            <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" rows={4} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Advanced Form',
      description: 'For power users',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      preview: <ApplicationForm config={formConfig} />
    },
    {
      id: 3,
      title: 'Customize Form',
      description: 'Customize Solutions',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      preview: showFormBuilder ? (
        <CustomForm onSave={(config) => {
          setFormConfig(config);
          setShowFormBuilder(false);
        }} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-xl font-semibold mb-4">Custom Form</h3>
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
    setMaximizedCard(null);
    if (cardId !== 3) {
      setShowFormBuilder(false);
    }
  };

  const handleMaximizeClick = (cardId, e) => {
    e.stopPropagation();
    setMaximizedCard(maximizedCard === cardId ? null : cardId);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Choose Course Form Template</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`py-4 px-7 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedCard === card.id
              ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-primary">{card.icon}</div>
              {selectedCard === card.id && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  Selected
                </span>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
            <p className="text-gray-600 mt-2 mb-4">{card.description}</p>
            <div className="flex justify-end items-center">
              <IconMaximize
                className='text-primary cursor-pointer hover:text-blue-700'
                onClick={(e) => handleMaximizeClick(card.id, e)}
              />
            </div>
          </div>
        ))}
      </div>

      {maximizedCard && (
        <div className="mt-6 p-6 bg-body-color rounded-xl border border-gray-200 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">
              {cards.find(c => c.id === maximizedCard)?.title} Preview
            </h2>
            <button
              onClick={() => setMaximizedCard(null)}
              className="text-base text-gray-500 hover:text-gray-700"
            >
              Close preview
            </button>
          </div>

          <div className="p-4 rounded-xl">
            {cards.find(c => c.id === maximizedCard)?.preview}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col-reverse md:flex-row justify-start gap-4 mt-5">
        <button
          onClick={closeModal}
          className="flex items-center gap-2 px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:text-primary hover:border-primary transition-colors duration-200">
          Back
          <IconArrowLeft className="w-5 h-5 text-current group-hover:text-primary" />
        </button>
        <button
          onClick={closeModal}
          className="flex items-center gap-2 px-3 py-1 rounded-md bg-primary border border-primary-10 text-white hover:bg-primary-dark disabled:opacity-80 disabled:cursor-wait transition-colors duration-200 group"
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

export default CardSelection;

// 'use client';
// import { IconArrowLeft, IconArrowRight, IconMaximize } from '@tabler/icons-react';
// import { useState } from 'react';
// import ApplicationForm from '../academicsManagement/applicationForm/page';

// const CardSelection = (props) => {
//   const { openModal, closeModal } = props;
//   const [selectedCard, setSelectedCard] = useState(1);
//   const [maximizedCard, setMaximizedCard] = useState(null);

//   const cards = [
//     {
//       id: 1,
//       title: 'Basic Form',
//       description: 'Perfect for getting started',
//       icon: (
//         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       preview: (
//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Course Name</label>
//               <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Course Code</label>
//               <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Detailed Description</label>
//             <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" rows={4} />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
//             <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
//               <option>Beginner</option>
//               <option>Intermediate</option>
//               <option>Advanced</option>
//             </select>
//           </div>
//         </div>
//       )
//     },
//     {
//       id: 2,
//       title: 'Advanced Form',
//       description: 'For power users',
//       icon: (
//         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//         </svg>
//       ),
//       preview: <ApplicationForm />
//     },
//     {
//       id: 3,
//       title: 'Customize Form',
//       description: 'Customize Solutions',
//       icon: (
//         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//       ),
//       preview: (
//         <div className="space-y-4">
//           <div className="grid grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Course Name</label>
//               <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Department</label>
//               <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
//                 <option>Computer Science</option>
//                 <option>Mathematics</option>
//                 <option>Engineering</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Credits</label>
//               <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Course Objectives</label>
//             <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" rows={3} />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Prerequisites</label>
//             <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Additional Options</label>
//             <div className="mt-2 space-y-2">
//               <label className="inline-flex items-center">
//                 <input type="checkbox" className="rounded border-gray-300 text-primary" />
//                 <span className="ml-2">Has lab component</span>
//               </label>
//               <label className="inline-flex items-center ml-4">
//                 <input type="checkbox" className="rounded border-gray-300 text-primary" />
//                 <span className="ml-2">Online available</span>
//               </label>
//             </div>
//           </div>
//         </div>
//       )
//     }
//   ];

//   const handleCardClick = (cardId) => {
//     setSelectedCard(cardId);
//     setMaximizedCard(null);
//   };

//   const handleMaximizeClick = (cardId, e) => {
//     e.stopPropagation();
//     setMaximizedCard(maximizedCard === cardId ? null : cardId);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-primary mb-8">Choose Course Form Template</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {cards.map((card) => (
//           <div
//             key={card.id}
//             onClick={() => handleCardClick(card.id)}
//             className={`py-4 px-7 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedCard === card.id
//               ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg'
//               : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
//               }`}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="text-primary">{card.icon}</div>
//               {selectedCard === card.id && (
//                 <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
//                   Selected
//                 </span>
//               )}
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
//           onClick={closeModal}
//           // onClick={handleSubmit}
//           // disabled={loading}
//           className="flex items-center gap-2 px-3 py-1 rounded-md bg-primary border border-primary-10 text-white hover:bg-primary-dark disabled:opacity-80 disabled:cursor-wait transition-colors duration-200 group"
//         >
//           {/* {loading ? (
//             <>
//               Processing...
//               <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
//             </>
//           ) : ( */}
//           <>
//             Use This Template
//             <IconArrowRight
//               className="w-5 h-5 text-white group-hover:text-white"
//             />
//           </>
//           {/* )} */}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CardSelection;

// 'use client';
// import { IconMaximize } from '@tabler/icons-react';
// import { useState } from 'react';
// import ApplicationForm from '../academicsManagement/applicationForm/page';

// const CardSelection = () => {
//   const [selectedCard, setSelectedCard] = useState(null);

//   const cards = [
//     {
//       id: 1,
//       title: 'Basic Form',
//       description: 'Perfect for getting started',
//       icon: (
//         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       preview: (
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Course Name</label>
//             <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" rows={3} />
//           </div>
//         </div>
//       )
//     },
//     {
//       id: 2,
//       title: 'Advanced Form',
//       description: 'For power users',
//       icon: (
//         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//         </svg>
//       ),
//       preview: (
//         // <div className="space-y-4">
//         //   <div className="grid grid-cols-2 gap-4">
//         //     <div>
//         //       <label className="block text-sm font-medium text-gray-700">Course Name</label>
//         //       <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//         //     </div>
//         //     <div>
//         //       <label className="block text-sm font-medium text-gray-700">Course Code</label>
//         //       <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//         //     </div>
//         //   </div>
//         //   <div>
//         //     <label className="block text-sm font-medium text-gray-700">Detailed Description</label>
//         //     <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" rows={4} />
//         //   </div>
//         //   <div>
//         //     <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
//         //     <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
//         //       <option>Beginner</option>
//         //       <option>Intermediate</option>
//         //       <option>Advanced</option>
//         //     </select>
//         //   </div>
//         // </div>
//         <ApplicationForm />
//       )
//     },
//     {
//       id: 3,
//       title: 'Customize Form',
//       description: 'Customize Solutions',
//       icon: (
//         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//       ),
//       preview: (
//         <div className="space-y-4">
//           <div className="grid grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Course Name</label>
//               <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Department</label>
//               <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
//                 <option>Computer Science</option>
//                 <option>Mathematics</option>
//                 <option>Engineering</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Credits</label>
//               <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Course Objectives</label>
//             <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" rows={3} />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Prerequisites</label>
//             <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Additional Options</label>
//             <div className="mt-2 space-y-2">
//               <label className="inline-flex items-center">
//                 <input type="checkbox" className="rounded border-gray-300 text-primary" />
//                 <span className="ml-2">Has lab component</span>
//               </label>
//               <label className="inline-flex items-center ml-4">
//                 <input type="checkbox" className="rounded border-gray-300 text-primary" />
//                 <span className="ml-2">Online available</span>
//               </label>
//             </div>
//           </div>
//         </div>
//       )
//     }
//   ];

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-primary mb-8">Choose Course Form Template</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {cards.map((card) => (
//           <div
//             key={card.id}
//             onClick={() => setSelectedCard(card.id)}
//             className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedCard === card.id
//               ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg'
//               : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
//               }`}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="text-blue-600">{card.icon}</div>
//               {selectedCard === card.id && (
//                 <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
//                   Selected
//                 </span>
//               )}
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
//             <p className="text-gray-600 mt-2 mb-4">{card.description}</p>
//             <div className="flex justify-end items-center">
//               <IconMaximize className='text-primary' />
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedCard && (
//         <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {cards.find(c => c.id === selectedCard)?.title} Preview
//             </h2>
//             <button
//               onClick={() => setSelectedCard(null)}
//               className="text-sm text-gray-500 hover:text-gray-700"
//             >
//               Close preview
//             </button>
//           </div>

//           <div className="p-4 bg-gray-50 rounded-md">
//             {cards.find(c => c.id === selectedCard)?.preview}
//           </div>

//           <div className="mt-6 flex justify-end space-x-3">
//             <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
//               Back
//             </button>
//             <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600">
//               Use This Template
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardSelection;

// 'use client';
// import { IconMaximize } from '@tabler/icons-react';
// import { useState } from 'react';

// const CardSelection = () => {
//   const [selectedCard, setSelectedCard] = useState(null);

//   const cards = [
//     {
//       id: 1,
//       title: 'Basic Form',
//       description: 'Perfect for getting started',
//       icon: (
//         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       preview: (
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Course Name</label>
//             <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" rows={3} />
//           </div>
//         </div>
//       )
//     },
//     {
//       id: 2,
//       title: 'Advanced Form',
//       description: 'For power users',
//       icon: (
//         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//         </svg>
//       ),
//       preview: (
//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Course Name</label>
//               <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Course Code</label>
//               <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Detailed Description</label>
//             <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" rows={4} />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
//             <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
//               <option>Beginner</option>
//               <option>Intermediate</option>
//               <option>Advanced</option>
//             </select>
//           </div>
//         </div>
//       )
//     },
//     {
//       id: 3,
//       title: 'Custom Form',
//       description: 'Custom solutions',
//       icon: (
//         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//       ),
//       preview: (
//         <div className="space-y-4">
//           <div className="grid grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Course Name</label>
//               <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Department</label>
//               <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
//                 <option>Computer Science</option>
//                 <option>Mathematics</option>
//                 <option>Engineering</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Credits</label>
//               <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Course Objectives</label>
//             <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" rows={3} />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Prerequisites</label>
//             <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Additional Options</label>
//             <div className="mt-2 space-y-2">
//               <label className="inline-flex items-center">
//                 <input type="checkbox" className="rounded border-gray-300 text-primary" />
//                 <span className="ml-2">Has lab component</span>
//               </label>
//               <label className="inline-flex items-center ml-4">
//                 <input type="checkbox" className="rounded border-gray-300 text-primary" />
//                 <span className="ml-2">Online available</span>
//               </label>
//             </div>
//           </div>
//         </div>
//       )
//     }
//   ];

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-primary mb-8">Choose Course Form Template</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {cards.map((card) => (
//           <div
//             key={card.id}
//             onClick={() => setSelectedCard(card.id)}
//             className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedCard === card.id
//               ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg'
//               : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
//               }`}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="text-blue-600">{card.icon}</div>
//               {selectedCard === card.id && (
//                 <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
//                   Selected
//                 </span>
//               )}
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
//             <p className="text-gray-600 mt-2 mb-4">{card.description}</p>
//             <div className="flex justify-between items-center">
//               <IconMaximize className='text-primary' />
//               <span className="text-xs text-gray-500">Click to preview</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedCard && (
//         <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {cards.find(c => c.id === selectedCard)?.title} Preview
//             </h2>
//             <button
//               onClick={() => setSelectedCard(null)}
//               className="text-sm text-gray-500 hover:text-gray-700"
//             >
//               Close preview
//             </button>
//           </div>

//           <div className="p-4 bg-gray-50 rounded-md">
//             {cards.find(c => c.id === selectedCard)?.preview}
//           </div>

//           <div className="mt-6 flex justify-end space-x-3">
//             <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
//               Back
//             </button>
//             <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600">
//               Use This Template
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardSelection;

// 'use client';
// import { IconMaximize } from '@tabler/icons-react';
// import { useState } from 'react';

// const CardSelection = () => {
//   const [selectedCard, setSelectedCard] = useState(null);

//   const cards = [
//     {
//       id: 1,
//       title: 'Basic Form',
//       description: 'Perfect for getting started',
//       icon: (
//         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//     },
//     {
//       id: 2,
//       title: 'Advance Form',
//       description: 'For power users',
//       icon: (
//         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//         </svg>
//       ),
//     },
//     {
//       id: 3,
//       title: 'Custom Form',
//       description: 'Custom solutions',
//       icon: (
//         <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//       ),
//     }
//   ];

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-primary mb-8">Choose Course Form Template</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {cards.map((card) => (
//           <div
//             key={card.id}
//             onClick={() => setSelectedCard(card.id)}
//             className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedCard === card.id
//               ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg'
//               : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
//               }`}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="text-blue-600">{card.icon}</div>
//               {selectedCard === card.id && (
//                 <span className="bg-primary text-card-color text-xs px-2 py-1 rounded-full">
//                   Selected
//                 </span>
//               )}
//             </div>
//             <h3 className="text-xl font-semibold text-chart-color1">{card.title}</h3>
//             <p className="text-chart-color1 mt-2 mb-4">{card.description}</p>
//             <p className="text-2xl font-bold text-primary">{card.price}</p>
//             <IconMaximize className='text-primary' />
//           </div>
//         ))}
//       </div>

//       {selectedCard && (
//         <div className="mt-8 p-4 bg-card-color rounded-lg border border-border-color">
//           <p className="text-primary">
//             You've selected the <strong>{cards.find(c => c.id === selectedCard).title}</strong> plan.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardSelection;

// 'use client';
// import { useState } from 'react';

// const AcademicLevelSelection = () => {
//   const [selectedCard, setSelectedCard] = useState(null);

//   const academicLevels = [
//     {
//       id: 1,
//       title: 'Undergraduate',
//       description: 'Bachelor degree students',
//       icon: '🎓',
//       features: ['Course materials', 'Tutorial access', 'Basic research tools']
//     },
//     {
//       id: 2,
//       title: 'Graduate',
//       description: 'Master degree students',
//       icon: '📚',
//       features: ['Advanced resources', 'Thesis support', 'Research databases']
//     },
//     {
//       id: 3,
//       title: 'PhD Candidate',
//       description: 'Doctoral researchers',
//       icon: '🔬',
//       features: ['Full database access', 'Publication support', 'Lab resources']
//     }
//   ];

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Select Your Academic Level</h2>
//       <p className="text-center text-gray-600 mb-12">Choose the option that best describes your current status</p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {academicLevels.map((level) => (
//           <div
//             key={level.id}
//             onClick={() => setSelectedCard(level.id)}
//             className={`p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 ${selectedCard === level.id
//               ? 'border-blue-600 bg-blue-50 shadow-lg transform scale-[1.02]'
//               : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
//               }`}
//           >
//             <div className="flex flex-col h-full">
//               <div className="text-4xl mb-4">{level.icon}</div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{level.title}</h3>
//               <p className="text-gray-600 mb-4">{level.description}</p>

//               <ul className="space-y-2 mb-6">
//                 {level.features.map((feature, index) => (
//                   <li key={index} className="flex items-start">
//                     <span className="text-blue-500 mr-2">✓</span>
//                     <span className="text-gray-700">{feature}</span>
//                   </li>
//                 ))}
//               </ul>

//               {selectedCard === level.id && (
//                 <div className="mt-auto pt-4 border-t border-blue-200">
//                   <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                     Selected
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedCard && (
//         <div className="mt-12 p-6 bg-blue-50 rounded-lg text-center">
//           <p className="text-lg text-gray-800">
//             You've selected the <span className="font-bold">{academicLevels.find(l => l.id === selectedCard)?.title}</span> level.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AcademicLevelSelection;