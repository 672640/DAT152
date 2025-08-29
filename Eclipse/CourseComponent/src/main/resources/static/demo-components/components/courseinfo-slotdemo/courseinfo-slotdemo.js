class CourseInfo extends HTMLElement {
    #cssfile = "courseinfo-slotdemo.css";
    #shadow;

    constructor() {
        // Always call super first in constructor
        super();

        // Entry point to the shadow DOM
        this.#shadow = this.attachShadow({ mode: 'closed' });
        this.#createLink();
        this.#createHTML();

        const bt = this.#shadow.querySelector('button[type=button]');
        bt.addEventListener('click', this.#sayHello.bind(this));
    }

    #createLink() {
        const link = document.createElement('link');

        // Use directory of script as directory of CSS file
        //const path = document.currentScript.src.match(/.*\//)[0];
        const path = import.meta.url.match(/.*\//)[0];
        link.href = path.concat(this.#cssfile);
        link.rel = "stylesheet";
        link.type = "text/css";
        this.#shadow.appendChild(link);
        return link;
    }

    #createHTML() {
        const wrapper = document.createElement('div');

        const content = `
        <p>
            The course is <slot name="course"><span>DAT152</span></slot> and the topic is <slot name="topic"><span>JavaScript</span></slot>.
        </p>
        <p>
            Lecturer is <slot name="lecturer"><span>Bjarte Wang-Kileng</span></slot>.
        </p>

        <button type="button">Say hello</button>
        `;

        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);

        return wrapper;
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

