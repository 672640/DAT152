/* Should here have used a class or object, but that
 * would have made the code longer.
 */

function setcourse() {
    const inputElement = document.querySelector("input[type=text]");
    const course = inputElement.value.trim();
    if (course === "") {
        inputElement.value = "";
        return;
    }

    const spanElement = document.querySelector("h1").querySelector("span");
    spanElement.textContent = course;
}

const button = document.querySelector("button");
button.addEventListener("click", setcourse);
