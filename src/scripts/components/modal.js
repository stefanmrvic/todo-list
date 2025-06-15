import { createElement } from '../utils/dom.js';
import { selectedProject, addNewProject, editProject, deleteProject, projects } from './projects.js';
import { addNewTask, editTask, deleteTask, findTaskInArray } from './tasks.js';
import { getSelectedFilter, reRenderFilteredTasks } from "./due.js";

// Exporting it to tasks.js & projects.js under deleteTask()
export function closeModal(e) {
    const modal = document.querySelector('.modal');
    const modalHeader = document.querySelector('.modal__header');
    const modalHeaderClasses = ['edit', 'delete', 'info'];
    const activeClass = modalHeaderClasses.find(className => modalHeader.classList.contains(className));
    
    if (activeClass) modalHeader.classList.remove(activeClass);

    modal.close();
    e.preventDefault();
}

export function showAddProjectModal() {
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = 'Add Project';

    deleteModalContent();
    createAddProjectModal();
    modal.showModal();

    const closeBtn = document.querySelector('.modal__close-btn');
    const cancelBtn = document.querySelector('.modal__cancel-btn');
    const form = document.querySelector('.modal__form');

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    form.addEventListener('submit', addNewProject);
}

function createAddProjectModal() {
    const modalContent = document.querySelector('.modal__content');

    const form = createElement('form', 'modal__form');
    form.setAttribute('method', 'dialog');

    // Title field Start //
    const titleLabel = createElement('label', null, 'Title');
    const titleAstrix = createElement('span', 'modal__form-astrix', '*');
    const titleInput = createElement('input', 'modal__form-title');
    titleInput.type = 'text';
    titleInput.required = true;
    titleLabel.append(titleAstrix, titleInput);
    // Title field End //

    // Icons field Start //
    const iconsFieldset = createElement('fieldset', 'modal__icons-fieldset');
    const iconsLegend = createElement('legend', 'modal__icons-legend', 'Icon')
    iconsFieldset.append(iconsLegend);

    const iconsContainer = createElement('div', 'modal__icons-container');

    const flowerLabel = createElement('label', 'modal__icons-label');
    const flowerInput = createElement('input', 'modal__icons-input');
    flowerInput.type = 'radio';
    flowerInput.name = 'icon';
    flowerInput.value = 'faPagelines';
    flowerInput.checked = true;
    const flowerIcon = createElement('svg', 'modal__icons-icon fab fa-pagelines');
    flowerLabel.append(flowerInput, flowerIcon);

    const bookLabel = createElement('label', 'modal__icons-label');
    const bookInput = createElement('input', 'modal__icons-input');
    bookInput.type = 'radio';
    bookInput.name = 'icon';
    bookInput.value = 'faBook';
    const bookIcon = createElement('svg', 'modal__icons-icon fas fa-book');
    bookLabel.append(bookInput, bookIcon);

    const toolsLabel = createElement('label', 'modal__icons-label');
    const toolsInput = createElement('input', 'modal__icons-input');
    toolsInput.type = 'radio';
    toolsInput.name = 'icon';
    toolsInput.value = 'faScrewdriverWrench';
    const toolsIcon = createElement('svg', 'modal__icons-icon fas fa-screwdriver-wrench');
    toolsLabel.append(toolsInput, toolsIcon);

    const volleyballLabel = createElement('label', 'modal__icons-label');
    const volleyballInput = createElement('input', 'modal__icons-input');
    volleyballInput.type = 'radio';
    volleyballInput.name = 'icon';
    volleyballInput.value = 'faVolleyball';
    const volleyballIcon = createElement('svg', 'modal__icons-icon fas fa-volleyball');
    volleyballLabel.append(volleyballInput, volleyballIcon);

    const moneyLabel = createElement('label', 'modal__icons-label');
    const moneyInput = createElement('input', 'modal__icons-input');
    moneyInput.type = 'radio';
    moneyInput.name = 'icon';
    moneyInput.value = 'faSackDollar';
    const moneyIcon = createElement('svg', 'modal__icons-icon fas fa-sack-dollar');
    moneyLabel.append(moneyInput, moneyIcon);

    
    const pizzaLabel = createElement('label', 'modal__icons-label');
    const pizzaInput = createElement('input', 'modal__icons-input');
    pizzaInput.type = 'radio';
    pizzaInput.name = 'icon';
    pizzaInput.value = 'faPizzaSlice';
    const pizzaIcon = createElement('svg', 'modal__icons-icon fas fa-pizza-slice');
    pizzaLabel.append(pizzaInput, pizzaIcon);

    const backpackLabel = createElement('label', 'modal__icons-label');
    const backpackInput = createElement('input', 'modal__icons-input');
    backpackInput.type = 'radio';
    backpackInput.name = 'icon';
    backpackInput.value = 'faSuitcaseRolling';
    const backpackIcon = createElement('svg', 'modal__icons-icon fas fa-suitcase-rolling');
    backpackLabel.append(backpackInput, backpackIcon);

    const presentLabel = createElement('label', 'modal__icons-label');
    const presentInput = createElement('input', 'modal__icons-input');
    presentInput.type = 'radio';
    presentInput.name = 'icon';
    presentInput.value = 'faGift';
    const presentIcon = createElement('svg', 'modal__icons-icon fas fa-gift');
    presentLabel.append(presentInput, presentIcon);

    iconsContainer.append(flowerLabel, bookLabel, toolsLabel, volleyballLabel, moneyLabel, pizzaLabel, backpackLabel, presentLabel)
    iconsFieldset.append(iconsContainer);
    // Icons field End //

    const controlsContainer = createElement('div', 'modal__form-controls');
    const cancelBtn = createElement('button', 'modal__cancel-btn', 'Close');
    const addBtn = createElement('button', 'modal__add-btn', 'Add');

    controlsContainer.append(cancelBtn, addBtn);
    form.append(titleLabel, iconsFieldset, controlsContainer);
    modalContent.append(form);
}

export function showAddTaskModal(e) {
    e.stopPropagation();

    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = 'Add Task';

    deleteModalContent();
    createAddTaskModal();
    modal.showModal();

    const closeBtn = document.querySelector('.modal__close-btn');
    const cancelBtn = document.querySelector('.modal__cancel-btn');
    const form = document.querySelector('.modal__form');

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    form.addEventListener('submit', addNewTask);
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

// Exporting this function to pass it as callback for event listener in tasks.js inside of createTaskElement()
export function showEditProjectModal(e) {
    e.stopPropagation();

    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = 'Edit Project';
    
    deleteModalContent();
    createEditProjectModal(e);
    modal.showModal();
    
    const closeBtn = document.querySelector('.modal__close-btn');
    const cancelBtn = document.querySelector('.modal__cancel-btn');
    const form = document.querySelector('.modal__form');
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    form.addEventListener('submit', editProject);
}

function createEditProjectModal(e) {
    const modalContent = document.querySelector('.modal__content');
    const projectElement = e.target.closest('.projects__item');

    const form = createElement('form', 'modal__form');
    form.setAttribute('method', 'dialog');

    // Sets data-project-id from Project element to not lose trace when modal is being opened
    form.setAttribute('data-project-id', projectElement.dataset.projectId);

    // Title field Start //
    const titleLabel = createElement('label', null, 'Title');
    const titleAstrix = createElement('span', 'modal__form-astrix', '*');
    const titleInput = createElement('input', 'modal__form-title');
    titleInput.type = 'text';
    titleInput.required = true;
    titleLabel.append(titleAstrix, titleInput);
    // Title field End //

    // Icons field Start //
    const iconsFieldset = createElement('fieldset', 'modal__icons-fieldset');
    const iconsLegend = createElement('legend', 'modal__icons-legend', 'Icon')
    iconsFieldset.append(iconsLegend);

    const iconsContainer = createElement('div', 'modal__icons-container');

    const flowerLabel = createElement('label', 'modal__icons-label');
    const flowerInput = createElement('input', 'modal__icons-input');
    flowerInput.type = 'radio';
    flowerInput.name = 'icon';
    flowerInput.value = 'faPagelines';
    flowerInput.checked = true;
    const flowerIcon = createElement('svg', 'modal__icons-icon fab fa-pagelines');
    flowerLabel.append(flowerInput, flowerIcon);

    const bookLabel = createElement('label', 'modal__icons-label');
    const bookInput = createElement('input', 'modal__icons-input');
    bookInput.type = 'radio';
    bookInput.name = 'icon';
    bookInput.value = 'faBook';
    const bookIcon = createElement('svg', 'modal__icons-icon fas fa-book');
    bookLabel.append(bookInput, bookIcon);

    const toolsLabel = createElement('label', 'modal__icons-label');
    const toolsInput = createElement('input', 'modal__icons-input');
    toolsInput.type = 'radio';
    toolsInput.name = 'icon';
    toolsInput.value = 'faScrewdriverWrench';
    const toolsIcon = createElement('svg', 'modal__icons-icon fas fa-screwdriver-wrench');
    toolsLabel.append(toolsInput, toolsIcon);

    const volleyballLabel = createElement('label', 'modal__icons-label');
    const volleyballInput = createElement('input', 'modal__icons-input');
    volleyballInput.type = 'radio';
    volleyballInput.name = 'icon';
    volleyballInput.value = 'faVolleyball';
    const volleyballIcon = createElement('svg', 'modal__icons-icon fas fa-volleyball');
    volleyballLabel.append(volleyballInput, volleyballIcon);

    const moneyLabel = createElement('label', 'modal__icons-label');
    const moneyInput = createElement('input', 'modal__icons-input');
    moneyInput.type = 'radio';
    moneyInput.name = 'icon';
    moneyInput.value = 'faSackDollar';
    const moneyIcon = createElement('svg', 'modal__icons-icon fas fa-sack-dollar');
    moneyLabel.append(moneyInput, moneyIcon);

    
    const pizzaLabel = createElement('label', 'modal__icons-label');
    const pizzaInput = createElement('input', 'modal__icons-input');
    pizzaInput.type = 'radio';
    pizzaInput.name = 'icon';
    pizzaInput.value = 'faPizzaSlice';
    const pizzaIcon = createElement('svg', 'modal__icons-icon fas fa-pizza-slice');
    pizzaLabel.append(pizzaInput, pizzaIcon);

    const backpackLabel = createElement('label', 'modal__icons-label');
    const backpackInput = createElement('input', 'modal__icons-input');
    backpackInput.type = 'radio';
    backpackInput.name = 'icon';
    backpackInput.value = 'faSuitcaseRolling';
    const backpackIcon = createElement('svg', 'modal__icons-icon fas fa-suitcase-rolling');
    backpackLabel.append(backpackInput, backpackIcon);

    const presentLabel = createElement('label', 'modal__icons-label');
    const presentInput = createElement('input', 'modal__icons-input');
    presentInput.type = 'radio';
    presentInput.name = 'icon';
    presentInput.value = 'faGift';
    const presentIcon = createElement('svg', 'modal__icons-icon fas fa-gift');
    presentLabel.append(presentInput, presentIcon);

    iconsContainer.append(flowerLabel, bookLabel, toolsLabel, volleyballLabel, moneyLabel, pizzaLabel, backpackLabel, presentLabel)
    iconsFieldset.append(iconsContainer);
    // Icons field End //

    const controlsContainer = createElement('div', 'modal__form-controls');
    const cancelBtn = createElement('button', 'modal__cancel-btn', 'Close');
    const editBtn = createElement('button', 'modal__edit-btn', 'Edit');

    controlsContainer.append(cancelBtn, editBtn);
    form.append(titleLabel, iconsFieldset, controlsContainer);
    modalContent.append(form);

    setEditProjectModalState(projectElement, form);
}

function setEditProjectModalState(projectElement, form) {
    const projectElementID = projectElement.dataset.projectId;

    for (const project of projects) {
        const projectID = project.projectId;

        if (projectElementID === projectID) {
            const titleInput = form.querySelector('.modal__form-title');
            const projectIcon = project.icon;
            const iconInput = form.querySelector(`.modal__icons-input[value="${projectIcon}"]`);

            titleInput.value = project.title;
            iconInput.checked = true;
        }
    }
}

// Exporting this function to pass it as callback for event listener in tasks.js inside of createTaskElement()
export function showEditTaskModal(e) {
    e.stopPropagation();

    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = 'Edit Task';
    
    deleteModalContent();
    createEditTaskModal(e);
    modal.showModal();
    
    const closeBtn = document.querySelector('.modal__close-btn');
    const cancelBtn = document.querySelector('.modal__cancel-btn');
    const form = document.querySelector('.modal__form');
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    form.addEventListener('submit', editTask);
 
    // It puts event listener when user edits the task to detect if the user changed some property 
    // which would make the task to fall out of the selected filter category
    form.addEventListener('submit', reRenderFilteredTasks);
}

function createEditTaskModal(e) {
    const modalContent = document.querySelector('.modal__content');
    const taskElement = e.target.closest('.main__task-item');

    const form = createElement('form', 'modal__form');
    form.setAttribute('method', 'dialog');
    form.setAttribute('data-task-id', taskElement.dataset.taskId);

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

    const priorityOptionPlaceholder = createElement('option', 'modal__priority-placeholder', 'How important is this task?');
    priorityOptionPlaceholder.value = 'placeholder';
    priorityOptionPlaceholder.disabled = true;
    priorityOptionPlaceholder.selected = true;
    const priorityOptionLow = createElement('option', null, '😴 Not important at all..');
    priorityOptionLow.value = 'low';
    priorityOptionLow.id = 'low';
    const priorityOptionMedium = createElement('option', null, '😅 A bit important');
    priorityOptionMedium.value = 'medium';
    priorityOptionMedium.id = 'medium';
    const priorityOptionHigh = createElement('option', null, '😲 Super important!');
    priorityOptionHigh.value = 'high';
    priorityOptionHigh.id = 'high';

    prioritySelect.append(priorityOptionPlaceholder, priorityOptionLow, priorityOptionMedium, priorityOptionHigh);
    priorityLabel.append(prioritySelect);

    const controlsContainer = createElement('div', 'modal__form-controls');
    const cancelBtn = createElement('button', 'modal__cancel-btn', 'Close');
    const editBtn = createElement('button', 'modal__edit-btn', 'Edit');

    controlsContainer.append(cancelBtn, editBtn);
    form.append(titleLabel, descriptionLabel, dueLabel, priorityLabel, controlsContainer);
    modalContent.append(form);

    setEditTaskModalState(taskElement, form);
}

function setEditTaskModalState(taskEle, form) {
    const taskElement = taskEle;
    const taskElementID = taskElement.dataset.taskId;
    const task = findTaskInArray(taskElement);
    const titleInput = form.querySelector('.modal__form-title');
    const descriptionTextarea = form.querySelector('.modal__form-description');
    const dueInput = form.querySelector('.modal__form-date');
    
    const project = projects.find(project => project.projectId === task.projectId);
    const projectTasks = project.taskList;

    for (const task of projectTasks) {
        const taskID = task.taskId;

        if (taskElementID === taskID) {
            titleInput.value = task.title;
            descriptionTextarea.value = task.description;
            dueInput.value = task.due;

            const taskPriority = task.priority;
            const priorityOption = document.getElementById(taskPriority);

            // If priority has been set to the task, it will select that priority when displaying edit modal
            if (priorityOption) priorityOption.selected = true;
        }
    }
}

// Exporting this function to pass it as callback for event listener in tasks.js inside of createTaskElement()
export function showDeleteProjectModal(e) {
    e.stopPropagation();

    const modal = document.querySelector('.modal');
    const modalHeader = document.querySelector('.modal__header');
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = 'Delete Project';
    modalHeader.classList.add('delete');

    deleteModalContent();
    createDeleteProjectModal(e);
    modal.showModal();

    const closeBtn = document.querySelector('.modal__close-btn');
    const cancelBtn = document.querySelector('.modal__cancel-btn');

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
}

function createDeleteProjectModal(e) {
    const modalContent = document.querySelector('.modal__content');
    const project = e.target.closest('.projects__item');
    const projectTitle = project.querySelector('.projects__info-title'); 
    
    const deleteMessage = createElement('p', 'modal__text', 'Are you sure?');
    const br1 = createElement('br', 'modal__text-br');
    const br2 = createElement('br', 'modal__text-br');

    deleteMessage.setAttribute('data-project-id', project.dataset.projectId);

    deleteMessage.append(br1, br2);
    deleteMessage.append(document.createTextNode('Project '))

    const boldText = createElement('span', 'modal__text-span');
    boldText.textContent = projectTitle.textContent;

    deleteMessage.append(boldText);
    deleteMessage.append(document.createTextNode(' will be deleted forever!'));

    const controlsContainer = createElement('div', 'modal__form-controls');
    const cancelBtn = createElement('button', 'modal__cancel-btn btn', 'Close');
    const deleteBtn = createElement('button', 'modal__delete-btn btn', 'Delete');

    controlsContainer.append(cancelBtn, deleteBtn);
    modalContent.append(deleteMessage , controlsContainer);

    deleteBtn.addEventListener('click', deleteProject);
}

// Exporting this function to pass it as callback for event listener in tasks.js inside of createTaskElement()
export function showDeleteTaskModal(e) {
    e.stopPropagation();

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

    // It sets task ID attribute so it can be referenced back to array item when deleting the task from DOM
    deleteMessage.setAttribute('data-task-id', task.dataset.taskId);

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
    e.stopPropagation();

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
    
    const taskElement = e.target.closest('.main__task-item');
    const taskElementID = taskElement.getAttribute('data-task-id');

    const project = selectedProject;
    const projectTasks = project.taskList;
    
    for (const task of projectTasks) {
        const taskID = task.taskId;

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

            let priorityPara;

            // It captures the value of priority key of the task object
            const priorityValue = task.priority;
            const priorityString = task.parsePriorityToString();
            
            if (priorityValue !== 'placeholder') {
                // and then it injects that priority value as the textContent of the p element
                priorityPara = createElement('p', 'modal__info-priorityText', priorityString);
            } else {
                priorityPara = createElement('p', 'modal__info-priorityText');
            }

            priorityDiv.append(priorityH3, priorityPara);

            const projectDiv = createElement('div', 'modal__info-container');
            const projectH3 = createElement('h3', 'modal__info-due', 'Project:');

            const projectTitle = selectedProject.title;
            const projectPara = createElement('p', 'modal__info-projectText', projectTitle);

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