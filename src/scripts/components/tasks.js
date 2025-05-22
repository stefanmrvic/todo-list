import { createElement } from "../utils/dom";

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

function createTaskElement(obj) {
    const parent = document.querySelector('.main__tasks-list');
    const task = createElement('div', 'main__task-item');
    const textContainer = createElement('div', 'main__text');

    const icon = createElement('i', 'main__task-icon fa-regular fa-circle');
    const title = createElement('p', 'main__task-title', obj.title);

    textContainer.append(icon, title);

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