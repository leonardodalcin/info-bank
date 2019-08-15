
function getDate(date) {
    return `${new Date(date).getUTCDate().toString().padStart(2, '0')}/${(new Date(date).getUTCMonth()+1).toString().padStart(2, '0')}/${new Date(date).getUTCFullYear()}`;
}

function getDecimal(value) {
    return "R$ " + (value / 100).toFixed(2).toLocaleString('pt-BR');
}

$(document).on('click', '#btn-submit', function() {

    let cpf = $('#input-cpf').val();
    let password = $('#input-password').val();
    let uuid = $('#barcode').attr('data-uui');

    fetch('/api/v1/bank/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cpf,
            password,
            uuid,
        })  
    })
    .then(data => data.json())
    .then(data => {

        let customer = data.customer;

        $("#panel-data-bank").show();
        for(let j in customer) {
            if (j == "documents") {
                $(".data-bank #" + j).text(customer[j].number)
            }
            else if(j == 'dob') {                  
                $(".data-bank #" + j).text(getDate(customer[j]))
            }
            else {
                $(".data-bank #" + j).text(customer[j])
            }
        }

        let account = data.account;
        $("#future").text(getDecimal(account.balance.future))
        $("#open").text(getDecimal(account.balance.open))
        $("#available").text(getDecimal(account.balance.available))
        $("#next_due_date").text(getDate(account.next_due_date))
        $("#next_close_date").text(getDate(account.next_close_date))



        let events = data.events;
        $("#list-events").html();
        let html = "";
        for(let j in events) {
            if (!events[j].amount != 'undefined' && events[j].amount != undefined 
            && events[j].description != 'undefined' && events[j].description != undefined) {            
                html += `<li class="list-group-item" >
                            <h4 class="list-group-item-heading">${events[j].description} <small>${events[j].title}</small></h4>
                            <p class="list-group-item-text" style="display: flex;">
                                <span style="flex: 1;">${getDate(events[j].time)}</span>
                                <span style="flex: 1; text-align: right">${getDecimal(events[j].amount)}</span>
                            </p>
                        </li>`;
            }
        }
        $("#list-events").html(html);

    })
})

$(document).on('click', '#btn-consult', function() {
    let bank = $('#select-bank').val();

    $("#panel-data-bank").hide();

    if (bank == 'nubank') {

        function generateUUID() { // Public Domain/MIT
            var d = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
                d += performance.now(); //use high-precision timer if available
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        }

        var uuid = generateUUID();
        var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + uuid + '&amp;size=250x250';
        $('#barcode').attr('src', url);
        $('#barcode').attr('data-uui', uuid);


        $("#open-qr-code").modal('show');

    }
})