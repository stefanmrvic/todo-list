import { createElement } from '../utils/dom.js';
import { projects, changeActiveBtn } from './projects.js';
import { createTaskElement, deleteTasksFromDOM } from './tasks.js';

const filterContainer = document.querySelector('.due__container');
const tasksContainer = document.querySelector('.main__tasks-list');
//const modalForm = document.querySelector('.modal__form');

let selectedFilter = 'all';

export function setSelectedFilter(value) {
    const validFilters = ['all', 'completed', 'important', null, undefined];
    const isValidFilter = validFilters.find(filter => filter === value);

    if (isValidFilter) selectedFilter = value;
}



filterContainer.addEventListener('click', selectFilter);
// Checks if user marks Task as done or if user changes any Task details which would cause it to no longer fit the filter category and then it re-renders all tasks into the selected category
tasksContainer.addEventListener('click', reRenderFilteredTasks);
//modalForm.addEventListener('submit', reRenderFilteredTasks);

function selectFilter(e) {
    const target = e.target.closest('.due__btn');
    const allTasksFilter = document.querySelector('.due__btn--all');
    const completedTasksFilter = document.querySelector('.due__btn--completed');
    const importantTasksFilter = document.querySelector('.due__btn--important');

    if (!target) return;

    changeActiveBtn(target);
    changeTasksSectionHeader(target);

    if (target === allTasksFilter) {
        selectedFilter = 'all';
        filterAll();
    } else if (target === completedTasksFilter) {
        selectedFilter = 'completed';
        filterCompleted();
    } else if (target === importantTasksFilter) {
        selectedFilter = 'important';
        filterImportant();
    }
}

function changeTasksSectionHeader(filterEle) {
    const dueElement = filterEle;
    const dueTitle = dueElement.textContent;
    const dueIcon = dueElement.querySelector('svg').classList[1];
    const dueIconPrefix = dueElement.querySelector('svg').dataset.prefix;
    const dueIconClass = `${dueIconPrefix} ${dueIcon}`;
    
    const sectionTitle = document.querySelector('.main__headline');
    const sectionIcon = document.querySelector('.main__title-icon');
    const headerContainer = document.querySelector('.main__title');

    // Creates new <svg> element and sets className of dueIconClass variable
    const newIcon = createElement('svg', dueIconClass);
    newIcon.classList.add('main__title-icon');

    sectionTitle.textContent = dueTitle;
    sectionIcon.remove();
    headerContainer.prepend(newIcon);
}

function filterAll() {
    const allTasks = [];

    for (const project of projects) {
        const taskList = project.taskList;

        allTasks.push(...taskList);
    }

    renderFilteredTasks(allTasks);
}

function filterDueToday() {

}

function filterDueWeek() {
    
}

function filterImportant() {
    const importantTasks = [];

    for (const project of projects) {
        const important = project.taskList.filter(task => task.priority === 'high');

        importantTasks.push(...important);
    }

    renderFilteredTasks(importantTasks);
}

export function filterCompleted() {
    const completedTasks = [];

    for (const project of projects) {
        const completed = project.taskList.filter(task => task.completed === true);

        completedTasks.push(...completed);
    }

    renderFilteredTasks(completedTasks);
}

function renderFilteredTasks(taskList) {
    deleteTasksFromDOM();

    for (const task of taskList) {
        const taskID = task.taskId;

        createTaskElement(task);
    }

    updateTasksCount(taskList);
}

function reRenderFilteredTasks(e) {
    const tasksContainer = document.querySelector('.main__tasks-list');

    //if (!e.target.closest(tasksContainer)) return;
    //const modal = 

    if (!selectedFilter) return;

    if (selectedFilter === 'all') filterAll();
    else if (selectedFilter === 'completed') filterCompleted();
    else if (selectedFilter === 'important') filterImportant();
}

function updateTasksCount(taskList) {
    const tasksList = taskList;
    const tasksCount = tasksList.length;

    const tasksCountText = document.querySelector('.main__tasks-num');
    tasksCountText.textContent = tasksCount;
}