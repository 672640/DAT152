import "../dice-callbacktoparent/dice-callbacktoparent.js";

const template = document.createElement("template")
template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="${import.meta.url.match(/.*\//)[0]}/parent-callbacktoparent.css">
    
    <h1>Dice component with callback to parent</h1>

    <p>In this demonstration, the parent component register a callback on its child dice component.</p>

    <!-- Below line will create child component the child dice-compomnent -->
    <dice-component></dice-component>
    
    <p>Result was: <span></span>`;

class ParentCallbacktoparent extends HTMLElement {
    #dice;
    #resultElement;
    #shadow;

    constructor() {
        super();

        this.#shadow = this.attachShadow({ mode: 'closed' });
        const content = template.content.cloneNode(true);

        // 1: Create child component for HTML custom tag dice-component
        this.#shadow.append(content);

        // 1: Add parent method #showresult as callback to child using child API
        this.#dice = this.#shadow.querySelector("dice-component");
        this.#dice.setDicerollcallback(this.#showresult.bind(this));
        //this.#dice.setDicerollcallback((eyes) => {this.#showresult(eyes)});

        this.#resultElement = this.#shadow.querySelector("span");
    }

    connectedCallback() {
        this.#dice.setMaxCount(60);
    }

    #showresult(eyes) {
        // 3: Update property that displays the dice result
        this.#resultElement.textContent = eyes;
    }
}

customElements.define('parent-component', ParentCallbacktoparent);
