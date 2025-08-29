const template = document.createElement("template")
template.innerHTML = `
        <link rel="stylesheet" type="text/css" href="${import.meta.url.match(/.*\//)[0]}/dice-callbacktoparent.css">

        <button type="button">Roll dice</button>
    `;

class DiceCallbacktoparent extends HTMLElement {
    #maxeyes = null;
    #callback = null;

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'closed' });
        const content = template.content.cloneNode(true);
        shadow.append(content);

        const dicebt = shadow.querySelector("button");

        // 2: Add child click event handler for "Roll dice"
        dicebt.addEventListener('click', () => { this.#roll() })
    }

    connectedCallback() {
        this.setMaxCount(6);
    }

    setMaxCount(count) {
        this.#maxeyes = count;
    }

    // 1: Child API to add parent callback method as private property of child
    setDicerollcallback(method) {
        this.#callback = method;
    }

    #roll() {
        if (Number.isInteger(this.#maxeyes)) {
            const lastroll = Math.floor(Math.random() * this.#maxeyes) + 1;
            if (this.#callback instanceof Function) {

                /*
                 * 2: Child click event for "Roll dice" handler runs parent callback method.
                 *    Callback is run with the new dice result as parameter. 
                 */
                this.#callback(lastroll);
            }
            console.log(`Dice gave ${lastroll}`)
        } else {
            console.log("First set number of eyes on dice")
        }
    }
}

customElements.define('dice-component', DiceCallbacktoparent);
