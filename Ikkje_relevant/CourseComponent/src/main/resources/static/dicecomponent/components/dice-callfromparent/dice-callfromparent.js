const template = document.createElement("template")
template.innerHTML = `
        <link rel="stylesheet" type="text/css" href="${import.meta.url.match(/.*\//)[0]}/dice-callfromparent.css">

        <button type="button">Roll dice</button>
    `;

class DiceCallfromparent extends HTMLElement {
    #maxeyes = null;
    #lastroll = null;

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'closed' });
        const content = template.content.cloneNode(true);
        shadow.append(content);

        const dicebt = shadow.querySelector("button");
        dicebt.addEventListener('click', () => { this.#roll() })
    }

    connectedCallback() {
        this.setMaxCount(6);
    }

    setMaxCount(count) {
        this.#maxeyes = count;
    }

    #roll() {
        if (Number.isInteger(this.#maxeyes)) {
            this.#lastroll = Math.floor(Math.random() * this.#maxeyes) + 1;
            console.log(`Dice gave ${this.#lastroll}`)
        } else {
            console.log("First set number of eyes on dice")
        }
    }

    getEyeCount() {
        return this.#lastroll;
    }
}

customElements.define('dice-component', DiceCallfromparent);
