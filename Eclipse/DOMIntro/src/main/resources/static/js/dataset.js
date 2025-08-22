const courselement = document.querySelector("p[data-course]");

const course = courselement.dataset.course;

const topic = courselement.dataset.courseTopic;  // data-topic
console.log(courselement);

courselement.textContent = `Welcome to the ${topic} part of ${course}`;
