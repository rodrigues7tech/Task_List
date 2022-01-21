const inputElement =  document.querySelector(".new-task-input");
const addTasktButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector('.tasks-container');
//let db = firebase.firestore();

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputValid = validateInput();
    
    if(!inputValid){
        return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');
    const taskContent = document.createElement('p');
    taskContent.innerHTML = inputElement.value;


    tasksContainer.appendChild(taskItemContainer);
    
    
    taskContent.addEventListener('click', () => handleClick(taskContent));
    
    const deleteItem = document.createElement('i');
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");
    
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    
    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));
    
    tasksContainer.appendChild(taskItemContainer);
    
    inputElement.value = "";

    updateLocalStorage();
};



const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks){
        const currentTaskIsBeingClickd = task.firstChild.isSameNode(taskContent)
        if(currentTaskIsBeingClickd){
            task.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;

    for(const task of tasks){
        const currentTaskIsBeingClickd = task.firstChild.isSameNode(taskContent);

        if(currentTaskIsBeingClickd){
            taskItemContainer.remove();
        }
    }
    updateLocalStorage()
};

const handleInputChange = ()=> {
    const inputIsValid = validateInput();

    if(inputValid){
        return inputElement.classList.remove("error");
    }
};

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;

    const localStorageTasks = [... tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed');

        return {description: content.innerText, isCompleted};
    });
    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    if(!tasksFromLocalStorage){
        return;
    }

    for(const task of tasksFromLocalStorage){
    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = task.description;

    if(task.isCompleted){
        taskContent.classList.add("completed");
    }

    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    tasksContainer.appendChild(taskItemContainer);

    }
};

refreshTasksUsingLocalStorage();

addTasktButton.addEventListener("click", ()=> handleAddTask());

inputElement.addEventListener('change', () => handleInputChange());
