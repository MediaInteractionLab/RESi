module.exports = function(data, rows, cols) {
    const filteredData = data.filter((d, i) => i !== 1);
    if(data[1] > Math.max(...filteredData)) {
        return { name: 'Test' };
    }
    return undefined;
}