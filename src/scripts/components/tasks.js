import { createElement } from "../utils/dom";
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons';

class Todo {
    constructor(title, description, due, priority) {
        this.title = title;
        this.description = description;
        this.due = due;
        this.priority = priority;
    }
}

const tasks = [];
const testObj = new Todo('Destroy everything', 'Accomplish all of your goals', 2025, 'Very high priority nigguh!');

const tasksList = document.querySelector('.main__tasks-list');

tasksList.addEventListener('click', markTaskDone);

function markTaskDone(e) {
    crossOutTask(e);
    changeTaskIcon(e);
}

function crossOutTask(e) {
    const taskItem = e.target.closest('.main__task-item');
    const taskItemPara = taskItem.querySelector(':scope > .main__text > .main__task-title');

    taskItemPara.style.textDecoration = 
        taskItemPara.style.textDecoration === 'line-through' ? 'none' : 'line-through';
}

function changeTaskIcon(e) {
    const taskItem = e.target.closest('.main__task-item');
    const taskItemIconWrapper = taskItem.querySelector(':scope > .main__text > .main__task-icon-wrapper');
    const taskItemIcon = taskItemIconWrapper.querySelector(':scope > .main__task-icon');
    const taskItemIconInitial = icon(faCircle);
    const taskItemIconCheck = icon(faCircleCheck);
    const isInitialIcon = taskItemIcon.classList.contains('fa-circle');
    const iconToUse = isInitialIcon ? taskItemIconCheck : taskItemIconInitial;

    taskItemIcon.remove();
    taskItemIconWrapper.appendChild(iconToUse.node[0]);
    taskItemIconWrapper.children[0].classList.add('main__task-icon');
}

function createTaskElement(obj) {
    const parent = document.querySelector('.main__tasks-list');
    const task = createElement('div', 'main__task-item');
    const textContainer = createElement('div', 'main__text');

    const iconWrapper = createElement('div', 'main__task-icon-wrapper');
    const icon = createElement('i', 'main__task-icon fa-regular fa-circle');
    const title = createElement('p', 'main__task-title', obj.title);

    iconWrapper.append(icon);
    textContainer.append(iconWrapper, title);

    const controlsContainer = createElement('div', 'main__controls');

    const date = createElement('p', 'main__task-date', obj.due);

    const editBtn = createElement('button', 'main__edit-btn');
    const editBtnIcon = createElement('i', 'btn-icon projects__icon--2 fa-regular fa-pen-to-square');

    const deleteBtn = createElement('button', 'main__delete-btn');
    const deleteBtnIcon = createElement('i', 'btn-icon projects__icon--3 fa-regular fa-trash-can');

    const infoBtn = createElement('button', 'main__info-btn');
    const infoBtnIcon = createElement('i', 'fa-solid fa-circle-info');

    controlsContainer.append(date, editBtn, editBtnIcon, deleteBtn, deleteBtnIcon, infoBtn, infoBtnIcon);
    task.append(textContainer, controlsContainer);
    parent.append(task);
}

function deleteTask(e) {
    
    e.currentTarget.closest('.main__task-item').remove();
}

function changeTaskInfo(obj) {

}