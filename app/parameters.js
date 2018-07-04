const path = require('path');

const settings = {
    csvFile: {
        path: path.join(__dirname, 'data', 'resources'),
        name: 'learningData.csv',
    },
    svmModelFile: {
        path: path.join(__dirname, 'data', 'resources'),
        name: 'svmModelData.txt',
    },
};

module.exports = settings;
