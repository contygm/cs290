function markPresent() {
    const refIds = [];
    let checkedStudents = document.querySelectorAll('input[name=stud-present]:checked');
    checkedStudents.forEach(s => refIds.push(s.id))
    const body = { "refIds": refIds }; 

    
    var http = new XMLHttpRequest();
    http.open('POST', '/attendance-update', true);
    http.setRequestHeader('Content-type', 'application/json');
    http.addEventListener('load',function(){
        if(http.status >= 200 && http.status < 400){
          location.reload();
        } else {
          console.error("Error in network request: " + http.statusText);
        }
      });
    http.send(JSON.stringify(body));
    event.preventDefault();
}