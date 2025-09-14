"use strict";

class FormManager {
    #rootElement;

    constructor() {
        this.#rootElement = document.getElementById('root');

        const button = this.#rootElement.querySelector("button");
        button.addEventListener("click", this.#calculate.bind(this));
    }

    async #calculate() {
        const value = this.#rootElement.querySelector("input[type=number]").value.trim();
        if (value === "") {
            this.#rootElement.querySelector("span").textContent = "";
            this.#rootElement.querySelector("input[type=number]").value = "";
        } else {
            const object = await import('./modules/utils.js');
            let converter = object.default;
            const feet = converter.metrestofeet(value);
            this.#rootElement.querySelector("span").textContent = feet;
        }
    }
}

new FormManager;


