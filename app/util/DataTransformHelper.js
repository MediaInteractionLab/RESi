class DataTransformHelper {
    
    static transformDataArrayToFeatureLabelArrays(dataArray) {

        const features = [];
        const labels = [];
        const labelNames = [];

        dataArray.forEach((data) => {
            features.push(data.data);
            let index = labelNames.indexOf(data.label);

            if(index === -1) {
                index = labelNames.length;
                labelNames.push(data.label);
            }

            labels.push(index);
        });

        return {
            features,
            labels,
            labelNames,
        };
    }
}

module.exports = DataTransformHelper;
