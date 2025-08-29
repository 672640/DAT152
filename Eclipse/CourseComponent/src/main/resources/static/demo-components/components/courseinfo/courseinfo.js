class CourseInfo extends HTMLElement {
    #shadow;

    constructor() {
        // Always call super first in constructor
        super();

        // Entry point to the shadow DOM
        // If open, property "shadowRoot" will be an outside entrance to the shadow DOM
        this.#shadow = this.attachShadow({ mode: 'closed' });
        this.#createStyle();
        this.#createHTML();

        const bt = this.#shadow.querySelector('button[type=button]');
        bt.addEventListener('click', this.#sayHello.bind(this));
    }

    #createStyle() {
        const style = `
            div {
                border: 2px solid red;
                padding: 5px;
                margin: 10px 0;
            }
            `;
        const styleElement = document.createElement('style');
        //styleElement.insertAdjacentHTML('beforeend', style);
        styleElement.textContent = style;
        this.#shadow.appendChild(styleElement);
        return styleElement;
    }

    #createHTML() {
        const content = `
            <p>
                The course is <span id="course">DAT152</span> and the topic is <span id="topic">JavaScript</span>.
            </p>
            <p>
                Lecturer is <span id="lecturer">Bjarte Wang-Kileng</span>.
            </p>

            <button type="button">Say hello</button>
        `;
        const wrapper = document.createElement('div');
        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);
        //return wrapper;
    }


    #sayHello() {
        const topic = this.#shadow.getElementById('topic').textContent;
        const course = this.#shadow.getElementById('course').textContent;

        alert(`Welcome to the ${topic} topic of ${course}`);
    }
}

customElements.define('course-info', CourseInfo);
