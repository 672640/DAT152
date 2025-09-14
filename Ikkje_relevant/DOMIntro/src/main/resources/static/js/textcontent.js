const element = document.querySelector("h1:first-child");

const oldContent = element.textContent;

console.log(`${element.tagName} was: ${oldContent}`);

element.textContent = "Welcome to DAT152";