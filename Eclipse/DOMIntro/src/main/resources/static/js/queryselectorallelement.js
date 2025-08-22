const elements = document.getElementById("root").querySelectorAll("body *");

console.log(`BODY contains ${elements.length} HTML elements`);

elements.forEach(e => {
	console.log(`Tag ${e.tagName}: ${e.textContent}`)
})
