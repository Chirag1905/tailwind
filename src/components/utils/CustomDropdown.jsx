import React, { useState } from 'react';
import { Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const CustomDropdown = ({
    name,
    value,
    onChange,
    onBlur,
    options = [],
    label = '',
    required = false,
    placeholder = 'Select an option',
    className = '',
    optionClassName = 'px-4 py-2 cursor-pointer transition-colors duration-200 hover:bg-primary hover:text-primary rounded-lg',
    error = null,
    showSearch = false,
    customSearch = false,
    ...rest
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = customSearch
        ? options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : options;

    const dropdownRender = customSearch
        ? (menu) => (
            <div>
                <div className="p-2">
                    <Input
                        placeholder={`Search ${label || placeholder}`}
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        allowClear
                    />
                </div>
                {React.cloneElement(menu, {
                    style: { boxShadow: 'none' },
                })}
            </div>
        )
        : undefined;

    return (
        <div className={`w-full relative mb-4 form-control ${className}`}>
            {label && (
                <label htmlFor={name} className="form-label">
                    {label} {required && <span className="text-secondary">*</span>}
                </label>
            )}
            <Select
                value={value}
                onChange={(val) => onChange(val)}
                className={`w-full ${error ? 'border-red-500' : ''}`}
                placeholder={placeholder}
                showSearch={showSearch}
                filterOption={(input, option) =>
                    (option?.children ?? '')
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }
                popupRender={dropdownRender}
                optionFilterProp="children"
                suffixIcon={
                    <svg
                        className="w-5 h-5 mt-2 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                }
                {...rest}
            >
                {(customSearch ? filteredOptions : options).map((option) => (
                    <Option
                        key={option.value}
                        value={option.value}
                        className={optionClassName}
                    >
                        {option.label}
                    </Option>
                ))}
            </Select>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default CustomDropdown;