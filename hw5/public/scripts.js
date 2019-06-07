function deleteRow(id) {
    var http = new XMLHttpRequest();
    http.open('POST', `/`, true);
    http.setRequestHeader('Content-Type', 'application/json');

    http.addEventListener('load', function(){
        const res = JSON.parse(http.response);
        console.log("res.redirectUrl", res.redirectUrl)
        window.location = res.redirectUrl;
    });
    const body = {
        "id": id
    };
    http.send(JSON.stringify(body));
}

function updateRow(id) {
    console.log("update row", document.getElementById(`${id}-unit`).value)
    var http = new XMLHttpRequest();
    http.open('POST', `/`, true);
    http.setRequestHeader('Content-Type', 'application/json');

    http.addEventListener('load', function(){
        const res = JSON.parse(http.response);
        console.log("res.redirectUrl", res.redirectUrl)
        window.location = res.redirectUrl;
    });

    let body = {
        id: id,
        name: null,
        date: null,
        weight: null,
        reps: null,
        lbs: null
    };

    body.name = document.getElementById(`${id}-name`).value;
    body.date = document.getElementById(`${id}-date`).value;
    body.weight = document.getElementById(`${id}-weight`).value;
    body.reps = document.getElementById(`${id}-reps`).value;
    body.lbs = document.getElementById(`${id}-lbs`).checked;
    
    console.log(body);
    http.send(JSON.stringify(body));
}

function insertRow(name, date, weight, reps, lbs) {
    const query = $('#insert-form').serialize();
    console.log(query);
    var http = new XMLHttpRequest();
    http.open('POST', `/?` + query, true);

    http.addEventListener('load', function(){
        const res = JSON.parse(http.response);
        console.log("res.redirectUrl", res.redirectUrl)
        window.location = res.redirectUrl;
    });
    
    http.send();
}