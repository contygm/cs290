function deleteRow(id) {
    var http = new XMLHttpRequest();
    http.open('POST', `/?id=${id}`, true);

    http.addEventListener('load', function(){
        const res = JSON.parse(http.response);
        console.log("res.redirectUrl", res.redirectUrl)
        window.location = res.redirectUrl;
    });
    http.send(null);
}