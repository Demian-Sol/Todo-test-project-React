import React from 'react';
import Styles from './toDoItem.module.css';

const toDoItem = (props) => {

  const formatDate = (date, check) => {
    if (date === check) return date;
    const dateOriginal = new Date(date);
    const dateTimeFormatOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: false
      };
    return new Intl.DateTimeFormat('ru-RU', dateTimeFormatOptions).format(dateOriginal);
  }  

  const expired = new Date(props.item.expiresAt).getTime() < new Date().getTime();

  const handleComplete = () => {
    props.onToggleComplete(props.index);
  }

  const handleEdit = () => {
      props.onShowEditTodoForm(props.index);
  }

  const handleDelete = () => {
      props.onDeleteTodo(props.index);
  }

  return (
    <div className={[Styles.TodoCard, props.item.completedAt ? Styles.Completed : expired ? Styles.Expired : ''].join(' ')}>
      <div className={Styles.Priority}>Priority: {props.item.priority}</div>
      <div className={Styles.Name}>Name: {props.item.name}</div>
      <span className={Styles.ExpiresAt}>Expires: {formatDate(props.item.expiresAt, 'Not specified')}</span>
      {props.item.completedAt &&
        <span className={Styles.CompletedAt}>CompletedAt: {formatDate(props.item.completedAt, '')}</span>
      }
      <div className={Styles.Description}>Description: {props.item.description}</div>
      <div className={Styles.Controls}>
        <button onClick={handleComplete}> Completed</button>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default toDoItem;
