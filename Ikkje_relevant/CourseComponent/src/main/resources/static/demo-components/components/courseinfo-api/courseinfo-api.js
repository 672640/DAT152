class CourseInfo extends HTMLElement {
    #cssfile = "courseinfo-api.css";

    #shadow;

    constructor() {
        // Always call super first in constructor
        super();

        // Entry point to the shadow DOM
        // If open, property "shadowRoot" will be an outside entrance to the shadow DOM
        this.#shadow = this.attachShadow({ mode: 'closed' });
        this.#createLink();
        this.#createHTML();

        const bt = this.#shadow.querySelector('button[type=button]');
        bt.addEventListener('click', this.#sayHello.bind(this));
    }

    setCourse(course) {
        const courseelement = this.#shadow.querySelectorAll("span")[0];
        courseelement.textContent = course;
    }

    setTopic(topic) {
        const topicelement = this.#shadow.querySelectorAll("span")[1];
        topicelement.textContent = topic;
    }

    setLecturer(lecturer) {
        const lecturerelement = this.#shadow.querySelectorAll("span")[2];
        lecturerelement.textContent = lecturer;

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

customElements.define('course-info', CourseInfo);

