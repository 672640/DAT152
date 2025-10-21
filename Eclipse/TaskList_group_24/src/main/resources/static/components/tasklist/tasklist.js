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

//Export-ar tasklist
export class TaskList extends HTMLElement {
    constructor() {
        super();
        this._shadow = this.attachShadow({ mode: "closed" });
        this._shadow.appendChild(template.content.cloneNode(true));
		this._container = this._shadow.getElementById("tasklist");
        this._statuses = [];
        this._changestatusCallback = null;
        this._deletetaskCallback = null;
        this._table = null;

    }

    /**
     * @public
     * @param {Array} list with all possible task statuses
     */
    setStatuseslist(allstatuses) {

		if(Array.isArray(allstatuses) === true) {
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

        this._changestatusCallback = callback;
    
    }

    /**
     * Add callback to run on click on delete button of a task
     * @public
     * @param {function} callback
     */
    addDeletetaskCallback(callback) {

        this._deletetaskCallback = callback;
    }

    /**
     * Add task at top in list of tasks in the view
     * @public
     * @param {Object} task - Object representing a task
     */
    showTask(task) {
        
		
        if(!this._table) {
            this._table = tasktable.content.cloneNode(true).querySelector("table");
            this._container.appendChild(this._table);
        }
		
        const row = taskrow.content.cloneNode(true).querySelector("tr");
        row.dataset.taskId = task.id;

		row.cells[0].innerText = task.title;
		row.cells[1].innerText = task.status;
        const select = row.cells[2].querySelector("select");
//Ryddar opp dropdownmenyen før vi legg til <options>-elementa.
//Verdiane kjem frå this._statuses, kontrollert av appen, ikkje brukardata.
        select.innerHTML = "";
		const modifyOptionTemplate = taskrow.content.querySelector("option").cloneNode(true);
		select.appendChild(modifyOptionTemplate);

		//Legg til statusane etterpå
        for(const status of this._statuses) {
            const option = document.createElement("option");
            option.value = status;
            option.innerText = status;
            select.appendChild(option);
        }
		//Tilbakestillar til <Modify> etter ei endring.
        select.addEventListener("change", (e) => {
			//Confirmation window når vi prøver å oppdatere ein task.
			const confirmationUpdate = window.confirm(`Are you sure you want to update the task "${task.title}"?`);
			if(!confirmationUpdate) {
                e.target.value = "0";
                return;
            };

            const newStatus = e.target.value;
			//Når brukaren berre trykkar på "<Modify>".
			if(newStatus === "0") return;
			//Sendar event til TaskView men oppdaterer ikkje dei ennå.
            if(this._changestatusCallback != null) {
                this._changestatusCallback({
                    id: task.id,
                    status: newStatus
                });
            }
			//Tilbakestillar dropdown-en til "<Modify>".
			e.target.value = "0";
        });

        const removeBtn = row.querySelector("button");

        removeBtn.addEventListener("click", () => {
			//Confirmation window når vi prøver å slette ein task.
			const confirmationDelete = window.confirm(`Are you sure you want to delete the task "${task.title}"?`);
			if(!confirmationDelete) return;
			
            if(this._deletetaskCallback != null) {
                this._deletetaskCallback(task.id);
				//removeTask(task.id) skal ikkje bli kalla her.
            }});

         this._table.querySelector("tbody").insertBefore(row, this._table.querySelector("tbody").firstChild);
    }

    /**
     * Update the status of a task in the view
     * @param {Object} task - Object with attributes {'id':taskId,'status':newStatus}
     */
    updateTask(task) {
    //checks if this._table exists. If true, tries to find the <tbody> inside it using.
    //if false, sets tbody to null.
        const tbody = (this._table !== null)
            ? this._table.querySelector("tbody")
            : null;
            if(!tbody) {
            return;
        }
		//Endra denne og i removeTask(id) for å sleppe å gå gjennom alle radene for å finne ein gitt verdi av data-taskid.
		//Nå: bruker querySelector med ein attributt-selector i staden for, som er raskare.
        const row = this._table.querySelector(`tr[data-task-id="${task.id}"]`);
        if(!row) {
            return;
        }
		
        row.querySelectorAll("td")[1].innerText = task.status;

        const select = row.querySelector("select");
        if(select != null) {
            for(const option of select.options) {
                option.selected = option.value === task.status;
            }
			//Gjer at <Modify> blir reset-a riktig til <Modify> etter vi har velt ein status.
			select.value = "0";
        }
    }

    /**
     * Remove a task from the view
     * @param {Integer} task - ID of task to remove
     */
    removeTask(id) {
		const tbody = (this._table !== null)
		    ? this._table.querySelector("tbody")
		    : null;
		
        const row = (this._table !== null)
		? this._table.querySelector(`tr[data-task-id="${id}"]`)
		: null;
		
		if(row != null && tbody != null) {
			tbody.removeChild(row);
			
			if(tbody.rows.length === 0) {
				this._table.remove();
				this._table = null;
			}
		}
    }

    /**
     * @public
     * @return {Number} - Number of tasks on display in view
     */
    getNumtasks() {
		if (!this._table || !this._table.tBodies[0]) return 0;
		return this._table.tBodies[0].rows.length;
    }
}
customElements.define('task-list', TaskList);
