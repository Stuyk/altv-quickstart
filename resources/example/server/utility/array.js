/**
 * Shuffle an array.
 * @param  {} array
 * @returns {Array<any>}
 */
export function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
