"use strict";

function demo0() {
    const elmRef = document.getElementById("welcome");
    console.log(`Element ${elmRef.tagName} has ${elmRef.classList.length} class names`);
}

function demo1() {
    const elmRef = document.getElementById("welcome");

    elmRef.classList.forEach(
        (className, index) => {
            console.log(`Element has class navn '${className}' in list with index ${index}`);
        }
    );
}

function demo2() {
    const elmRef = document.getElementById("welcome");

    for (let i = 0; i < elmRef.classList.length; ++i) {
        console.log(`classList[${i}] is '${elmRef.classList[i]}'`);
    }
}

function doToggle(className) {
    const elmRef = document.getElementById("welcome");
    const inList = elmRef.classList.toggle(className);
    console.log(`Did toggle class name '${className}' on ${elmRef.tagName} element`);
    if (inList) {
        console.log(`Class name '${className}' was added to list`);
    } else {
        console.log(`Class name '${className}' was removed from list`);
    }
}

function demo3() {
    doToggle("details");
}

function demo4() {
    doToggle("example");
}

function demo5() {
    doToggle("webdisplay");
}

function checkClassName(className) {
    const elmRef = document.getElementById("welcome");

    if (elmRef.classList.contains(className)) {
        console.log(`Element has '${className}' as a class name attribute`);
    } else {
        console.log(`Element does NOT have '${className}' as a class name attribute`);
    }
}

function demo6() {
    checkClassName("details");
}

function demo7() {
    checkClassName("example");
}

function demo8() {
    checkClassName("webdisplay");
}

function demo9() {
    const elmRef = document.getElementById("welcome");
    console.log("Fjerner alle class navn fra element");
    elmRef.classList.remove(...elmRef.classList.values());
}


function demo10() {
    const elmRef = document.getElementById("welcome");

    while (elmRef.classList.length > 0) {
        console.log(`Fjerner class navn '${elmRef.classList[0]}' fra element`);
        elmRef.classList.remove(elmRef.classList[0]);
    }
}

function demo11() {
    const elmRef = document.getElementById("welcome");
    console.log("Fjerner alle class navn fra element");
    elmRef.className = null;
}

function demo12() {
    const elmRef = document.getElementById("welcome");

    elmRef.classList.add("details");
    console.log("Har lagt til class navn 'details' for element");
}

function demo13() {
    const elmRef = document.getElementById("welcome");

    elmRef.classList.add("example");
    console.log("Har lagt til class navn 'example' for element");
}

function demo14() {
    const elmRef = document.getElementById("welcome");

    elmRef.classList.add("webdisplay");
    console.log("Har lagt til class navn 'webdisplay' for element");
}

const demomanager = {
    init(demoHandler) {
        this.demoHandler = demoHandler;
        this.viewcode = this.viewcode.bind(this);

        /**
        * Legger til lytter for hendelse 'click' på alle HTML BUTTON elementer.
        * Ved 'click' på en HTML BUTTON kjøres flere metoder:
        * 1. console.clear som tømmer konsollet
        * 3. En metode gitt av elementet sitt attributt 'data-demo'.
        * 2. Objektet sin metode 'viewcode' som viser kilden for metoden i punktet over.
        * Verdien til 'data-demo' er 'demo0' for første BUTTON, 'demo1' for neste osv.
        */

        const buttons = this.demoHandler.getElementsByTagName("button");
        Array.from(buttons).forEach(
            (button) => {
                const methodName = button.getAttribute("data-demo");
                if (window[methodName] === undefined) return;
                const method = window[methodName];
                if (typeof method !== "function") return;
                button.addEventListener('click', console.clear, true);
                button.addEventListener('click', this.viewcode, true);
                button.addEventListener("click", method);
            }
        )
    },

    viewcode(event) {
        const viewElm = this.demoHandler.querySelector("pre[data-viewelm]");
        const methodName = event.target.getAttribute("data-demo");
        if (window[methodName] === undefined) return;

        let functext;

        switch (methodName) {
            case "demo3":
            case "demo4":
            case "demo5":
                functext = doToggle.toString();
                functext += "\n\n";
                break;
            case "demo6":
            case "demo7":
                functext = checkClassName.toString();
                functext += "\n\n";
                break;
            default:
                functext = ""
        }

        functext += window[methodName].toString();
        viewElm.textContent = functext;
        viewElm.classList.add("demo");
    }
}

function init() {
    const rootDemoHandler = document.getElementById("demoHandler");
    demomanager.init(rootDemoHandler);
}
document.addEventListener('DOMContentLoaded', init);
