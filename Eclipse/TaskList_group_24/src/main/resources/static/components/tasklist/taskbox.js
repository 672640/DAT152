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
//export... export-ar taskbox
export class TaskBox extends HTMLElement {
//Endra alle metodane til å bli private, bortsett frå show, setStatusesList, addNewtaskCallback og close.
    constructor() {
        super();
/**Gjeld for tasklist og taskview også:
 * Når vi endrar attachShadow til "closed", så kan ikkje vi bruke this.shadowRoot lenger.
 * Den enklaste løysinga var å lagre shadowRoot i ein privat "shadow" variabel.
 * Nå som den er closed, så kan vi bruke shadow kor vi vil hen, mens shadowRoot ikkje er sett.
 * Nå kan ikkje komponent få tilgong til innsida av attachShadow gjennom shadowRoot-property-en
 */

//Generelt for alle: La til sikrare booleanslogikk.

        this._shadow = this.attachShadow({ mode: "closed" });
        this._shadow.appendChild(template.content.cloneNode(true));
        this._statuses = [];
        this._callbacks = [];
        this._dialog = this._shadow.querySelector("dialog");
        this._input = this._shadow.querySelector("input");
        this._select = this._shadow.querySelector("select");
        this._closeButton = this._shadow.querySelector("span");
        this._submitButton = this._shadow.querySelector("button[type='submit']");
        this._closeButton.addEventListener("click", () => this.close());
        this._dialog.addEventListener("cancel", () => this.close());
        this._submitButton.addEventListener("click", () => {
            const title = this._input.value.trim();
            const status = this._select.value;
            if (title != null && status != null) {
                const task = { title, status };
                this._callbacks.forEach(callback => callback(task));
            }
        });
    }

    /**
     * @public
     * @description Viser task creation form, slettar tidlegare inputt og fokuserer tittelfeltet
     */
    show() {
        this._dialog.showModal();
        this._input.value = "";
        this._input.focus();
    }

    /**
     * @public
     * @param {Array<string>} list - Array med statusstrengar (["WAITING", "ACTIVE", "DONE"])
     * @description Oppdaterer status-dropdown-menyen med den gitte lista av statusar. Viss inputten ikkje er ein array, så set vi det til å bli ein tom array i staden for.
     */
/*Gjeld for alt som brukte/bruker innerHTML:
	Vi bruker innerHTML på metodar som klargjer eksisterande innhald, som select.innerHTML = "", sidan det er noko brukaren ikkje har
	tilgong til og kan endre på, så det er ingen risiko for XSS-angrep.
	Resten endra vi til innerText, sidan dei metodane skal sette inn rein tekst, som p.innerText = `Found ${numTasks} tasks.`;. Dette kan ha
	XSS-angrepsrisiko, sidan det er ting brukaren kan endre på. Vi måtte også endre litt på korleis vi handterte <p></p>, sidan innerText berre
	returnerer rein tekst, der <p> blir returnert som <p> og lagar ikkje eit paragraf. Det fiksa vi med f.eks.:
	const p = document.createElement("p");
	p.innerText = `Found ${numTasks} tasks.`;
	this._messageDiv.appendChild(p);
*/
    setStatuseslist(list) {
        if (Array.isArray(list) != null) {
            this._statuses = list;
        } else this._statuses = [];
        this._select.innerHTML = "";
        for (const status of this._statuses) {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            this._select.appendChild(option);
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
        if (typeof callback === "function" && typeof callback != null) {
            this._callbacks.push(callback);
        }
    }

    /**
	 * Lukkar igjen modal-dialogen enten ved å trykke på x-en, bruke escape eller kalle denne metoden programmatisk.
     * @public
     */
    close() {
        this._dialog.close();
    }
}

customElements.define('task-box', TaskBox);