import React, { useState } from 'react';
import { dropdownConfig } from "../../../constant/index"



const FilterDropdowns: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({});
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleValue = (name: string, value: string) => {
    setSelectedValues(prev => {
      const current = prev[name] || [];
      return {
        ...prev,
        [name]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value]
      };
    });
  };

  const handleClearSearch = (name: string) => {
    setSearchValues(prev => ({ ...prev, [name]: '' }));
  };

  const handleSearchChange = (name: string, value: string) => {
    setSearchValues(prev => ({ ...prev, [name]: value }));
  };

  const getFilteredItems = (dropdown: typeof dropdownConfig[0]) => {
    const search = searchValues[dropdown.name] || '';
    return dropdown.items.filter(item =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <form className="max-w-6xl mx-auto flex">
      <div className="flex flex-wrap items-start gap-2 mb-4">
        {dropdownConfig.map(dropdown => (
          <div key={dropdown.name} className="relative w-full md:w-auto">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === dropdown.name ? null : dropdown.name)}
              className="inline-flex justify-between w-full bg-white rounded md:w-48 px-2 py-2 text-base text-stone-500 bg-gray-50 border border-stone-300"
            >
              <span className="truncate mx-2">
                {selectedValues[dropdown.name]?.length
                  ? `${dropdown.label}: ${selectedValues[dropdown.name].length}`
                  : dropdown.label}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {openDropdown === dropdown.name && (
              <div className="absolute z-10 w-full mt-2 rounded bg-white ring-2 ring-rose-200 border border-rose-500">
                <div className="relative">
                  <input
                    className="block w-full px-4 py-2 text-gray-800 rounded-t border-b"
                    type="text"
                    placeholder={`Search for a ${dropdown.label.toLowerCase()}`}
                    value={searchValues[dropdown.name] || ''}
                    onChange={e => handleSearchChange(dropdown.name, e.target.value)}
                  />
                  {searchValues[dropdown.name] && (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => handleClearSearch(dropdown.name)}
                    >
                      <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {getFilteredItems(dropdown).map(item => (
                    <div
                      key={item.value}
                      className={`block px-4 py-2 text-gray-700 hover:bg-rose-200 cursor-pointer ${selectedValues[dropdown.name]?.includes(item.value) ? 'bg-rose-200' : 'bg-white'}`}
                      onClick={() => toggleValue(dropdown.name, item.value)}
                    >
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedValues[dropdown.name]?.includes(item.value) || false}
                          onChange={() => toggleValue(dropdown.name, item.value)}
                        />
                        <span>{item.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedValues[dropdown.name]?.map(value => (
              <input
                key={value}
                type="hidden"
                name={`${dropdown.name}[]`}
                value={value}
              />
            ))}
          </div>
        ))}

        <button
          type="submit"
          className="w-full md:w-auto inline-flex justify-center font-medium border border-rose-700 bg-rose-700 rounded px-8 py-2 text-base text-white hover:bg-rose-800"
        >
          Apply Filters
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {dropdownConfig.map(dropdown => (
          selectedValues[dropdown.name]?.map(value => {
            const label = dropdown.items.find(i => i.value === value)?.label || value;
            return (
              <span key={value} className="inline-flex items-center px-3 py-1 rounded-full text-base bg-rose-100 text-rose-800">
                {label}
                <button
                  type="button"
                  className="ml-2 inline-flex items-center p-0.5 hover:bg-blue-200 rounded-full"
                  onClick={() => toggleValue(dropdown.name, value)}
                >
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            );
          })
        ))}
      </div>
    </form>
  );
};

export default FilterDropdowns;
