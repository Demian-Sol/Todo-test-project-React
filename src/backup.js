initializeToDos = () => {
    const keysArray = localStorage.getItem('keysArray');
    if (keysArray && keysArray.length > 0) {
      const restoredToDosList = [];
      keysArray.forEach( key => {
        const toDoString = localStorage.getItem(key);
        restoredToDosList.push( this.parseToDo(toDoString) );
      })
      this.setState({toDosList: restoredToDosList, keysArray: keysArray});
    } else {
      localStorage.setItem('keysArray', []);
    }
  }

  storeToDo = (toDo, updating, index) => {
    let toDoString = '';
    const dvr = '>divider<';
    toDoString = toDoString + toDo.name + dvr +
                  toDo.description + dvr +
                  toDo.priority + dvr +
                  toDo.expiresAt + dvr +
                  toDo.completedAt;
    const toDoKey = updating ? this.state.keysArray[index] : Math.random() * Math.random() + Math.random();
    localStorage.setItem(`${toDoKey}`, toDoString);
    if (!updating) {
      const updatedKeysArray = [...this.state.keysArray].concat(toDoKey);
      this.setState({keysArray: updatedKeysArray});
      localStorage.setItem('keysArray', updatedKeysArray);
    }
  }

  parseToDo = (toDoString) => {
    const toDoProps = toDoString.split('>divider<');
    const restoredToDo = {};
    restoredToDo.name = toDoProps[0];
    restoredToDo.description = toDoProps[1];
    restoredToDo.priority = toDoProps[2];
    restoredToDo.expiresAt = toDoProps[3];
    restoredToDo.completedAt = toDoProps[4];
    return restoredToDo;
  }