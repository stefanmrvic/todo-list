import { createElement } from "../utils/dom";
import { showAddProjectModal, showEditProjectModal, showDeleteProjectModal, showProjectInfoModal, closeModal } from "./modal.js";

class Project {
    constructor(projectName) {
        this.projectName = projectName
        this.id = crypto.randomUUID();
        this.taskList = [];
    }

}

const projectsList = document.querySelector('.projects__list');
const projectsAddBtn = document.querySelector('.projects__add-btn');

projectsList.addEventListener('click', selectProject);
projectsAddBtn.addEventListener('click', showAddProjectModal);

export function showAddProjectModal(e) {
    e.stopPropagation();

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
    titleInput.setAttribute('type', 'text');
    titleInput.required = true;
    titleLabel.append(titleAstrix, titleInput);
    // Title field End //

    const iconDiv = createElement('div', 'modal__icons-container');
    const iconBtnFlower = createElement('button', 'modal__icons-icon');
    const iconBtnBook = createElement('button', 'modal__icons-icon');
    const iconBtnTools = createElement('button', 'modal__icons-icon');
    const iconBtnVolleyball = createElement('button', 'modal__icons-icon');
    const iconBtnMoney = createElement('button', 'modal__icons-icon');
    const iconBtnPizza = createElement('button', 'modal__icons-icon');
    const iconBtnBackpack = createElement('button', 'modal__icons-icon');
    const iconBtnPresent = createElement('button', 'modal__icons-icon');



    const controlsContainer = createElement('div', 'modal__form-controls');
    const cancelBtn = createElement('button', 'modal__cancel-btn', 'Close');
    const addBtn = createElement('button', 'modal__add-btn', 'Add');

    controlsContainer.append(cancelBtn, addBtn);
    form.append(titleLabel, controlsContainer);
    modalContent.append(form);
}