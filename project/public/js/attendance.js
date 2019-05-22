function markPresent() {
    console.log("YO")
    event.preventDefault();
    const refIds = [];
    let checkedStudents = document.querySelectorAll('input[name=stud-present]:checked');
    console.log("BISH")
    checkedStudents.forEach(s => refIds.push(s.id))
    const body = { "refIds": refIds }; //JSON.stringify({ refIds });
    console.log("refIds", refIds)
    console.log("body", body)

    var http = new XMLHttpRequest();
    http.open('POST', '/attendance', true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send(JSON.stringify(body));
}