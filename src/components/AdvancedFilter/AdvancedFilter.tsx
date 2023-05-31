import React, { useState, useContext } from 'react';
import { CategoriesContext } from '../../contexts';
import AdvamcedFilterProps from './AdvamcedFilterProps';

const AdvancedFilter = ({ onChange }: AdvamcedFilterProps) => {
  const categories = useContext(CategoriesContext);

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  function toggleFilter() {
    setIsFilterOpen((isFilterOpen) => !isFilterOpen);
  }

  return (
    <>
      <button
        className='sidebar__link sidebar__link_random ff-montse text-lg py-3 px-3'
        onClick={toggleFilter}
      >
        Advanced filter
        <i
          className={`sidebar__menu-open-icon ${
            isFilterOpen ? 'sidebar__menu-open-icon_opened' : ''
          }`}
        ></i>
      </button>
      <div
        className={`flex-col sidebar__filter ${
          isFilterOpen ? 'sidebar__filter_open my-1 px-3 pt-0.5 pb-3' : ''
        }`}
      >
        <h3 className='ff-montse text-lg'>Category</h3>
        <div className='w-4/5 mx-auto grid grid-cols-2 gap-1 mt-2'>
          {categories.map(({ id, name }) => (
            <div key={id} className='flex items-center'>
              <input
                id={name}
                type='checkbox'
                value={name}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={(event) => onChange(event, name)}
              />
              <label
                htmlFor={name}
                className='ml-2 text-sm ff-montse text-gray-900 dark:text-gray-300'
              >
                {name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdvancedFilter;
