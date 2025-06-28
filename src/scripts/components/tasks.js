import { icon } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faCircleCheck } from '../modules/icons.js';
import { createElement } from "../utils/dom.js";
import { showAddTaskModal, showEditTaskModal, showDeleteTaskModal, showTaskInfoModal, closeModal } from "./modal.js";
import { projects, selectedProject, storeProjectToLocalStorage } from "./projects.js";

export class Task {
    constructor(title, description, due, priority, projectId) {
        this.title = title;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.completed = false;
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
    // If the user clicks between the tasks it will return function early
    if (e.target === tasksList) return;

    changeTaskStatus(e);
    crossOutTask(e);
    changeTaskIcon(e);
    storeProjectToLocalStorage();
}

function changeTaskStatus(e) {
    const taskElement = e.target.closest('.main__task-item');
    const task = findTaskInArray(taskElement);
    const isTaskCompleted = task.completed;

    if (!isTaskCompleted) task.completed = true;
    else task.completed = false;
}

function crossOutTask(e) {
    const taskElement = e.target.closest('.main__task-item');
    const taskElementTitle = taskElement.querySelector('.main__text > .main__task-title');

    taskElementTitle.classList.toggle('done');
}

function changeTaskIcon(e) {
    const taskElement = e.target.closest('.main__task-item');
    const taskElementIconWrapper = taskElement.querySelector('.main__text > .main__task-icon-wrapper');
    const task = findTaskInArray(taskElement);

    let taskElementIcon = taskElementIconWrapper.querySelector('.main__task-icon');

    const initialIcon = icon(faCircle).node[0];
    const checkedIcon = icon(faCircleCheck).node[0];

    const taskCompleted = task.completed;
    const taskPriority = task.priority;
    const iconToUse = taskCompleted ? checkedIcon : initialIcon;
    iconToUse.classList.add('main__task-icon');

    taskElementIcon.remove();
    taskElementIconWrapper.appendChild(iconToUse);
    taskElementIcon = taskElementIconWrapper.querySelector('.main__task-icon');
    taskElementIcon.classList.add(taskPriority);
}

export function findTaskInArray(taskEle) {
    const taskElement = taskEle;
    const taskElementID = taskElement.dataset.taskId;
    const taskProjectID = taskElement.dataset.projectId;

    const project = projects.find(project => project.projectId === taskProjectID);
    const projectTaskList = project.taskList;
    const taskInArray = projectTaskList.find(task => task.taskId === taskElementID);

    return taskInArray;
}

export function createTaskElement(task) {
    const parent = document.querySelector('.main__tasks-list');
    const taskElement = createElement('div', 'main__task-item');
    const textContainer = createElement('div', 'main__text');

    const iconWrapper = createElement('div', 'main__task-icon-wrapper');
    const taskCompleted = task.completed;
    const taskIcon = taskCompleted ? icon(faCircleCheck).node[0] : icon(faCircle).node[0];
    taskIcon.classList.add('main__task-icon');
    const taskTitle = createElement('p', 'main__task-title', task.title);

    if (taskCompleted) taskTitle.classList.add('done');

    iconWrapper.append(taskIcon); 
    textContainer.append(iconWrapper, taskTitle);

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

    const taskID = task.taskId;
    const projectID = task.projectId;

    // It sets data ID attributes so that DOM elements can be referenced back to the array items in the backend
    taskElement.setAttribute('data-project-id', projectID);
    taskElement.setAttribute('data-task-id', taskID);

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
    closeModal(e);
    storeProjectToLocalStorage();
}

function deleteTaskFromArray() {
    const taskElement = findTaskElement();
    const taskElementID = taskElement.getAttribute('data-task-id');
    const task = findTaskInArray(taskElement);
    
    const project = projects.find(project => project.projectId === task.projectId);
    const projectTasks = project.taskList;

    let itemFound = false;
    
    for (const task of projectTasks) {
        const taskID = task.taskId;
        const taskIndex = projectTasks.indexOf(task);
        
        if (taskID === taskElementID) {
            projectTasks.splice(taskIndex, 1);
            itemFound = true;
        }
    }

    if (!itemFound) throw new Error('Element not found in the array!');
}

function deleteTaskFromDOM() {
    const taskElements = document.querySelectorAll('.main__task-item');
    
    for (const taskElement of taskElements) {
        const taskID = taskElement.dataset.taskId;
        const taskProjectID = taskElement.dataset.projectId;

        const project = projects.find(project => project.projectId === taskProjectID);
        const projectTasks = project.taskList;
        const projectTasksCount = projectTasks.length;

        let elementExistsInArray = projectTasks.some(task => task.taskId === taskID);
        
        if (!elementExistsInArray) {
            taskElement.remove();
            updateTasksCount(projectTasksCount);
        }
    }
}

function editTaskInArray() {
    const taskElement = findTaskElement();
    const taskElementID = taskElement.getAttribute('data-task-id');
    const task = findTaskInArray(taskElement);

    const taskTitle = document.querySelector('.modal__form-title').value;
    const taskDescription = document.querySelector('.modal__form-description').value;
    const taskDue = document.querySelector('.modal__form-date').value;
    const taskPriority = document.querySelector('.modal__form-priority').value;

    const project = projects.find(project => project.projectId === task.projectId);
    const projectTasks = project.taskList;

    for (const task of projectTasks) {
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
    const task = findTaskInArray(taskElement);

    const project = projects.find(project => project.projectId === task.projectId);
    const projectTasks = project.taskList;

    for (const task of projectTasks) {
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
    storeProjectToLocalStorage();
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

function addTaskToDOM() {
    const project = selectedProject;
    const projectTasks = project.taskList;
    const projectTasksCount = projectTasks.length;

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

// Exporting function to be able to render tasks when user clicks on Project name button in projects.js under selectProject()
export function renderTasks() {
    deleteTasksFromDOM();

    const project = selectedProject;

    if (!project) return;

    const projectTasks = project.taskList;
    const projectTasksCount = project.taskList.length;

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

export function deleteTasksFromDOM() {
    const tasksContainerNode = document.querySelector('.main__tasks-list');

    while (tasksContainerNode.lastChild) {
        tasksContainerNode.lastChild.remove();
    }
}

function updateTasksCount(tasksCount) {
    const tasksCountText = document.querySelector('.main__tasks-num');
    tasksCountText.textContent = tasksCount;
}

// Exporting this function to pass it as callback for form "submit" event of showTasksModal() in modal.js
export function addNewTask() {
    addTaskToArray();
    addTaskToDOM();
    storeProjectToLocalStorage();
}