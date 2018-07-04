const blobDetector = require('../../util/blobdetector');

const DELAY = 10; // samples
const ROTATION_THRESHOLD = 50; // threshold when point is taken into account for rotation gestures

var samplesToDelay = 0; // counter to delay gesture recognition in order to wait for new inputs

var isRotationActive = false;
var rotationPosition = -1;

class RotationKnobRecognition {
    reset() {
        isRotationActive = false;
    }

    analyze(data, rows, cols, filterComposite) {
        // decrease sample count in order to wait for new inputs
        if(samplesToDelay >= 0) samplesToDelay = samplesToDelay - 1;

        var blobs = blobDetector(data, rows, cols, 20, 2);
        var rotationResult = this.evaluateRotation(blobs);
        
        return rotationResult;
    }

    getActiveBlobs(blobs, threshold) {
        let activeBlobs = [];
        blobs.forEach((blob) => {
            if(blob.maxValue > threshold) {
                activeBlobs.push(blob)
            }
        })

        // sort by value
        activeBlobs.sort(function(a, b) {
            if (a.maxValue < b.maxValue) {
                return -1;
            }
            else if (a.maxValue > b.maxValue) {
                return 1;
            }
            return 0;
        });

        return activeBlobs;
    }

    evaluateRotation(blobs) {
        let activeBlobs = this.getActiveBlobs(blobs, ROTATION_THRESHOLD);        

        // rotation released
        if (isRotationActive && samplesToDelay === 0) {
            isRotationActive = false;
            rotationPosition = -1;
        }

        // rotation update
        if (isRotationActive && activeBlobs.length >= 1) {
            samplesToDelay = DELAY;
            rotationPosition = activeBlobs[0].center.x;
        }

        // rotation start
        if (!isRotationActive && activeBlobs.length >= 1) { 
            samplesToDelay = DELAY;
            rotationPosition = activeBlobs[0].center.x;
            isRotationActive = true;
        }

        return isRotationActive ? { name: `Rotation (${rotationPosition})`, position: rotationPosition } : undefined;
    }
}

const rotationKnobRecogntionInstance = new RotationKnobRecognition();
module.exports = rotationKnobRecogntionInstance;
