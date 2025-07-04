'use client';
import { IconEdit, IconFilePlus, IconListDetails, IconPlus, IconSettings, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import CustomForm from './_components/FormCreate';
import { useDispatch, useSelector } from 'react-redux';
import { getApplicationFormIdRequest, getApplicationFormTemplateRequest } from '@/Redux/features/applicationForm/applicationFormSlice';
import ApplicationForm from './_components/ApplicationForm';
import FormEdit from './_components/FormEdit';

const CreateForm = (props) => {
  const { openModal, closeModal } = props;
  const { token } = useSelector((state) => state.auth);
  const {
    applicationFormIdData,
    applicationFormTemplateData,
    applicationFormStatusData,

    applicationFormTemplatePostData,
    applicationFormStatusPostData,
    applicationFormSectionPostData,

    applicationFormTemplatePutData,
    applicationFormStatusPutData
  } = useSelector((state) => state.applicationForm);
  const dispatch = useDispatch();

  const [selectedCard, setSelectedCard] = useState(1);
  const [showFormBuilder, setShowFormBuilder] = useState(false);

  const [availableForms, setAvailableForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [selectedFormData, setSelectedFormData] = useState(null);
  const [editingFormId, setEditingFormId] = useState(null);

  useEffect(() => {
    dispatch(getApplicationFormIdRequest({ token }))
  }, [selectedCard]);

  useEffect(() => {
    dispatch(getApplicationFormTemplateRequest({ selectedFormId, token }))
  }, [selectedFormId]);

  useEffect(() => {
    if (applicationFormIdData && applicationFormTemplateData) {
      setAvailableForms(applicationFormIdData?.data)
      setSelectedFormData(applicationFormTemplateData?.data)
    }
  }, [applicationFormIdData, applicationFormTemplateData]);

  const handleEditFormTemplate = (id, e) => {
    e.stopPropagation();
    setEditingFormId(id);
  };

  const handleUpdateFormTemplate = () => {

  };

  const handleDeleteFormTemplate = (id, e) => {
    e.stopPropagation();
    console.log(id, "Deleted")
    // const updatedForms = savedForms.filter(form => form.id !== id);
    // setSavedForms(updatedForms);
    // if (selectedFormId === id) {
    //   setSelectedFormId(null);
    // }
  };

  const cards = [
    {
      id: 1,
      title: 'Available Forms',
      description: 'Select from existing form templates',
      icon: <IconListDetails />,
      preview: (
        <div className="space-y-4">
          {availableForms?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableForms?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedFormId(item.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all relative ${selectedFormId === item.id
                      ? 'border-primary bg-card-color ring-2 ring-primary'
                      : 'border-gray-200 hover:border-blue-300'
                      }`}
                  >
                    {selectedFormId === item.id && (
                      <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{item?.templateName}</h3>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <button
                          onClick={(e) => handleEditFormTemplate(item?.id, e)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <IconEdit size={18} />
                        </button>
                        <button
                          onClick={(e) => handleDeleteFormTemplate(item?.id, e)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <IconTrash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedFormId ? (
                <div className="mt-6 border-t pt-4">
                  {editingFormId === selectedFormId ? (
                    <>
                      <h3 className="font-medium mb-2">Edit Form:</h3>
                      <FormEdit
                        config={selectedFormData}
                        onCancel={() => setEditingFormId(null)}
                        onSave={handleUpdateFormTemplate}
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="font-medium mb-2">Preview:</h3>
                      <ApplicationForm config={selectedFormData} />
                    </>
                  )}
                </div>
              ) : (
                <div className="mt-6 border-t pt-4">
                  <h3 className="font-medium mb-2">No form selected</h3>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-primary">No saved forms available</p>
              <button
                onClick={() => { setSelectedCard(2); setShowFormBuilder(true) }}
                className="mt-2 btn btn-primary"
              >
                <IconSettings size={18} />
                Create Form Template
              </button>
            </div>
          )}
        </div>
      )
    },
    {
      id: 2,
      title: 'Create Form',
      description: 'Build your own form template',
      icon: <IconPlus />,
      preview: showFormBuilder ? (
        <CustomForm />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-xl font-semibold mb-4">Custom Form Builder</h3>
          <p className="text-primary mb-4">Configure your own form by selecting which sections and fields to include</p>
          <button
            onClick={() => setShowFormBuilder(true)}
            className="mt-2 btn btn-primary"
          >
            <IconSettings size={18} />
            Create Form Template
          </button>
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

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Form Template Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {cards?.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`py-4 px-7 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedCard === card.id
              ? 'border-body-color bg-card-color scale-[1.02] shadow-lg'
              : 'hover:border-body-color hover:bg-card-color'
              }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-primary">{card.icon}</div>
            </div>
            <h3 className="text-xl font-semibold text-secondary">{card.title}</h3>
            <p className="text-primary mt-2 mb-4">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Automatically show the preview of the selected card */}
      <div className="mt-6 p-6 bg-body-color rounded-xl border border-border-color shadow-lg">
        <h2 className="text-2xl font-bold text-primary mb-6">
          {cards.find(c => c.id === selectedCard)?.title}
        </h2>
        <div className="p-4 rounded-xl">
          {cards.find(c => c.id === selectedCard)?.preview}
        </div>
      </div>
    </div>
  );
};

export default CreateForm;