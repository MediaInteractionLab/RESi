let index;
let inputData;
let result;
let width;
let maxDepth;

const addLastQuarter = (startX, startY) => {
    result[(startY * width) + startX] = inputData[index];
    result[(startY * width) + startX + 1] = inputData[index + 1];
    result[((startY + 1) * width) + startX] = inputData[index + 2];
    result[((startY + 1) * width) + startX + 1] = inputData[index + 3];
    index += 4;
};

const addQuarter = (startX, startY, level) => {
    if (level === 1) {
        addLastQuarter(startX, startY);
    } else {
        const quarterLevel = level - 1;
        const quarterSize = (2 ** quarterLevel);
        addQuarter(startX, startY, quarterLevel);
        addQuarter(startX + quarterSize, startY, quarterLevel);
        addQuarter(startX, startY + quarterSize, quarterLevel);
        addQuarter(startX + quarterSize, startY + quarterSize, quarterLevel);
    }
};

const flattenInputData = (data) => {
    inputData = [];
    for (let i = 0; i < data.length; i += 2) {
        const level = maxDepth - data[i]; // max depth - actual depth
        const value = data[i + 1];
        const numberOfOccurences = 2 ** level;
        for (let j = 0; j < numberOfOccurences * numberOfOccurences; j++) {
            inputData.push(value);
        }
    }
};

export default (mDepth, data) => {
    index = 0;
    maxDepth = mDepth;
    width = 2 ** maxDepth;
    flattenInputData(data);
    result = [];

    addQuarter(0, 0, maxDepth);
    return result;
};
