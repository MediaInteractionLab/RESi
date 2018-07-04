const settings = {
    database: {
        useOnline: false,
        online : {
            mongoPath: '',
        },
        local : {
            mongoPath: 'mongodb://localhost:27017/data',
        },
    },
};

module.exports = settings;
