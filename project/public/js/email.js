function updateReferral() {
    const id = $( "#studentSelect" ).val();

    var http = new XMLHttpRequest();
    http.open('GET', `/filter-students-by-id?id=${id}`, true);

    http.onreadystatechange = function() {
        if (http.readyState === 4) {
            const ref = JSON.parse(http.response);
            console.warn("REF", ref)
            $("span.student-name").text(ref.student.name.first + " " + ref.student.name.last);
            $("span.teacher-name").text(ref.teacher.name.first + " " + ref.teacher.name.last);
            $(".teacher-email").text(ref.teacher.email);

            $(".referral-date").text(ref.date);
            $(".referral-reason").text(ref.reason);
            $(".other-reason").text(": " + ref.other_description);
            $(".referral-id").text(ref._id);
            $(".served-status").text(ref.time_served.status);
            $(".date-served").text(ref.time_served.date);
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
            $(".monitor-name").text(monitor.name.first + " " + monitor.name.last);
            $(".monitor-email").text(monitor.email);
        }
    }

    http.send(null);
}

function buildTemplate(ref, monitor) {
    const subject = ref.student.name.first + " " + ref.student.name.last + " served detention on " + ref.time_served.date;
    const fromAddress = monitor.email;
    const toAddress = ref.teacher.email;
    const teacherName = ref.teacher.name.first + " " + ref.teacher.name.last;

    const body = `Hello ${teacherName},
    On ${refDate}, ${studentName} received 
    a referral for ${reason}${other}. 
    from ${teacherName}
    .
    
    
    Thank you, <br>
    ${monitorName}
    `;
}

function mailto(emailEncode) {

}

function encodeEmail() {
    console.warn("ENCODE EMAIL BISH")
}

//https://css-tricks.com/snippets/html/mailto-links/
//https://www.w3schools.com/tags/ref_urlencode.asp
// encodeURIComponent()