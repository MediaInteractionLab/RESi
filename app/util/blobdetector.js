const HISTOGRAM_BINS = 20;

class BlobDetector {

    static createEmptyHistogram() {
        let histogram = [];
        for(let i = 0; i < HISTOGRAM_BINS; i++)
            histogram.push(0);
        return histogram;
    }

    static createBlob(centerX, centerY, averageValue, maxValue, left, right, top, bottom, histogram, sensorCount) {
        if (histogram === undefined || histogram.length === 0) histogram = this.createEmptyHistogram();
        return {
            center: {
                x: centerX,
                y: centerY
            },
            averageValue: averageValue,
            maxValue: maxValue,
            boundingBox: { 
                left: left, 
                right: right, 
                top: top, 
                bottom: bottom },
            histogram: histogram,
            sensorCount: sensorCount
        }
    }

    static convertToBinary(data, threshold) {
        var binaryData = []
        for (var i = 0; i < data.length; i++) {
            if(data[i] >= threshold) binaryData[i] = 0;
            else binaryData[i] = 1;
        }
        return binaryData;
    }
    
    static detect(data, rows, cols, threshold = 40, radius = 1) {
        var binaryData = this.convertToBinary(data, threshold);
        var height = rows;
        var width = cols;
        var blobs = [];
        var idx;
        var idp;
        var blobs_neighbor;
        var y_start, y_end, x_start, x_end;
        // Running through all of the pixels
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                // Get index
                idx = (width * y + x);
                idp = (width * y + x);
                
                // Check if value is foreground
                if (binaryData[idx] === 0) {
                    blobs_neighbor = [];
                    
                    // Now we run through all of known blobs to search if any of them has a neighbor member of our current pixel
                    for (var i = 0; i < blobs.length; i++) {
                        // TODO : make the radius area into a circle instead of a square
                        y_start = y - radius;
                        y_end = y + 1;
                        x_start = x - radius;
                        x_end = x + radius + 1;
                        
                        // Now we check every neighbor pixel to check if any of them is member of any blob
                        neighborhoodwatch: for (var y2 = y_start; y2 < y_end; y2++) {
    
                            for (var x2 = x_start; x2 < x_end; x2++) {
                                idx = (width * y2 + x2);
    
                                var res1 = blobs[i].indexOf(idx);
                                if (res1 !== -1) {
                                    blobs_neighbor.push(i);
                                    
                                    // If we find a neighbor we break the neighborhoodwatch label in order to save resources
                                    break neighborhoodwatch;
                                }
    
                            }
                        }
    
                    }
                    
                    // If we didn't find any neighbor particle we define a new blob
                    if (blobs_neighbor.length === 0) {
                        blobs.push([ idp ]);
                        
                        // If there was a neighbor blob we add the pixel to it
                    } else if (blobs_neighbor.length === 1) {
    
                        blobs[blobs_neighbor[0]].push(idp);
                        
                        // If there were more than one neighbor blob we merge all of them then add the pixel to it
                    } else if (blobs_neighbor.length > 1) {
    
                        for (var pi = 1; pi < blobs_neighbor.length; pi++) {
                            
                            // Merge to the first neighbor we saw
                            Array.prototype.push.apply(
                                blobs[blobs_neighbor[0]],
                                blobs[blobs_neighbor[pi]]);
                            
                            // Remove the extra
                            blobs.splice(blobs_neighbor[pi], 1);
                        }
                        
                        // Add pixel to the final blob
                        blobs[blobs_neighbor[0]].push(idp);
    
                    }
    
                }
    
            }
        }
    
        var resultingBlobs = [];
        
        // Running through blobs we found so we can make a nice result
        for (var b = 0; b < blobs.length; b++) {
            var particlex = 0;
            var particley = 0;
            var values = 0;
            var maxValue = 0;
            var minX = Number.MAX_VALUE;
            var maxX = 0;
            var minY = Number.MAX_VALUE;
            var maxY = 0;
            var histogram = this.createEmptyHistogram();
            
            // Calculating center of gravity based on average Xs and Ys and average force
            for (var p = 0; p < blobs[b].length; p++) {
                // store values to calculate center
                var yp = Math.floor(blobs[b][p] / width);
                var xp = blobs[b][p] - (yp * width);
                particlex += xp;
                particley += yp;
                
                // store & calculate values
                var originalValue = data[blobs[b][p]];
                values += originalValue;
                if(originalValue > maxValue) maxValue = originalValue;
    
                // store histogram
                if(originalValue < 0) originalValue = 0;
                if(originalValue > 255) originalValue = 255;
                var index = Math.floor(originalValue / 255.0 * (HISTOGRAM_BINS - 1));
                histogram[index] = histogram[index] + 1;
    
                // calculate bounding box
                if(xp < minX) minX = xp;
                if(xp > maxX) maxX = xp;
                if(yp < minY) minY = yp;
                if(yp < maxY) maxY = yp;
            }
            
            var particleavgx = Math.round(particlex / blobs[b].length);
            var particleavgy = Math.round(particley / blobs[b].length);
            var valueavg = Math.round(values / blobs[b].length)
            
            // Pushing center of gravity and mess ( number of pixels ) into an array+
            const blob = this.createBlob(
                particleavgx, 
                particleavgy, 
                valueavg, 
                maxValue, 
                minX, 
                maxX, 
                minY, 
                maxY, 
                histogram, 
                blobs[b].length)
            resultingBlobs.push(blob);
        }
        
        // Returning the final result
        return resultingBlobs;
    }    
}

module.exports = BlobDetector;


