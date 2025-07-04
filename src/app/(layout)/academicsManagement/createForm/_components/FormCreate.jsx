'use client';
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { postApplicationFormTemplateRequest } from '@/Redux/features/applicationForm/applicationFormSlice';
import TextField from '@/components/utils/TextField';
import toast from 'react-hot-toast';
import FormEdit from './FormEdit';

const FormCreate = ({ onSave }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { applicationFormTemplatePostData, loading, error } = useSelector((state) => state.applicationForm);
    const [templateName, setTemplateName] = useState("");
    const [errors, setErrors] = useState({});
    const [createdTemplate, setCreatedTemplate] = useState(null);

    // Handle API response
    useEffect(() => {
        if (applicationFormTemplatePostData?.message) {
            toast.success(applicationFormTemplatePostData.message, {
                position: "top-right",
                duration: 4000,
            });
            // Set the created template data to show the FormEdit component
            setCreatedTemplate(applicationFormTemplatePostData);
        }
    }, [applicationFormTemplatePostData]);

    // Handle API errors
    useEffect(() => {
        if (!error) return;

        const newErrors = {};
        if (Array.isArray(error.error)) {
            error.error.forEach((err) => {
                newErrors[err.field] = err.message;
                toast.error(`${err.field || 'Error'}: ${err.message}`, {
                    position: "top-right",
                    duration: 2000,
                });
            });
        } else if (error.message) {
            toast.error(`${error.message}`, { position: "top-right", duration: 5000 });
        } else {
            toast.error("An unexpected error occurred", { position: "top-right", duration: 2000 });
        }
        setErrors(newErrors);
    }, [error]);
    const handleChange = (fieldName, value) => {
        if (fieldName === 'templateName') {
            setTemplateName(value);
        }
        // Clear error when user types
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(postApplicationFormTemplateRequest({ templateName, token }));
        } catch (err) {
            console.error("Error creating form template:", err);
            toast.error(err.message || "Failed to create form template. Please try again.", {
                position: "top-right",
                duration: 2000,
            });
        }
    };

    if (createdTemplate) {
        return <FormEdit config={applicationFormTemplatePostData?.data} />;
    }

    return (
        <div className="p-4 bg-body-color rounded-lg shadow">
            <div className="flex items-center justify-between mb-6">
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Template Name"
                        placeholder="Enter Template Name"
                        name="templateName"
                        onChange={handleChange}
                        value={templateName}
                        error={errors.templateName}
                        required
                    />
                    <div className="mt-6 flex justify-start">
                        <Button
                            className='btn btn-primary'
                            type="primary"
                            size="large"
                            loading={loading}
                            htmlType="submit"
                        >
                            Submit Form
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormCreate;