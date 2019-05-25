function refSubmit() {
    event.preventDefault();

    // random id to start, server takes care of real id
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

    console.log("newReferral", newReferral)

    var http = new XMLHttpRequest();
    http.open('POST', `/newReferral`, true);
    http.setRequestHeader('Content-Type', 'application/json');
    // http.onreadystatechange = function() {
    //     if (http.readyState === 4) {
    //         const res = JSON.parse(http.response);
    //         buildTemplate(res.referral, res.monitor);
    //         return ; 
    //     }
    // }
    http.send(JSON.stringify(newReferral));
}