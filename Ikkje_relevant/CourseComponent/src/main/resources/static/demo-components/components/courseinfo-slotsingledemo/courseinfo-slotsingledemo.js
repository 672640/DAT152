class CourseInfo extends HTMLElement {
    #cssfile = "courseinfo-slotsingledemo.css";
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
            Welcome to <slot><span>course</span></slot>.
        </p>

        <button type="button">Say hello</button>
        `;

        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);

        return wrapper;
    }

    #getSlotValue() {
        const slotElement = this.#shadow.querySelector("slot");
        if (slotElement == null) return null;
        return slotElement.assignedElements({ flatten: true })[0].textContent;
    }

    #sayHello() {
        const course = this.#getSlotValue();

        alert(`Welcome to ${course}`);
    }
}

customElements.define('course-info', CourseInfo);

