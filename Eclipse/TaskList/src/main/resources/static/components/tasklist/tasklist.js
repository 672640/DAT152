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
        this._changestatusCallback = null;
        this._deletetaskCallback = null;
        this._tasks = [];
        this._table = null;
        /**
         * Fill inn rest of the code
         */
    }

    /**
     * @public
     * @param {Array} list with all possible task statuses
     */
    setStatuseslist(allstatuses) {

        /**
         * Fill inn the code
         */
		this._statuses = Array.isArray(allstatuses) ? allstatuses : [];
    }

    /**
     * Add callback to run on change on change of status of a task, i.e. on change in the SELECT element
     * @public
     * @param {function} callback
     */
    changestatusCallback(callback) {
        /**
         * Fill inn the code
         */

        this._changestatusCallback = callback;
    
    }

    /**
     * Add callback to run on click on delete button of a task
     * @public
     * @param {function} callback
     */
    deletetaskCallback(callback) {
        /**
         * Fill inn the code
         */

        this._deletetaskCallback = callback;
    }

    /**
     * Add task at top in list of tasks in the view
     * @public
     * @param {Object} task - Object representing a task
     */
    showTask(task) {
        /**
         * Fill inn the code
         */
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
            if(this._changestatusCallback) {
                this._changestatusCallback({
                    id: task.id,
                    status: newStatus
                });
            }
            row.querySelectorAll("td")[1].textContent = newStatus;
        });

        const removeBtn = row.querySelector("button");
        removeBtn.addEventListener("click", () => {
            if(this._deletetaskCallback) {
                this._deletetaskCallback(task.id);
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
        /**
         * Fill inn the code
         */
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
        /**
         * Fill inn the code
         */
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
        /**
         * Fill inn the code
         */
        return this._tasks.length;
    }
}
customElements.define('task-list', TaskList);
