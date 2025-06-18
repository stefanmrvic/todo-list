import { createElement } from '../utils/dom.js';
import { projects, changeActiveBtn } from './projects.js';
import { createTaskElement, deleteTasksFromDOM } from './tasks.js';
import { isToday, isThisWeek } from "date-fns";

const filterContainer = document.querySelector('.due__container');
const tasksContainer = document.querySelector('.main__tasks-list');

export let selectedFilter = 'all';

export const getSelectedFilter = (value) => value = selectedFilter;

export function setSelectedFilter(value) {
    const validFilters = ['all', 'completed', 'important', null, undefined];
    const isValidFilter = validFilters.some(filter => filter === value);

    if (isValidFilter) selectedFilter = value;
    else throw new Error('Invalid filter value!');
}

filterContainer.addEventListener('click', selectFilter);
// Checks if user marks Task as done or if user changes any Task details which would cause it to no longer fit the filter category and then it re-renders all tasks into the selected category
tasksContainer.addEventListener('click', reRenderFilteredTasks);

function selectFilter(e) {
    const target = e.target.closest('.due__btn');
    const allTasksFilter = document.querySelector('.due__btn--all');
    const dueTodayTasksFilter = document.querySelector('.due__btn--today');
    const dueThisWeekTasksFilter = document.querySelector('.due__btn--week');
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
    } else if (target === dueTodayTasksFilter) {
        selectedFilter = 'due today';
        filterDueToday();
    } else if (target === dueThisWeekTasksFilter) {
        selectedFilter = 'due this week';
        filterDueThisWeek();
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

// Exporting the function to use it in projects.js under initialRender()
export function filterAll() {
    const allTasks = [];

    for (const project of projects) {
        const taskList = project.taskList;

        allTasks.push(...taskList);
    }

    renderFilteredTasks(allTasks);
}

function filterDueToday() {
    const dueTodayTasks = [];

    for (const project of projects) {
        const taskList = project.taskList;

        const dueToday = taskList.filter(task => isToday(task.due));
        
        dueTodayTasks.push(...dueToday); 
    }

    renderFilteredTasks(dueTodayTasks); 
}

function filterDueThisWeek() {
    const dueThisWeekTasks = [];

    for (const project of projects) {
        const taskList = project.taskList;

        const dueThisWeek = taskList.filter(task => isThisWeek(task.due));
        
        dueThisWeekTasks.push(...dueThisWeek); 
    }

    renderFilteredTasks(dueThisWeekTasks); 
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

// TODO
export function renderFilteredTasks(taskList) {
    deleteTasksFromDOM();

    for (const task of taskList) {
        const taskID = task.taskId;

        createTaskElement(task);
    }

    updateTasksCount(taskList);
}

// Exporting the function so it can be used as a callback for event listener under createElement() in task.js, so that tasks gets re-rendered 
// if the user changes any of the task properties that would make task fall out of the selected filter category
export function reRenderFilteredTasks(e) {
    const selectedFilter = getSelectedFilter();

    if (
        !e.target.closest('.main__tasks-list') &&
        !e.target.closest('.modal')
    ) return;

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