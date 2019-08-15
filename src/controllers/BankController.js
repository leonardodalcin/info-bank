class BankController 
{
    constructor(app) {
        this.app = app;
    }

    async saveCustomer(customer) {
        // Save in mongoDB customer
        if (customer.cpf) {
            let customer_data = await this.app.repositories.CustomerRepository.getByCPF(customer.cpf);

            if (customer_data) {
                return await this.app.repositories.CustomerRepository.update(customer_data.id, customer);                    
            }
            else {
                return await this.app.repositories.CustomerRepository.store(customer);
            }                
        }
    }

    async saveAccountSummary(account, events, customer) {
        await this.app.repositories.AccountSummaryRepository.store({
            customer: customer._id,                    
            next_close_date: account.next_close_date,
            next_due_date: account.next_due_date,
            balance: {
                open: account.balance.open,
                available: account.balance.available,
                future: account.balance.future,
            },
            credit_limit: account.credit_limit,
            events: events
        });
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

            let customer = await this.app.services.nubank.getCustomer(url_customer, data['access_token']);
            let customer_stored = await this.saveCustomer(customer);

            let events = await this.app.services.nubank.getEvents(url_events, data['access_token']);
            let account = await this.app.services.nubank.getAccount(url_account, data['access_token']);
            this.saveAccountSummary(account, events, customer_stored);

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