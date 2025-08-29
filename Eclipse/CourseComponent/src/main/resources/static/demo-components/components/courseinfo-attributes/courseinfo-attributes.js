class CourseInfo extends HTMLElement {
    #cssfile = "courseinfo-attributes.css";

    constructor() {
        // Always call super first in constructor
        super();

        // Entry point to the shadow DOM
        const shadow = this.attachShadow({ mode: 'closed' });
        shadow.appendChild(this.#linkElement());
        shadow.appendChild(this.#createHTML());

        const bt = shadow.getElementById("btA");
        bt.addEventListener('click', this.#sayHello.bind(this));
    }

    #linkElement() {
        const link = document.createElement('link');

        // Use directory of script as directory of CSS file
        console.log(`URL of component is ${import.meta.url}`);
        const path = import.meta.url.match(/.*\//)[0];
        console.log(`Directory path to component is ${path}`);

        link.href = path.concat(this.#cssfile);
        console.log(`URL of CSS file is ${link.href}`);
        link.rel = "stylesheet";
        link.type = "text/css";
        return link;
    }

    #createHTML() {
        const wrapper = document.createElement('div');

        let course = this.dataset.course;
        let topic = this.dataset.topic;
        let lecturer = this.dataset.lecturer;
        if (course === undefined) {
            course = "DAT152";
            this.dataset.course = course;
        }
        if (topic === undefined) {
            topic = "JavaScript";
            this.dataset.topic = topic;
        }
        if (lecturer === undefined) {
            lecturer = "Bjarte Wang-Kileng";
            this.dataset.lecturer = "Bjarte Wang-Kileng";
        }

        const content = `
		<p>
            The course is ${course} and the topic is ${topic}.
        </p>
        <p>
            Lecturer is ${lecturer}.
        </p>

        <button type="button" id="btA">Say hello</button>
         `;

        wrapper.insertAdjacentHTML('beforeend', content);
        return wrapper;
    }

    #sayHello() {
        const topic = this.dataset.topic;
        const course = this.dataset.course;
        alert(`Welcome to the ${topic} topic of ${course}`);
    }
}

customElements.define('course-info', CourseInfo);

