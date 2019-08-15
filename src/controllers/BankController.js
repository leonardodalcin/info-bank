class BankController 
{
    constructor(app) {
        this.app = app;
    }

    async login(req, res) {
        let cpf = req.body.cpf;
        let password = req.body.password;
        let uuid = req.body.uuid;

        try {
            let data = await this.app.services.nubank.init(cpf, password, uuid);

            let url_customer = data._links.customer.href;
            let url_events = data._links.events.href;
            let url_account = data._links.account.href;

            console.log(url_customer)

            let customer = await this.app.services.nubank.getCustomer(url_customer, data['access_token']);
            let events = await this.app.services.nubank.getEvents(url_events, data['access_token']);
            let account = await this.app.services.nubank.getAccount(url_account, data['access_token']);
            
            res.status(200).send({
                customer,
                events,
                account,
                'data': data['_links']
            })
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error,
                'message': 'Não foi possível efetuar o login'
            });
        }
    }
}

module.exports = (app) => {
    return new BankController(app);
}