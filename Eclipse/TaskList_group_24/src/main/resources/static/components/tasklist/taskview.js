const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" type="text/css"
        href="${import.meta.url.match(/.*\//)[0]}/taskview.css"/>

    <h1>Tasks</h1>

    <div id="message"><p>Waiting for server data.</p></div>
    <div id="newtask">
        <button type="button" disabled>New task</button>
    </div>

    <!-- The task list -->
    <task-list></task-list>

    <!-- The Modal -->
    <task-box></task-box>
`;

class TaskView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._taskListElem = this.shadowRoot.querySelector('task-list');
        //this._numTasks = taskListElem.getNumtasks();
        this._messageDiv = this.shadowRoot.getElementById('message');
    }

//Hardcoded tests for taskview.js
connectedCallback() {
const tasks = [
            {
                id: 1,
                status: "WAITING",
                title: "Paint roof"
            },
            {
                id: 2,
                status: "ACTIVE",
                title: "Wash windows"
            },
            {
                id: 3,
                status: "DONE",
                title: "Wash floor"
            }
        ];
//Spør korfor i browseren så er "setStatuseslist... aka, får ikkje brukt
//funksjonane frå tasklist.js."
        this._taskListElem.setStatuseslist(["WAITING", "ACTIVE", "DONE"]);
        for(const task of tasks) {
            this._taskListElem.showTask(task);
        }

        this.tasksFound();
    }

    /**
    * Number of tasks found (and displayed)
    * @public
    * @param {Object} message - 
    */


tasksFound() {
    const numTasks = this._taskListElem.getNumtasks();
        if(!numTasks) {
            this._messageDiv.innerHTML = "<p>No tasks were found.</p>"
        } else {
            this._messageDiv.innerHTML = `<p>Found ${numTasks} tasks.</p>`
        }
    }
}

customElements.define('task-view', TaskView);