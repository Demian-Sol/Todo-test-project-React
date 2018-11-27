import React from 'react';

import { priorities } from '../../../constants.js';

const prioritiesArray = [...priorities, 'All'];
const filters = (props) => {
  return (
    <div>
      <p>
        Priority filter:
      </p>
      {
        prioritiesArray.map( filter => {
          const handleClick = () => props.onFilterChange(filter);
          return (
            <button onClick={handleClick}>
              {filter}
            </button>
          );
        })
      }
    </div>
  );
};

export default filters;
