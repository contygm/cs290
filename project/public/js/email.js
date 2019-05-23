function updateStudent() {
    const id = $( "#studentSelect" ).val();

    var http = new XMLHttpRequest();
    http.open('GET', `/filter-students-by-id?id=${id}`, true);

    http.onreadystatechange = function() {
        if (http.readyState === 4) {
            const ref = JSON.parse(http.response);
        }
    }

    http.send(null);
}

function updateMonitor() {
    const id = $( "#monitorSelect" ).val();

    var http = new XMLHttpRequest();
    http.open('GET', `/filter-monitors-by-id?id=${id}`, true);

    http.onreadystatechange = function() {
        if (http.readyState === 4) {
            const monitor = JSON.parse(http.response);
        }
    }

    http.send(null);
}

function encodeEmail() {
    console.warn("ENCODE EMAIL BISH")
}

//https://css-tricks.com/snippets/html/mailto-links/
//https://www.w3schools.com/tags/ref_urlencode.asp
// encodeURIComponent()