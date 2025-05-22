export function createElement(ele, className = '', text = '') {
    const element = document.createElement(ele);

    if (className) {
        // Checks if it's single class or if it has multiple classes in arg
        if (className.includes(' ')) {
            // Splits the className arg into an array
            const classNameArray = className.split(' ');
            // Adds each class individually to the element using the spread operator
            element.classList.add(...classNameArray);
        } else {
            element.classList.add(className);
        }
    }

    if (text) element.textContent = text;
    
    return element;
}