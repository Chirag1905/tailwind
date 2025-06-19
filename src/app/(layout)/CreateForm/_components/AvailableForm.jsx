'use client';
import { IconArrowLeft, IconArrowRight, IconMaximize, IconSettings } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import ApplicationForm from '../academicsManagement/applicationForm/page';
import CustomForm from '../academicsManagement/applicationForm/_components/CustomForm';

const CardSelection = (props) => {
  const { openModal, closeModal } = props;
  const [selectedCard, setSelectedCard] = useState(1);
  const [maximizedCard, setMaximizedCard] = useState(null);
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
          {/* Basic form preview */}
        </div>
      )
    },
    {
      id: 2,
      title: 'Available Forms',
      description: 'Select from saved forms',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      preview: (
        <div className="space-y-4">
          {savedForms.length > 0 ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Form</label>
                <select 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={selectedFormId || ''}
                  onChange={(e) => setSelectedFormId(e.target.value ? parseInt(e.target.value) : null)}
                >
                  <option value="">-- Select a form --</option>
                  {savedForms.map(form => (
                    <option key={form.id} value={form.id}>{form.name}</option>
                  ))}
                </select>
              </div>
              
              {selectedFormId && (
                <div className="border-t pt-4">
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
                onClick={() => setSelectedCard(3)}
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
      id: 3,
      title: 'Customize Form',
      description: 'Build your own form',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      preview: showFormBuilder ? (
        <CustomForm onSave={handleSaveFormConfig} />
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

  // ... rest of your CardSelection component code ...
};

export default CardSelection;