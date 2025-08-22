// Create list of all paragraphs in the document
const paragraphs = document.querySelectorAll("p")

paragraphs.forEach((p) => {console.log(p.textContent)})

paragraphs[0].textContent ="Modifisert innhold"