import { createElement } from '../utils/dom.js';
import { changeActiveBtn } from './projects.js'

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