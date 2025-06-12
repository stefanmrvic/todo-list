import { createElement } from "../utils/dom.js";
import { showAddTaskModal, showEditTaskModal, showDeleteTaskModal, showTaskInfoModal, closeModal } from "./modal.js";
import { projects, selectedProject } from "./projects.js";
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faCircleCheck } from '../modules/icons.js';

class Task {
    constructor(title, description, due, priority, projectId) {
        this.title = title;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.taskId = crypto.randomUUID();
        this.projectId = projectId;
    }

    parsePriorityToString() {
        const priority = this.priority;
        let str;

        if (priority === 'low') str = '😴 Not important at all..';
        else if (priority === 'medium') str = '😅 A bit important';
        else if (priority === 'high') str = '😲 Super important!';
        else str = 'How important is this task?';
    
        return str;
    }
}

const tasksList = document.querySelector('.main__tasks-list');
const tasksAddBtn = document.querySelector('.main__add-btn');

tasksList.addEventListener('click', markTaskDone);
tasksAddBtn.addEventListener('click', showAddTaskModal);

function markTaskDone(e) {
    crossOutTask(e);
    changeTaskIcon(e);
}

function crossOutTask(e) {
    const taskItem = e.target.closest('.main__task-item');
    const taskItemPara = taskItem.querySelector('.main__text > .main__task-title');

    taskItemPara.style.textDecoration = 
        taskItemPara.style.textDecoration === 'line-through' ? 'none' : 'line-through';
}

function changeTaskIcon(e) {
    const taskItem = e.target.closest('.main__task-item');
    const taskItemIconWrapper = taskItem.querySelector('.main__text > .main__task-icon-wrapper');
    let taskItemIcon = taskItemIconWrapper.querySelector('.main__task-icon');
    const taskItemIconInitial = icon(faCircle).node[0];
    const taskItemIconCheck = icon(faCircleCheck).node[0];
    const isInitialIcon = taskItemIcon.classList.contains('fa-circle');
    const iconToUse = isInitialIcon ? taskItemIconCheck : taskItemIconInitial;

    const priorityClassList = ['low', 'medium', 'high'];
    const taskItemIconPriority = priorityClassList.find(task => taskItemIcon.classList.contains(task));

    taskItemIcon.remove();
    taskItemIconWrapper.appendChild(iconToUse);
    taskItemIconWrapper.children[0].classList.add('main__task-icon');
    taskItemIcon = taskItemIconWrapper.querySelector('.main__task-icon');
    taskItemIcon.classList.add(taskItemIconPriority);
}

function createTaskElement(task) {
    const parent = document.querySelector('.main__tasks-list');
    const taskElement = createElement('div', 'main__task-item');
    const textContainer = createElement('div', 'main__text');

    const iconWrapper = createElement('div', 'main__task-icon-wrapper');
    const taskIcon = icon(faCircle).node[0];
    taskIcon.classList.add('main__task-icon');
    const title = createElement('p', 'main__task-title', task.title);

    iconWrapper.append(taskIcon); 
    textContainer.append(iconWrapper, title);

    const controlsContainer = createElement('div', 'main__controls');

    const date = createElement('p', 'main__task-date', task.due);

    const editBtn = createElement('button', 'main__edit-btn');
    const editBtnIcon = createElement('svg', 'far fa-pen-to-square btn-icon projects__icon--2');
    editBtn.append(editBtnIcon);

    const deleteBtn = createElement('button', 'main__delete-btn');
    const deleteBtnIcon = createElement('svg', 'far fa-trash-can btn-icon projects__icon--3');
    deleteBtn.append(deleteBtnIcon);

    const infoBtn = createElement('button', 'main__info-btn');
    const infoBtnIcon = createElement('svg', 'fas fa-circle-info');
    infoBtn.append(infoBtnIcon);

    controlsContainer.append(date, editBtn, deleteBtn, infoBtn);
    taskElement.append(textContainer, controlsContainer);

    const project = selectedProject;
    const projectID = project.projectId;

    // It sets data ID attributes so that DOM elements can be referenced back to the array items in the backend
    taskElement.setAttribute('data-project-id', projectID);
    taskElement.setAttribute('data-task-id', task.taskId);

    // It captures the key name of the priority property of the task object
    const priority = task.priority;

    if (priority !== 'placeholder') {
        // Depending of the priority of the task, it will put className of priority value (low, medium, or high) 
        taskIcon.classList.add(priority);
    }

    parent.append(taskElement);

    const infoTaskBtn = taskElement.querySelector('.main__info-btn');
    const editTaskBtn = taskElement.querySelector('.main__edit-btn');
    const deleteTaskBtn = taskElement.querySelector('.main__delete-btn');

    infoTaskBtn.addEventListener('click', showTaskInfoModal);
    editTaskBtn.addEventListener('click', showEditTaskModal);
    deleteTaskBtn.addEventListener('click', showDeleteTaskModal);
}

// Exporting this function to pass it as callback for event listener in modal.js inside of createDeleteModal()
export function deleteTask(e) {
    deleteTaskFromArray(e);
    deleteTaskFromDOM();
    updateTasksCount();
    closeModal();
}

function deleteTaskFromArray(e) {
    const taskElement = e.currentTarget.closest('.modal__content').querySelector('.modal__text');
    const taskElementID = taskElement.getAttribute('data-task-id');
    let itemFound = false;
    
    for (const task of tasks) {
        const taskID = task.taskId;
        const taskIndex = tasks.indexOf(task);
        
        if (taskID === taskElementID) {
            tasks.splice(taskIndex, 1);
            itemFound = true;
        }
    }
    if (!itemFound) throw new Error('Element not found in the array!');
}

function deleteTaskFromDOM() {
    const taskElements = document.querySelectorAll('.main__task-item');
    
    for (const taskElement of taskElements) {
        const taskElementID = taskElement.dataset.taskId;
        let elementExistsInArray = false;
        
        for (const task of tasks) {
            const taskID = task.taskId;
            
            if (taskElementID === taskID) {
                elementExistsInArray = true;
            }
        }
        if (!elementExistsInArray) taskElement.remove();
    }
}

function editTaskInArray() {
    const taskElement = findTaskElement();
    const taskElementID = taskElement.getAttribute('data-task-id');

    const taskTitle = document.querySelector('.modal__form-title').value;
    const taskDescription = document.querySelector('.modal__form-description').value;
    const taskDue = document.querySelector('.modal__form-date').value;
    const taskPriority = document.querySelector('.modal__form-priority').value;

    for (const task of tasks) {
        const taskID = task.taskId;

        if (taskElementID === taskID) {
            task.title = taskTitle;
            task.description = taskDescription;
            task.due = taskDue;
            task.priority = taskPriority;
        }
    }
}

function editTaskInDOM() {
    const taskElement = findTaskElement();
    const taskElementID = taskElement.getAttribute('data-task-id');

    for (const task of tasks) {
        const taskID = task.taskId;

        if (taskElementID === taskID) {
            const taskElementTitle = taskElement.querySelector('.main__task-title');
            const taskElementPriority = taskElement.querySelector('.main__task-icon');
            
            const taskElementDue = taskElement.querySelector('.main__task-date');
            const taskElementPriorityClasses = ['low', 'medium', 'high'];
            const activeClass = taskElementPriorityClasses.find(className => taskElementPriority.classList.contains(className));
            const taskPriority = task.priority;
            
            if (activeClass) taskElementPriority.classList.replace(activeClass, taskPriority);
            else if (taskPriority !== 'placeholder') taskElementPriority.classList.add(taskPriority);

            taskElementTitle.textContent = task.title;
            taskElementDue.textContent = task.due;
        }
    }
}

function findTaskElement() {
    const form = document.querySelector('.modal__form');
    // To prevent losing the trace of the task item, I stamped task ID onto form so it can be traced back to the task item once the modal is open
    const formID = form.getAttribute('data-task-id');
    const taskElements = document.querySelectorAll('.main__task-item');

    for (const taskElement of taskElements) {
        const taskElementID = taskElement.dataset.taskId;

        if (formID === taskElementID) {
            return taskElement;
        }
    }
    throw new Error('Task item not found!');
}

// Exporting this function to pass it as callback for form "submit" event in modal.js
export function editTask() {
    editTaskInArray();
    editTaskInDOM();
}

function addTaskToArray() {
    const taskTitle = document.querySelector('.modal__form-title').value;
    const taskDescription = document.querySelector('.modal__form-description').value;
    const taskDue = document.querySelector('.modal__form-date').value;
    const taskPriority = document.querySelector('.modal__form-priority').value;

    const project = selectedProject;
    const projectID = project.projectId;
    const newTask = new Task(taskTitle, taskDescription, taskDue, taskPriority, projectID);
    project.taskList.push(newTask);
}

// Exporting function to be able to render tasks when user clicks on Project name button in projects.js under selectProject()
export function renderTasks() {
    const projectTitle = document.querySelector('.main__headline').textContent;
    const project = projects.find(project => project.title === projectTitle);
    console.log(project)
    const projectTasks = project.taskList;
    console.log(projectTasks)
    const projectTasksCount = project.taskList.length;

    if (!project) return;

    const taskElements = document.querySelectorAll('.main__task-item');

    for (const task of projectTasks) {
        const taskID = task.taskId;
        let duplicateTask = false;
        
        for (const taskElement of taskElements) {
            const taskElementID = taskElement.getAttribute('data-task-id');

            if (taskID === taskElementID) {
                duplicateTask = true;
            }
        }
        if (!duplicateTask) createTaskElement(task);
    }
    updateTasksCount(projectTasksCount);
}

function updateTasksCount(projectTasksCount) {
    const tasksCountText = document.querySelector('.main__tasks-num');
    const tasksCount = projectTasksCount;
    
    tasksCountText.textContent = tasksCount;
}

// Exporting this function to pass it as callback for form "submit" event of showTasksModal() in modal.js
export function addNewTask() {
    addTaskToArray();
    renderTasks();
}