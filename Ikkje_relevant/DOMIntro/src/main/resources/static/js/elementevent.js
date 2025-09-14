const button = document.querySelector("button");

button.addEventListener("click",
	(event) => {
		console.log(`You clicked on a ${event.target.tagName} tag`)
	}
);