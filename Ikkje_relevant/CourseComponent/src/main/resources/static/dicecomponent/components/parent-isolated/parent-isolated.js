import "../dice-isolated/dice-isolated.js";

const template = document.createElement("template")
template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="${import.meta.url.match(/.*\//)[0]}/parent-isolated.css">

    <h1>Isolated dice component</h1>

    <p>In this demonstration, the dice is completely isolated from its surroundings.
     There is no communication neither to or from the component.</p>
    
    <dice-component></dice-component>`;

class ParentIsolated extends HTMLElement {
   constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'closed' });
        const content = template.content.cloneNode(true);
        shadow.append(content);        
    }
}

customElements.define('parent-component', ParentIsolated);
