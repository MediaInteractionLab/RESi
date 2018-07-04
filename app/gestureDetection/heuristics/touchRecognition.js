const blobDetector = require('../../util/blobdetector');
const slideGestureRecognizer = require('../../util/SlideGestureRecognizer');
const unique = require('../../util/ArrayHelper')

const DELAY = 10; // samples
const TAP_THRESHOLD = 30; // threshold when tap is fired
const TAP_MAX_MOVE_THRESHOLD = 2; // threshold for maximum movement of tap
const TAP_LIFE_MAX_FRAMES = 10; // threshold how long a tap duration can be at maximum
const SLIDE_THRESHOLD = 10; // threshold when point is taken into account for slide gestures
const TOUCH_FREQUENCY = 1; // frequency how often a touch update event will be sent

var samplesToDelay = 0; // counter to delay gesture recognition in order to wait for new inputs
var frequencyCounter = 0;

var currentTap = undefined;
var taps = 1;
var isTapActive = false;

var currentSlidePoints = []
var isSlideActive = false;

class TouchRecognition {
    reset() {
        isTapActive = false;
        isSlideActive = false;
        currentTap = undefined
        currentSlidePoints = []
    }

    analyze(data, rows, cols, filterResetCallback) {
        // decrease sample count in order to wait for new inputs
        if(samplesToDelay >= 0) samplesToDelay = samplesToDelay - 1;

        var blobs = blobDetector.detect(data, rows, cols, 20, 2);
        var tapResult = this.evaluateTap(blobs);
        var slideResult = this.evaluateSlide(blobs);
        if(slideResult !== undefined) {
            filterResetCallback();
            return slideResult;
        }
        else return tapResult;
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

    getTapLabel() {
        if (taps === 2) return 'Double Tap';
        else if (taps === 3) return 'Triple Tap';
        return 'Tap';
    }

    prepareGestureObject(blob, label) {
        return { name: `${label} (${blob.center.y}/${blob.center.x})`, position: blob.center, force: blob.maxValue, duration: 1 }
    }

    evaluateTap(blobs) {
        frequencyCounter = frequencyCounter - 1;
        let activeBlobs = this.getActiveBlobs(blobs, TAP_THRESHOLD);
        //console.log('active:',activeBlobs)

        // tap released
        if (isTapActive && activeBlobs.length === 0) {  
            isTapActive = false;
        }
        if(currentTap !== undefined && samplesToDelay === 0) {
            var gesture = currentTap;
            if(gesture.duration >= TAP_LIFE_MAX_FRAMES) {
                gesture = undefined;
            }
            currentTap = undefined;
            taps = 1;
            return gesture;
        }

        // tap update
        if (isTapActive && activeBlobs.length >= 1) {

            // check if tap exceeded move delta
            var deltaX = Math.abs(activeBlobs[0].center.x-currentTap.position.x);
            var deltaY = Math.abs(activeBlobs[0].center.y-currentTap.position.y);
            if(currentTap !== undefined && (deltaX >= TAP_MAX_MOVE_THRESHOLD || deltaY >= TAP_MAX_MOVE_THRESHOLD)) {
                isTapActive = false;
                currentTap = undefined;
            }

            // update tap properties
            if(currentTap !== undefined) {
                if (activeBlobs[0].maxValue > currentTap.force) currentTap.force = activeBlobs[0].maxValue;
                currentTap.duration = currentTap.duration + 1;
                currentTap.position = activeBlobs[0].center;
                currentTap.name = `${this.getTapLabel()} (${activeBlobs[0].center.y}/${activeBlobs[0].center.x})`;
            } 

            // restart delaying
            samplesToDelay = DELAY;
        }

        // tap down
        if (!isTapActive && activeBlobs.length >= 1) {
            if(currentTap !== undefined) taps = taps + 1;
            
            isTapActive = true;
            samplesToDelay = DELAY;
            currentTap = this.prepareGestureObject(activeBlobs[0], this.getTapLabel());

            return this.prepareGestureObject(activeBlobs[0], 'Touch Down');
        }

        // return touch feedback
        activeBlobs = this.getActiveBlobs(blobs, 0);
        if(activeBlobs.length > 0 && frequencyCounter <= 0) {
            frequencyCounter = TOUCH_FREQUENCY;
            return this.prepareGestureObject(activeBlobs[0], 'Touch');
        }

        return undefined;
    }

    evaluateSlide(blobs) {
        let activeBlobs = this.getActiveBlobs(blobs, SLIDE_THRESHOLD);        

        // slide released
        if (isSlideActive && currentSlidePoints.length >= 1 && samplesToDelay === 0) {
            isSlideActive = false;
            currentSlidePoints = unique(currentSlidePoints, ['x', 'y'])
            var slideResult = slideGestureRecognizer.getGestureType(currentSlidePoints, 2)
            //console.log(slideResult, currentSlidePoints)
            if(slideResult !== 'none') {
                return { name: `Slide (${slideResult})`, direction: slideResult }
            }
        }

        // slide update
        if (isSlideActive && activeBlobs.length >= 1) {
            samplesToDelay = DELAY;
            activeBlobs.forEach((blob) => {
                currentSlidePoints.push(blob.center)
            })
        }

        // slide start
        if (!isSlideActive && activeBlobs.length >= 1) {
            currentSlidePoints = []       
            activeBlobs.forEach((blob) => {
                currentSlidePoints.push(blob.center)
            })
            isSlideActive = true;
        }

        return undefined;
    }
}

const touchRecogntionInstance = new TouchRecognition();
module.exports = touchRecogntionInstance;
