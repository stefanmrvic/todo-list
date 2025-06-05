import { createElement } from "../utils/dom";
import { showAddProjectModal, showEditProjectModal, showDeleteProjectModal, closeModal } from "./modal.js";

class Project {
    constructor(title, icon) {
        this.title = title;
        this.icon = icon;
        this.taskList = [];
        this.id = crypto.randomUUID();
        this.iconClass = this.determineIconClass();
    }

    determineIconClass() {
        // It captures icon value eg. 'flowerIcon' and then it returns its class
        const iconValue = this.icon;
        const icons = {
            flowerIcon: 'fab fa-pagelines',
            bookIcon: 'fas fa-book',
            toolsIcon: 'fas fa-screwdriver-wrench',
            volleyballIcon: 'fas fa-volleyball',
            moneyIcon: 'fas fa-sack-dollar',
            pizzaIcon: 'fas fa-pizza-slice',
            backpackIcon: 'fas fa-suitcase-rolling',
            presentIcon: 'fas fa-gift',
        }
        return icons[iconValue];
    }
}

const projects = [];

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
    // Creates new <svg> element and sets className of projectIconClass variable
    const newIcon = createElement('svg', projectIconClass);
    newIcon.classList.add('main__title-icon');

    sectionTitle.textContent = projectTitle;
    if (sectionIcon) sectionIcon.remove();
    headerContainer.prepend(newIcon);
}

function createProjectElement(project) {
    const parent = document.querySelector('.projects__list');
    const projectElement = createElement('button', 'projects__item');

    const projectInfo = createElement('div', 'projects__info');
    const projectIconClass = project.determineIconClass();
    const projectIcon = createElement('svg', `btn-icon projects__info-icon--1 ${projectIconClass}`);
    const projectTitle = createElement('span', 'projects__info-title', project.title);
    console.log(project.title);
    projectInfo.append(projectIcon, projectTitle);

    const projectControls = createElement('div', 'projects__controls');
    const editProjectBtn = createElement('button', 'projects__controls-edit-btn');
    const editProjectIcon = createElement('button', 'btn-icon projects__controls-edit-icon--2');
    editProjectBtn.append(editProjectIcon);

    const deleteProjectBtn = createElement('button', 'projects__controls-delete-btn');
    const deleteProjectIcon = createElement('button', 'btn-icon projects__controls-icon--3');
    deleteProjectBtn.append(deleteProjectIcon);
    
    projectControls.append(editProjectBtn, deleteProjectBtn);
    projectElement.append(projectInfo, projectControls);
    parent.append(projectElement);

    // editProjectBtn.addEventListener('click', showEditProjectModal);
    // deleteProjectBtn.addEventListener('click', showDeleteProjectModal);
}

function addProjectToArray() {
    const projectTitle = document.querySelector('.modal__form-title').value; 
    const projectIcon = document.querySelector('.modal__icons-input:checked').value;

    const newProject = new Project(projectTitle, projectIcon);
    projects.push(newProject);
}

function renderProjects() {
    const projectElements = document.querySelectorAll('.projects__item');
    
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

// Exporting this function to pass it as callback for form "submit" event of showProjectsModal() in modal.js
export function addNewProject() {
    addProjectToArray();
    renderProjects();
}