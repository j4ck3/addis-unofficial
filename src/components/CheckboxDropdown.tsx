"use client";
import { useState } from "react";

interface Props {
  options: string[];
  label: string;
}

const Dropdown: React.FC<Props> = ({ options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionToggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className="bg-green-500 px-4 py-2 rounded-md text-white"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        {label} <i className="bi bi-chevron-down"></i>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg">
          <div className="bg-white rounded-md shadow-xs">
            <div className="py-1">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center px-4 py-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionToggle(option)}
                    className="form-checkbox h-5 w-5 text-gray-600 cursor-pointer"
                  />
                  <span className="ml-2 text-gray-700">{option}</span>
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
