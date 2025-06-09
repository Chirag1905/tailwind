{/* // With icons */ }
// <TextField
//     label="Search"
//     startIcon={<IconKeyFilled />}
//     placeholder="Search..."
// />

// {/* // Error state */}
// <TextField
//     label="Email"
//     error="Invalid email address"
// // value={invalidEmail}
// />
import { forwardRef } from "react";
import { Input } from "antd";

const TextField = forwardRef(
    (
        {
            id,
            label,
            name,
            onChange,
            onBlur,
            value,
            placeholder,
            required = false,
            type = "text",
            disabled = false,
            readOnly = false,
            error = "",
            helperText = "",
            className = "",
            inputClassName = "",
            labelClassName = "",
            startIcon,
            endIcon,
            autoComplete = "off",
            variant = "outlined", // 'outlined' | 'filled' | 'borderless'
            ...props
        },
        ref
    ) => {

        // Map Ant Design variants
        const variantProps = {
            outlined: { variant: 'outlined' },
            filled: { variant: 'filled' },
            borderless: { variant: 'borderless' }
        }[variant] || {};

        return (
            <div className={`form-control ${className}`}>
                {label && (
                    <label
                        htmlFor={id}
                        className={`form-label ${labelClassName} ${disabled ? "opacity-60" : ""}`}
                    >
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )}

                <div className="relative">
                    <Input
                        id={id}
                        name={name || id}
                        type={type}
                        placeholder={placeholder}
                        onChange={(e) => onChange(name, e.target.value)}
                        onBlur={(e) => onBlur(name)}
                        value={value}
                        required={required}
                        disabled={disabled}
                        readOnly={readOnly}
                        autoComplete={autoComplete}
                        ref={ref}
                        className={`form-input ${error ? "!border-red-500 focus:!ring-red-500" : ""
                            }`}
                        prefix={startIcon}
                        suffix={endIcon}
                        {...variantProps}
                        {...props}
                    />
                </div>
                <div className={`mt-1 text-sm`}>
                    {error ? (
                        <p className="text-red-600">{error}</p>
                    ) : helperText ? (
                        <p className="text-gray-500">{helperText}</p>
                    ) : null}
                </div>

            </div>
        );
    }
);

TextField.displayName = "TextField";

export default TextField;