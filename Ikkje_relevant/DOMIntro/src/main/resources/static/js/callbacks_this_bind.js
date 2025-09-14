"use strict";

class Demo {
    constructor(rootElement) {
        console.log(`A: Keyword 'this' has the value ${this}, an instance of class '${this.constructor.name}'`);

        rootElement.querySelectorAll("button[type='button']")[0].addEventListener("click", ()=>{console.clear()});

        rootElement.querySelectorAll("button[type='button']")[1].addEventListener("click", this.showThisB);

        this.showThisC = this.showThisC.bind(this);
        rootElement.querySelectorAll("button[type='button']")[2].addEventListener("click", this.showThisC);

        rootElement.querySelectorAll("button[type='button']")[3].addEventListener("click",
            (event) => {
                console.log(`D: Keyword 'this' has the value ${this}, an instance of class '${this.constructor.name}'`);
                console.log(`D: Property 'target' of the event has the value ${event.target}, an instance of class '${event.target.constructor.name}'`);
            }
        );

    }

    showThisB(event) {
        console.log(`B: Keyword 'this' has the value ${this}, an instance of class '${this.constructor.name}'`);
        console.log(`B: Property 'target' of the event has the value ${event.target}, an instance of class '${event.target.constructor.name}'`);
    }

    showThisC(event) {
        console.log(`C: Keyword 'this' has the value ${this}, an instance of class '${this.constructor.name}'`);
        console.log(`C: Property 'target' of the event has the value ${event.target}, an instance of class '${event.target.constructor.name}'`);
    }
}

function init() {
    const rootElement = document.getElementById("root");
    new Demo(rootElement);
}

document.addEventListener('DOMContentLoaded', init);
