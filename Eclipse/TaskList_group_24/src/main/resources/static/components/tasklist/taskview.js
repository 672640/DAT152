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
  * Koplar taskbox og tasklist saman med kvarandre.
  */
class TaskView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._taskListElem = this.shadowRoot.querySelector('task-list');
        this._taskBoxElem = this.shadowRoot.querySelector('task-box');
        this._messageDiv = this.shadowRoot.getElementById('message');
        this._newTaskButton = this.shadowRoot.querySelector('#newtask button');
        this.serviceUrl = '';
    }

    /**
	 * Blir kalla når elementet er kopla til DOM-en
	 * Set opp callbacks og lastar inn den opprinnelege dataen frå serveren
     */
    connectedCallback() {
		//Hentar fram service URL-en frå dataattributten
        this.serviceUrl = this.getAttribute('data-serviceurl') || './api';
        
		//Sett opp alle callbacksa
        this.setupTaskListCallbacks();
        this.setupTaskBoxCallback();
        
		//Skrur på "New task"-knappen og lar oss legge til tasks
        this._newTaskButton.disabled = false;
        this._newTaskButton.addEventListener('click', () => {
            this._taskBoxElem.show();
        });
		//Lastar inn den opprinnelege dataen frå serveren
        this.loadInitialData();
    }

    /**
	 * Set opp callback-ar for TaskList-komponenta
     * @private
     */
    setupTaskListCallbacks() {
		//Callback for statusendringar
        this._taskListElem.addChangestatusCallback(async (task) => {
            try {
                const response = await this.updateTaskStatus(task.id, task.status);
                if (response.responseStatus) {
                    this._taskListElem.updateTask(task);
                } else {
                    console.error('Failed to update task status');
                }
            } catch (error) {
                console.error('Error updating task status:', error);
            }
        });
		//Callback for sletting av tasks
        this._taskListElem.addDeletetaskCallback(async (taskId) => {
            try {
                const response = await this.deleteTask(taskId);
                if (response.responseStatus) {
                    this._taskListElem.removeTask(taskId);
                    this.tasksFound(); //Oppdaterer oss om at tasks har blitt funne
                } else {
                    console.error('Failed to delete task');
                }
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        });
    }

    /**
	 * Set opp callback for TaskBox-komponenta
     * @private
     */
    setupTaskBoxCallback() {
        this._taskBoxElem.addNewtaskCallback(async (newTask) => {
            try {
                const response = await this.createTask(newTask);
                if (response.responseStatus) {
                    this._taskListElem.showTask(response.task);
                    this.tasksFound(); //Oppdaterer oss om at tasks har blitt funne
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
    async loadInitialData() {
        try {
			//Lastar inn statusar og tasks i parallell
            const [statusesResponse, tasksResponse] = await Promise.all([
                this.fetchAllStatuses(),
                this.fetchAllTasks()
            ]);
            
            if (statusesResponse.responseStatus) {
                this._taskListElem.setStatuseslist(statusesResponse.allstatuses);
                this._taskBoxElem.setStatuseslist(statusesResponse.allstatuses);
            }
            
            if (tasksResponse.responseStatus) {
                for (const task of tasksResponse.tasks) {
                    this._taskListElem.showTask(task);
                }
            }
            
            this.tasksFound();
        } catch (error) {
            console.error('Failed to load initial data:', error);
            this.showErrorMessage('Failed to load data from server');
        }
    }

    /**
	 * Hentar fram alle moglege "task status" frå serveren
     * @private
     * @returns {Promise<Object>} Response-objekt med statusar
     */
    async fetchAllStatuses() {
        const response = await fetch(`${this.serviceUrl}/allstatuses`);
        return await response.json();
    }

    /**
	 * Hentar fram alle tasksa frå serveren
     * @private
     * @returns {Promise<Object>} Response-objekt med tasks
     */
    async fetchAllTasks() {
        const response = await fetch(`${this.serviceUrl}/tasklist`);
        return await response.json();
    }

    /**
	 * Lagar ein ny task på serveren
     * @private
     * @param {Object} taskData - Taskdata med tittel og status
     * @returns {Promise<Object>} Response-objekt med "create task"
     */
    async createTask(taskData) {
        const response = await fetch(`${this.serviceUrl}/task`, {
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
    async updateTaskStatus(taskId, status) {
        const response = await fetch(`${this.serviceUrl}/task/${taskId}`, {
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
    async deleteTask(taskId) {
        const response = await fetch(`${this.serviceUrl}/task/${taskId}`, {
            method: 'DELETE'
        });
        return await response.json();
    }

    /**
	 * Viser ein error i message-div-en
     * @private
     * @param {string} message - Erroren som skal visast
     */
    showErrorMessage(message) {
        this._messageDiv.innerHTML = `<p>Error: ${message}</p>`;
    }

    /**
	 * Oppdaterer melding-div-en basert på kor mange tasks vi fann
     * @public
     */
    tasksFound() {
        const numTasks = this._taskListElem.getNumtasks();
        if (!numTasks) {
            this._messageDiv.innerHTML = "<p>No tasks were found.</p>";
        } else {
            this._messageDiv.innerHTML = `<p>Found ${numTasks} tasks.</p>`;
        }
    }
}

customElements.define('task-view', TaskView);

