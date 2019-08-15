const fetch = require("node-fetch");

const headers = {
  'Content-Type': 'application/json',
  'X-Correlation-Id': 'WEB-APP.pewW9',
  'User-Agent': 'pynubank Client - https://github.com/andreroggeri/pynubank',
}

let auth_url = ''
const DISCOVERY_URL = 'https://prod-s0-webapp-proxy.nubank.com.br/api/discovery'
const DISCOVERY_APP_URL = 'https://prod-s0-webapp-proxy.nubank.com.br/api/app/discovery'
let proxy_list_url = {};
let proxy_list_app_url = {};

module.exports = () => {
    this.getAccount = async (link, token) => {
        let headers = {};
        headers['Authorization'] = `Bearer ${token}`

        let response = await fetch(link, {
            method: 'GET',
            headers: headers,
        })

        response = await response.json();

        let account = response.account;
        
        account = {
            balance: {
                open: account.balances.open,
                available: account.balances.available,
                future: account.balances.future,
            },
            credit_limit: account.credit_limit,
            next_close_date: account.next_close_date,
            next_due_date: account.next_due_date
        }

        return account;
    }
    this.getEvents = async (link, token) => {
        let headers = {};
        headers['Authorization'] = `Bearer ${token}`

        let response = await fetch(link, {
            method: 'GET',
            headers: headers,
        })

        response = await response.json();

        let events = response.events.map(event => ({
                'description': event.description,
                'amount': event.amount,
                'amount_without_iof': event.amount_without_iof,
                'time': event.time,
                'title': event.title,            
        }))

        return events;
    },
    this.getCustomer = async (link, token) => {

        let headers = {};
        headers['Authorization'] = `Bearer ${token}`

        let response = await fetch(link, {
            method: 'GET',
            headers: headers,
        })

        response = await response.json();

        let customer = {
            preferred_name: response.customer.preferred_name,
            name: response.customer.name,
            cpf: response.customer.cpf,
            email: response.customer.email,
            gender: response.customer.gender,
            address_city: response.customer.address_city,
            address_state: response.customer.address_state,
            address_postcode: response.customer.address_postcode,
            address_line1: response.customer.address_line1,
            address_number: response.customer.address_number,
            phone: response.customer.phone,
            nationality: response.customer.nationality,
            address_country: response.customer.address_country,
            address_locality: response.customer.address_locality,
            dob: response.customer.dob,
            marital_status: response.customer.marital_status,
            rg: response.customer.documents[0].number+' / '+response.customer.documents[0].issuer,
        }

        return customer;
    }
    this.init = async (cpf, password, uuid) => {
        await this._update_proxy_urls();
    
        let auth_data = await this._password_auth(cpf, password)
    

        headers['Authorization'] = `Bearer ${auth_data["access_token"]}`

        
        let payload = {
            'qr_code_id': uuid,
            'type': 'login-webapp'
        }
    
        let response = await fetch(proxy_list_app_url['lift'], {
            body: JSON.stringify(payload),
            method: 'POST',
            headers: headers,
        })
    
        response = await response.json();

        return response;
    },
    this._password_auth = async (cpf, password) => {
        payload = {
            "grant_type": "password",
            "login": cpf,
            "password": password,
            "client_id": "other.conta",
            "client_secret": "yQPeLzoHuJzlMMSAjC-LgNUJdUecx8XO"
        }
    
        let response = await fetch(auth_url, {
        body: JSON.stringify(payload),
        method: 'POST',
        headers: headers,
        })
    
        response = await response.json();
    
        return response;
    },
    this._update_proxy_urls = async () => { 
        let request = await fetch(DISCOVERY_URL, {
            method: 'GET' 
        }, headers);

        request = await request.json();
        proxy_list_url = request;

        let request_app = await fetch(DISCOVERY_APP_URL, {
            method: 'GET' 
        }, headers);

        request_app = await request_app.json();
        proxy_list_app_url = request_app;  

        auth_url = proxy_list_url['login'];
    }
    this.get_customer = async (token) => {
        
        let response = await fetch()
    }

    return this;
}