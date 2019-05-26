function submitRef() {
    const newReferral = {
        _id: 999,
        date : `${$('#refer-date').val()}`,
        reason : `${$('#refer-reason').val()}`,
        description: `${$('#refer-other').val()}`,
        time_served: {
            status: "NOT_SERVED",
            date : `${$('#serve-date').val()}`
        },
        teacher: {
            name: {
                first: `${$('#teach-firstName').val()}`,
                last: `${$('#teach-lastName').val()}`
            },
            email: `${$('#teach-email').val()}`
        },
        student: {
            name: {
                first: `${$('#stud-firstName').val()}`,
                last: `${$('#stud-lastName').val()}`
            },
            grade: `${$('#stud-grade').val()}`
        }
    }

    var http = new XMLHttpRequest();
    http.open('POST', `/newReferral`, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.addEventListener('load', function(){
        const res = JSON.parse(http.response);
        window.location = res.redirectUrl;
    });
    http.send(JSON.stringify(newReferral));
}
