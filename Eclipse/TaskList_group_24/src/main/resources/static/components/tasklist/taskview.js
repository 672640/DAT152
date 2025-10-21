//Importar taskbox og tasklist
import './taskbox.js';
import './tasklist.js';

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

/**
  * Taskview
  * Tilretteleggar alt. Viser fram meldinga og "New Task"-knappen, set samen tasklist/taskbox callbacks og utfører all Ajax-en
  * (henting av statusar/tasks, put/post/delete). Oppdaterer tasklist berre etter at serveren har suksessfullt svart.
  */
class TaskView extends HTMLElement {
    constructor() {
        super();
        this._shadow = this.attachShadow({ mode: "closed" });
        this._shadow.appendChild(template.content.cloneNode(true));

        this._taskListElem = this._shadow.querySelector('task-list');
        this._taskBoxElem = this._shadow.querySelector('task-box');
        this._messageDiv = this._shadow.getElementById('message');
        this._newTaskButton = this._shadow.querySelector('#newtask button');
        this._serviceUrl = '';
    }

    /**
	 * Blir kalla når elementet er kopla til DOM-en
	 * Set opp callbacks og lastar inn den opprinnelege dataen frå serveren
	 * Einaste metoden som er public. Må vere public, sidan nettlesaren kallar connectedCallback() automatisk når dei elementa er kopla til DOM-en.
	 * Viss den er private, så kan ikkje nettlesaren kalle connectedCallback().
     */
    async connectedCallback() {
		//Hentar fram service URL-en frå dataattributten
        this._serviceUrl = this.getAttribute('data-serviceurl') || './api';
        
		//Sett opp alle callbacksa
        this._setupTaskListCallbacks();
        this._setupTaskBoxCallback();
        
		//Skrur av "New Task"-knappen viss vi ikkje får tilgong til databasen.
        this._newTaskButton.disabled = true;
        this._newTaskButton.addEventListener('click', () => {
            this._taskBoxElem.show();
        });
		//Lastar inn den opprinnelege dataen frå serveren
        await this._loadInitialData();
    }

    /**
	 * Set opp callback-ar for TaskList-komponenta
     * @private
     */
    _setupTaskListCallbacks() {
		//Callback for statusendringar
        this._taskListElem.addChangestatusCallback(async (task) => {
            try {
                const response = await this._updateTaskStatus(task.id, task.status);
                if (response.responseStatus != null) {
                    this._taskListElem.updateTask(task);
                } else {
                    alert('Failed to update task status. The server did not accept the change.');
                }
            } catch (error) {
				alert("Error updating task. Please try again later.");
                console.error('Error updating task status:', error);
            }
        });
		//Callback for sletting av tasks
        this._taskListElem.addDeletetaskCallback(async (taskId) => {
            try {
                const response = await this._deleteTask(taskId);
                if (response.responseStatus != null) {
                    this._taskListElem.removeTask(taskId);
                    this._tasksFound(); //Oppdaterer oss om at tasks har blitt funne
                } else {
                    alert('Failed to delete task');
                }
            } catch (error) {
				alert("Error deleting task. Please try again later.");
                console.error('Error deleting task:', error);
            }
        });
    }

    /**
	 * Set opp callback for TaskBox-komponenta
     * @private
     */
    _setupTaskBoxCallback() {
        this._taskBoxElem.addNewtaskCallback(async (newTask) => {
            try {
                const response = await this._createTask(newTask);
                if (response.responseStatus != null) {
                    this._taskListElem.showTask(response.task);
                    this._tasksFound(); //Oppdaterer oss om at tasks har blitt funne
                } else {
                    console.error('Failed to create task');
                }
            } catch (error) {
                console.error('Error creating task:', error);
            }
        });
    }

    /**
	 * Lastar inn den opprinnelege dataen frå serveren (statuses og tasks)
     * @private
     */
    async _loadInitialData() {
        try {
			//Lastar inn statusar og tasks i parallell
            const [statusesResponse, tasksResponse] = await Promise.all([
                this._fetchAllStatuses(),
                this._fetchAllTasks()
            ]);

            if(!statusesResponse || !statusesResponse.responseStatus) {
                throw new Error("Invalid statuses data from server");
            }

            if (!tasksResponse || !tasksResponse.responseStatus || !Array.isArray(tasksResponse.tasks)) {
				throw new Error("Invalid tasks data from server");
				}
				
            this._taskListElem.setStatuseslist(statusesResponse.allstatuses);
            this._taskBoxElem.setStatuseslist(statusesResponse.allstatuses);
			//Fail-check før looping, viss Array tom, viser "No tasks found."
            for(const task of tasksResponse.tasks) {
                this._taskListElem.showTask(task);
            }
			//Backenden er OK, skrur på "New Task"-knappen
			this._newTaskButton.disabled = false;
			this._tasksFound();

        } catch (error) {
            console.error('Failed to load initial data:', error);
            this._showErrorMessage('Failed to load data from server');
			//Lar "New Task"-knappen vere skrudd av.
			this._newTaskButton.disabled = true;
        }
    }

    /**
	 * Hentar fram alle moglege "task status" frå serveren
     * @private
     * @returns {Promise<Object>} Response-objekt med statusar
     */
    async _fetchAllStatuses() {
        const response = await fetch(`${this._serviceUrl}/allstatuses`);
        return await response.json();
    }

    /**
	 * Hentar fram alle tasksa frå serveren
     * @private
     * @returns {Promise<Object>} Response-objekt med tasks
     */
    async _fetchAllTasks() {
        const response = await fetch(`${this._serviceUrl}/tasklist`);
        return await response.json();
    }

    /**
	 * Lagar ein ny task på serveren
     * @private
     * @param {Object} taskData - Taskdata med tittel og status
     * @returns {Promise<Object>} Response-objekt med "create task"
     */
    async _createTask(taskData) {
        const response = await fetch(`${this._serviceUrl}/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(taskData)
        });
        return await response.json();
    }

    /**
	 * Oppdaterer "task status" på serveren
     * @private
     * @param {number} taskId - ID-en til task-en å oppdatere
     * @param {string} status - Ny status for den nye task-en
     * @returns {Promise<Object>} Response-objekt
     */
    async _updateTaskStatus(taskId, status) {
        const response = await fetch(`${this._serviceUrl}/task/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ status })
        });
        return await response.json();
    }

    /**
	 * Slettar ein task frå serveren
     * @private
     * @param {number} taskId - ID-en til task-en å slette
     * @returns {Promise<Object>} Response-objekt
     */
    async _deleteTask(taskId) {
        const response = await fetch(`${this._serviceUrl}/task/${taskId}`, {
            method: 'DELETE'
        });
        return await response.json();
    }

    /**
	 * Viser ein error i message-div-en
     * @private
     * @param {string} message - Erroren som skal visast
     */
    _showErrorMessage(message) {
		this._messageDiv.innerHTML = "";
		const p = document.createElement("p");
		
        p.innerText = `Error: ${message}`;
		this._messageDiv.appendChild(p);
    }

    /**
	 * Oppdaterer melding-div-en basert på kor mange tasks vi fann
     * @public
     */
    _tasksFound() {
		this._messageDiv.innerHTML = "";
		//Må handtere å legge til <p></p> på denne måten, sidan innerText berre
		//returnerer rein tekst, der <p> blir returnert som <p> (rein tekst) og lagar ikkje eit paragraf.
		const p = document.createElement("p");
        const numTasks = this._taskListElem.getNumtasks();

        if (numTasks !== 0) {
            p.innerText = `Found ${numTasks} tasks.`;
			this._messageDiv.appendChild(p);
        } else {
            p.innerText = `No tasks found.`;
			this._messageDiv.appendChild(p);
        }
    }
}

customElements.define('task-view', TaskView);

