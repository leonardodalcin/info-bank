const path = require('path');

module.exports = app => {

    app.get('/', (req, res, next) => {
        res.sendFile(path.join(__dirname, '../','/resources/views/index.html'));
    });

}