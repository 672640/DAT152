const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="${import.meta.url.match(/.*\//)[0]}/tasklist.css"/>

    <div id="tasklist"></div>`;

const tasktable = document.createElement("template");
tasktable.innerHTML = `
    <table>
        <thead><tr><th>Task</th><th>Status</th></tr></thead>
        <tbody></tbody>
    </table>`;

const taskrow = document.createElement("template");
taskrow.innerHTML = `
    <tr>
        <td></td>
        <td></td>
        <td>
            <select>
                <option value="0" selected>&lt;Modify&gt;</option>
            </select>
        </td>
        <td><button type="button">Remove</button></td>
    </tr>`;

/**
  * TaskList
  * Manage view with list of tasks
  */
class TaskList extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._statuses = [];
        this._addChangestatusCallback = null;
        this._addDeletetaskCallback = null;
        this._tasks = [];
        this._table = null;

    }

    /**
     * @public
     * @param {Array} list with all possible task statuses
     */
    setStatuseslist(allstatuses) {

		if(Array.isArray(allstatuses)) {
            this._statuses = allstatuses;
        } else {
            this._statuses = [];
        }
    }

    /**
     * Add callback to run on change on change of status of a task, i.e. on change in the SELECT element
     * @public
     * @param {function} callback
     */
    addChangestatusCallback(callback) {

        this._addChangestatusCallback = callback;
    
    }

    /**
     * Add callback to run on click on delete button of a task
     * @public
     * @param {function} callback
     */
    addDeletetaskCallback(callback) {

        this._addDeletetaskCallback = callback;
    }

    /**
     * Add task at top in list of tasks in the view
     * @public
     * @param {Object} task - Object representing a task
     */
    showTask(task) {

        const container = this.shadowRoot.getElementById("tasklist");
        
        if(!this._table) {
            this._table = tasktable.content.cloneNode(true).querySelector("table");
            container.appendChild(this._table);
        }
        const row = taskrow.content.cloneNode(true).querySelector("tr");
        row.dataset.taskId = task.id;

        row.querySelectorAll("td")[0].textContent = task.title;
        row.querySelectorAll("td")[1].textContent = task.status;
        
        const select = row.querySelector("select");
        select.innerHTML = "";
        for(const status of this._statuses) {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            if(status === task.status) option.selected = true;
            select.appendChild(option);
        }
        select.addEventListener("change", (e) => {
            const newStatus = e.target.value;
            if(this._addChangestatusCallback) {
                this._addChangestatusCallback({
                    id: task.id,
                    status: newStatus
                });
            }
            row.querySelectorAll("td")[1].textContent = newStatus;
        });

        const removeBtn = row.querySelector("button");
        removeBtn.addEventListener("click", () => {
            if(this._addDeletetaskCallback) {
                this._addDeletetaskCallback(task.id);
            }
            this.removeTask(task.id);
        });

        const tbody = this._table.querySelector("tbody");
        tbody.insertBefore(row, tbody.firstChild);

        this._tasks.unshift(task);
    }

    /**
     * Update the status of a task in the view
     * @param {Object} task - Object with attributes {'id':taskId,'status':newStatus}
     */
    updateTask(task) {
    //checks if this._table exists. If true, tries to find the <tbody> inside it using.
    //if false, sets tbody to null.
        const tbody = this._table ? this._table.querySelector("tbody") : null;
        if(!tbody) {
            return;
        }

        const row = Array.from(tbody.children).find(tr => tr.dataset.taskId == task.id);
        if(!row) {
            return;
        }

        row.querySelectorAll("td")[1].textContent = task.status;

        const select = row.querySelector("select");
        if(select) {
            for(const option of select.options) {
                option.selected = option.value === task.status;
            }
        }

        const idx = this._tasks.findIndex(t => t.id == task.id);
        if(idx !== -1) {
            this._tasks[idx].status = task.status;
        }
    }

    /**
     * Remove a task from the view
     * @param {Integer} task - ID of task to remove
     */
    removeTask(id) {

        const tbody = this._table ? this._table.querySelector("tbody") : null;
        if(!tbody) {
            return;
        }

        const row = Array.from(tbody.children).find(tr => tr.dataset.taskId == id);
        if(row) {
            tbody.removeChild(row);
        }

        this._tasks = this._tasks.filter(t => t.id != id);
    }

    /**
     * @public
     * @return {Number} - Number of tasks on display in view
     */
    getNumtasks() {
        return this._tasks.length;
    }

    addNewtaskCallback() {
        
    }
}
customElements.define('task-list', TaskList);
