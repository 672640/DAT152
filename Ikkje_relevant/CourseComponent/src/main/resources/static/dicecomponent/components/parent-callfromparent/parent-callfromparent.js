import "../dice-callfromparent/dice-callfromparent.js";

const template = document.createElement("template")
template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="${import.meta.url.match(/.*\//)[0]}/parent-callfromparent.css">
    
    <h1>Dice component with calls from parent</h1>

    <p>In this demonstration, the parent component issues calls to its child dice component.</p>
    
    <dice-component></dice-component>
    
    <button>Get result</button>
    
    <p>Result was: <span></span>`;

class ParentCallfromparent extends HTMLElement {
    #dice;
    #resultElement;
    #shadow;

    constructor() {
        super();

        this.#shadow = this.attachShadow({ mode: 'closed' });
        const content = template.content.cloneNode(true);
        this.#shadow.append(content);

        this.#resultElement = this.#shadow.querySelector("span");

        const btresult = this.#shadow.querySelector("button");
        btresult.addEventListener('click', () => { this.#showresult() })
    }

    connectedCallback() {
        this.#dice = this.#shadow.querySelector("dice-component");
        this.#dice.setMaxCount(10);
    }

    #showresult() {
        const lastroll = this.#dice.getEyeCount();
        if (lastroll !== null) {
            this.#resultElement.textContent = lastroll;
        }
    }
}

customElements.define('parent-component', ParentCallfromparent);
