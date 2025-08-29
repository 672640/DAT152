// Check if tag already exists
const template = document.createElement("template")
template.innerHTML = `
        <link rel="stylesheet" type="text/css" href="${import.meta.url.match(/.*\//)[0]}/courseinfo-template.css">

        <div>
            <p>
                The course is <slot name="course"><span>DAT152</span></slot> and the topic is <slot name="topic"><span>JavaScript</span></slot>.
            </p>
            <p>
                Lecturer is <slot name="lecturer"><span>Bjarte Wang-Kileng</span></slot>.
            </p>

            <button type="button">Say hello</button>
        </div>
    `;

class CourseInfo extends HTMLElement {
    #shadow;

    constructor() {
        // Always call super first in constructor
        super();

        // Entry point to the shadow DOM
        this.#shadow = this.attachShadow({ mode: 'closed' });

        // Copying the template content into a new document
        const content = template.content.cloneNode(true);
        this.#shadow.appendChild(content);

        const bt = this.#shadow.querySelector('button[type=button]');
        bt.addEventListener('click', this.#sayHello.bind(this));
    }


    #getSlotValue(name) {
        const slotElement = this.#shadow.querySelector(`slot[name=${name}]`);
        if (slotElement == null) return null;
        return slotElement.assignedElements({ flatten: true })[0].textContent;
    }

    #sayHello() {
        const topic = this.#getSlotValue('topic');
        const course = this.#getSlotValue('course');

        alert(`Welcome to the ${topic} topic of ${course}`);
    }
}

customElements.define('course-info', CourseInfo);

