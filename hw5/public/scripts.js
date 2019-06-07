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

function updateRow(id, name, date, weight, reps, lbs) {
    var http = new XMLHttpRequest();
    http.open('POST', `/`, true);
    http.setRequestHeader('Content-Type', 'application/json');

    http.addEventListener('load', function(){
        const res = JSON.parse(http.response);
        console.log("res.redirectUrl", res.redirectUrl)
        window.location = res.redirectUrl;
    });
    const body = {
        id,
        name,
        date,
        weight,
        reps,
        lbs
    };
    http.send(JSON.stringify(body));
}

function insertRow(name, date, weight, reps, lbs) {
    const query = $('#insert-form').serialize();
    console.log(query);
    var http = new XMLHttpRequest();
    http.open('POST', `/?` + query, true);
    // http.setRequestHeader('Content-Type', 'application/json');

    http.addEventListener('load', function(){
        const res = JSON.parse(http.response);
        console.log("res.redirectUrl", res.redirectUrl)
        window.location = res.redirectUrl;
    });
    
    // const body = {
    //     name,
    //     date,
    //     weight,
    //     reps,
    //     lbs
    // }; JSON.stringify(body)
    http.send();
}