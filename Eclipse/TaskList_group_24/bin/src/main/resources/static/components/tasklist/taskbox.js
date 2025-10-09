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

/**
 * TaskBox-komponenten
 * Held styr på ein modal-dialog for laging av nye tasks
 * Gir oss form-grensesnittet med tittel-inputt og status-dropdown
 */

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

    /**
     * @public
     * @description Viser task creation form, slettar tidlegare inputt og fokuserer tittelfeltet
     */
    show() {
        this.dialog.showModal();
        this.input.value = "";
        this.input.focus();
    }

    /**
     * @public
     * @param {Array<string>} list - Array med statusstrengar (["WAITING", "ACTIVE", "DONE"])
     * @description Oppdaterer status-dropdown-menyen med den gitte lista av statusar. Viss inputten ikkje er ein array, så set vi det til å bli ein tom array i staden for.
     */
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

    /**
     * @public
     * @param {Function} callback - Funksjonen vi kallar når "Add task"-knappen har blitt klikka.
     * @param {Object} callback.task - Taskobjekt sendt til callback-en
     * @param {string} callback.task.title - Task-feltet frå inputfeltet
     * @param {string} callback.task.status - Den valde statusen frå dropdown-menyen
     * @description Legg til ein callback-funksjon til lista av funksjonar som blir kalla når brukaren legg til ein ny task. Callback-en får eit task-objekt med tittel og statuseigenskapar.
     */
    addNewtaskCallback(callback) {
        if (typeof callback === "function") {
            this.callbacks.push(callback);
        }
    }

    /**
	 * Lukkar igjen modal-dialogen enten ved å trykke på x-en, bruke escape eller kalle denne metoden programmatisk.
     * @public
     */
    close() {
        this.dialog.close();
    }
}

customElements.define('task-box', TaskBox);