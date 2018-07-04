const fs = require('fs');
const json2csv = require('json2csv');
const csvParse = require('csv-parse/lib/sync');

class CSVDataHandler {
    
    static writeCSV(filePath, csvData) {
        fs.writeFileSync(filePath, csvData);
    }

    static readCSV(filePath) {
        return fs.readFileSync(filePath, {
            encoding: 'utf8',
        });
    }

    static csv2json(csvDataString) {
        const jsonData = csvParse(csvDataString, { columns: true })
        jsonData.forEach(entry => {
            // ensure that array is not string
            entry.data = eval(entry.data);
        });
        return jsonData;
    }
    
    static json2csv(jsonData) {

        let csvData = '';

        try {
            csvData = json2csv({ data: jsonData, fields: ['label', 'data'] });
        } catch (err) {
            // Errors are thrown for bad options, or if the data is empty and no fields are provided.
            // Be sure to provide fields if it is possible that your data array will be empty.
            console.error(err);
        }
        return csvData;
    }
}

module.exports = CSVDataHandler;
