'use client'
import { useState } from 'react';

interface Props {
  options: string[];
  label: string;
}

const Dropdown: React.FC<Props> = ({ options, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
        <button
            type='button'
            onClick={handleToggle}
            className='btn-theme'
            id='options-menu'
            aria-haspopup='true'
            aria-expanded='true'
        >
        {label}<i className='bi bi-caret-down-fill ms-1'></i>
        </button>

      {isOpen && (
        <div className='origin-top-right absolute right-0 mt-2 rounded-md shadow-lg'>
          <div className='bg-white rounded-md shadow-xs'>
            <div className='py-1'>
              {options.map((option) => (
                <label key={option} className='flex items-center px-4 py-2 cursor-pointer'>
                  <span className='ml-2 text-gray-700'>{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
