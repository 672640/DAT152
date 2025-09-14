export default a={
    '_feettometer': 0.3048,

    metrestofeet(metres) {
        return metres / this._feettometer;
    },

    feettometres(feet) {
        return feet * this._feettometer;
    }
}
