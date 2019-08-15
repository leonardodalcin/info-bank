class AccountSummaryRepository
{
    constructor(app) {
        this.app = app;
    }

    async store(data) {
        return await this.app.models.AccountSummary.create(data);
    }
}

module.exports = (app) => {
    return new AccountSummaryRepository(app);
}