
const THRESHOLD = 2;

class SimpleTouch {
    analyze(data) {
        // iterate data and look for elevated values
        for(let i = 0; i < data.length; i++) {
            if(data[i] > THRESHOLD) {
                return { name: 'Touch', force: data[i] };
            }
        }
        return undefined;
    }
    reset() { }
}

const simpleTouchInstance = new SimpleTouch();
module.exports = simpleTouchInstance;
