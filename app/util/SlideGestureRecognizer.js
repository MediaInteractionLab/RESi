
class SlideGestureRecognizer {  

    static getLength(vector) {
        return Math.sqrt(Math.pow(vector.x, 2)+Math.pow(vector.y, 2));
    }

    static getAngle(vector) {
        return Math.atan2(vector.y, vector.x) * 180.0 / Math.PI;
    }

    static getGestureType(points, slideThreshold = 2) {
        if (points.length === 0) throw new Error("No points were specified for Gesture Recognition.");
        var xSum = 0, ySum = 0;

        // get sum of deltas and store values for median calculation
        var last = undefined
        var xValues = []
        var yValues = []
        points.forEach((point) => {
            if(last) {
                xSum = xSum + (point.x - last.x);
                ySum = ySum + (point.y - last.y);
            }
            xValues.push(point.x);
            yValues.push(point.y);
            last = point;
        })

        // get x and y median
        xValues.sort(function(a, b){return a-b});
        yValues.sort(function(a, b){return a-b});
        var index = Math.floor(points.length / 2);
        var medianX = xValues[index];
        var medianY = yValues[index];

        // get distances to median
        var medianDistancesX = 0;
        var medianDistancesY = 0;
        points.forEach((point) => {
            medianDistancesX = medianDistancesX + Math.abs(point.x - medianX);
            medianDistancesY = medianDistancesY + Math.abs(point.y - medianY);
        });

        // check whether we exceed slide bounds
        if (Math.abs(xSum) < slideThreshold && Math.abs(ySum) < slideThreshold)
            return 'none';

        // check direction
        // console.log('slide', xSum, ySum, medianDistancesX, medianDistancesY)
        if (Math.abs(xSum) > Math.abs(ySum) && Math.abs(medianDistancesX) > Math.abs(medianDistancesY)) {
            if(xSum > 0) return 'right';
            else return 'left';
        } else {
            if(ySum > 0) return 'down';
            else return 'up';
        }
    }
}

module.exports = SlideGestureRecognizer;