class CourseInfo extends HTMLElement {
    #cssfile = "courseinfo-domcontent.css";

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

    #getData() {
        const liElms = this.querySelectorAll("li");
        let course;
        let topic;
        let lecturer;
        console.log(liElms);
        if (liElms.length >= 3) {
            course = liElms[0].textContent;
            topic = liElms[1].textContent;
            lecturer = liElms[2].textContent;
            console.log(lecturer);
        } else {
            course = "DAT152";
            topic = "JavaScript";
            lecturer = "Bjarte Wang-Kileng";
        }
        return { course, topic, lecturer };
    }

    #createHTML() {
        const wrapper = document.createElement('div');

        const data = this.#getData();
        const content = `
		<p>
            The course is ${data.course} and the topic is ${data.topic}.
        </p>
        <p>
            Lecturer is ${data.lecturer}.
        </p>

        <button type="button" id="btA">Say hello</button>
         `;

        wrapper.insertAdjacentHTML('beforeend', content);
        return wrapper;
    }

    #sayHello() {
        const data = this.#getData();
        const topic = data.topic;
        const course = data.course;

        alert(`Welcome to the ${topic} topic of ${course}`);
    }
}

customElements.define('course-info', CourseInfo);

