function getMonitor() {
    const id = $( "#monitorSelect" ).val();

    var http = new XMLHttpRequest();
    http.open('GET', `/filter-monitors-by-id?id=${id}`, true);

    http.onreadystatechange = function() {
        if (http.readyState === 4) {
            updateMonitor(JSON.parse(http.response));
            return; 
        }
    }
    http.send(null);
}

function getReferral() {
    const id = $( "#studentSelect" ).val();

    var http = new XMLHttpRequest();
    http.open('GET', `/filter-students-by-id?id=${id}`, true);

    http.onreadystatechange = function() {
        if (http.readyState === 4) {
            updateReferral(JSON.parse(http.response));
            return ; 
        }
    }
    http.send(null);
}

function getBoth() {
    const monId = $( "#monitorSelect" ).val();
    const refId = $( "#studentSelect" ).val();

    var http = new XMLHttpRequest();
    http.open('GET', `/filter-both-by-id?monId=${monId}&refId=${refId}`, true);

    http.onreadystatechange = function() {
        if (http.readyState === 4) {
            const res = JSON.parse(http.response);
            buildTemplate(res.referral, res.monitor);
            return ; 
        }
    }
    http.send(null);
}

function updateReferral(ref) {
    $("span.student-name").text(ref.student.name.first + " " + ref.student.name.last);
    $("span.teacher-name").text(ref.teacher.name.first + " " + ref.teacher.name.last);
    $(".teacher-email").text(ref.teacher.email);

    $(".referral-date").text(ref.date);
    $(".referral-reason").text(ref.reason);
    $(".other-reason").text(": " + ref.description);
    $(".referral-id").text(ref._id);
    $(".served-status").text(ref.time_served.status);
    $(".date-served").text(ref.time_served.date);

}

function updateMonitor(monitor) {    
    $(".monitor-name").text(monitor.name.first + " " + monitor.name.last);
    $(".monitor-email").text(monitor.email);
}

function buildTemplate(ref, monitor) {
    const subject = ref.student.name.first + " " + ref.student.name.last + " served detention on " + ref.time_served.date;
    const monitorEmail = monitor.email;
    const monitorName = monitor.name.first + " " + monitor.name.last;
    const teacherEmail = ref.teacher.email;
    const teacherName = ref.teacher.name.first + " " + ref.teacher.name.last;
    const studentName = ref.student.name.first + " " + ref.student.name.last;

    const body = `Hello ${teacherName},
On ${ref.date}, ${studentName} received a referral for ${ref.reason}:${ref.description} from ${teacherName}.

On ${ref.time_served.date}, ${studentName} served lunch detention with ${monitorName}. 
The status for Referral #${ref._id} is now ${ref.time_served.status}. 

If you have any additional questions about ${studentName}'s detention, please contact
${monitorName} at ${monitorEmail}. 

Thank you, 
${monitorName}
    `;

    encodeURIComponent(body);
    // open email in default email app
    window.location.href = `mailto:${teacherEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;

    return body;
}
