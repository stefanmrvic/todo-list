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
    const projectsContainer = document.querySelector('.projects__list');
    // If user clicks between the projects buttons, it ends function invocation
    if (e.target === projectsContainer) return;
    
    const activeProjectItem = document.querySelector('.projects__item.active');
    const projectItem = e.target.closest('.projects__item');
    const projectTitle = projectItem.textContent;
    const projectIcon = projectItem.querySelector('svg');

    const iconPrefix = projectIcon.getAttribute('data-prefix');
    const iconName = projectIcon.getAttribute('data-icon');
    const projectIconClass = `${iconPrefix} fa-${iconName}`;

    if (activeProjectItem) {
        activeProjectItem.classList.remove('active');
        projectItem.classList.add('active');
    } else {
        projectItem.classList.add('active');
    }

    changeTasksSectionHeader(projectTitle, projectIconClass);
}

function changeTasksSectionHeader(projectTitle, projectIconClass) {
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
    const projectElement = createElement('button', 'btn projects__item');

    const projectInfo = createElement('div', 'projects__info');
    const projectIconClass = project.iconClass;
    const projectIcon = createElement('svg', `${projectIconClass} btn-icon project-btn-icon`);
    const projectTitle = createElement('span', 'projects__info-title', project.title);
    projectInfo.append(projectIcon, projectTitle);

    const projectControls = createElement('div', 'projects__controls');
    const editProjectBtn = createElement('button', 'action-btn projects__controls-edit-btn');
    const editProjectIcon = createElement('svg', 'btn-icon far fa-pen-to-square');
    editProjectBtn.append(editProjectIcon);

    const deleteProjectBtn = createElement('button', 'action-btn projects__controls-delete-btn');
    const deleteProjectIcon = createElement('svg', 'btn-icon far fa-trash-can btn-icon');
    deleteProjectBtn.append(deleteProjectIcon);
    
    projectControls.append(editProjectBtn, deleteProjectBtn);
    projectElement.append(projectInfo, projectControls);
    projectElement.setAttribute('data-id', project.id);

    parent.append(projectElement);

    //editProjectBtn.addEventListener('click', showEditProjectModal);
    deleteProjectBtn.addEventListener('click', showDeleteProjectModal);
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
                duplicateProject = true;
            }
        }

        if (!duplicateProject) createProjectElement(project);
    }
    updateProjectsCount();
}

function updateProjectsCount() {
    const projectsCountText = document.querySelector('.projects__num');
    const projectsCount = projects.length;

    projectsCountText.textContent = projectsCount;
}

function deleteProjectFromArray(e) {
    const projectElement = e.currentTarget.closest('.modal__content').querySelector('.modal__text');
    const projectElementID = projectElement.getAttribute('data-id');
    let itemFound = false;
    
    for (const project of projects) {
        const projectID = project.id;
        const projectIndex = projects.indexOf(project);
        
        if (projectID === projectElementID) {
            projects.splice(projectIndex, 1);
            itemFound = true;
        }
    }
    if (!itemFound) throw new Error('Element not found in the array!');
}

function deleteProjectFromDOM() {
    const projectElements = document.querySelectorAll('.projects__item');
    
    for (const projectElement of projectElements) {
        const projectElementID = projectElement.dataset.id;
        let elementExistsInArray = false;
        
        for (const project of projects) {
            const projectID = project.id;
            
            if (projectElementID === projectID) {
                elementExistsInArray = true;
            }
        }
        if (!elementExistsInArray) projectElement.remove();
    }
}

// Exporting this function to pass it as callback for form "submit" event of showProjectsModal() in modal.js
export function deleteProject(e) {
    deleteProjectFromArray(e);
    deleteProjectFromDOM();
    updateProjectsCount();
    closeModal();
}

// Exporting this function to pass it as callback for form "submit" event of showProjectsModal() in modal.js
export function addNewProject() {
    addProjectToArray();
    renderProjects();
}

