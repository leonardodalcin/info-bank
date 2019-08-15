
module.exports = app => {
    app.post('/api/v1/bank/login', app.controllers.BankController.login.bind(app.controllers.BankController));
}