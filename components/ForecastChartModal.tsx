
import React from 'react';
import ForecastChart, { type ForecastChartProps } from './ForecastChart';

interface ForecastChartModalProps {
  data: ForecastChartProps;
  onClose: () => void;
}

const ForecastChartModal: React.FC<ForecastChartModalProps> = ({ data, onClose }) => {
  // Effect to handle Escape key press
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-[#0F1113] border border-gray-700 rounded-[2.5rem] w-full max-w-6xl p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
          aria-label="Close chart"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        {/* The ForecastChart component now renders a larger version */}
        <ForecastChart {...data} width={1000} height={500} />
        <div className="text-center mt-3">
            <p className="text-xs text-gray-400">
                <strong>Pro Tip:</strong> Use your mouse wheel to zoom in/out and click & drag to pan the chart.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ForecastChartModal;