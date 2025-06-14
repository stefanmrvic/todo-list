import { createElement } from '../utils/dom';
import { showAddProjectModal, showEditProjectModal, showDeleteProjectModal, closeModal } from './modal.js';
import { renderTasks } from '../components/tasks.js'
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faPagelines, faBook, faScrewdriverWrench, faVolleyball, faSackDollar, faPizzaSlice, faSuitcaseRolling, faGift } from '../modules/icons.js';
import { filterCompleted } from './due.js';

class Project {
    constructor(title, icon) {
        this.title = title;
        this.icon = icon;
        this.taskList = [];
        this.projectId = crypto.randomUUID();
        this.iconClass = this.determineIconClass();
    }

    determineIconClass() {
        // It captures icon value eg. 'flowerIcon' and then it returns its class
        const iconValue = this.icon;
        const icons = {
            faPagelines: 'fab fa-pagelines',
            faBook: 'fas fa-book',
            faScrewdriverWrench: 'fas fa-screwdriver-wrench',
            faVolleyball: 'fas fa-volleyball',
            faSackDollar: 'fas fa-sack-dollar',
            faPizzaSlice: 'fas fa-pizza-slice',
            faSuitcaseRolling: 'fas fa-suitcase-rolling',
            faGift: 'fas fa-gift',
        }
        return icons[iconValue];
    }
}

export const projects = [];
export let selectedProject;

const projectsList = document.querySelector('.projects__list');
const projectsAddBtn = document.querySelector('.projects__add-btn');

projectsList.addEventListener('click', selectProject);
projectsAddBtn.addEventListener('click', showAddProjectModal);

function changeActiveProject(projectEle) {
    changeActiveBtn(projectEle);
    renderAddTaskBtn();
    changeTasksSectionHeader(projectEle);
    filterCompleted();
}

// Exporting this function so I can use it in due.js when user clicks on different due filters
export function changeActiveBtn(ele) {
    const activeBtn = document.querySelector('.active');
    const element = ele;

    // It removes the .active className from buttons
    if (activeBtn) {
        activeBtn.classList.remove('active');
    }

    element.classList.add('active');
}

function changeTasksSectionHeader(projectEle) {
    const project = projects.find(project => project.projectId === projectEle.dataset.projectId)
    const projectElement = projectEle;
    const projectTitle = projectElement.querySelector('.projects__info-title').textContent;
    const projectIconClass = project.iconClass;
    
    const sectionTitle = document.querySelector('.main__headline');
    const sectionIcon = document.querySelector('.main__title-icon');
    const headerContainer = document.querySelector('.main__title');

    // Creates new <svg> element and sets className of projectIconClass variable
    const newIcon = createElement('svg', projectIconClass);
    newIcon.classList.add('main__title-icon');

    sectionTitle.textContent = projectTitle;
    sectionIcon.remove();
    headerContainer.prepend(newIcon);
}

function renderAddTaskBtn() {
    // It shows add Task button when the Project has been selected
    const addTaskBtn = document.querySelector('.main__add-btn');
    addTaskBtn.classList.add('show');
}

function selectProject(e) {
    const projectsContainer = document.querySelector('.projects__list');

    // If user clicks between the projects buttons, it ends function invocation
    if (e.target === projectsContainer) return;

    // It captures Project element in DOM via event arg or via direct Project DOM reference arg
    const projectElement = e.target.closest('.projects__item');

    // It captures currently selected Project item so it can referenced when creating new task(s)
    selectedProject = projects.find(project => project.projectId === projectElement.dataset.projectId);

    changeActiveProject(projectElement);
    renderTasks();
}

function createProjectElement(project) {
    const parent = document.querySelector('.projects__list');

    const projectElement = createElement('button', 'btn projects__item');

    const projectInfo = createElement('div', 'projects__info');
    const projectIconClass = project.iconClass;
    const projectIcon = createElement('i', `${projectIconClass} btn-icon project-btn-icon`);
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
    projectElement.setAttribute('data-project-id', project.projectId);

    parent.append(projectElement);

    editProjectBtn.addEventListener('click', showEditProjectModal);
    deleteProjectBtn.addEventListener('click', showDeleteProjectModal);
    
    changeActiveProject(projectElement);
}

function addProjectToArray() {
    const projectTitle = document.querySelector('.modal__form-title').value; 
    const projectIcon = document.querySelector('.modal__icons-input:checked').value;

    const newProject = new Project(projectTitle, projectIcon);
    projects.push(newProject);
    selectedProject = newProject;
}

function addProjectToDOM() {
    const projectElements = document.querySelectorAll('.projects__item');
    
    for (const project of projects) {
        const projectID = project.projectId;
        let duplicateProject = false;
        
        for (const projectElement of projectElements) {
            const projectElementID = projectElement.getAttribute('data-project-id');

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
    const projectElementID = projectElement.getAttribute('data-project-id');
    let itemFound = false;
    
    for (const project of projects) {
        const projectID = project.projectId;
        const projectIndex = projects.indexOf(project);
        
        if (projectID === projectElementID) {
            projects.splice(projectIndex, 1);
            itemFound = true;
        }
    }
    if (!itemFound) throw new Error('Element not found in the array!');
}

function deleteProjectFromDOM() {
    let projectElements = document.querySelectorAll('.projects__item');
    
    for (const projectElement of projectElements) {
        const projectElementID = projectElement.dataset.projectId;
        let elementExistsInArray = false;
        
        for (const project of projects) {
            const projectID = project.projectId;
            
            if (projectElementID === projectID) {
                elementExistsInArray = true;
            }
        }
        if (!elementExistsInArray) projectElement.remove();
    }

    projectElements = document.querySelectorAll('.projects__item');

    // It checks if there are Projects left, if yes, then it will select the last Project after the previous one was deleted
    if (projectElements.length > 0) {
        const lastProjectElementIndex = projectElements.length - 1;
        const lastProjectElement = projectElements[lastProjectElementIndex];
        changeActiveProject(lastProjectElement);
    } else {
        // It reverts Tasks section title and disables add Task button when there are no Projects left
        // TODO
        const addTaskBtn = document.querySelector('.main__add-btn');
        addTaskBtn.classList.remove('show');
    }
}

function editProjectInArray() {
    const projectElement = findProjectElement();
    const projectElementID = projectElement.getAttribute('data-project-id');

    const projectTitle = document.querySelector('.modal__form-title').value;
    const projectIcon = document.querySelector('.modal__icons-input:checked').value;

    for (const project of projects) {
        const projectID = project.projectId;

        if (projectElementID === projectID) {
            project.title = projectTitle;
            project.icon = projectIcon;
        }
    }
}

function editProjectInDOM() {
    const projectElement = findProjectElement();
    const projectElementID = projectElement.getAttribute('data-project-id');

    for (const project of projects) {
        const projectID = project.projectId;

        if (projectElementID === projectID) {
            const projectElementInfoContainer = projectElement.querySelector('.projects__info');
            const projectElementTitle = projectElement.querySelector('.projects__info-title');
            const projectElementIcon = projectElement.querySelector('.project-btn-icon');
            const newProjectElementIcon = determineIcon(project);
            newProjectElementIcon.classList.add('project-btn-icon');
            
            projectElementTitle.textContent = project.title;
            projectElementIcon.remove();
            projectElementInfoContainer.prepend(newProjectElementIcon);
        }
    }
    changeTasksSectionHeader(projectElement);
}

function determineIcon(project) {
    const projectIcon = project.icon;
    let newIcon;

    switch (projectIcon) {
        case 'faPagelines':
            newIcon = icon(faPagelines).node[0];
            break;
        case 'faBook':
            newIcon = icon(faBook).node[0];
            break;
        case 'faScrewdriverWrench':
            newIcon = icon(faScrewdriverWrench).node[0];
            break;
        case 'faVolleyball':
            newIcon = icon(faVolleyball).node[0];
            break;
        case 'faSackDollar':
            newIcon = icon(faSackDollar).node[0];
            break;
        case 'faPizzaSlice':
            newIcon = icon(faPizzaSlice).node[0];
            break;
        case 'faSuitcaseRolling':
            newIcon = icon(faSuitcaseRolling).node[0];
            break;
        case 'faGift':
            newIcon = icon(faGift).node[0];
            break;
    }

    return newIcon;
}

function findProjectElement() {
    const form = document.querySelector('.modal__form');
    // To prevent losing the trace of the task item, I stamped task ID onto form so it can be traced back to the task item once the modal is open
    const formID = form.getAttribute('data-project-id');
    const projectElements = document.querySelectorAll('.projects__item');

    for (const projectElement of projectElements) {
        const projectElementID = projectElement.dataset.projectId;

        if (formID === projectElementID) {
            return projectElement;
        }
    }
    throw new Error('Project item not found!');
}

// Exporting this function to pass it as callback for form "submit" event in modal.js
export function editProject() {
    editProjectInArray();
    editProjectInDOM();
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
    addProjectToDOM();
}