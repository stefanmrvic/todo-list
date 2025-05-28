import '../utils/dom.js';
import { createElement } from '../utils/dom.js';
import { addNewTask } from './tasks.js';

function closeModal() {
    const modal = document.querySelector('.modal');
    modal.close();  
}

export function showAddTaskModal() {
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = 'Add Task';

    deleteModalContent();
    createAddTaskModal();
    modal.showModal();

    const closeBtn = document.querySelector('.modal__close-btn');
    const cancelBtn = document.querySelector('.modal__cancel-btn');
    const addTaskForm = document.querySelector('.modal__form');

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    addTaskForm.addEventListener('submit', addNewTask);
}

function createAddTaskModal() {
    const modalContent = document.querySelector('.modal__content');

    const form = createElement('form', 'modal__form');
    form.setAttribute('method', 'dialog');

    const titleLabel = createElement('label', null, 'Title');
    const titleAstrix = createElement('span', 'modal__form-astrix', '*');
    const titleInput = createElement('input', 'modal__form-title');
    titleInput.setAttribute('type', 'text');
    titleInput.required = true;
    titleLabel.append(titleAstrix, titleInput);

    const descriptionLabel = createElement('label', null, 'Description');
    const descriptionTextarea = createElement('textarea', 'modal__form-description');
    descriptionLabel.append(descriptionTextarea);
    
    const dueLabel = createElement('label', null, 'Due Data');
    const dueInput = createElement('input', 'modal__form-date');
    dueInput.setAttribute('type', 'date');
    dueLabel.append(dueInput);

    const priorityLabel = createElement('label', null, 'Priority');
    const prioritySelect = createElement('select', 'modal__form-priority');

    const priorityOptionPlaceholder = createElement('option', null, 'How important is this task?');
    priorityOptionPlaceholder.value = 'placeholder';
    priorityOptionPlaceholder.disabled = true;
    priorityOptionPlaceholder.selected = true;
    const priorityOptionLow = createElement('option', null, '😴 Not important at all..');
    priorityOptionLow.value = 'low';
    const priorityOptionMedium = createElement('option', null, '😅 A bit important');
    priorityOptionMedium.value = 'medium';
    const priorityOptionHigh = createElement('option', null, '😲 Super important!');
    priorityOptionHigh.value = 'high';

    prioritySelect.append(priorityOptionPlaceholder, priorityOptionLow, priorityOptionMedium, priorityOptionHigh);
    priorityLabel.append(prioritySelect);

    const controlsContainer = createElement('div', 'modal__form-controls');
    const cancelBtn = createElement('button', 'modal__cancel-btn', 'Close');
    const addBtn = createElement('button', 'modal__add-btn', 'Add');

    controlsContainer.append(cancelBtn, addBtn);
    form.append(titleLabel, descriptionLabel, dueLabel, priorityLabel, controlsContainer);
    modalContent.append(form);
}

function showEditModal() {
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = 'Edit Task';

    modal.showModal();
}

function createEditModal() {
    const modalContent = document.querySelector('.modal__content');

    const form = createElement('form', 'modal__form');
    form.setAttribute('method', 'dialog');

    const titleLabel = createElement('label', null, 'Title');
    const titleAstrix = createElement('span', 'modal__form-astrix', '*');
    const titleInput = createElement('input', 'modal__form-title');
    titleInput.setAttribute('type', 'text');
    titleLabel.append(titleAstrix, titleInput);

    const descriptionLabel = createElement('label', null, 'Description');
    const descriptionTextarea = createElement('textarea', 'modal__form-description');
    descriptionLabel.append(descriptionTextarea);
    
    const dueLabel = createElement('label', null, 'Due Data');
    const dueInput = createElement('input', 'modal__form-date');
    dueInput.setAttribute('type', 'date');
    dueLabel.append(dueInput);

    const priorityLabel = createElement('label', null, 'Priority');
    const prioritySelect = createElement('select', 'modal__form-priority');

    const priorityOptionPlaceholder = createElement('option', null, 'How important is this task?');
    priorityOptionPlaceholder.disabled = true;
    const priorityOptionLow = createElement('option', null, '😴 Not important at all..');
    const priorityOptionMedium = createElement('option', null, '😅 A bit important');
    const priorityOptionHigh = createElement('option', null, '😲 Super important!');

    prioritySelect.append(priorityOptionPlaceholder, priorityOptionLow, priorityOptionMedium, priorityOptionHigh);
    priorityLabel.append(prioritySelect);

    const controlsContainer = createElement('div', 'modal__form-controls');
    const cancelBtn = createElement('button', 'modal__cancel-btn', 'Close');
    const addBtn = createElement('button', 'modal__add-btn', 'Add');

    controlsContainer.append(cancelBtn, addBtn);
    form.append(titleLabel, descriptionLabel, dueLabel, priorityLabel, controlsContainer);
    modalContent.append(form);
}

function showDeleteModal() {
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = 'Delete Task';

    modal.showModal();
}

function showInfoModal() {
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = 'Task Info';

    modal.showModal();
}

function deleteModalContent() {
    const form = document.querySelector('.modal__form');

    if (form) form.remove();
}