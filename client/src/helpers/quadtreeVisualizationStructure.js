let index;
let inputData;
let result;

const addResult = (startX, startY, width, height) => {
    const value = inputData[index + 1];
    // linear interpolation between 0 (red) and 240 (blue)
    // values between 0 and 255
    const hslaValue = 240 - ((240 / 255) * value);
    result.push({
        width,
        height,
        x: startX,
        y: startY,
        value,
        color: `hsla(${hslaValue}, 100%, 50%, 1)`,
    });
};

const addQuarter = (depth, startX, startY, width, height) => {
    if (inputData[index] === depth) {
        addResult(startX, startY, width, height);
        index += 2;
    } else {
        const nextDepth = depth + 1;
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        addQuarter(nextDepth, startX, startY, halfWidth, halfHeight);
        addQuarter(nextDepth, startX + (width / 2), startY, halfWidth, halfHeight);
        addQuarter(nextDepth, startX, startY + (height / 2), halfWidth, halfHeight);
        addQuarter(nextDepth, startX + (width / 2), startY + (height / 2), halfWidth, halfHeight);
    }
};

export default (data, width, height) => {
    index = 0;
    inputData = data;
    result = [];

    addQuarter(0, 0, 0, width, height);

    return result;
};
