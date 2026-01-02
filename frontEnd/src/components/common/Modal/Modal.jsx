import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/features/ui/uiSlice';

const Modal = ({ children, className = '', size = 'md' }) => {
  const dispatch = useDispatch();
  const { modalOpen, modalContent } = useSelector((state) => state.ui);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        dispatch(closeModal());
      }
    };

    if (modalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [modalOpen, dispatch]);

  if (!modalOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={handleBackdropClick}
        />

        {/* Modal */}
        <div
          className={`
            relative w-full transform rounded-lg bg-white p-6 text-left shadow-xl transition-all
            ${sizes[size]}
            ${className}
          `}
        >
          {/* Close button */}
          <button
            onClick={() => dispatch(closeModal())}
            className="absolute right-4 top-4 rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Modal content */}
          {modalContent || children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
