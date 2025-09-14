import converter from './modules/utils.js';

const metres = 10;

const feet = converter.metrestofeet(metres);

console.log(`A length of ${metres} metres is ${feet} feet`);