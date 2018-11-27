import React from 'react';

import Todoitem from './toDoItem';
import Filters from './Filters';

const toDosList = (props) => {
  const list = (
    props.list.map( (toDo, index) => {
      return (
      <li key={Math.random()}>
        <Todoitem 
          onDeleteTodo={props.onDeleteTodo} 
          onShowEditTodoForm={props.onShowEditTodoForm} 
          index={index} 
          item={toDo} 
          onToggleComplete={props.onToggleComplete} />
      </li>);
    })
  );
  return (
    <div>
      <Filters onFilterChange={props.onFilterChange} />
      <ul>
        {list}  
      </ul>
    </div>
  );
}

export default toDosList;
