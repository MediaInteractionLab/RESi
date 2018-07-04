"use strict";

const Filter = require('./Filter');

class RotationFilter extends Filter {

    constructor(id) {
        super(id);
    }

    filter(data, rows, cols) {
        const dataMatrix = this.arrayToMatrix(data, rows, cols);
        const filteredData = this.matrixToArray(this.rotate(dataMatrix, rows, cols));
        return filteredData;
    }

    static getName() {
        return 'Rotation Filter';
    }

    arrayToMatrix(array, rows, cols) {
        const matrix = [];
        
        for(let i = 0; i < cols; i++) {
            matrix[i] = [];
            for(let j = 0; j < rows; j++) {
                matrix[i][j] = array[(j * cols) + i];
            }
        }
        return matrix;
    }

    rotate(dataMatrix, rows, cols) {
        const result = [];

        // notice: width and height are exchanged because they 
        // change when an asymmetric matrix is rotated
        for(let i = 0; i < rows; i++) {
            result[i] = [];
            for(let j = 0; j < cols; j++) {
                result[i][j] = (dataMatrix[j][rows - i - 1]);
            }
        }

        return result;
    }

    matrixToArray(matrix) {
        const array = [];
        
        for(let i = 0; i < matrix.length; i++) {
            for(let j = 0; j < matrix[0].length; j++) {
                array[(j * matrix.length) + i] = matrix[i][j];
            }
        }
        return array;
    }
}

module.exports = RotationFilter;