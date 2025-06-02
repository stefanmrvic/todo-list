import { createElement } from "../utils/dom.js";
import { showAddTaskModal, showEditTaskModal, showDeleteTaskModal, showTaskInfoModal, closeModal } from "./modal.js";
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faCircleCheck } from '../modules/icons.js';

class Todo {
    constructor(title, description, due, priority) {
        this.title = title;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.id = crypto.randomUUID();
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

export const projects = [];

export const tasks = [];

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
    const taskItemIconInitial = icon(faCircle);
    const taskItemIconCheck = icon(faCircleCheck);
    const isInitialIcon = taskItemIcon.classList.contains('fa-circle');
    const iconToUse = isInitialIcon ? taskItemIconCheck : taskItemIconInitial;

    const priorityClassList = ['low', 'medium', 'high'];
    const taskItemIconPriority = priorityClassList.find(task => taskItemIcon.classList.contains(task));

    taskItemIcon.remove();
    taskItemIconWrapper.appendChild(iconToUse.node[0]);
    taskItemIconWrapper.children[0].classList.add('main__task-icon');
    taskItemIcon = taskItemIconWrapper.querySelector('.main__task-icon');
    taskItemIcon.classList.add(taskItemIconPriority);
}

function createTaskElement(task) {
    const parent = document.querySelector('.main__tasks-list');
    const taskElement = createElement('div', 'main__task-item');
    const textContainer = createElement('div', 'main__text');

    const iconWrapper = createElement('div', 'main__task-icon-wrapper');
    const icon = createElement('i', 'main__task-icon fa-regular fa-circle');
    const title = createElement('p', 'main__task-title', task.title);

    iconWrapper.append(icon);
    textContainer.append(iconWrapper, title);

    const controlsContainer = createElement('div', 'main__controls');

    const date = createElement('p', 'main__task-date', task.due);

    const editBtn = createElement('button', 'main__edit-btn');
    const editBtnIcon = createElement('i', 'btn-icon projects__icon--2 fa-regular fa-pen-to-square');
    editBtn.append(editBtnIcon);

    const deleteBtn = createElement('button', 'main__delete-btn');
    const deleteBtnIcon = createElement('i', 'btn-icon projects__icon--3 fa-regular fa-trash-can');
    deleteBtn.append(deleteBtnIcon);

    const infoBtn = createElement('button', 'main__info-btn');
    const infoBtnIcon = createElement('i', 'fa-solid fa-circle-info');
    infoBtn.append(infoBtnIcon);

    controlsContainer.append(date, editBtn, deleteBtn, infoBtn);
    taskElement.append(textContainer, controlsContainer);
    taskElement.setAttribute('data-id', task.id);

    // It captures the key name of the priority property of the task object
    const priority = task.priority;

    if (priority !== 'placeholder') {
        // Depending of the priority of the task, it will put className of priority value (low, medium, or high) 
        icon.classList.add(priority);
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
    closeModal();
}

function deleteTaskFromArray(e) {
    const taskElement = e.currentTarget.closest('.modal__content').querySelector('.modal__text');
    const taskElementID = taskElement.getAttribute('data-id');
    let itemFound = false;
    
    for (const task of tasks) {
        const taskID = task.id;
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
        const taskElementID = taskElement.dataset.id;
        let elementExistsInArray = false;
        
        for (const task of tasks) {
            const taskID = task.id;
            
            if (taskElementID === taskID) {
                elementExistsInArray = true;
            }
        }
        if (!elementExistsInArray) taskElement.remove();
    }
}

function editTaskInArray() {
    const taskElement = findTaskElement();
    const taskElementID = taskElement.getAttribute('data-id');

    const taskTitle = document.querySelector('.modal__form-title').value;
    const taskDescription = document.querySelector('.modal__form-description').value;
    const taskDue = document.querySelector('.modal__form-date').value;
    const taskPriority = document.querySelector('.modal__form-priority').value;

    for (const task of tasks) {
        const taskID = task.id;

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
    const taskElementID = taskElement.getAttribute('data-id');

    for (const task of tasks) {
        const taskID = task.id;

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
    const formID = form.getAttribute('data-id');
    const taskElements = document.querySelectorAll('.main__task-item');

    for (const taskElement of taskElements) {
        const taskElementID = taskElement.dataset.id;

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

    const newTask = new Todo(taskTitle, taskDescription, taskDue, taskPriority);
    tasks.push(newTask);
}

function renderTasks() {
    const taskElements = document.querySelectorAll('.main__task-item');
    
    for (const task of tasks) {
        const taskID = task.id;
        let duplicateTask = false;
        
        for (const taskElement of taskElements) {
            const taskElementID = taskElement.getAttribute('data-id');

            if (taskID === taskElementID) {
                duplicateTask = true;
            }
        }
        if (!duplicateTask) createTaskElement(task);
    }
}

// Exporting this function to pass it as callback for form "submit" event in modal.js
export function addNewTask() {
    addTaskToArray();
    renderTasks();
}