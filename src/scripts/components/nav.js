import { icon } from '@fortawesome/fontawesome-svg-core';
import { faBars, faX } from '../modules/icons.js';

const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', toggleMenu);

function toggleMenu() {
    changeHamburgerIcon();
    toggleSideMenu();
}

function changeHamburgerIcon() {
    const mobileMenu = document.querySelector('.mobile__menu');
    const mobileMenuIcon = document.querySelector('.mobile__icon');
    const mobileMenuIconName = document.querySelector('.mobile__icon').dataset.icon;
    
    const hamburgerIcon = icon(faBars).node[0];
    const closeIcon = icon(faX).node[0];

    const iconToUse = mobileMenuIconName === 'bars' ? closeIcon : hamburgerIcon;
    iconToUse.classList.add('mobile__icon');

    mobileMenuIcon.remove();
    mobileMenu.appendChild(iconToUse);
}

function toggleSideMenu() {
    const sideMenu = document.querySelector('aside');
    const sideMenuState = window.getComputedStyle(sideMenu).display;

    if (sideMenuState === 'none') openSideMenu();
    else closeSideMenu();
}

function openSideMenu() {
    const sideMenu = document.querySelector('aside');
    sideMenu.style.display = 'block';

    setTimeout(() => { sideMenu.classList.add('open') }, 0);

    const contentBlocker = document.querySelector('.content-blocker');
    contentBlocker.style.display = 'block';

    const body = document.body;
    body.style.overflow = 'hidden';
}

function closeSideMenu() {
    const sideMenu = document.querySelector('aside');
    sideMenu.classList.remove('open');

    setTimeout(() => { sideMenu.style.display = 'none' }, 700);

    const contentBlocker = document.querySelector('.content-blocker');
    contentBlocker.style.display = 'none';

    const body = document.body;
    body.style.overflow = 'visible';
}