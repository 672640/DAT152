const date = new Date();
const addYears = 5000;
date.setFullYear(date.getFullYear() + addYears);

const options = { weekday: 'long' };
console.log(`Today date in ${addYears} years will be a ${date.toLocaleDateString("en-GB", options)}.`);
