const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" type="text/css"
        href="${import.meta.url.match(/.*\//)[0]}/taskbox.css"/>
    <dialog>
        <!-- Modal content -->
        <span>&times;</span>
        <div>
            <div>Title:</div>
            <div>
                <input type="text" size="25" maxlength="80"
                    placeholder="Task title" autofocus/>
            </div>
            <div>Status:</div><div><select></select></div>
        </div>
        <p><button type="submit">Add task</button></p>
    </dialog>
`;

const taskbox = document.querySelector("TASK-BOX");
taskbox.newtaskCallback(
    (task) => {
        console.log(`Have '${task.title}' with status ${task.status}.`);
        taskbox.close();
    }
);
taskbox.setStatuseslist(["WATING","ACTIVE","DONE"]);
taskbox.show();

//show() - Opens/shows the modal box in the browser window.
//setStatuseslist(list) - Sets the list of possible task statuses.
//addNewtaskCallback(callback) - Adds a callback to run at click on the Add task button. When TaskBox runs a method set with this, the method must be run with the new task as parameter.
//close() - Removes the modal box from the view.

class TaskBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.statuses = [];
        this.callbacks = [];
        this.dialog = this.shadowRoot.querySelector("dialog");
        this.input = this.shadowRoot.querySelector("input");
        this.select = this.shadowRoot.querySelector("select");
        this.closeButton = this.shadowRoot.querySelector("span");
        this.submitButton = this.shadowRoot.querySelector("button[type='submit']");
        this.closeButton.addEventListener("click", () => this.close());
        this.dialog.addEventListener("cancel", () => this.close());
        this.submitButton.addEventListener("click", () => {
            const title = this.input.value.trim();
            const status = this.select.value;
            if (title && status) {
                const task = { title, status };
                this.callbacks.forEach(callback => callback(task));
            }
        });
    }

    show() {
        this.dialog.showModal();
        this.input.value = "";
        this.input.focus();
    }

    setStatuseslist(list) {
        if (Array.isArray(list)) {
            this.statuses = list;
        } else this.statuses = [];
        this.select.innerHTML = "";
        for (const status of this.statuses) {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            this.select.appendChild(option);
        }
    }

    addNewtaskCallback(callback) {
        if (typeof callback === "function") {
            this.callbacks.push(callback);
        }
    }

    close() {
        this.dialog.close();
    }
}

customElements.define('task-box', TaskBox);