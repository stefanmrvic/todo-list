import '../utils/dom.js';
import { createElement } from '../utils/dom.js';
import { addNewTask, deleteTask, tasks } from './tasks.js';

// Exporting it to tasks.js under deleteTask()
export function closeModal() {
    const modal = document.querySelector('.modal');
    const modalHeader = document.querySelector('.modal__header');
    const modalHeaderClasses = ['edit', 'delete', 'info'];
    const activeClass = modalHeaderClasses.find(className => modalHeader.classList.contains(className));
    
    if (activeClass) modalHeader.classList.remove(activeClass);

    modal.close();  
}

export function showAddTaskModal() {
    const modal = document.querySelector('.modal');
    const modalHeader = document.querySelector('.modal__header');
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

function showEditTaskModal() {
    const modal = document.querySelector('.modal');
    const modalHeader = document.querySelector('.modal__header');
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = 'Edit Task';

    modal.showModal();
}

function createEditTaskModal() {
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

// Exporting this function to pass it as callback for event listener in tasks.js inside of createTaskElement()
export function showDeleteTaskModal(e) {
    const modal = document.querySelector('.modal');
    const modalHeader = document.querySelector('.modal__header');
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = 'Delete Task';
    modalHeader.classList.add('delete');

    deleteModalContent();
    createDeleteTaskModal(e);
    modal.showModal();

    const closeBtn = document.querySelector('.modal__close-btn');
    const cancelBtn = document.querySelector('.modal__cancel-btn');

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
}

function createDeleteTaskModal(e) {
    const modalContent = document.querySelector('.modal__content');
    const task = e.target.closest('.main__task-item');
    const taskTitle = task.querySelector('.main__task-title'); 
    
    const deleteMessage = createElement('p', 'modal__text', 'Are you sure?');
    const br1 = createElement('br', 'modal__text-br');
    const br2 = createElement('br', 'modal__text-br');

    deleteMessage.setAttribute('data-id', task.dataset.id);

    deleteMessage.append(br1, br2);
    deleteMessage.append(document.createTextNode('Task '))

    const boldText = createElement('span', 'modal__text-span');
    boldText.textContent = taskTitle.textContent;

    deleteMessage.append(boldText);
    deleteMessage.append(document.createTextNode(' will be deleted forever!'));

    const controlsContainer = createElement('div', 'modal__form-controls');
    const cancelBtn = createElement('button', 'modal__cancel-btn btn', 'Close');
    const deleteBtn = createElement('button', 'modal__delete-btn btn', 'Delete');

    controlsContainer.append(cancelBtn, deleteBtn);
    modalContent.append(deleteMessage , controlsContainer);

    deleteBtn.addEventListener('click', deleteTask);
}

function deleteModalContent() {
    const contentNode = document.querySelector('.modal__content');

    while (contentNode.lastChild) {
        contentNode.lastChild.remove();
    }
}

// Exporting this function to pass it as callback for event listener in tasks.js inside of createTaskElement()
export function showTaskInfoModal(e) {
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = 'Task Info';

    deleteModalContent();
    createTaskInfoModal(e);
    modal.showModal();

    const closeBtn = document.querySelector('.modal__close-btn');
    const cancelBtn = document.querySelector('.modal__cancel-btn');

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
}

function createTaskInfoModal(e) {
    const modalContent = document.querySelector('.modal__content');
    
    const task = e.target.closest('.main__task-item');
    const taskElementID = task.getAttribute('data-id');
    
    for (const task of tasks) {
        const taskID = task.id;

        if (taskID === taskElementID) {
            const infoDiv = createElement('div', 'modal__info');

            const titleDiv = createElement('div', 'modal__info-container'); 
            const titleH3 = createElement('h3', 'modal__info-title', 'Title:');
            const titlePara = createElement('p', 'modal__info-titleText', task.title);
            titleDiv.append(titleH3, titlePara);

            const descriptionDiv = createElement('div', 'modal__info-container');
            const descriptionH3 = createElement('h3', 'modal__info-description', 'Description:');
            const descriptionPara = createElement('p', 'modal__info-descriptionText', task.description);
            descriptionDiv.append(descriptionH3, descriptionPara);

            const dueDiv = createElement('div', 'modal__info-container');
            const dueH3 = createElement('h3', 'modal__info-due', 'Due date:');
            const duePara = createElement('p', 'modal__info-dueText', task.due);
            dueDiv.append(dueH3, duePara);

            const priorityDiv = createElement('div', 'modal__info-container');
            const priorityH3 = createElement('h3', 'modal__info-priority', 'Priority:');
            const priorityPara = createElement('p', 'modal__info-priorityText', task.priority);
            priorityDiv.append(priorityH3, priorityPara);

            const projectDiv = createElement('div', 'modal__info-container');
            const projectH3 = createElement('h3', 'modal__info-due', 'Project:');
            const projectPara = createElement('p', 'modal__info-projectText', 'Example Project Nigguh');//task.project);
            projectDiv.append(projectH3, projectPara);

            infoDiv.append(titleDiv, descriptionDiv, dueDiv, priorityDiv, projectDiv)
            modalContent.append(infoDiv);
        }
    } 
    const controlsContainer = createElement('div', 'modal__form-controls');
    const cancelBtn = createElement('button', 'modal__cancel-btn btn', 'Close');

    controlsContainer.append(cancelBtn);
    modalContent.append(controlsContainer);
}

function populateTaskInfoFields(e) {



}