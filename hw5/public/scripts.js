function deleteRow(id) {
    var http = new XMLHttpRequest();
    http.open('GET', `/delete?id=${id}`, true);

    http.addEventListener('load', function(){
        const res = JSON.parse(http.response);
        console.log("res.redirectUrl", res.redirectUrl)
        window.location = res.redirectUrl;
    });
    http.send(null);
}

function goEdit(id) {
    var http = new XMLHttpRequest();
    http.open('GET', `/update?id=${id}`, true);

    http.addEventListener('load', function(){
        const res = JSON.parse(http.response);
        console.log("res", res)
        console.log("res.redirectUrl", res.redirectUrl)
        window.location = res.redirectUrl;
    });
    http.send(null);
}