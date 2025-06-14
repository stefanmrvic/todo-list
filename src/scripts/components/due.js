import { createElement } from '../utils/dom.js';
import { projects, changeActiveBtn } from './projects.js';

const filterContainer = document.querySelector('.due__container');

filterContainer.addEventListener('click', selectFilter);

function selectFilter(e) {
    const target = e.target.closest('.due__btn');

    if (!target) return;

    changeActiveBtn(target);
    changeTasksSectionHeader(target);
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
}

export function filterCompleted() {
    const completedTasks = [];

    for (const project of projects) {
        const completed = project.taskList.filter(task => task.completed === true);

        completedTasks.push(...completed);
    }
}