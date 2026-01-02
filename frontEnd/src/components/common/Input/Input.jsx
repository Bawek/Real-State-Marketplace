import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  containerClassName = '',
  labelClassName = '',
  icon,
  iconPosition = 'left',
  size = 'md',
  variant = 'outlined',
  ...props
}, ref) => {
  const baseInputClasses = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200';
  
  const variants = {
    outlined: 'border',
    filled: 'border-0 bg-gray-100',
    underlined: 'border-0 border-b-2 border-gray-300 rounded-none px-0 focus:border-blue-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };
  
  const inputClasses = `
    ${baseInputClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
    ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}
    ${icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const containerClasses = `
    relative
    ${containerClassName}
  `.trim();

  const labelClasses = `
    block text-sm font-medium text-gray-700 mb-1
    ${required ? 'after:content-"*" after:ml-1 after:text-red-500' : ''}
    ${error ? 'text-red-600' : ''}
    ${labelClassName}
  `.trim();

  return (
    <div className={containerClasses}>
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400 sm:text-sm">{icon}</span>
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          placeholder={placeholder}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={helperText ? `${props.id || 'input'}-helper-text` : undefined}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400 sm:text-sm">{icon}</span>
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p
          id={helperText ? `${props.id || 'input'}-helper-text` : undefined}
          className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
