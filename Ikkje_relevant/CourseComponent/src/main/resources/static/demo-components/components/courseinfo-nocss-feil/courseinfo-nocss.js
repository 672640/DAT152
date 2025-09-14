class CourseInfo extends HTMLElement {
    #shadow;
    
    constructor() {
        // Always call super first in constructor
        super();

        // Entry point to the shadow DOM
        this.#shadow = this.attachShadow({ mode: 'closed' });
        this.#createHTML();

        const bt = shadow.querySelector('button[type=button]');
        bt.addEventListener('click', this.#sayHello.bind(this));
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
        return wrapper;
    }

    #sayHello() {
        const topic = this.#shadow.getElementById('topic').textContent;
        const course = this.#shadow.getElementById('course').textContent;
        alert(`Welcome to the ${topic} topic of ${course}`);
    }
}

// Create tag <course-info data-course='...' data-topic='...' data-lecturer='...'> for the new element
customElements.define('course-info', CourseInfo);

