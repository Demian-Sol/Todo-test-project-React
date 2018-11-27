import React, { Component } from 'react';
import './App.css';

import Todoslist from './components/toDosList';
import ToDoInputForm from './components/ToDoInputForm';
import { priorities } from './constants.js';

class App extends Component {
  state = {
    toDosList: [],
    keysArray: [],
    currentFilter: 'All',
    isFormVisible: false,
    editingTodoIndex: '',
    nameIF: '',
    descriptionIF: '',
    priorityIF: 'Important',
    dateIF: '',
    timeIF: '',
    completedAt: ''
  }

  componentDidMount() {
    const restoredToDosList = JSON.parse(localStorage.getItem('todos') );

    if (restoredToDosList) {
      this.setState({toDosList: restoredToDosList});
    }
  }

  handleFilterChange = (newValue) => this.setState({currentFilter: newValue});

  filterToDos = (toDos) => {
    return this.state.currentFilter === 'All' ? toDos : toDos.filter( el => el.priority === this.state.currentFilter);
  }

  handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    this.setState({[inputName]: inputValue});
  }

  handleFormSubmit = (event) => {
    const newToDo = {
      name: this.state.nameIF,
      description: this.state.descriptionIF,
      priority: this.state.priorityIF,
      expiresAt: this.state.dateIF === '' ? 'Not specified' : new Date(`${this.state.dateIF},${this.state.timeIF}`).toString(),
      completedAt: this.state.completedAt
    }

    event.preventDefault();

    if (this.state.editingTodoIndex) {
      const updatedToDosList = [...this.state.toDosList];
      updatedToDosList[this.state.editingTodoIndex - 1] = newToDo;
      this.setState({toDosList: updatedToDosList, editingTodoIndex: '', isFormVisible: false});
      localStorage.setItem('todos', JSON.stringify(updatedToDosList) );
    } else {
      this.setState({ toDosList: this.state.toDosList.concat(newToDo), isFormVisible: false });
      localStorage.setItem('todos', JSON.stringify(this.state.toDosList.concat(newToDo)));
    }
  }

  handleToggleComplete = (toDoIndex) => {
    const updatedToDosList = [...this.state.toDosList];
    const updatedToDo = {...updatedToDosList[toDoIndex]};
    updatedToDo.completedAt = updatedToDo.completedAt === '' ? new Date().toString() : '';
    updatedToDosList[toDoIndex] = updatedToDo;
    this.setState({toDosList: updatedToDosList});
    localStorage.setItem('todos', JSON.stringify(updatedToDosList) );
  }

  handleShowNewTodoForm = () => this.setState(
    {
      isFormVisible: true,
      nameIF: '',
      descriptionIF: '',
      priorityIF: 'Important',
      dateIF: '',
      timeIF: '',
      completedAt: ''
    });

  handleShowEditTodoForm = (toDoIndex) => {
    const adjustInput = (input) => input < 10 ? `0${input}` : input;
    const targetToDo = this.state.toDosList[toDoIndex];
    const expirationDate = new Date(targetToDo.expiresAt);
    const dateToFill = expirationDate.getFullYear() + '-' + adjustInput(expirationDate.getMonth() + 1) + '-' + adjustInput(expirationDate.getDate());
    const timeToFill = adjustInput(expirationDate.getHours() ) + ':' + adjustInput(expirationDate.getMinutes() );

    this.setState(
    {
      isFormVisible: true,
      nameIF: targetToDo.name,
      descriptionIF: targetToDo.description,
      priorityIF: targetToDo.priority,
      dateIF: dateToFill,
      timeIF: timeToFill,
      completedAt: targetToDo.completedAt,
      editingTodoIndex: toDoIndex + 1
    })
  }

  handleDeleteTodo = (index) => {
    const updatedToDosList = [...this.state.toDosList];

    updatedToDosList.splice(index, 1);
    this.setState({toDosList: updatedToDosList});
    localStorage.setItem('todos', JSON.stringify(updatedToDosList) );
  }

  render() {
    return (
      <div className="App">
        <div className='toDoContainer'>
          <button onClick={this.handleShowNewTodoForm}>
            New todo
          </button>
          <Todoslist 
            list={this.filterToDos(this.state.toDosList)} 
            filter={this.state.currentFilter} 
            onFilterChange={this.handleFilterChange}
            onToggleComplete={this.handleToggleComplete}
            onShowEditTodoForm={this.handleShowEditTodoForm}
            onDeleteTodo={this.handleDeleteTodo} />
        </div>
        <div className='formContainer'>
          {this.state.isFormVisible &&
            <ToDoInputForm 
            onInputChange={this.handleInputChange} 
            onFormSubmit={this.handleFormSubmit}
            nameIF={this.state.nameIF} 
            descriptionIF={this.state.descriptionIF} 
            priorityIF={this.state.priorityIF} 
            dateIF={this.state.dateIF} 
            timeIF={this.state.timeIF} />
          }
        </div>
      </div>
    );
  }
}

export default App;
