class CustomerRepository
{
    constructor(app) {
        this.app = app;
    }

    async getByCPF (cpf) {
        const res = await this.app.models.Customer.findOne({
                cpf: cpf,
            });
        return res;    
    }

    async store(data) {
        return await this.app.models.Customer.create(data);
    }

    async update(id, data) {
        return await this.app.models.Customer.findByIdAndUpdate(id, {
            $set: data
        })
    }
}

module.exports = (app) => {
    return new CustomerRepository(app);
}