import React from 'react';
import Styles from './ToDoInputForm.module.css';

const toDoInputForm = (props) => {
  return (
    <form className={Styles.InputForm} onChange={props.onInputChange} onSubmit={props.onFormSubmit}>
      <input type='text' placeholder='Todo name' name='nameIF' value={props.nameIF}/>
      <label>Priority: </label>
      <select name='priorityIF' value={props.priorityIF}>
        <option >Normal</option>
        <option >Important</option>
        <option >Very important</option>
      </select>
      <br />
      <label >
        Deadline: 
        <input type='time' name='timeIF' value={props.timeIF}/>
        <input type='date' name='dateIF' min='2018-01-01' value={props.dateIF}/>
      </label>
      <div>
        <textarea rows='5' cols ='40' placeholder='Todo description' name='descriptionIF' value={props.descriptionIF}/>
      </div>
      <div>
        <input type='submit' />
      </div>
    </form>
  );
}

export default toDoInputForm;
