import { createElement } from "../utils/dom";
import { showAddProjectModal, showEditProjectModal, showDeleteProjectModal, closeModal } from "./modal.js";

class Project {
    constructor(projectName, projectIcon) {
        this.projectName = projectName;
        this.projectIcon = projectIcon;
        this.id = crypto.randomUUID();
        this.taskList = [];
        this.projectIconClass = determineIconClass();

        determineIconClass() 
        // It captures icon value eg. 'flowerIcon' and it then returns its classes
            const icon = this.icon;

            const icons = {
                flowerIcon: 'fa-brands fa-pagelines',
                bookIcon: 'fa-solid fa-book',
                toolsIcon: 'fa-solid fa-screwdriver-wrench',
                volleyballIcon: 'fa-solid fa-volleyball',
                moneyIcon: 'fa-solid fa-sack-dollar',
                pizzaIcon: 'fa-solid fa-pizza-slice',
                backpackIcon: 'fa-solid fa-suitcase-rolling',
                presentIcon: 'fa-solid fa-gift',
            }

            return icons[icon];
    }
}

const projectsList = document.querySelector('.projects__list');
const projectsAddBtn = document.querySelector('.projects__add-btn');

projectsList.addEventListener('click', selectProject);
projectsAddBtn.addEventListener('click', showAddProjectModal);

function selectProject(e) {
    const activeProjectItem = document.querySelector('.projects__item.active');
    const projectItem = e.target.closest('.projects__item');
    const projectTitle = projectItem.textContent;
    const projectIcon = projectItem.querySelector('svg');

    const iconPrefix = projectIcon.getAttribute('data-prefix');
    const iconName = projectIcon.getAttribute('data-icon');
    const projectIconClass = `${iconPrefix} fa-${iconName}`;
    console.log(projectIconClass);

    if (activeProjectItem) {
        activeProjectItem.classList.remove('active');
        projectItem.classList.add('active');
    } else {
        projectItem.classList.add('active');
    }

    changeSectionHeader(projectTitle, projectIconClass);
}

function changeSectionHeader(projectTitle, projectIconClass) {
    const sectionTitle = document.querySelector('.main__headline');
    const sectionIcon = document.querySelector('.main__title-icon');
    const headerContainer = document.querySelector('.main__title');
    // Creates new <i> element and sets className of projectIconClass variable
    const newIcon = createElement('svg', projectIconClass);
    newIcon.classList.add('main__title-icon');

    sectionTitle.textContent = projectTitle;
    if (sectionIcon) sectionIcon.remove();
    headerContainer.prepend(newIcon);
}

function addProjectToArray() {
    const projectTitle = document.querySelector('.modal__form-title').value;
    const projectIcon = document.querySelector('.modal__form-input:checked').value;

    const newProject = new Project(projectTitle, projectIcon);
    projects.push(newProject);
}

function renderProjects() {
    const taskElements = document.querySelectorAll('.main__task-item');
    
    for (const project of projects) {
        const projectID = project.id;
        let duplicateProject = false;
        
        for (const projectElement of projectElements) {
            const projectElementID = projectElement.getAttribute('data-id');

            if (projectID === projectElementID) {
                duplicateTask = true;
            }
        }
        if (!duplicateProject) createProjectElement(project);
    }
}

function createProjectElement(project) {
    const parent = document.querySelector('.main__tasks-list');
    const projectElement = createElement('div', 'main__project-item');
    const textContainer = createElement('div', 'main__text');

    // Set Project Icon
    const iconWrapper = createElement('div', 'main__project-icon-wrapper');
    const icon = createElement('i', 'main__project-icon fa-regular fa-circle');
    const title = createElement('p', 'main__project-title', project.title);

    iconWrapper.append(icon);
    textContainer.append(iconWrapper, title);

    const controlsContainer = createElement('div', 'main__controls');

    const editBtn = createElement('button', 'main__edit-btn');
    const editBtnIcon = createElement('i', 'btn-icon projects__icon--2 fa-regular fa-pen-to-square');
    editBtn.append(editBtnIcon);

    const deleteBtn = createElement('button', 'main__delete-btn');
    const deleteBtnIcon = createElement('i', 'btn-icon projects__icon--3 fa-regular fa-trash-can');
    deleteBtn.append(deleteBtnIcon);

    controlsContainer.append(date, editBtn, deleteBtn, infoBtn);
    projectElement.append(textContainer, controlsContainer);
    projectElement.setAttribute('data-id', project.id);

    parent.append(projectElement);

    const infoProjectBtn = projectElement.querySelector('.main__info-btn');
    const editProjectBtn = projectElement.querySelector('.main__edit-btn');
    const deleteProjectBtn = projectElement.querySelector('.main__delete-btn');

    editProjectBtn.addEventListener('click', showEditProjectModal);
    deleteProjectBtn.addEventListener('click', showDeleteProjectModal);
}

// Exporting this function to pass it as callback for form "submit" event of showProjectsModal() in modal.js
export function addNewProject() {
    addProjectToArray();
    renderProjects();
}