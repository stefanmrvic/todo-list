import { createElement } from "../utils/dom";
import { showAddProjectModal, showEditProjectModal, showDeleteProjectModal, closeModal } from "./modal.js";


class Project {
    constructor(projectName) {
        this.projectName = projectName
        this.id = crypto.randomUUID();
        this.taskList = [];
    }

}

const projectsList = document.querySelector('.projects__list');
const projectsAddBtn = document.querySelector('.projects__add-btn');

//projectsList.addEventListener('click', selectProject);
projectsAddBtn.addEventListener('click', showAddProjectModal);